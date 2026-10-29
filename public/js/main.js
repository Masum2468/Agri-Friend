// State Variables
let currentUser = null;
let activeTab = 'crops';
let guidesData = {
  knowledgeCenters: [],
  crops: [],
  diseases: [],
  inputs: [],
  seasonal: [],
  calendar: [],
  troubleshoot: [],
  tutorials: [],
  fertilizers: [],
  pesticides: []
};
let activeKnowledgeCenterId ='center-crops';
let activeCropTimelineId ='rice';
let activeSeasonalTab ='kharif1';
let marketplaceData = [];
let currentCity ='Dhaka';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  fetchWeather('Dhaka');
  loadGuides();
  fetchMarketplace();

  // Weather Event Listeners
  const searchBtn = document.getElementById('weather-search-btn');
  const cityInput = document.getElementById('weather-city-input');

  if (searchBtn && cityInput){
    searchBtn.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) fetchWeather(city);
    });

    cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
      }
    });

    // Automatically fetch when selecting from datalist
    cityInput.addEventListener('change', () => {
      const city = cityInput.value.trim();
      if (city) fetchWeather(city);
    });
  }

  // Mobile Navigation Toggle
  const navToggleBtn = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggleBtn && mainNav) {
    navToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('nav-open');
      const icon = navToggleBtn.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !navToggleBtn.contains(e.target)) {
        if (mainNav.classList.contains('nav-open')) {
          mainNav.classList.remove('nav-open');
          const icon = navToggleBtn.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      }
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('nav-open');
        const icon = navToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
});

// Quick district selector click handler
window.quickSelectDistrict = function(districtName) {
  const cityInput = document.getElementById('weather-city-input');
  if (cityInput) {
    cityInput.value = districtName;
  }
  fetchWeather(districtName);
};

// Re-render dynamic content on language change
document.addEventListener('languagechanged', () => {
  if (currentCity) fetchWeather(currentCity);
  renderGuides();
  renderMarketplace();

  // Re-render entire Knowledge Hub on language switch
  const khContainer = document.getElementById('kh-centers-cards-container');
  if (khContainer) {
    renderKnowledgeCenters();
    renderCenterSelectorPills();
    renderActiveCenterWorkspace(activeKnowledgeCenterId);
  }

  // If detail view is open, re-render it too
  const detailView = document.getElementById('detail-view');
  if (detailView && detailView.style.display !== 'none') {
    if (window.currentOpenCropId) {
      openCropDetail(window.currentOpenCropId, window.currentOpenSubTab || 'diseases', false);
    }
    if (window.currentOpenDiseaseData) {
      openDiseaseDetail(window.currentOpenDiseaseData);
    }
  }

  if (window.applyTranslations) window.applyTranslations();
});
// ----------------------------------------------------
// AUTHENTICATION CHECK
// ----------------------------------------------------
async function checkAuth() {
  try{
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      currentUser = await res.json();
      updateNavigationForUser();
      renderMarketplace();
    }
  } catch (err) {
    console.log('User is not authenticated.');
  }
}

function updateNavigationForUser() {
  const authContainer = document.getElementById('auth-buttons');
  const heroBtn = document.getElementById('hero-dashboard-btn');
  const postListingBtn = document.getElementById('post-listing-btn');

  if (currentUser) {
    const linkPath = '/dashboard';
    const linkText = 'Farm Dashboard';
    const linkIcon = 'fa-chalkboard-user';

    if (authContainer) {
      authContainer.innerHTML = `
        <a href="${linkPath}" class="btn btn-outline" style="margin-right: 10px;" data-i18n="nav_dashboard"><i class="fa-solid ${linkIcon}"></i> <span class="i18n-text">${linkText}</span></a>
        <button onclick="handleLogout()" class="btn btn-primary" style="background: #c92a2a;" data-i18n="nav_signout"><i class="fa-solid fa-power-off"></i> <span class="i18n-text">Sign Out</span></button>
      `;
    }
    if (heroBtn) {
      heroBtn.href = linkPath;
      heroBtn.setAttribute('data-i18n', 'hero_dashboard_btn');
      heroBtn.innerHTML = `<i class="fa-solid ${linkIcon}"></i> <span class="i18n-text">Go to My Farm Dashboard</span>`;
    }
    if (postListingBtn) {
      postListingBtn.style.display = 'inline-flex';
    }

    if (window.applyTranslations) {
      window.applyTranslations();
    }
  }
}

async function handleLogout() {
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      window.location.reload();
    }
  } catch (err) {
    alert('Logout failed. Try again.');
  }
}
// ----------------------------------------------------
// WEATHER API INTEGRATION
// ----------------------------------------------------
async function fetchWeather(city) {
  currentCity = city;
  const weatherStatus = document.getElementById('weather-status-label');
  const t = window.translateText || (x => x);
  if (weatherStatus) weatherStatus.innerText = t('Fetching weather data...');

  try {
    const res = await fetch(`/api/public/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || t('Weather lookup failed'));
    }

    // Helper to get weather icon
    const getWeatherIcon = (condition) => {
      const cond = (condition || '').toLowerCase();
      if (cond.includes('sun') || cond.includes('clear')) return 'fa-sun';
      if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('shower')) return 'fa-cloud-showers-heavy';
      if (cond.includes('thunderstorm')) return 'fa-cloud-bolt';
      if (cond.includes('wind')) return 'fa-wind';
      if (cond.includes('cloud') || cond.includes('overcast')) return 'fa-cloud';
      return 'fa-cloud-sun';
    };

    const translatedCondition = t(data.condition);
    const translatedCity = t(data.city);

    // Update Weather Widget with redesigned HTML
    const displayBox = document.getElementById('weather-display');
    if (displayBox) {
      displayBox.innerHTML = `
        <div class="weather-main-info">
          <div class="weather-temp-container">
            <span class="weather-temp-num">${Math.round(data.temp)}</span>
            <span class="weather-temp-deg">°C</span>
            <i class="fa-solid ${getWeatherIcon(data.condition)} weather-main-icon"></i>
          </div>
          <div class="weather-meta">
            <div class="weather-location-badge"><i class="fa-solid fa-location-dot"></i> ${translatedCity}</div>
            <div class="weather-condition-text" id="weather-condition">${translatedCondition}</div>
          </div>
        </div>
        <div class="weather-stats-grid">
          <div class="weather-stat-card">
            <div class="stat-icon-wrapper humidity-icon"><i class="fa-solid fa-droplet"></i></div>
            <div class="stat-detail">
              <span class="stat-label">${t('Humidity')}</span>
              <span class="stat-val" id="weather-humidity">${data.humidity}%</span>
            </div>
          </div>
          <div class="weather-stat-card">
            <div class="stat-icon-wrapper wind-icon"><i class="fa-solid fa-wind"></i></div>
            <div class="stat-detail">
              <span class="stat-label">${t('Wind Speed')}</span>
              <span class="stat-val" id="weather-wind">${data.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      `;
    }

    // Populate recommendations with colored action cards
    const adviceList = document.getElementById('weather-advice-list');
    if (adviceList) {
      adviceList.innerHTML = '';
      data.recommendation.forEach(rec => {
        let icon = 'fa-circle-info';
        let cardClass = 'advice-info';
        const text = rec.toLowerCase();

        if (text.includes('irrigation') || text.includes('watering') || text.includes('water')) {
          icon = 'fa-faucet-drip';
        } else if (text.includes('spray') || text.includes('pesticide') || text.includes('chemical') || text.includes('fertilizer') || text.includes('foliar')) {
          icon = 'fa-spray-can-sparkles';
        } else if (text.includes('wind') || text.includes('winds')) {
          icon = 'fa-wind';
        } else if (text.includes('temp') || text.includes('heat') || text.includes('hot') || text.includes('temperature')) {
          icon = 'fa-temperature-high';
        } else if (text.includes('sow') || text.includes('seedling') || text.includes('transplant') || text.includes('planting')) {
          icon = 'fa-seedling';
        } else if (text.includes('fungal') || text.includes('spot') || text.includes('mildew') || text.includes('rot')) {
          icon = 'fa-bug';
        } else if (text.includes('drainage') || text.includes('waterlogging')) {
          icon = 'fa-water';
        }

        if (text.startsWith('avoid') || text.startsWith('postpone') || text.startsWith('limit') || text.includes('alert') || text.includes('warning') || text.includes('high humidity')) {
          cardClass = 'advice-warning';
        } else if (text.includes('perfect') || text.includes('favorable') || text.includes('excellent') || text.includes('recommended')) {
          cardClass = 'advice-success';
        }

        const card = document.createElement('div');
        card.className = `advice-card ${cardClass}`;
        const translatedRec = window.translateText ? window.translateText(rec) : rec;
        card.innerHTML = `
          <div class="advice-icon-box">
            <i class="fa-solid ${icon}"></i>
          </div>
          <div class="advice-content-text">${translatedRec}</div>
        `;
        adviceList.appendChild(card);
      });
    }

    if (weatherStatus) {
      weatherStatus.innerText = data.isMock 
        ? (window.translateText ? window.translateText('(Simulated offline weather. Configure OPENWEATHER_API_KEY for real data.)') : '(Simulated offline weather. Configure OPENWEATHER_API_KEY for real data.)') 
        : (window.translateText ? window.translateText('(Live weather data loaded!)') : '(Live weather data loaded!)');
    }

  } catch (err) {
    if (weatherStatus) weatherStatus.innerText = `Error: ${err.message}`;
  }
}

// ----------------------------------------------------
// REFERENCE LIBRARIES (GUIDES)
// ----------------------------------------------------
async function loadGuides() {
  try {
    const res = await fetch('/api/public/guides/all-centers');
    if (res.ok) {
      const data = await res.json();
      guidesData = { ...guidesData, ...data };
    }
  } catch (err) {
    console.error('Error loading reference guides:', err);
  }

  // Render 7 Knowledge Centers UI
  renderKnowledgeCenters();
  renderCenterSelectorPills();
  renderActiveCenterWorkspace(activeKnowledgeCenterId);

  // Render legacy tabs if present
  renderGuides();
  checkUrlParams();
}

// ----------------------------------------------------
// 7 KNOWLEDGE CENTERS RENDERING & CONTROLS
// ----------------------------------------------------
function renderKnowledgeCenters(filterQuery = '') {
  const container = document.getElementById('kh-centers-cards-container');
  if (!container) return;
  container.innerHTML = '';

  const isEn = (window.getCurrentLanguage && window.getCurrentLanguage() === 'en') || localStorage.getItem('language') === 'en';
  const centers = guidesData.knowledgeCenters || [];
  const query = (filterQuery || '').toLowerCase().trim();

  const filtered = centers.filter(c => {
    if (!query) return true;
    const title = (c.title || c.titleFull || c.titleEn || '').toLowerCase();
    const sub = (c.subtitle || c.subtitleEn || '').toLowerCase();
    const desc = (c.tagline || c.taglineEn || '').toLowerCase();
    const tags = ((c.featuredCrops || []).concat(c.featuredCropsEn || [])).join(' ').toLowerCase();
    return title.includes(query) || sub.includes(query) || desc.includes(query) || tags.includes(query);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 12px;"></i>
        <h3 style="color: #334155;">${isEn ? `No center found matching "${filterQuery}"` : `"${filterQuery}" এর সাথে মিলে এমন কোনো জ্ঞান কেন্দ্র পাওয়া যায়নি`}</h3>
        <p style="color: #64748b; margin-top: 6px;">${isEn ? 'Please try searching for another topic or reset the search.' : 'দয়া করে অন্য কোনো ফসল, রোগ বা বিষয় অনুসন্ধান করুন অথবা অনুসন্ধান মুছে দিন।'}</p>
        <button class="btn btn-outline" style="margin-top: 15px;" onclick="clearKnowledgeSearch()">${isEn ? 'Reset Search' : 'অনুসন্ধান রিসেট করুন'}</button>
      </div>
    `;
    return;
  }

  filtered.forEach(center => {
    const card = document.createElement('div');
    const cleanId = (center.id || '').replace('center-', '');
    const isSelected = activeKnowledgeCenterId === cleanId || activeKnowledgeCenterId === center.id;
    card.className = `kh-card ${isSelected ? 'active-selected' : ''}`;
    card.id = `kh-card-${cleanId}`;

    const pageMap = {
      'crops': '/crop-guides.html',
      'diseases': '/disease-guide.html',
      'inputs': '/fertilizer-guide.html',
      'fertilizers': '/fertilizer-guide.html',
      'seasonal': '/seasonal-advisory.html',
      'calendar': '/crop-calendar.html'
    };

    if (pageMap[cleanId]) {
      card.onclick = () => {
        window.location.href = pageMap[cleanId];
      };
    } else if (cleanId === 'tutorials') {
      card.onclick = () => openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ', isEn ? 'Agricultural Video Tutorials' : 'কৃষি ভিডিও টিউটোরিয়াল');
    } else {
      card.onclick = () => {
        window.location.href = '/crop-guides.html';
      };
    }

    const titleText = isEn ? (center.titleEn || center.title) : (center.title || center.titleFull);
    const subText = isEn ? (center.subtitleEn || center.subtitle) : (center.subtitle || center.subtitle_bn);
    const descText = isEn ? (center.taglineEn || center.tagline) : (center.tagline || center.description_bn);
    const badgeText = isEn ? (center.badgeEn || center.badge) : (center.badgeBn || center.badge);
    const tagsList = isEn && center.featuredCropsEn ? center.featuredCropsEn : (center.featuredCrops || center.features || []);
    const tagsHTML = tagsList.map(f => `<span class="kh-tag">${f}</span>`).join('');

    card.innerHTML = `
      <div class="kh-card-img-wrap">
        <img src="${center.image}" alt="${titleText}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'">
        <div class="kh-bookmark-badge">
          <i class="fa-solid fa-bookmark"></i>
          <span>${isEn ? 'Bookmark' : 'সংরক্ষণ'}</span>
        </div>
      </div>
      <div class="kh-card-body">
        <div class="kh-card-header">
          <div class="kh-card-title">
            <span>${titleText}</span>
            <span class="number-badge">${badgeText || 'Must Have'}</span>
          </div>
          <div class="kh-card-subtitle">${subText}</div>
        </div>
        <p class="kh-card-desc">${descText}</p>
        <div class="kh-card-tags">${tagsHTML}</div>
        <div class="kh-card-footer">
          <span style="font-size: 0.85rem; color: #166534; font-weight: 600;">
            <i class="fa-solid fa-circle-check"></i> ${isEn ? 'Complete Guides & Tools' : 'সম্পূর্ণ গাইড ও টুলস'}
          </span>
          <span class="kh-explore-btn">
            ${isEn ? 'Explore & Tools' : 'টুলস ব্যবহার করুন'} <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderCenterSelectorPills() {
  const container = document.getElementById('kh-center-selector-pills');
  if (!container) return;
  container.innerHTML = '';

  const centers = guidesData.knowledgeCenters || [];
  centers.forEach(c => {
    const cleanId = (c.id || '').replace('center-', '');
    const isSelected = activeKnowledgeCenterId === cleanId || activeKnowledgeCenterId === c.id;
    const btn = document.createElement('button');
    btn.className = `kh-pill-btn ${isSelected ? 'active' : ''}`;
    btn.id = `kh-pill-${cleanId}`;
    btn.innerHTML = `<i class="fa-solid ${c.icon || 'fa-folder'}"></i> ${c.title || c.titleFull}`;
    btn.onclick = () => selectKnowledgeCenter(cleanId, false);
    container.appendChild(btn);
  });
}

function selectKnowledgeCenter(centerId, scroll = true) {
  const cleanId = (centerId || 'crops').replace('center-', '');
  activeKnowledgeCenterId = cleanId;

  // Update cards active state
  document.querySelectorAll('.kh-card').forEach(el => el.classList.remove('active-selected'));
  const card = document.getElementById(`kh-card-${cleanId}`);
  if (card) card.classList.add('active-selected');

  // Update pill buttons active state
  document.querySelectorAll('.kh-pill-btn').forEach(el => el.classList.remove('active'));
  const pill = document.getElementById(`kh-pill-${cleanId}`);
  if (pill) pill.classList.add('active');

  // Update header text
  const center = (guidesData.knowledgeCenters || []).find(c => (c.id || '').replace('center-', '') === cleanId);
  const heading = document.getElementById('kh-workspace-heading');
  const desc = document.getElementById('kh-workspace-desc');

  if (center) {
    if (heading) heading.innerHTML = `<i class="fa-solid ${center.icon || 'fa-circle-info'}"></i> ${center.titleFull || center.title}`;
    if (desc) desc.innerText = center.tagline || center.subtitle || '';
  }

  // Render specific center content
  renderActiveCenterWorkspace(cleanId);

  // Scroll smoothly to workspace
  if (scroll) {
    const workspace = document.getElementById('kh-active-workspace');
    if (workspace) {
      workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function renderActiveCenterWorkspace(centerId) {
  const body = document.getElementById('kh-workspace-body');
  if (!body) return;

  const cleanId = (centerId || 'crops').replace('center-', '');

  switch (cleanId) {
    case 'crops':
      renderCropsCenter(body);
      break;
    case 'diseases':
      renderDiseasesCenter(body);
      break;
    case 'inputs':
      renderInputsCenter(body);
      break;
    case 'seasonal':
      renderSeasonalCenter(body);
      break;
    case 'calendar':
      renderCalendarCenter(body);
      break;
    case 'troubleshoot':
      renderTroubleshootCenter(body);
      break;
    case 'tutorials':
      renderTutorialsCenter(body);
      break;
    default:
      renderCropsCenter(body);
  }
}

// ----------------------------------------------------
// 1. CROP LIFECYCLE CENTER
// ----------------------------------------------------
function renderCropsCenter(container) {
  const crops = guidesData.crops || [];
  if (crops.length === 0) {
    container.innerHTML = '<p style="color: #64748b;">ফসলের তথ্য লোড হচ্ছে...</p>';
    return;
  }

  const selectedCrop = crops.find(c => c.id === activeCropTimelineId) || crops[0];

  const chipsHTML = crops.map(c => `
    <div class="kh-crop-chip ${c.id === selectedCrop.id ? 'active' : ''}" onclick="selectCropTimeline('${c.id}')">
      <img src="${c.image || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100'}" alt="${c.name_bn || c.name}">
      <div>
        <div style="font-size: 0.95rem;">${c.name_bn || c.name.split('/')[1] || c.name}</div>
        <div style="font-size: 0.75rem; color: #64748b; font-weight: normal;">${c.type || 'মাঠ ফসল'}</div>
      </div>
    </div>
  `).join('');

  const stages = selectedCrop.timeline || [
    { stage: 1, title: 'জমি প্রস্তুতি', title_bn: '১. জমি প্রস্তুতি', desc_bn: '৩-৪ বার গভীর চাষ ও মই দিয়ে জমি সমতল এবং ঝুরঝুরে করতে হবে।' },
    { stage: 2, title: 'বীজ নির্বাচন ও শোধন', title_bn: '২. বীজ নির্বাচন ও শোধন', desc_bn: 'উন্নত ও প্রত্যায়িত বীজ নির্বাচন করে কার্বেন্ডাজিম বা অটোস্টিন দিয়ে শোধন করুন।' },
    { stage: 3, title: 'চারা রোপণ / বীজ বপন', title_bn: '৩. চারা রোপণ / বীজ বপন', desc_bn: 'সঠিক বয়সের সুস্থ চারা নির্দিষ্ট দূরত্ব বজায় রেখে রোপণ করুন।' },
    { stage: 4, title: 'সার প্রয়োগ ও সেচ ব্যবস্থাপনা', title_bn: '৪. সার প্রয়োগ ও সেচ ব্যবস্থাপনা', desc_bn: 'মাটি পরীক্ষা করে সুষম সার প্রয়োগ এবং সঠিক সময়ে সেচ নিশ্চিত করুন।' },
    { stage: 5, title: 'রোগ ও বালাই ব্যবস্থাপনা', title_bn: '৫. রোগ ও বালাই ব্যবস্থাপনা', desc_bn: 'নিয়মিত জমি পর্যবেক্ষণ ও সমন্বিত বালাই দমন (IPM) পদ্ধতি অনুসরণ করুন।' },
    { stage: 6, title: 'ফসল সংগ্রহ ও সংরক্ষণ', title_bn: '৬. ফসল সংগ্রহ ও সংরক্ষণ', desc_bn: '৮০-৮৫% ফসল পরিপক্ব হলে কেটে শুকিয়ে ১২% আর্দ্রতায় সংরক্ষণ করুন।' }
  ];

  const timelineStepsHTML = stages.map((st, idx) => `
    <div class="kh-timeline-step">
      <div class="kh-step-num">${idx + 1}</div>
      <div class="kh-step-content">
        <h4>${st.title_bn || st.title}</h4>
        <p>${st.desc_bn || st.desc || st.description || ''}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div style="margin-bottom: 15px;">
      <label style="font-weight: 700; color: #1e293b; display: block; margin-bottom: 8px;">
        <i class="fa-solid fa-wheat-awn" style="color: #1b5f43;"></i> ফসল নির্বাচন করুন (৯টি প্রধান ফসল):
      </label>
      <div class="kh-crop-select-row">${chipsHTML}</div>
    </div>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; margin-bottom: 25px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px; margin-bottom: 15px;">
        <div>
          <h3 style="font-size: 1.4rem; color: #134e2f; margin-bottom: 4px;">
            <i class="fa-solid fa-seedling"></i> ${selectedCrop.name_bn || selectedCrop.name}
          </h3>
          <div style="color: #64748b; font-size: 0.9rem; font-style: italic;">${selectedCrop.scientificName || ''}</div>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="jumpToCenterForCrop('center-inputs', '${selectedCrop.id}')" style="font-size: 0.85rem; padding: 8px 14px;">
            <i class="fa-solid fa-calculator"></i> সার হিসাব করুন
          </button>
          <button class="btn btn-outline" onclick="jumpToCenterForCrop('center-diseases', '${selectedCrop.id}')" style="font-size: 0.85rem; padding: 8px 14px; background: #dc2626; border-color: #dc2626;">
            <i class="fa-solid fa-bug"></i> রোগ বালাই দেখুন
          </button>
        </div>
      </div>
      <p style="color: #334155; line-height: 1.6; margin-bottom: 16px;">${formatLocalizedText(selectedCrop.description)}</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; background: #ffffff; padding: 14px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div><span style="color: #64748b; font-size: 0.82rem;">বিঘায় বীজ:</span> <strong style="display:block; color: #1e293b;">${selectedCrop.bighaSeedRate || selectedCrop.seedInfo?.rate || 'প্রযোজ্য নয়'}</strong></div>
        <div><span style="color: #64748b; font-size: 0.82rem;">জীবনকাল:</span> <strong style="display:block; color: #1e293b;">${selectedCrop.growthDuration || '১১০-১৩০ দিন'}</strong></div>
        <div><span style="color: #64748b; font-size: 0.82rem;">মাটির pH:</span> <strong style="display:block; color: #1e293b;">${selectedCrop.optimalPH || '৬.০ - ৭.০'}</strong></div>
        <div><span style="color: #64748b; font-size: 0.82rem;">অনুমোদিত জাত:</span> <strong style="display:block; color: #166534; font-size: 0.88rem;">${selectedCrop.seedInfo?.popularVarieties || 'উন্নত জাত'}</strong></div>
      </div>
    </div>

    <div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #134e2f; margin-bottom: 14px;">
        <i class="fa-solid fa-arrows-split-up-and-left"></i> বীজ বপন থেকে ফসল সংগ্রহ পর্যন্ত সম্পূর্ণ পর্যায়ক্রম নির্দেশিকা:
      </h3>
      <div class="kh-timeline-container">${timelineStepsHTML}</div>
    </div>
  `;
}

function selectCropTimeline(cropId) {
  activeCropTimelineId = cropId;
  const body = document.getElementById('kh-workspace-body');
  if (body) renderCropsCenter(body);
}

function jumpToCenterForCrop(centerId, cropId) {
  activeCropTimelineId = cropId;
  selectKnowledgeCenter(centerId, true);
}

// ----------------------------------------------------
// 2. DISEASE & PEST IDENTIFICATION CENTER
// ----------------------------------------------------
function renderDiseasesCenter(container) {
  const diseases = guidesData.diseases || [];

  container.innerHTML = `
    <!-- Disease Library Grid -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #134e2f;">
          <i class="fa-solid fa-book-medical"></i> প্রধান ফসলের রোগ ও বালাই বাতায়ন:
        </h3>
        <input type="text" id="kh-disease-filter" placeholder="রোগের নাম দিয়ে খুঁজুন..." oninput="filterDiseasesCatalog()" style="padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 20px; font-size: 0.9rem; outline: none;">
      </div>

      <div class="cards-grid" id="kh-diseases-grid">
        ${diseases.slice(0, 6).map(d => renderDiseaseCardHTML(d)).join('')}
      </div>
    </div>
  `;
}

function renderDiseaseCardHTML(d) {
  const safeData = encodeURIComponent(JSON.stringify(d));
  return `
    <div class="kh-disease-card" style="display:flex;flex-direction:column;cursor:pointer;" onclick="openDiseaseDetail('${safeData}')">
      <div style="height: 180px; overflow: hidden; position: relative;">
        <img src="${d.image || 'https://images.unsplash.com/photo-1599818816941-7647fb3ea8d4?w=600'}" alt="${d.name_bn || d.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1599818816941-7647fb3ea8d4?w=600'">
        <span style="position: absolute; top: 10px; right: 10px; background: rgba(220,38,38,0.9); color: white; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">
          ${d.crop_bn || d.crop || 'ফসল'}
        </span>
      </div>
      <div style="padding: 18px; display: flex; flex-direction: column; flex-grow: 1;">
        <h4 style="font-size: 1.15rem; color: #991b1b; margin-bottom: 4px;">${d.name_bn || d.name}</h4>
        <div style="font-size: 0.8rem; color: #64748b; font-style: italic; margin-bottom: 8px;">রোগজীবাণু: ${d.pathogen || 'ছত্রাক / ব্যাকটেরিয়া'}</div>
        <p style="font-size: 0.88rem; color: #334155; margin-bottom: 12px; line-height: 1.5;">
          <strong>লক্ষণ:</strong> ${d.symptoms_bn || d.symptoms || ''}
        </p>
        <div style="background: #f0fdf4; border-left: 3px solid #16a34a; padding: 8px 12px; border-radius: 4px; font-size: 0.82rem; color: #166534; margin-bottom: 10px;">
          <strong>দমন:</strong> ${d.chemical_control_bn || d.treatment || 'অনুমোদিত বালাইনাশক স্প্রে করুন।'}
        </div>
        <div style="margin-top: auto; padding-top: 10px; border-top: 1px dashed #e2e8f0; font-size: 0.8rem; color: #64748b;">
          <i class="fa-solid fa-clock-rotate-left"></i> নিরাপদ অপেক্ষাকাল: <strong style="color: #dc2626;">${d.safety_interval || '৭-১০ দিন'}</strong>
        </div>
      </div>
    </div>
  `;
}

function openDiseaseDetail(encodedData) {
  // Save encoded data for re-render on language change
  window.currentOpenDiseaseData = encodedData;

  const d = JSON.parse(decodeURIComponent(encodedData));
  const isBn = (localStorage.getItem('language') || 'en') === 'bn';

  const catalogView = document.getElementById('catalog-browser-view');
  const detailView = document.getElementById('detail-view');
  const contentArea = document.getElementById('detail-content-area');
  const breadcrumb = document.getElementById('detail-breadcrumb');

  if (catalogView) catalogView.style.display = 'none';
  if (detailView) detailView.style.display = 'block';

  // Bilingual breadcrumb
  const hubLabel = isBn ? 'জ্ঞান কেন্দ্র' : 'Knowledge Hub';
  const diseaseLabel = isBn ? 'রোগ' : 'Disease';
  const diseaseName = isBn ? (d.name_bn || d.name) : (d.name || d.name_bn);
  if (breadcrumb) breadcrumb.innerHTML = `Home > ${hubLabel} > ${diseaseLabel} > ${diseaseName}`;

  // Bilingual labels
  const labels = {
    cropLabel:     isBn ? (d.crop_bn || d.crop || 'ফসল') : (d.crop || d.crop_bn || 'Crop'),
    nameLabel:     isBn ? (d.name_bn || d.name) : (d.name || d.name_bn),
    pathogenLabel: isBn ? 'রোগজীবাণু:' : 'Pathogen:',
    pathogen:      d.pathogen || (isBn ? 'ছত্রাক / ব্যাকটেরিয়া' : 'Fungus / Bacteria'),

    sym_title:     isBn ? '🔴 লক্ষণ ও কারণ' : '🔴 Symptoms & Cause',
    sym_text:      isBn ? (d.symptoms_bn || d.symptoms || 'তথ্য পাওয়া যাচ্ছে না।')
                        : (d.symptoms || d.symptoms_bn || 'Information not available.'),

    chem_title:    isBn ? '🟢 রাসায়নিক নিয়ন্ত্রণ' : '🟢 Chemical Control',
    chem_text:     isBn ? (d.chemical_control_bn || d.treatment || 'অনুমোদিত বালাইনাশক ব্যবহার করুন।')
                        : (d.treatment || d.chemical_control_bn || 'Use approved pesticides.'),

    org_title:     isBn ? '🟡 জৈব প্রতিকার' : '🟡 Organic Remedy',
    org_text:      isBn ? (d.organic_control_bn || 'ট্রাইকোডার্মা ভিরিডি, নিম খৈল ও বায়োফাঙ্গিসাইড ব্যবহার করুন।')
                        : (d.organic_control || 'Use Trichoderma viride, neem cake, and biofungicides.'),

    safe_title:    isBn ? '🔵 সতর্কতা ও অপেক্ষাকাল' : '🔵 Safety & Waiting Period',
    safe_text1:    isBn ? 'নিরাপদ অপেক্ষাকাল:' : 'Safe waiting period:',
    interval:      d.safety_interval || (isBn ? '৭-১০ দিন' : '7-10 days'),
    safe_text2:    isBn ? 'স্প্রে করার সময় PPE (মাস্ক, গ্লাভস) পরিধান করুন।'
                        : 'Wear PPE (mask, gloves) while spraying.',

    helpline_text: isBn ? '📞 কৃষি হেল্পলাইন: 16123 — বিশেষজ্ঞ পরামর্শের জন্য যোগাযোগ করুন'
                        : '📞 Agri Helpline: 16123 — Contact for expert agricultural advice',
  };

  if (contentArea) {
    contentArea.innerHTML = `
      <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <div style="position:relative;height:280px;overflow:hidden;">
          <img src="${d.image || 'https://images.unsplash.com/photo-1599818816941-7647fb3ea8d4?w=800'}" alt="${labels.nameLabel}" style="width:100%;height:100%;object-fit:cover;">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7),transparent);"></div>
          <div style="position:absolute;bottom:20px;left:24px;">
            <span style="background:rgba(220,38,38,0.9);color:#fff;padding:4px 12px;border-radius:12px;font-size:0.8rem;font-weight:700;">${labels.cropLabel}</span>
            <h2 style="color:#fff;font-size:1.8rem;font-weight:800;margin-top:6px;">${labels.nameLabel}</h2>
            <p style="color:rgba(255,255,255,0.8);font-size:0.9rem;">${labels.pathogenLabel} ${labels.pathogen}</p>
          </div>
        </div>
        <div style="padding:28px;display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div style="background:#fef2f2;border-left:4px solid #dc2626;border-radius:10px;padding:18px;">
            <h4 style="color:#991b1b;margin-bottom:10px;font-size:1rem;">${labels.sym_title}</h4>
            <p style="color:#450a0a;font-size:0.92rem;line-height:1.7;">${labels.sym_text}</p>
          </div>
          <div style="background:#f0fdf4;border-left:4px solid #16a34a;border-radius:10px;padding:18px;">
            <h4 style="color:#14532d;margin-bottom:10px;font-size:1rem;">${labels.chem_title}</h4>
            <p style="color:#052e16;font-size:0.92rem;line-height:1.7;">${labels.chem_text}</p>
          </div>
          <div style="background:#fffbeb;border-left:4px solid #d97706;border-radius:10px;padding:18px;">
            <h4 style="color:#92400e;margin-bottom:10px;font-size:1rem;">${labels.org_title}</h4>
            <p style="color:#451a03;font-size:0.92rem;line-height:1.7;">${labels.org_text}</p>
          </div>
          <div style="background:#eff6ff;border-left:4px solid #3b82f6;border-radius:10px;padding:18px;">
            <h4 style="color:#1e40af;margin-bottom:10px;font-size:1rem;">${labels.safe_title}</h4>
            <p style="color:#1e3a8a;font-size:0.92rem;line-height:1.7;">
              ${labels.safe_text1} <strong>${labels.interval}</strong><br>${labels.safe_text2}
            </p>
          </div>
        </div>
        <div style="padding:0 28px 28px;">
          <div style="background:#f1f5f9;border-radius:10px;padding:16px;text-align:center;font-size:0.95rem;font-weight:600;color:#1b4332;">
            ${labels.helpline_text}
          </div>
        </div>
      </div>
    `;
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
}
window.openDiseaseDetail = openDiseaseDetail;

function filterDiseasesCatalog() {
  const query = (document.getElementById('kh-disease-filter')?.value || '').toLowerCase().trim();
  const diseases = guidesData.diseases || [];
  const container = document.getElementById('kh-diseases-grid');
  if (!container) return;

  const filtered = diseases.filter(d => {
    if (!query) return true;
    const name = (d.name_bn || d.name || '').toLowerCase();
    const crop = (d.crop_bn || d.crop || '').toLowerCase();
    const sym = (d.symptoms_bn || d.symptoms || '').toLowerCase();
    return name.includes(query) || crop.includes(query) || sym.includes(query);
  });

  container.innerHTML = filtered.map(d => renderDiseaseCardHTML(d)).join('');
}

// ----------------------------------------------------
// 3. FERTILIZER, SEED & INPUTS GUIDE CENTER
// ----------------------------------------------------
function renderInputsCenter(container) {
  const inputGuides = guidesData.inputs || [];

  container.innerHTML = `
    <!-- Interactive Fertilizer Calculator -->
    <div class="kh-calc-panel">
      <div style="margin-bottom: 18px;">
        <h3 style="font-size: 1.35rem; font-weight: 700; color: #134e2f; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-calculator"></i> ফসল ও জমি অনুযায়ী বিঘাপ্রতি সুষম সার ক্যালকুলেটর
        </h3>
        <p style="color: #64748b; font-size: 0.92rem; margin-top: 4px;">
          আপনার ফসলের ধরন ও জমির পরিমাণ দিলে সুষম সারের সঠিক কেজি ও প্রয়োগ সময় জানিয়ে দেওয়া হবে।
        </p>
      </div>

      <div class="kh-calc-inputs">
        <div class="kh-calc-group">
          <label>ফসল নির্বাচন করুন:</label>
          <select id="calc-crop" onchange="calculateFertilizerRates()">
            <option value="rice">ধান (বোরো / আমন)</option>
            <option value="wheat">গম (Wheat)</option>
            <option value="potato">আলু (Potato)</option>
            <option value="tomato">টমেটো (Tomato)</option>
            <option value="mustard">সরিষা (Mustard)</option>
            <option value="jute">পাট (Jute)</option>
            <option value="eggplant">বেগুন (Brinjal)</option>
            <option value="maize">ভুট্টা (Maize)</option>
            <option value="chilli">মরিচ (Chilli)</option>
          </select>
        </div>

        <div class="kh-calc-group">
          <label>জমির একক:</label>
          <select id="calc-unit" onchange="calculateFertilizerRates()">
            <option value="bigha">বিঘা (৩৩ শতক)</option>
            <option value="shotangsho">শতক / ডেসিমাল</option>
            <option value="acre">একর (১০০ শতক)</option>
          </select>
        </div>

        <div class="kh-calc-group">
          <label>জমির পরিমাণ:</label>
          <input type="number" id="calc-area" value="1" min="0.1" step="0.5" oninput="calculateFertilizerRates()">
        </div>
      </div>

      <div class="kh-calc-results" id="calc-results-area">
        <!-- Live populated by calculateFertilizerRates() -->
      </div>
    </div>

    <!-- Soil Health & Inputs Guide -->
    <div style="margin-top: 30px;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #134e2f; margin-bottom: 14px;">
        <i class="fa-solid fa-flask"></i> অনুমোদিত কৃষি উপকরণ ও মাটির স্বাস্থ্য গাইড:
      </h3>
      <div class="treatment-grid">
        <div class="chemical-box">
          <h5><i class="fa-solid fa-check-double"></i> মাটির pH ও স্বাস্থ্য রক্ষা</h5>
          <p style="font-size: 0.9rem; color: #334155; line-height: 1.55;">
            বেশিরভাগ ফসলের আদর্শ pH মান ৬.০ থেকে ৭.০। মাটি অতিরিক্ত অম্লীয় (pH < ৫.৫) হলে বিঘাপ্রতি ৪০-৫০ কেজি ডলোচুন প্রয়োগ করুন।
          </p>
        </div>
        <div class="organic-box">
          <h5><i class="fa-solid fa-recycle"></i> জৈব সার ও কেঁচো সার (ভার্মিকম্পোস্ট)</h5>
          <p style="font-size: 0.9rem; color: #334155; line-height: 1.55;">
            মাটির জৈব পদার্থ কমপক্ষে ২% রাখতে প্রতি ফসলে বিঘা প্রতি ৩০০-৫০০ কেজি পচা গোবর বা ১৫০-২০০ কেজি ভার্মিকম্পোস্ট শেষ চাষে মিশিয়ে দিন।
          </p>
        </div>
        <div class="chemical-box">
          <h5><i class="fa-solid fa-seedling"></i> উন্নত জাতের প্রত্যায়িত বীজ</h5>
          <p style="font-size: 0.9rem; color: #334155; line-height: 1.55;">
            BADC বা অনুমোদিত বীজ ডিলারের সিলমোহরযুক্ত বীজ ব্যবহার করুন। বীজ বপনের পূর্বে কার্বেন্ডাজিম ২ গ্রাম/কেজি হারে মিশিয়ে শোধন করুন।
          </p>
        </div>
      </div>
    </div>
  `;

  calculateFertilizerRates();
}

function calculateFertilizerRates() {
  const crop = document.getElementById('calc-crop')?.value || 'rice';
  const unit = document.getElementById('calc-unit')?.value || 'bigha';
  const area = parseFloat(document.getElementById('calc-area')?.value || '1') || 1;
  const resultArea = document.getElementById('calc-results-area');
  if (!resultArea) return;

  // Factor to convert to bigha (33 decimals)
  let bighaFactor = 1;
  if (unit === 'shotangsho') bighaFactor = area / 33;
  else if (unit === 'acre') bighaFactor = (area * 100) / 33;
  else bighaFactor = area;

  // Base rates per bigha (33 decimals)
  const baseRates = {
    rice: { urea: 35, tsp: 15, mop: 18, gypsum: 12, zinc: 1.5, boron: 1.2, organic: 400 },
    wheat: { urea: 26, tsp: 20, mop: 14, gypsum: 10, zinc: 1.5, boron: 1.0, organic: 350 },
    potato: { urea: 45, tsp: 30, mop: 35, gypsum: 15, zinc: 2.0, boron: 1.5, organic: 500 },
    tomato: { urea: 38, tsp: 28, mop: 30, gypsum: 12, zinc: 1.8, boron: 1.5, organic: 450 },
    mustard: { urea: 22, tsp: 18, mop: 12, gypsum: 15, zinc: 1.2, boron: 1.5, organic: 300 },
    jute: { urea: 25, tsp: 10, mop: 15, gypsum: 8, zinc: 1.0, boron: 0.5, organic: 300 },
    eggplant: { urea: 40, tsp: 30, mop: 25, gypsum: 14, zinc: 2.0, boron: 1.5, organic: 450 },
    maize: { urea: 45, tsp: 25, mop: 20, gypsum: 15, zinc: 2.5, boron: 1.5, organic: 450 },
    chilli: { urea: 32, tsp: 24, mop: 22, gypsum: 10, zinc: 1.5, boron: 1.2, organic: 400 }
  };

  const rates = baseRates[crop] || baseRates.rice;

  const ureaKg = (rates.urea * bighaFactor).toFixed(1);
  const tspKg = (rates.tsp * bighaFactor).toFixed(1);
  const mopKg = (rates.mop * bighaFactor).toFixed(1);
  const gypKg = (rates.gypsum * bighaFactor).toFixed(1);
  const zincKg = (rates.zinc * bighaFactor).toFixed(1);
  const boronKg = (rates.boron * bighaFactor).toFixed(1);
  const orgKg = (rates.organic * bighaFactor).toFixed(0);

  resultArea.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #bbf7d0; padding-bottom: 8px; margin-bottom: 12px;">
      <h4 style="color: #15803d; font-size: 1.1rem; margin: 0;">
        <i class="fa-solid fa-scale-balanced"></i> মোট প্রয়োজনীয় সার (${area} ${unit === 'bigha' ? 'বিঘা' : (unit === 'acre' ? 'একর' : 'শতক')} জমির জন্য):
      </h4>
      <span style="font-size: 0.85rem; color: #166534; font-weight: 600;">সুষম প্রয়োগ বিধি</span>
    </div>

    <div class="kh-nutrient-grid">
      <div class="kh-nutrient-badge">
        <div class="num">${ureaKg} <span style="font-size: 0.9rem;">কেজি</span></div>
        <div class="lbl">ইউরিয়া (Urea)</div>
      </div>
      <div class="kh-nutrient-badge">
        <div class="num">${tspKg} <span style="font-size: 0.9rem;">কেজি</span></div>
        <div class="lbl">টিএসপি / ডিএপি</div>
      </div>
      <div class="kh-nutrient-badge">
        <div class="num">${mopKg} <span style="font-size: 0.9rem;">কেজি</span></div>
        <div class="lbl">এমওপি (পটাশ)</div>
      </div>
      <div class="kh-nutrient-badge">
        <div class="num">${gypKg} <span style="font-size: 0.9rem;">কেজি</span></div>
        <div class="lbl">জিপসাম</div>
      </div>
      <div class="kh-nutrient-badge">
        <div class="num">${zincKg} <span style="font-size: 0.9rem;">কেজি</span></div>
        <div class="lbl">দস্তা (Zinc)</div>
      </div>
      <div class="kh-nutrient-badge">
        <div class="num">${boronKg} <span style="font-size: 0.9rem;">কেজি</span></div>
        <div class="lbl">বোরন (Boron)</div>
      </div>
      <div class="kh-nutrient-badge" style="background: #fffbeb; border-color: #fde68a;">
        <div class="num" style="color: #d97706;">${orgKg} <span style="font-size: 0.9rem;">কেজি</span></div>
        <div class="lbl" style="color: #92400e;">গোবর / জৈব সার</div>
      </div>
    </div>

    <div style="margin-top: 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; font-size: 0.9rem; line-height: 1.6; color: #334155;">
      <strong><i class="fa-solid fa-list-check" style="color: #1b5f43;"></i> সার প্রয়োগের নিয়মাবলী:</strong>
      <ul style="margin-left: 20px; margin-top: 6px;">
        <li>শেষ চাষের সময় সম্পূর্ণ টিএসপি, জিপসাম, দস্তা, বোরন এবং গোবর সার মাটির সাথে ভালোভাবে মিশিয়ে দিন।</li>
        <li>ইউরিয়া ও পটাশ সার সমান ৩ কিস্তিতে দিন: চারা রোপণের ১৫-২০ দিন পর ১ম কিস্তি, ৩৫-৪০ দিন পর ২য় কিস্তি এবং কাইচথোড় আসার সময় ৩য় কিস্তি।</li>
      </ul>
    </div>
  `;
}

// ----------------------------------------------------
// 4. SEASONAL ADVISORY & DISASTER PREPAREDNESS CENTER
// ----------------------------------------------------
function renderSeasonalCenter(container) {
  const seasons = guidesData.seasonal || [];

  container.innerHTML = `
    <!-- Season Tabs -->
    <div style="display: flex; gap: 8px; margin-bottom: 22px; flex-wrap: wrap;">
      <button class="kh-pill-btn ${activeSeasonalTab === 'kharif1' ? 'active' : ''}" onclick="switchSeasonTab('kharif1')">
        <i class="fa-solid fa-sun"></i> খরিফ-১ মৌসুম (মার্চ - মে)
      </button>
      <button class="kh-pill-btn ${activeSeasonalTab === 'kharif2' ? 'active' : ''}" onclick="switchSeasonTab('kharif2')">
        <i class="fa-solid fa-cloud-showers-heavy"></i> খরিফ-২ মৌসুম (জুন - অক্টোবর)
      </button>
      <button class="kh-pill-btn ${activeSeasonalTab === 'rabi' ? 'active' : ''}" onclick="switchSeasonTab('rabi')">
        <i class="fa-solid fa-snowflake"></i> রবি মৌসুম (নভেম্বর - ফেব্রুয়ারি)
      </button>
    </div>

    <div id="kh-season-content-area">
      <!-- Populated by switchSeasonTab -->
    </div>

    <!-- Disaster & Climate Resilience Section -->
    <div style="margin-top: 35px;">
      <h3 style="font-size: 1.3rem; font-weight: 700; color: #134e2f; margin-bottom: 15px;">
        <i class="fa-solid fa-shield-virus"></i> বন্যা, খরা ও প্রতিকূল আবহাওয়ার প্রস্তুতি ও ব্যবস্থাপনা:
      </h3>
      <div class="treatment-grid">
        <div class="kh-season-card" style="border-left: 4px solid #0284c7;">
          <h4 style="color: #0369a1; font-size: 1.1rem; margin-bottom: 8px;">
            <i class="fa-solid fa-water"></i> বন্যা ও অতিবৃষ্টি মোকাবিলা
          </h4>
          <p style="font-size: 0.9rem; color: #334155; line-height: 1.6;">
            বন্যাপ্রবণ এলাকায় ভাসমান বীজতলা তৈরি করুন। পানি নিষ্কাশনের ড্রেন সার্বক্ষণিক পরিষ্কার রাখুন। বন্যা সহনশীল ধান (ব্রি ধান৫১, ব্রি ধান৫২) রোপণ করুন। পানি নেমে গেলে দ্রুত ইউরিয়া ও পটাশ উপরিপ্রয়োগ করুন।
          </p>
        </div>

        <div class="kh-season-card" style="border-left: 4px solid #ea580c;">
          <h4 style="color: #c2410c; font-size: 1.1rem; margin-bottom: 8px;">
            <i class="fa-solid fa-temperature-arrow-up"></i> খরা ও তীব্র তাপদাহ প্রস্তুতি
          </h4>
          <p style="font-size: 0.9rem; color: #334155; line-height: 1.6;">
            পানি সাশ্রয়ী এডব্লিউডি (AWD) পর্যায়ক্রমিক সেচ পদ্ধতি ব্যবহার করুন। সবজি ক্ষেতে খড় বা পলিথিন মালচিং ব্যবহার করে মাটির আর্দ্রতা ধরে রাখুন। খরা সহনশীল জাত (ব্রি ধান৫৬, ব্রি ধান৭১) চাষ করুন।
          </p>
        </div>

        <div class="kh-season-card" style="border-left: 4px solid #7c3aed;">
          <h4 style="color: #6d28d9; font-size: 1.1rem; margin-bottom: 8px;">
            <i class="fa-solid fa-smog"></i> ঘন কুয়াশা ও শৈত্যপ্রবাহ ব্যবস্থাপনা
          </h4>
          <p style="font-size: 0.9rem; color: #334155; line-height: 1.6;">
            বোরো বীজতলা রাতে স্বচ্ছ পলিথিন দিয়ে ঢেকে রাখুন এবং সকালে তুলে দিন। আলুর লেট ব্লাইট রোগ প্রতিরোধে ম্যানকোজেব স্প্রে করুন। সন্ধ্যায় ক্ষেতের চারপাশে ধোঁয়া তৈরি করে তাপমাত্রা বৃদ্ধি করুন।
          </p>
        </div>
      </div>
    </div>
  `;

  switchSeasonTab(activeSeasonalTab);
}

function switchSeasonTab(tabId) {
  activeSeasonalTab = tabId;
  const area = document.getElementById('kh-season-content-area');
  if (!area) return;

  document.querySelectorAll('#kh-workspace-body .kh-pill-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[onclick="switchSeasonTab('${tabId}')"]`);
  if (btn) btn.classList.add('active');

  const seasonsData = {
    kharif1: {
      name: 'খরিফ-১ মৌসুম (গ্রীষ্মকাল)',
      period: 'ফাল্গুন - জ্যৈষ্ঠ (মার্চ - মে)',
      crops: 'আউশ ধান, পাট, গ্রীষ্মকালীন টমেটো, ঢ্যাঁড়শ, ডাটা, চিচিঙ্গা, চালকুমড়া, তরমুজ।',
      tips: 'গ্রীষ্মের শুরুতে জমিতে গভীর চাষ দিয়ে আর্দ্রতা সংরক্ষণ করুন। আগাম কালবৈশাখীর হাত থেকে রক্ষা পেতে ড্রেন প্রস্তুত রাখুন।'
    },
    kharif2: {
      name: 'খরিফ-২ মৌসুম (বর্ষাকাল)',
      period: 'আষাঢ় - কার্তিক (জুন - অক্টোবর)',
      crops: 'রোপা আমন ধান, নাবি পাট, পান, বেগুন, কলা, বিভিন্ন ধরনের শাক।',
      tips: 'উন্নত জাতের চারা ২৫-৩০ দিনের মধ্যে রোপণ শেষ করুন। জমিতে যেন অতিরিক্ত পানি জমে না থাকে সেদিকে খেয়াল রাখুন।'
    },
    rabi: {
      name: 'রবি মৌসুম (শীতকাল)',
      period: 'অগ্রহায়ণ - ফাল্গুন (নভেম্বর - ফেব্রুয়ারি)',
      crops: 'বোরো ধান, গম, ভুট্টা, আলু, সরিষা, পেঁয়াজ, রসুন, ডাল ফসল (মসুর, খেসারি, ছোলা)।',
      tips: 'বাংলাদেশের প্রধান ফসল উৎপাদন মৌসুম। সময়মতো বীজ বপন এবং প্রয়োজন অনুযায়ী সঠিক সেচ প্রদান করুন।'
    }
  };

  const s = seasonsData[tabId] || seasonsData.kharif1;

  area.innerHTML = `
    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 22px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 14px;">
        <h4 style="color: #134e2f; font-size: 1.25rem; font-weight: 700;">${s.name}</h4>
        <span style="background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 15px; font-weight: 600; font-size: 0.85rem;">
          ${s.period}
        </span>
      </div>
      <div style="margin-bottom: 12px;">
        <strong style="color: #1e293b;"><i class="fa-solid fa-seedling" style="color: #16a34a;"></i> উপযুক্ত ফসলসমূহ:</strong>
        <p style="color: #334155; margin-top: 4px; font-size: 0.95rem;">${s.crops}</p>
      </div>
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #166534;"><i class="fa-solid fa-lightbulb"></i> মৌসুমী পরামর্শ:</strong>
        <p style="color: #14532d; font-size: 0.92rem; margin-top: 4px; line-height: 1.55;">${s.tips}</p>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// 5. CROP CALENDAR & TASK SCHEDULER CENTER
// ----------------------------------------------------
function renderCalendarCenter(container) {
  const calendarData = [
    { crop: 'বোরো ধান', sow: 'নভেম্বর - ডিসেম্বর', plant: 'ডিসেম্বর - জানুয়ারি', care: 'জানুয়ারি - মার্চ', harvest: 'এপ্রিল - মে' },
    { crop: 'রোপা আমন', sow: 'জুন - জুলাই', plant: 'জুলাই - আগস্ট', care: 'আগস্ট - অক্টোবর', harvest: 'নভেম্বর - ডিসেম্বর' },
    { crop: 'আউশ ধান', sow: 'মার্চ - এপ্রিল', plant: 'এপ্রিল - মে', care: 'মে - জুন', harvest: 'জুলাই - আগস্ট' },
    { crop: 'গম', sow: 'নভেম্বর ১৫ - ৩০', plant: 'সরাসরি বপন', care: 'ডিসেম্বর - ফেব্রুয়ারি', harvest: 'মার্চ - এপ্রিল' },
    { crop: 'আলু', sow: 'অক্টোবর - নভেম্বর', plant: 'নভেম্বর', care: 'নভেম্বর - জানুয়ারি', harvest: 'জানুয়ারি - ফেব্রুয়ারি' },
    { crop: 'টমেটো', sow: 'আগস্ট - সেপ্টেম্বর', plant: 'অক্টোবর - নভেম্বর', care: 'নভেম্বর - জানুয়ারি', harvest: 'জানুয়ারি - মার্চ' },
    { crop: 'সরিষা', sow: 'অক্টোবর - নভেম্বর', plant: 'সরাসরি বপন', care: 'নভেম্বর - ডিসেম্বর', harvest: 'জানুয়ারি - ফেব্রুয়ারি' },
    { crop: 'তোষা পাট', sow: 'মার্চ - এপ্রিল', plant: 'সরাসরি বপন', care: 'মে - জুন', harvest: 'জুলাই - আগস্ট' }
  ];

  const rowsHTML = calendarData.map(c => `
    <tr>
      <td style="font-weight: 700; color: #1e293b;">${c.crop}</td>
      <td><span class="kh-stage-bar kh-stage-sow">${c.sow}</span></td>
      <td><span class="kh-stage-bar kh-stage-grow">${c.plant}</span></td>
      <td><span style="font-size: 0.85rem; color: #475569;">${c.care}</span></td>
      <td><span class="kh-stage-bar kh-stage-harvest">${c.harvest}</span></td>
      <td>
        <button class="btn btn-outline" style="padding: 4px 10px; font-size: 0.78rem;" onclick="syncCalendarToFarmTasks('${c.crop}')">
          <i class="fa-solid fa-plus"></i> টাস্ক যোগ করুন
        </button>
      </td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <div>
        <h3 style="font-size: 1.35rem; font-weight: 700; color: #134e2f;">
          <i class="fa-solid fa-calendar-days"></i> বার্ষিক ফসল ক্যালেন্ডার ও কাজের সময়সূচি
        </h3>
        <p style="color: #64748b; font-size: 0.95rem;">
          ফসল অনুযায়ী কখন কোন কাজ করবেন তার সুনির্দিষ্ট কর্মপরিকল্পনা।
        </p>
      </div>
      <div id="calendar-sync-notice" style="display: none; background: #dcfce7; color: #15803d; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
        <i class="fa-solid fa-check"></i> খামারের কাজের তালিকায় যুক্ত হয়েছে!
      </div>
    </div>

    <!-- Color Legend -->
    <div style="display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; font-size: 0.85rem;">
      <span><span class="kh-stage-bar kh-stage-sow" style="padding: 2px 8px;">নীল</span> বীজ বপনের সময়</span>
      <span><span class="kh-stage-bar kh-stage-grow" style="padding: 2px 8px;">সবুজ</span> চারা রোপণ ও সেচ</span>
      <span><span class="kh-stage-bar kh-stage-harvest" style="padding: 2px 8px;">হলুদ/কমলা</span> ফসল সংগ্রহ</span>
    </div>

    <div class="kh-calendar-table-wrap">
      <table class="kh-calendar-table">
        <thead>
          <tr>
            <th>ফসলের নাম</th>
            <th>বীজ বপন</th>
            <th>চারা রোপণ</th>
            <th>সার ও সেচ পরিচর্যা</th>
            <th>ফসল সংগ্রহ</th>
            <th>খামার শিডিউলে যুক্ত</th>
          </tr>
        </thead>
        <tbody>${rowsHTML}</tbody>
      </table>
    </div>
  `;
}

function syncCalendarToFarmTasks(cropName) {
  const notice = document.getElementById('calendar-sync-notice');
  if (notice) {
    notice.style.display = 'inline-block';
    notice.innerText = `${cropName} সফলভাবে খামার ড্যাশবোর্ডের শিডিউলে যুক্ত হয়েছে!`;
    setTimeout(() => { notice.style.display = 'none'; }, 3500);
  }
}

// ----------------------------------------------------
// SEARCH & CLEAR CONTROLS
// ----------------------------------------------------
function searchKnowledgeHub() {
  const input = document.getElementById('guide-search-input');
  const clearBtn = document.getElementById('kh-search-clear');
  const query = (input?.value || '').trim();

  if (clearBtn) {
    clearBtn.style.display = query ? 'flex' : 'none';
  }

  renderKnowledgeCenters(query);

  // If query is detailed, also filter active workspace
  if (activeKnowledgeCenterId === 'center-diseases') {
    const diseaseInput = document.getElementById('kh-disease-filter');
    if (diseaseInput) {
      diseaseInput.value = query;
      filterDiseasesCatalog();
    }
  }
}

function clearKnowledgeSearch() {
  const input = document.getElementById('guide-search-input');
  const clearBtn = document.getElementById('kh-search-clear');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  renderKnowledgeCenters('');
}

function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const cropParam = urlParams.get('crop');
  const tabParam = urlParams.get('tab');
  
  if (tabParam && ['crops', 'diseases', 'fertilizers', 'pesticides'].includes(tabParam)) {
    switchTab(tabParam, false);
  }
  
  if (cropParam) {
    openCropDetail(cropParam, tabParam || 'diseases', false);
  }
}

function formatLocalizedText(text) {
  if (!text || typeof text !== 'string') return text || '';
  const isBn = (localStorage.getItem('language') || 'en') === 'bn';
  if (text.includes('/')) {
    const parts = text.split('/');
    return isBn ? parts[1].trim() : parts[0].trim();
  }
  return window.translateText ? window.translateText(text) : text;
}

function renderGuides(filterQuery = '') {
  const grid = document.getElementById('guides-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const query = filterQuery.toLowerCase();
  const t = window.translateText || (x => x);
  const isBn = (localStorage.getItem('language') || 'en') === 'bn';

  if (activeTab === 'crops') {
    const currentList = guidesData.crops || [];
    const filtered = currentList.filter(item => {
      const name = formatLocalizedText(item.name);
      const desc = formatLocalizedText(item.description);
      const scName = item.scientificName || '';
      return (
        !query ||
        name.toLowerCase().includes(query) ||
        scName.toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      const emptyText = isBn ? 'আপনার অনুসন্ধানের সাথে কোনো ক্যাটালগ নির্দেশিকা মিলেনি।' : 'No advisory records match your query.';
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${emptyText}</div>`;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'guide-card glass clickable-card';
      card.onclick = () => openCropDetail(item.id, 'crops');

      const cropName = formatLocalizedText(item.name);
      const cropType = formatLocalizedText(item.type);
      const typeText = isBn ? `${cropType} নির্দেশিকা` : `${cropType} Guide`;

      const sowingRateLabel = isBn ? 'বীজের হার:' : 'Sowing Rate:';
      const sowingDepthLabel = isBn ? 'বীজ গভীরতা:' : 'Sowing Depth:';
      const spacingLabel = isBn ? 'চারার দূরত্ব:' : 'Spacing:';
      const varietiesLabel = isBn ? 'অনুমোদিত জাতসমূহ:' : 'Varieties:';
      const soilPhLabel = isBn ? 'মাটির pH:' : 'Soil pH:';
      const durationLabel = isBn ? 'মেয়াদ:' : 'Duration:';
      const btnText = isBn ? 'বিস্তারিত চাষাবাদ ও বীজ নির্দেশিকা' : 'Detailed Cultivation Guide';

      card.innerHTML = `
        <div class="card-type"><i class="fa-solid fa-seedling"></i> ${typeText}</div>
        <h3>${cropName}</h3>
        <div class="sub-tag">${item.scientificName}</div>
        <p class="desc">${formatLocalizedText(item.description)}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${sowingRateLabel}</span><span class="value">${formatLocalizedText(item.seedInfo.rate)}</span></div>
          <div class="detail-row"><span class="label">${sowingDepthLabel}</span><span class="value">${formatLocalizedText(item.seedInfo.depth)}</span></div>
          <div class="detail-row"><span class="label">${spacingLabel}</span><span class="value">${formatLocalizedText(item.seedInfo.spacing)}</span></div>
          <div class="detail-row"><span class="label">${varietiesLabel}</span><span class="value" style="font-size: 0.85rem;">${formatLocalizedText(item.seedInfo.popularVarieties)}</span></div>
          <div class="detail-row"><span class="label">${soilPhLabel}</span><span class="value">${item.optimalPH}</span></div>
          <div class="detail-row"><span class="label">${durationLabel}</span><span class="value">${formatLocalizedText(item.growthDuration)}</span></div>
        </div>
        <button class="btn btn-primary" style="margin-top: auto; width: 100%; justify-content: center; border-radius: 12px;" onclick="event.stopPropagation(); openCropDetail('${item.id}', 'crops');">
          <i class="fa-solid fa-book-open"></i> ${btnText} →
        </button>
      `;
      grid.appendChild(card);
    });
  }
  else if (activeTab === 'diseases') {
    const allCrops = guidesData.crops || [];

    const filteredCrops = allCrops.filter(crop => {
      const cropDiseases = getDiseasesForCrop(crop.id);
      const cropName = formatLocalizedText(crop.name);
      return (
        !query ||
        cropName.toLowerCase().includes(query) ||
        (crop.scientificName && crop.scientificName.toLowerCase().includes(query)) ||
        cropDiseases.some(d => {
          const dName = formatLocalizedText(d.name);
          const dSymp = formatLocalizedText(d.easySymptoms || d.symptoms);
          const dTreat = formatLocalizedText(d.treatment);
          return dName.toLowerCase().includes(query) || dSymp.toLowerCase().includes(query) || dTreat.toLowerCase().includes(query);
        })
      );
    });

    if (filteredCrops.length === 0) {
      const emptyText = isBn ? 'আপনার অনুসন্ধানের সাথে কোনো উদ্ভিদ রোগ রেকর্ড মিলেনি।' : 'No crop disease records match your query.';
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${emptyText}</div>`;
      return;
    }

    filteredCrops.forEach(crop => {
      const cropDiseases = getDiseasesForCrop(crop.id);
      const card = document.createElement('div');
      card.className = 'guide-card glass clickable-card crop-disease-summary-card';
      card.onclick = () => openCropDetail(crop.id, 'diseases');

      const cropName = formatLocalizedText(crop.name);
      const headerTitle = isBn ? 'উদ্ভিদ রোগ লাইব্রেরি নির্দেশিকা' : 'Pathological Library / Disease Guide';
      const summaryLabel = isBn ? 'আক্রান্ত ও চিহ্নিত রোগসমূহ:' : 'Diagnosed Crop Diseases:';
      const registeredBadge = isBn ? 'রোগের তথ্য ও পরিচর্যা চার্ট নিবন্ধিত' : 'Disease Info & Care Chart Registered';
      const countLabel = isBn ? `${cropDiseases.length} টি রোগ নিরাময় গাইড` : `${cropDiseases.length} Disease Curing Guides`;
      const diagnosedLabel = isBn ? 'নির্ণয়কৃত রোগসমূহ:' : 'Diagnosed Diseases:';
      const tipsLabel = isBn ? 'প্রতিরোধমূলক টিপস:' : 'Preventive Tips:';
      const tipsValue = isBn ? 'বীজ শোধন, সুষম পটাশ ও স্প্রে' : 'Seed treatment, balanced potash & spray';
      const btnText = isBn ? 'রোগের লক্ষণ ও চিকিৎসা দেখুন' : 'View Symptoms & Treatment';

      const diseaseNamesBadge = cropDiseases.slice(0, 3).map(d => {
        const dName = formatLocalizedText(d.name);
        return `<span style="background: rgba(220,38,38,0.1); color: #dc2626; padding: 3px 8px; border-radius: 10px; font-size: 0.78rem; font-weight: 600;">${dName}</span>`;
      }).join(' ');

      card.innerHTML = `
        <div class="card-type" style="color: #dc2626;"><i class="fa-solid fa-virus"></i> ${headerTitle}</div>
        <h3 style="color: #991b1b;"><i class="fa-solid fa-plant-wilt" style="margin-right: 6px;"></i> ${cropName}</h3>
        <div class="sub-tag">${crop.scientificName}</div>
        <p class="desc" style="margin-bottom: 12px;"><strong>${summaryLabel}</strong></p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">
          ${diseaseNamesBadge || `<span style="font-size: 0.85rem; color: #64748b;">${registeredBadge}</span>`}
        </div>
        <div class="card-details">
          <div class="detail-row"><span class="label">${diagnosedLabel}</span><span class="value" style="font-weight: 700; color: #dc2626;">${countLabel}</span></div>
          <div class="detail-row"><span class="label">${tipsLabel}</span><span class="value">${tipsValue}</span></div>
        </div>
        <button class="btn btn-primary" style="background: linear-gradient(135deg, #dc2626, #991b1b); margin-top: auto; width: 100%; justify-content: center; border-radius: 12px;" onclick="event.stopPropagation(); openCropDetail('${crop.id}', 'diseases');">
          <i class="fa-solid fa-notes-medical"></i> ${btnText} →
        </button>
      `;
      grid.appendChild(card);
    });
  }
  else if (activeTab === 'fertilizers') {
    const currentList = guidesData.fertilizers || [];
    const filtered = currentList.filter(item => {
      const name = formatLocalizedText(item.name);
      const purpose = formatLocalizedText(item.purpose);
      return (
        !query ||
        name.toLowerCase().includes(query) ||
        purpose.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${isBn ? 'আপনার অনুসন্ধানের সাথে কোনো সার রেকর্ড মিলেনি।' : 'No fertilizer records match your query.'}</div>`;
      return;
    }
    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'guide-card glass';
      const headerTitle = isBn ? 'মৃত্তিকা পুষ্টি ও সার' : 'Soil Nutrients & Fertilizer';
      const compLabel = isBn ? 'উপাদান:' : 'Composition:';
      const catLabel = isBn ? 'বিভাগ:' : 'Category:';
      const rateLabel = isBn ? 'প্রয়োগ হার:' : 'Rate:';
      const methodLabel = isBn ? 'প্রয়োগ পদ্ধতি:' : 'Method:';
      const targetLabel = isBn ? 'লক্ষ্যভিত্তিক ফসল:' : 'Target Crops:';

      card.innerHTML = `
        <div class="card-type" style="color: #2a6f97;"><i class="fa-solid fa-flask"></i> ${headerTitle}</div>
        <h3>${formatLocalizedText(item.name)}</h3>
        <div class="sub-tag">${compLabel} ${formatLocalizedText(item.composition)}</div>
        <p class="desc">${formatLocalizedText(item.purpose)}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${catLabel}</span><span class="value">${formatLocalizedText(item.type)}</span></div>
          <div class="detail-row"><span class="label">${rateLabel}</span><span class="value">${formatLocalizedText(item.applicationRate)}</span></div>
          <div class="detail-row"><span class="label">${methodLabel}</span><span class="value">${formatLocalizedText(item.method)}</span></div>
          <div class="detail-row"><span class="label">${targetLabel}</span><span class="value" style="font-size: 0.85rem;">${formatLocalizedText(item.targetCrops)}</span></div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  else if (activeTab === 'pesticides') {
    const currentList = guidesData.pesticides || [];
    const filtered = currentList.filter(item => {
      const name = formatLocalizedText(item.name);
      const pests = formatLocalizedText(item.targetPests);
      return (
        !query ||
        name.toLowerCase().includes(query) ||
        pests.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${isBn ? 'আপনার অনুসন্ধানের সাথে কোনো বালাইনাশক রেকর্ড মilenি।' : 'No pesticide records match your query.'}</div>`;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'guide-card glass';
      const headerTitle = isBn ? 'বালাই ব্যবস্থাপনা' : 'Pest Management';
      const activeLabel = isBn ? 'কার্যকর উপাদান:' : 'Active:';
      const effLabel = isBn ? 'কার্যকর দমন:' : 'Effective For:';
      const pestTypeLabel = isBn ? 'কীটনাশকের ধরন:' : 'Pesticide Type:';
      const dilutionLabel = isBn ? 'মিশ্রণের হার:' : 'Dilution Rate:';
      const waitLabel = isBn ? 'সংগ্রহের অপেক্ষাকাল:' : 'Harvest Wait:';
      const safetyLabel = isBn ? 'সতর্কতা:' : 'Safety:';

      card.innerHTML = `
        <div class="card-type" style="color: #e65f2b;"><i class="fa-solid fa-shield-virus"></i> ${headerTitle}</div>
        <h3>${formatLocalizedText(item.name)}</h3>
        <div class="sub-tag">${activeLabel} ${formatLocalizedText(item.activeIngredient)}</div>
        <p class="desc"><strong>${effLabel}</strong> ${formatLocalizedText(item.targetPests)}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${pestTypeLabel}</span><span class="value">${formatLocalizedText(item.type)}</span></div>
          <div class="detail-row"><span class="label">${dilutionLabel}</span><span class="value">${formatLocalizedText(item.dilutionRate)}</span></div>
          <div class="detail-row"><span class="label">${waitLabel}</span><span class="value" style="color: #c92a2a; font-weight: 600;">${formatLocalizedText(item.safetyInterval)}</span></div>
          <div class="detail-row" style="flex-direction: column; align-items: flex-start; gap: 4px; margin-top: 8px;">
            <span class="label"><i class="fa-solid fa-triangle-exclamation"></i> ${safetyLabel}</span>
            <span class="value" style="font-size: 0.85rem;">${formatLocalizedText(item.safetyInstructions)}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
}

function getDiseasesForCrop(cropId) {
  const allDiseases = guidesData.diseases || [];
  const crop = (guidesData.crops || []).find(c => c.id === cropId);
  if (!crop) return [];

  const cropTitleClean = crop.name.split('/')[0].trim().toLowerCase();

  return allDiseases.filter(d => {
    if (d.cropIds && Array.isArray(d.cropIds) && d.cropIds.includes(cropId)) return true;
    if (d.targetCrops && (d.targetCrops.toLowerCase().includes(cropTitleClean) || d.targetCrops.includes(crop.id))) return true;
    return false;
  });
}

// ----------------------------------------------------
// DEDICATED CROP & DISEASE DETAIL PAGE RENDERER
// ----------------------------------------------------
window.currentOpenCropId = null;
window.currentOpenSubTab = null;

function openCropDetail(cropId, defaultSubTab = 'diseases', updateHistory = true) {
  window.currentOpenCropId = cropId;
  window.currentOpenSubTab = defaultSubTab;

  const crop = (guidesData.crops || []).find(c => c.id === cropId);
  if (!crop) return;

  const catalogView = document.getElementById('catalog-browser-view');
  const detailView = document.getElementById('detail-view');
  const detailContent = document.getElementById('detail-content-area');
  const breadcrumb = document.getElementById('detail-breadcrumb');

  if (!detailView || !detailContent) return;

  if (catalogView) catalogView.style.display = 'none';
  detailView.style.display = 'flex';

  window.scrollTo({ top: 100, behavior: 'smooth' });

  if (updateHistory) {
    history.pushState(null, '', `?tab=${defaultSubTab}&crop=${cropId}`);
  }

  const isBn = (localStorage.getItem('language') || 'en') === 'bn';
  const cropName = formatLocalizedText(crop.name);
  const cropDiseases = getDiseasesForCrop(cropId);

  if (breadcrumb) {
    const hubText = isBn ? 'কৃষি জ্ঞান কেন্দ্র' : 'Knowledge Hub';
    breadcrumb.innerHTML = `<a href="knowledgehub.html" onclick="event.preventDefault(); closeDetailView();" style="color: #52b788; text-decoration: none;">${hubText}</a> > <span>${cropName}</span>`;
  }

  const helplineLabel = isBn ? 'কৃষি কল সেন্টার' : 'Agri Call Center';
  const tollFreeLabel = isBn ? '(টোল ফ্রি)' : '(Toll Free)';
  const bighaSeedLabel = isBn ? 'বিঘায় বীজ:' : 'Seed Rate:';
  const typeLabel = isBn ? 'টাইপ:' : 'Category:';
  const soilLabel = isBn ? 'মাটি:' : 'Soil:';
  const durationLabel = isBn ? 'মেয়াদ:' : 'Duration:';
  const seasonLabel = isBn ? 'মৌসুম:' : 'Season:';

  const tab1Label = isBn ? 'রোগ নির্ণয়, লক্ষণ ও চিকিৎসা' : 'Disease Diagnosis & Treatment';
  const tab2Label = isBn ? 'বিঘাভিত্তিক বীজ ও চাষাবাদ নির্দেশিকা' : 'Cultivation & Seed Guide';
  const tab3Label = isBn ? 'বিঘাপ্রতি সার প্রয়োগ মাত্রা' : 'Fertilizer Application Rates';

  detailContent.innerHTML = `
    <!-- Crop Hero Header -->
    <div class="detail-hero-banner">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px;">
        <div>
          <h1><i class="fa-solid fa-seedling"></i> ${cropName}</h1>
          <div class="scientific-name">${crop.scientificName}</div>
          <p style="max-width: 850px; line-height: 1.6; font-size: 1.05rem;">${formatLocalizedText(crop.description)}</p>
        </div>
        <div style="background: rgba(0,0,0,0.3); padding: 10px 18px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.25); text-align: center;">
          <div style="font-size: 0.85rem; text-transform: uppercase; color: #a7f3d0; font-weight: 700;"><i class="fa-solid fa-phone-volume"></i> ${helplineLabel}</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: #ffffff;">১৬১২৩ <span style="font-size: 0.8rem; font-weight: 500;">${tollFreeLabel}</span></div>
        </div>
      </div>
      <div class="badge-grid">
        <span class="spec-badge" style="background: #064e3b;"><i class="fa-solid fa-wheat-awn"></i> ${bighaSeedLabel} ${formatLocalizedText(crop.bighaSeedRate || crop.seedInfo.rate)}</span>
        <span class="spec-badge"><i class="fa-solid fa-layer-group"></i> ${typeLabel} ${formatLocalizedText(crop.type)}</span>
        <span class="spec-badge"><i class="fa-solid fa-flask"></i> ${soilLabel} ${formatLocalizedText(crop.idealSoil)}</span>
        <span class="spec-badge"><i class="fa-solid fa-clock"></i> ${durationLabel} ${formatLocalizedText(crop.growthDuration)}</span>
        <span class="spec-badge"><i class="fa-solid fa-calendar-days"></i> ${seasonLabel} ${formatLocalizedText(crop.plantingSeason)}</span>
      </div>
    </div>

    <!-- Inner Sub-Tabs Navigation -->
    <div class="detail-subtabs" style="margin-top: 25px;">
      <button class="subtab-btn ${defaultSubTab === 'diseases' ? 'active' : ''}" onclick="switchCropSubTab('diseases', '${cropId}')">
        <i class="fa-solid fa-virus-covid"></i> ${tab1Label} (${cropDiseases.length})
      </button>
      <button class="subtab-btn ${defaultSubTab === 'crops' ? 'active' : ''}" onclick="switchCropSubTab('planting', '${cropId}')">
        <i class="fa-solid fa-wheat-awn"></i> ${tab2Label}
      </button>
      <button class="subtab-btn ${defaultSubTab === 'fertilizers' ? 'active' : ''}" onclick="switchCropSubTab('fertilizers', '${cropId}')">
        <i class="fa-solid fa-flask"></i> ${tab3Label}
      </button>
    </div>

    <!-- Sub-tab Content Panel -->
    <div id="crop-subtab-content" style="margin-top: 25px;">
      <!-- Content populated by switchCropSubTab -->
    </div>
  `;

  switchCropSubTab(defaultSubTab === 'crops' ? 'planting' : (defaultSubTab || 'diseases'), cropId);
}

function switchCropSubTab(subTabName, cropId) {
  window.currentOpenSubTab = subTabName;
  const crop = (guidesData.crops || []).find(c => c.id === cropId);
  if (!crop) return;

  const contentDiv = document.getElementById('crop-subtab-content');
  if (!contentDiv) return;

  const buttons = document.querySelectorAll('.subtab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(buttons).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(subTabName));
  if (activeBtn) activeBtn.classList.add('active');

  const isBn = (localStorage.getItem('language') || 'en') === 'bn';
  const cropName = formatLocalizedText(crop.name);
  const cropDiseases = getDiseasesForCrop(cropId);

  if (subTabName === 'diseases') {
    if (cropDiseases.length === 0) {
      const emptyMsg = isBn ? 'এই ফসলের জন্য কোনো জটিল রোগ নিবন্ধিত নেই। সুষম খাদ্য ও পরিচ্ছন্ন জমি বজায় রাখুন।' : 'No critical disease records registered for this crop. Maintain clean soil and balanced nutrients.';
      contentDiv.innerHTML = `<div class="glass" style="padding: 40px; text-align: center; border-radius: 16px; color: var(--text-light);">${emptyMsg}</div>`;
      return;
    }

    const headingText = isBn ? `${cropName} - কৃষকবান্ধব রোগ চেনার উপায়, ট্যাংক ডোজ ও ঘরোয়া প্রতিকার` : `${cropName} - Disease Diagnosis, Tank Dosage & Remedies`;
    let diseasesHTML = `<h3 style="color: #ffffff; font-size: 1.4rem; margin-bottom: 20px;"><i class="fa-solid fa-notes-medical" style="color: #ef233c;"></i> ${headingText}</h3>`;

    cropDiseases.forEach(dis => {
      const disName = formatLocalizedText(dis.name);
      const visualLabel = isBn ? 'কৃষকের সহজে রোগ চেনার উপায় (Visual Symptoms):' : 'Visual Symptoms:';
      const tankLabel = isBn ? '১৬ লিটার স্প্রে ট্যাংকের সহজ হিসাব (16-Liter Tank Dosage):' : '16-Liter Tank Dosage:';
      const brandLabel = isBn ? 'বাজারে প্রচলিত ব্র্যান্ড নাম:' : 'Commercial Brand Names:';
      const prevLabel = isBn ? 'রোগ প্রতিরোধ ব্যবস্থা (Prevention):' : 'Prevention & Proactive Care:';
      const chemLabel = isBn ? 'রাসায়নিক প্রতিকার ও ওষুধের মাত্রা' : 'Chemical Treatment & Dosage';
      const orgLabel = isBn ? 'দেশি ঘরোয়া ও কম খরচে জৈব প্রতিকার' : 'Organic & Home Remedies';
      const orgFallback = isBn ? 'নিম তেল (৫ মিলি/লিটার) + সাবান পানি অথবা ট্রাইকোডার্মা দিয়ে বীজ শোধন করুন।' : 'Seed treatment with Trichoderma or Neem Oil spray (5ml/L).';
      const tipLabel = isBn ? 'জরুরি কৃষক টিপস:' : 'Urgent Farmer Advisory:';

      diseasesHTML += `
        <div class="disease-detail-card">
          <div class="disease-title-row">
            <h2><i class="fa-solid fa-bug"></i> ${disName}</h2>
            <span class="pathogen-pill"><i class="fa-solid fa-microscope"></i> ${formatLocalizedText(dis.pathogen)}</span>
          </div>

          <!-- Easy Visual Symptoms for Farmer -->
          <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 12px; margin-bottom: 18px;">
            <h4 style="color: #b91c1c; font-size: 1.05rem; margin-bottom: 6px;"><i class="fa-solid fa-eye"></i> ${visualLabel}</h4>
            <p style="font-size: 1.02rem; font-weight: 600; color: #991b1b; line-height: 1.6;">${formatLocalizedText(dis.easySymptoms || dis.symptoms)}</p>
          </div>

          <!-- 16L Tank Dosage Highlight Box -->
          <div style="background: #ecfdf5; border: 2px solid #059669; padding: 18px; border-radius: 12px; margin-bottom: 18px;">
            <h4 style="color: #065f46; font-size: 1.1rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-spray-can-sparkles"></i> ${tankLabel}
            </h4>
            <p style="font-size: 1.08rem; font-weight: 800; color: #047857; margin-bottom: 6px;">${formatLocalizedText(dis.tankDosage || dis.treatment)}</p>
            ${dis.brandNames ? `<p style="font-size: 0.95rem; color: #065f46; margin-top: 4px;"><strong>${brandLabel}</strong> <span style="background: #d1fae5; padding: 3px 8px; border-radius: 6px; font-weight: 700;">${formatLocalizedText(dis.brandNames)}</span></p>` : ''}
          </div>

          <div class="prevention-box">
            <h4><i class="fa-solid fa-shield-halved"></i> ${prevLabel}</h4>
            <p style="font-size: 0.98rem; color: #1e293b; line-height: 1.6;">${formatLocalizedText(dis.prevention)}</p>
          </div>

          <div class="treatment-section" style="margin-top: 18px;">
            <div class="treatment-grid">
              <div class="chemical-box">
                <h5><i class="fa-solid fa-vial"></i> ${chemLabel}</h5>
                <p style="font-size: 0.98rem; font-weight: 600; color: #14532d;">${formatLocalizedText(dis.treatment)}</p>
              </div>
              <div class="organic-box">
                <h5><i class="fa-solid fa-leaf"></i> ${orgLabel}</h5>
                <p style="font-size: 0.98rem; font-weight: 600; color: #78350f;">${formatLocalizedText(dis.organicTreatment || orgFallback)}</p>
              </div>
            </div>
          </div>

          ${dis.emergencyNotice ? `
            <div style="margin-top: 16px; background: #fff7ed; border-left: 4px solid #ea580c; padding: 12px 16px; border-radius: 6px; font-size: 0.92rem; color: #9a3412;">
              <i class="fa-solid fa-bell"></i> <strong>${tipLabel}</strong> ${formatLocalizedText(dis.emergencyNotice)}
            </div>
          ` : ''}
        </div>
      `;
    });

    contentDiv.innerHTML = diseasesHTML;
  } 
  else if (subTabName === 'planting') {
    const headingText = isBn ? `${cropName} - বিঘাভিত্তিক বীজ ও চাষাবাদ নির্দেশিকা` : `${cropName} - Cultivation & Seed Guide per Bigha`;
    const seedRateLabel = isBn ? 'বিঘায় বীজের হার (Per Bigha Seed):' : 'Seed Rate per Bigha:';
    const seedDepthLabel = isBn ? 'বীজ গভীরতা (Depth):' : 'Sowing Depth:';
    const spacingLabel = isBn ? 'চারার দূরত্ব (Spacing):' : 'Plant Spacing:';
    const varTitle = isBn ? 'বাংলাদেশের অনুমোদিত জনপ্রিয় উচ্চ ফলনশীল জাতসমূহ:' : 'Approved High Yielding Varieties in Bangladesh:';
    const tipsTitle = isBn ? 'কৃষকের মাঠপর্যায়ের পরামর্শ (Farmer Field Tips):' : 'Farmer Field Advisory & Tips:';
    const soilTitle = isBn ? 'উপযুক্ত মাটি ও জমি প্রস্তুতি:' : 'Ideal Soil & Land Preparation:';
    const soilDesc = isBn ? 'জমি ৪-৫ টি চাষ ও মই দিয়ে মাটি ঝুরঝুরে ও সমতল করে নেওয়া জরুরি।' : 'Till the land 4-5 times with harrowing to ensure loose, level soil.';

    contentDiv.innerHTML = `
      <div class="disease-detail-card">
        <div class="disease-title-row">
          <h2 style="color: #1b5f43;"><i class="fa-solid fa-wheat-awn"></i> ${headingText}</h2>
          <span class="pathogen-pill" style="background: #e0f2fe; color: #0369a1;"><i class="fa-solid fa-sun"></i> ${formatLocalizedText(crop.plantingSeason)}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 15px;">
          <div style="background: #f0fdf4; padding: 18px; border-radius: 12px; border: 1px solid #bbf7d0;">
            <h4 style="color: #166534; margin-bottom: 8px;"><i class="fa-solid fa-seedling"></i> ${seedRateLabel}</h4>
            <p style="font-size: 1.15rem; font-weight: 800; color: #14532d;">${formatLocalizedText(crop.bighaSeedRate || crop.seedInfo.rate)}</p>
          </div>

          <div style="background: #f0f9ff; padding: 18px; border-radius: 12px; border: 1px solid #bae6fd;">
            <h4 style="color: #0369a1; margin-bottom: 8px;"><i class="fa-solid fa-ruler-vertical"></i> ${seedDepthLabel}</h4>
            <p style="font-size: 1.1rem; font-weight: 700; color: #0284c7;">${formatLocalizedText(crop.seedInfo.depth)}</p>
          </div>

          <div style="background: #fffbeb; padding: 18px; border-radius: 12px; border: 1px solid #fde68a;">
            <h4 style="color: #b45309; margin-bottom: 8px;"><i class="fa-solid fa-arrows-left-right"></i> ${spacingLabel}</h4>
            <p style="font-size: 1.05rem; font-weight: 700; color: #92400e;">${formatLocalizedText(crop.seedInfo.spacing)}</p>
          </div>
        </div>

        <div style="margin-top: 22px; background: #ffffff; border: 2px solid #166534; padding: 20px; border-radius: 12px;">
          <h4 style="color: #166534; font-size: 1.15rem; margin-bottom: 8px;"><i class="fa-solid fa-star"></i> ${varTitle}</h4>
          <p style="font-size: 1.08rem; font-weight: 700; color: #14532d;">${formatLocalizedText(crop.seedInfo.popularVarieties)}</p>
        </div>

        ${crop.farmerTips ? `
          <div style="margin-top: 20px; background: #eff6ff; border-left: 5px solid #2563eb; padding: 18px; border-radius: 8px;">
            <h4 style="color: #1e40af; font-size: 1.05rem; margin-bottom: 6px;"><i class="fa-solid fa-lightbulb"></i> ${tipsTitle}</h4>
            <p style="font-size: 1rem; color: #1e3a8a; line-height: 1.6;">${formatLocalizedText(crop.farmerTips)}</p>
          </div>
        ` : ''}

        <div style="margin-top: 20px; line-height: 1.7; color: #334155;">
          <h4 style="font-size: 1.05rem; color: #0f172a; margin-bottom: 6px;"><i class="fa-solid fa-mountain-sun"></i> ${soilTitle}</h4>
          <p><strong>${formatLocalizedText(crop.idealSoil)}</strong> (pH: ${crop.optimalPH}). ${soilDesc}</p>
        </div>
      </div>
    `;
  }
  else if (subTabName === 'fertilizers') {
    const bFert = crop.bighaFertilizer;
    const fertTitle = isBn ? `${cropName} - প্রতি বিঘা (৩৩ শতক) জমির জন্য সারের সঠিক প্রয়োগ মাত্রা` : `${cropName} - Recommended Fertilizer Rates per Bigha (33 Decimals)`;
    const fertDesc = isBn ? 'বিঘা প্রতি সুষম সারের সঠিক পরিমাণ ও কিস্তিতে প্রয়োগের সময়সূচী:' : 'Balanced fertilizer quantities per bigha and split application schedule:';
    const detailTitle = isBn ? 'সারের বিস্তারিত বিবরণ ও প্রয়োগবিধি:' : 'Detailed Fertilizer Descriptions & Application Methods:';
    const compLabel = isBn ? 'উপাদান:' : 'Composition:';
    const rateLabel = isBn ? 'প্রয়োগ মাত্রা:' : 'Rate:';
    const methodLabel = isBn ? 'প্রয়োগ পদ্ধতি:' : 'Method:';

    let fertsHTML = `
      <div class="disease-detail-card">
        <div class="disease-title-row">
          <h2 style="color: #1e3a8a;"><i class="fa-solid fa-flask"></i> ${fertTitle}</h2>
        </div>
        <p style="margin-bottom: 20px; color: #334155; font-size: 1.02rem;">${fertDesc}</p>
    `;

    if (bFert) {
      fertsHTML += `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 25px;">
          ${bFert.urea ? `<div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 18px; border-radius: 12px;"><h4 style="color: #166534;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'ইউরিয়া (Urea)' : 'Urea'}</h4><p style="font-weight: 700; color: #14532d; font-size: 1.05rem;">${formatLocalizedText(bFert.urea)}</p></div>` : ''}
          ${bFert.tsp ? `<div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 18px; border-radius: 12px;"><h4 style="color: #0369a1;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'টিএসপি (TSP)' : 'TSP'}</h4><p style="font-weight: 700; color: #0c4a6e; font-size: 1.05rem;">${formatLocalizedText(bFert.tsp)}</p></div>` : ''}
          ${bFert.dap ? `<div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 18px; border-radius: 12px;"><h4 style="color: #0369a1;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'ডিএপি (DAP)' : 'DAP'}</h4><p style="font-weight: 700; color: #0c4a6e; font-size: 1.05rem;">${formatLocalizedText(bFert.dap)}</p></div>` : ''}
          ${bFert.mop ? `<div style="background: #fffbeb; border: 1px solid #fde68a; padding: 18px; border-radius: 12px;"><h4 style="color: #b45309;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'এমওপি পটাশ (MOP)' : 'MOP Potash'}</h4><p style="font-weight: 700; color: #78350f; font-size: 1.05rem;">${formatLocalizedText(bFert.mop)}</p></div>` : ''}
          ${bFert.gypsum ? `<div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 18px; border-radius: 12px;"><h4 style="color: #6b21a8;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'জিপসাম (Gypsum)' : 'Gypsum'}</h4><p style="font-weight: 700; color: #581c87; font-size: 1.05rem;">${formatLocalizedText(bFert.gypsum)}</p></div>` : ''}
          ${bFert.zinc ? `<div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 18px; border-radius: 12px;"><h4 style="color: #be185d;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'দস্তা সার (Zinc)' : 'Zinc Sulphate'}</h4><p style="font-weight: 700; color: #831843; font-size: 1.05rem;">${formatLocalizedText(bFert.zinc)}</p></div>` : ''}
          ${bFert.vermi ? `<div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 18px; border-radius: 12px;"><h4 style="color: #166534;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'ট্রাইকো-কম্পোস্ট / জৈব সার' : 'Vermicompost / Organic'}</h4><p style="font-weight: 700; color: #14532d; font-size: 1.05rem;">${formatLocalizedText(bFert.vermi)}</p></div>` : ''}
          ${bFert.bio ? `<div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 18px; border-radius: 12px;"><h4 style="color: #0369a1;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'রাইজোবিয়াম অণুজীব সার' : 'Rhizobium Bio-fertilizer'}</h4><p style="font-weight: 700; color: #0c4a6e; font-size: 1.05rem;">${formatLocalizedText(bFert.bio)}</p></div>` : ''}
          ${bFert.boron ? `<div style="background: #fffbeb; border: 1px solid #fde68a; padding: 18px; border-radius: 12px;"><h4 style="color: #b45309;"><i class="fa-solid fa-circle-dot"></i> ${isBn ? 'বোরন সার (Boron)' : 'Boron'}</h4><p style="font-weight: 700; color: #78350f; font-size: 1.05rem;">${formatLocalizedText(bFert.boron)}</p></div>` : ''}
        </div>
      `;
    }

    const fertList = crop.fertilizers || ["Urea", "TSP", "MOP", "Gypsum", "Zinc Sulphate"];
    fertsHTML += `<h4 style="color: #0f172a; margin-bottom: 12px;"><i class="fa-solid fa-list-check"></i> ${detailTitle}</h4><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">`;

    fertList.forEach(fName => {
      const matchFert = (guidesData.fertilizers || []).find(f => f.name.toLowerCase().includes(fName.toLowerCase()));
      if (matchFert) {
        fertsHTML += `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 12px;">
            <h4 style="color: #0369a1; font-size: 1.05rem; margin-bottom: 6px;"><i class="fa-solid fa-flask-vial"></i> ${formatLocalizedText(matchFert.name)}</h4>
            <p style="font-size: 0.88rem; color: #0284c7; margin-bottom: 8px;"><strong>${compLabel}</strong> ${formatLocalizedText(matchFert.composition)}</p>
            <p style="font-size: 0.92rem; color: #1e293b; margin-bottom: 6px;"><strong>${rateLabel}</strong> ${formatLocalizedText(matchFert.bighaDosage || matchFert.applicationRate)}</p>
            <p style="font-size: 0.88rem; color: #475569;"><strong>${methodLabel}</strong> ${formatLocalizedText(matchFert.method)}</p>
          </div>
        `;
      }
    });

    fertsHTML += `</div></div>`;
    contentDiv.innerHTML = fertsHTML;
  }
}


function closeDetailView() {
  const catalogView = document.getElementById('catalog-browser-view');
  const detailView = document.getElementById('detail-view');

  if (detailView) detailView.style.display = 'none';
  if (catalogView) catalogView.style.display = 'flex';

  // Clear saved detail state
  window.currentOpenDiseaseData = null;

  history.pushState(null, '', 'knowledgehub.html');
}

function switchTab(tabId, clearUrl = true) {
  activeTab = tabId;
  
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  const targetBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId));
  if (targetBtn) targetBtn.classList.add('active');

  const searchInput = document.getElementById('guide-search-input');
  if (searchInput) searchInput.value = '';
  
  if (clearUrl) {
    closeDetailView();
  }

  renderGuides();
}

function searchGuides() {
  const searchInput = document.getElementById('guide-search-input');
  const query = searchInput ? searchInput.value : '';
  renderGuides(query);
}
// ----------------------------------------------------
// MARKETPLACE HUB
// ----------------------------------------------------
function getMarketplaceItemImage(item) {
  if (item && item.imageUrl && typeof item.imageUrl === 'string' && item.imageUrl.trim() !== '') {
    let url = item.imageUrl.trim();
    if (url.startsWith('uploads/')) {
      url = '/' + url;
    }
    return url;
  }

  const type = (item.itemType || 'Equipment').toLowerCase();
  const text = ((item.title || '') + ' ' + (item.description || '')).toLowerCase();

  // Equipment Category
  if (type === 'equipment') {
    if (text.includes('tractor') || text.includes('ট্রাক্টর')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/tractor.jpg';
    }
    if (text.includes('irrigation') || text.includes('drip') || text.includes('pump') || text.includes('সেচ') || text.includes('পাম্প') || text.includes('water')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/pexels-liton-miah-426000778-36797458.jpg';
    }
    if (text.includes('tiller') || text.includes('rotary') || text.includes('plow') || text.includes('টিলার') || text.includes('লাঙ্গল')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/tiller.jpg';
    }
    // Default Equipment
    return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/eq.png';
  }

  // Seed & Compost Category
  if (type === 'seed') {
    if (text.includes('compost') || text.includes('fertilizer') || text.includes('manure') || text.includes('কম্পোস্ট') || text.includes('সার')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/pexels-anntarazevich-7299923.jpg';
    }
    if (text.includes('potato') || text.includes('আলু') || text.includes('tuber')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/alo.jpg';
    }
    if (text.includes('rice') || text.includes('paddy') || text.includes('dhan') || text.includes('ধান') || text.includes('চাল') || text.includes('brri')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/dhan.jpg';
    }
    if (text.includes('wheat') || text.includes('গম') || text.includes('grain')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/pexels-karen-susi-2931561-39705611.jpg';
    }
    // Default Seed
    return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/le.jpg';
  }

  // Crop Category
  if (type === 'crop') {
    if (text.includes('tomato') || text.includes('টমেটো')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/pexels-unal-aslan-48172282-30309037.jpg';
    }
    if (text.includes('potato') || text.includes('আলু')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/alo.jpg';
    }
    if (text.includes('rice') || text.includes('paddy') || text.includes('ধান') || text.includes('grain')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/dhan.jpg';
    }
    if (text.includes('mango') || text.includes('fruit') || text.includes('আম') || text.includes('ফল')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/mango.jpg';
    }
    // Default Crop
    return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/le.jpg';

  }

  // Service Category
  if (type === 'service') {
    if (text.includes('tractor') || text.includes('plow') || text.includes('tilling') || text.includes('চাষ') || text.includes('হাল')) {
      return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/pexels-drphotographer152-32938346.jpg';
    }
    // Default Service
    return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/le.jpg';
  }

  return 'https://6ad1ba642ff4c710e5e36b95.imgix.net/sandbox/pexels-drphotographer152-32938346.jpg';
}

function getItemTypeIcon(itemType) {
  const t = (itemType || '').toLowerCase();
  if (t === 'equipment') return 'fa-tractor';
  if (t === 'seed') return 'fa-seedling';
  if (t === 'crop') return 'fa-wheat-awn';
  if (t === 'service') return 'fa-handshake-angle';
  return 'fa-store';
}


let marketplaceSearchQuery = '';
let marketplaceActiveType = 'all';

function handleMarketSearchInput(val) {
  marketplaceSearchQuery = (val || '').trim();
  const clearBtn = document.getElementById('market-search-clear');
  if (clearBtn) {
    clearBtn.style.display = marketplaceSearchQuery ? 'flex' : 'none';
  }
  renderMarketplace();
}

function clearMarketplaceSearch() {
  marketplaceSearchQuery = '';
  const searchInput = document.getElementById('market-search-input');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  const clearBtn = document.getElementById('market-search-clear');
  if (clearBtn) {
    clearBtn.style.display = 'none';
  }
  renderMarketplace();
}

function setMarketplaceFilter(type, btnElement) {
  marketplaceActiveType = type || 'all';
  const chips = document.querySelectorAll('.market-chip');
  chips.forEach(chip => chip.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }
  renderMarketplace();
}

function resetMarketplaceFilters() {
  marketplaceSearchQuery = '';
  marketplaceActiveType = 'all';
  const searchInput = document.getElementById('market-search-input');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('market-search-clear');
  if (clearBtn) clearBtn.style.display = 'none';
  const chips = document.querySelectorAll('.market-chip');
  chips.forEach(chip => {
    if (chip.getAttribute('data-filter') === 'all') {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
  renderMarketplace();
}

async function fetchMarketplace(){
  try {
    const res = await fetch('/api/public/marketplace', { credentials: 'include' });
    marketplaceData = await res.json();
    renderMarketplace();
  } catch (err) {
    console.error('Error fetching marketplace:', err);
  }
}

function renderMarketplace() {
  const grid = document.getElementById('market-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const query = (marketplaceSearchQuery || '').toLowerCase();
  const activeType = marketplaceActiveType || 'all';

  let filtered = marketplaceData.filter(item => {
    if (activeType !== 'all') {
      const itType = (item.itemType || '').toLowerCase();
      if (itType !== activeType.toLowerCase()) return false;
    }

    if (query) {
      const title = (item.title || '').toLowerCase();
      const desc = (item.description || '').toLowerCase();
      const seller = (item.sellerName || '').toLowerCase();
      const deal = (item.dealType || '').toLowerCase();
      const type = (item.itemType || '').toLowerCase();
      return title.includes(query) || desc.includes(query) || seller.includes(query) || deal.includes(query) || type.includes(query);
    }
    return true;
  });

  if (filtered.length === 0) {
    if (query || activeType !== 'all') {
      const notFoundText = window.translateText 
        ? window.translateText('No listings match your search criteria.') 
        : 'No listings match your search criteria.';
      const resetBtnText = window.translateText 
        ? window.translateText('View All Listings') 
        : 'View All Listings';
      const safeQuery = (query || activeType).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 45px 20px; background: rgba(255,255,255,0.7); border-radius: 16px; border: 1px dashed var(--border-color); margin: 15px 0;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.2rem; color: var(--primary); margin-bottom: 12px; opacity: 0.65;"></i>
          <h4 style="font-size: 1.15rem; color: var(--text-dark); margin-bottom: 6px;">${notFoundText}</h4>
          <p style="font-size: 0.92rem; margin-bottom: 16px; color: var(--text-light);">"${safeQuery}"</p>
          <button class="btn btn-outline" onclick="resetMarketplaceFilters()" style="margin: 0 auto; display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px;">
            <i class="fa-solid fa-rotate-left"></i> ${resetBtnText}
          </button>
        </div>
      `;
    } else {
      const emptyText = window.translateText ? window.translateText('No listings active in the marketplace.') : 'No listings active in the marketplace.';
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${emptyText}</div>`;
    }
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'market-card glass';

    const itemId = item._id || item.id;
    const isOwner = Boolean(currentUser && (
      (currentUser._id && String(currentUser._id) === String(item.sellerId)) ||
      (currentUser.id && String(currentUser.id) === String(item.sellerId)) ||
      (currentUser.username && item.sellerName && currentUser.username.trim().toLowerCase() === item.sellerName.trim().toLowerCase()) ||
      currentUser.role === 'admin'
    ));

    const deleteText = window.translateText ? window.translateText('Delete Post') : 'Delete Post';
    const deleteButton = isOwner 
      ? `<button class="btn-delete-listing" onclick="handleDeleteListing('${itemId}')"><i class="fa-solid fa-trash-can"></i> ${deleteText}</button>`
      : '';
    const headerTrashBtn = isOwner
      ? `<button class="btn-card-trash" onclick="handleDeleteListing('${itemId}')" title="${deleteText}"><i class="fa-solid fa-trash-can"></i></button>`
      : '';

    const dealType = item.dealType || 'Sale';
    const itemType = item.itemType || 'Equipment';
    const dealTypeLabel = window.translateText ? window.translateText(dealType) : dealType;
    const itemTypeLabel = window.translateText ? window.translateText(itemType) : itemType;
    const listedByLabel = window.translateText ? window.translateText('Listed by: ') : 'Listed by: ';
    const contactLabel = window.translateText ? window.translateText('Contact: ') : 'Contact: ';
    const dayLabel = window.translateText ? window.translateText('day') : 'day';

    const itemImageSrc = getMarketplaceItemImage(item);
    const typeIcon = getItemTypeIcon(itemType);

    card.innerHTML = `
      <div class="market-card-img-wrapper">
        <img 
          src="${itemImageSrc}" 
          alt="${item.title}" 
          class="market-card-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';"
        />
        <div class="market-card-badges">
          <span class="market-badge badge-${dealType.toLowerCase()}">${dealTypeLabel}</span>
          <span class="market-type-badge badge-${itemType.toLowerCase()}"><i class="fa-solid ${typeIcon}"></i> ${itemTypeLabel}</span>
        </div>
      </div>

      <div class="market-card-body">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.8rem; color:var(--text-light);"><i class="fa-regular fa-clock"></i> ${new Date(item.createdAt).toLocaleDateString()}</span>
          ${headerTrashBtn}
        </div>
        <h3 style="font-size: 1.25rem; font-weight:700; color: var(--primary); margin: 0;">${item.title}</h3>
        <p style="color:var(--text-light); font-size:0.92rem; line-height: 1.5; margin: 0;">${item.description || 'No additional details provided.'}</p>
        <div class="price-tag">${item.price} TK<span>${dealType === 'Rent' ? ' / ' + dayLabel : ''}</span></div>
        
        <div class="seller-info">
          <div><i class="fa-regular fa-user"></i> ${listedByLabel}<strong>${item.sellerName}</strong></div>
          <div><i class="fa-solid fa-phone"></i> ${contactLabel}<strong style="color: var(--primary-light);">${item.contact}</strong></div>
          ${deleteButton}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Listing Modals & Image Upload Preview
function previewUploadImage(input) {
  const previewContainer = document.getElementById('image-preview-container');
  const previewImg = document.getElementById('image-preview-img');
  const labelText = document.getElementById('upload-label-text');

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      if (previewImg) previewImg.src = e.target.result;
      if (previewContainer) previewContainer.style.display = 'inline-block';
      if (labelText) labelText.innerText = file.name;
    };
    reader.readAsDataURL(file);
  }
}

function clearImagePreview() {
  const fileInput = document.getElementById('list-image-file');
  const previewContainer = document.getElementById('image-preview-container');
  const previewImg = document.getElementById('image-preview-img');
  const labelText = document.getElementById('upload-label-text');

  if (fileInput) fileInput.value = '';
  if (previewImg) previewImg.src = '';
  if (previewContainer) previewContainer.style.display = 'none';
  if (labelText) {
    labelText.innerText = window.translateText ? window.translateText('Click to browse & upload item photo') : 'Click to browse & upload item photo';
  }
}

function openListingModal() {
  if (!currentUser) {
    const isBn = (localStorage.getItem('language') || 'en') === 'bn';
    const alertMsg = isBn
      ? 'মার্কেটপ্লেসে পোস্ট করতে শুধুমাত্র অনুমোদিত (লগইন করা) ব্যবহারকারী যুক্ত হতে পারেন। অনুগ্রহ করে প্রথমে সাইন ইন করুন।'
      : 'Only authorized (signed in) users can add marketplace listings. Please sign in first.';
    const confirmLogin = confirm(alertMsg + (isBn ? '\n\nএখনই সাইন ইন পেজে যেতে চান?' : '\n\nWould you like to go to the Sign In page now?'));
    if (confirmLogin) {
      window.location.href = '/login';
    }
    return;
  }
  const modal = document.getElementById('listing-modal');
  if (modal) modal.style.display = 'flex';
}

function closeListingModal() {
  const modal = document.getElementById('listing-modal');
  if (modal) modal.style.display = 'none';
  const form = document.getElementById('create-listing-form');
  if (form) form.reset();
  clearImagePreview();
}

async function handleCreateListing(e) {
  e.preventDefault();
  
  if (!currentUser) {
    const isBn = (localStorage.getItem('language') || 'en') === 'bn';
    alert(isBn ? 'লিস্টিং পোস্ট করার জন্য আপনার অ্যাকাউন্ট লগইন থাকা আবশ্যক।' : 'You must be signed in to add a listing.');
    window.location.href = '/login';
    return;
  }
  
  const title = document.getElementById('list-title').value;
  const itemType = document.getElementById('list-itemtype').value;
  const dealType = document.getElementById('list-dealtype').value;
  const price = document.getElementById('list-price').value;
  const contact = document.getElementById('list-contact').value;
  const description = document.getElementById('list-desc').value;
  const fileInput = document.getElementById('list-image-file');

  const formData = new FormData();
  formData.append('title', title);
  formData.append('itemType', itemType);
  formData.append('dealType', dealType);
  formData.append('price', price);
  formData.append('contact', contact);
  formData.append('description', description);

  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append('image', fileInput.files[0]);
  }

  try {
    const res = await fetch('/api/public/marketplace', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });

    if (res.ok) {
      closeListingModal();
      await fetchMarketplace();
      // const isBn = (localStorage.getItem('language') || 'en') === 'bn';
      // alert(isBn ? 'আপনার মার্কেটপ্লেস লিস্টিং সফলভাবে যুক্ত হয়েছে!' : 'Your marketplace listing was posted successfully!');
    } else {
      const errData = await res.json().catch(() => ({}));
      const isBn = (localStorage.getItem('language') || 'en') === 'bn';
      if (res.status === 401) {
        alert(isBn ? 'অননুমোদিত অনুরোধ। লিস্টিং যোগ করতে অনুগ্রহ করে লগইন করুন।' : 'Unauthorized. Please sign in to post a listing.');
        window.location.href = '/login';
      } else {
        alert(`Listing creation failed: ${errData.message || (isBn ? 'ব্যর্থ হয়েছে' : 'Failed')}`);
      }
    }
  } catch (err) {
    alert('An error occurred during submission.');
  }
}

async function handleDeleteListing(id) {
  if (!currentUser) {
    const isBn = (localStorage.getItem('language') || 'en') === 'bn';
    alert(isBn ? 'লিস্টিং মুছে ফেলতে আপনি অনুমোদিত নন। অনুগ্রহ করে সাইন ইন করুন।' : 'You are not authorized to delete this listing. Please sign in.');
    window.location.href = '/login';
    return;
  }

  const confirmMsg = window.translateText ? window.translateText('Are you sure you want to delete this listing?') : 'Are you sure you want to delete this listing?';
  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch(`/api/public/marketplace/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.ok) {
      await fetchMarketplace();
      // const isBn = (localStorage.getItem('language') || 'en') === 'bn';
      // alert(isBn ? 'লিস্টিং সফলভাবে মুছে ফেলা হয়েছে।' : 'Listing deleted successfully.');
    } else {
      const errData = await res.json().catch(() => ({}));
      const isBn = (localStorage.getItem('language') || 'en') === 'bn';
      if (res.status === 403 || res.status === 401) {
        alert(isBn ? 'অনুমতি নেই: শুধুমাত্র লিস্টিং প্রদানকারী অনুমোদিত কৃষক বা অ্যাডমিন এই পোস্ট মুছে ফেলতে পারবেন।' : 'Unauthorized: Only the creator of this listing or an admin can delete it.');
      } else {
        alert(`Deletion failed: ${errData.message || (isBn ? 'মুছে ফেলতে ব্যর্থ হয়েছে' : 'Failed')}`);
      }
    }
  } catch (err) {
    alert('An error occurred during deletion.');
  }
}

