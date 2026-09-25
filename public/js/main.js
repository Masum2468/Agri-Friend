// State Variables
let currentUser = null;
let activeTab = 'crops';
let guidesData ={
  crops: [],
  diseases: [],
  fertilizers: [],
  pesticides: []
};
let marketplaceData = [];
let currentCity = 'Dhaka';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  fetchWeather('Dhaka');
  loadGuides();
  fetchMarketplace();

  // Weather Event Listeners
  const searchBtn = document.getElementById('weather-search-btn');
  const cityInput = document.getElementById('weather-city-input');

  if (searchBtn && cityInput) {
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
  if (window.applyTranslations) window.applyTranslations();
});
// ----------------------------------------------------
// AUTHENTICATION CHECK
// ----------------------------------------------------
async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me');
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
    const [cropsRes, diseasesRes, fertsRes, pestsRes] = await Promise.all([
      fetch('/api/public/guides/crops'),
      fetch('/api/public/guides/diseases'),
      fetch('/api/public/guides/fertilizers'),
      fetch('/api/public/guides/pesticides')
    ]);

    guidesData.crops = await cropsRes.json();
    guidesData.diseases = await diseasesRes.json();
    guidesData.fertilizers = await fertsRes.json();
    guidesData.pesticides = await pestsRes.json();

    renderGuides();
    checkUrlParams();
  } catch (err) {
    console.error('Error loading reference guides:', err);
  }
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
      return (
        !query ||
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.scientificName && item.scientificName.toLowerCase().includes(query)) ||
        (item.type && item.type.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
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
      const typeText = isBn 
        ? ((item.type === 'Cereal' ? 'দানাশস্য' : item.type === 'Vegetable' ? 'সবজি' : item.type === 'Tuber' ? 'কন্দজাতীয় ফসল' : item.type) + ' নির্দেশিকা')
        : (item.type + ' Guide');

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
        <p class="desc">${item.description}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${sowingRateLabel}</span><span class="value">${item.seedInfo.rate}</span></div>
          <div class="detail-row"><span class="label">${sowingDepthLabel}</span><span class="value">${item.seedInfo.depth}</span></div>
          <div class="detail-row"><span class="label">${spacingLabel}</span><span class="value">${item.seedInfo.spacing}</span></div>
          <div class="detail-row"><span class="label">${varietiesLabel}</span><span class="value" style="font-size: 0.85rem;">${item.seedInfo.popularVarieties}</span></div>
          <div class="detail-row"><span class="label">${soilPhLabel}</span><span class="value">${item.optimalPH}</span></div>
          <div class="detail-row"><span class="label">${durationLabel}</span><span class="value">${item.growthDuration}</span></div>
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
      return (
        !query ||
        crop.name.toLowerCase().includes(query) ||
        crop.scientificName.toLowerCase().includes(query) ||
        cropDiseases.some(d => d.name.toLowerCase().includes(query) || d.symptoms.toLowerCase().includes(query) || d.treatment.toLowerCase().includes(query))
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
      return (
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.purpose.toLowerCase().includes(query) ||
        item.targetCrops.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${t('No fertilizer records match your query.')}</div>`;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'guide-card glass';
      const headerTitle = t('Soil Nutrients');
      const compLabel = t('Composition:');
      const catLabel = isBn ? 'বিভাগ:' : 'Category:';
      const rateLabel = isBn ? 'প্রয়োগ হার:' : 'Rate:';
      const methodLabel = isBn ? 'প্রয়োগ পদ্ধতি:' : 'Method:';
      const targetLabel = isBn ? 'লক্ষ্যভিত্তিক ফসল:' : 'Target Crops:';

      card.innerHTML = `
        <div class="card-type" style="color: #2a6f97;"><i class="fa-solid fa-flask"></i> ${headerTitle}</div>
        <h3>${item.name}</h3>
        <div class="sub-tag">${compLabel} ${item.composition}</div>
        <p class="desc">${item.purpose}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${catLabel}</span><span class="value">${item.type}</span></div>
          <div class="detail-row"><span class="label">${rateLabel}</span><span class="value">${item.applicationRate}</span></div>
          <div class="detail-row"><span class="label">${methodLabel}</span><span class="value">${item.method}</span></div>
          <div class="detail-row"><span class="label">${targetLabel}</span><span class="value" style="font-size: 0.85rem;">${item.targetCrops}</span></div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  else if (activeTab === 'pesticides') {
    const currentList = guidesData.pesticides || [];
    const filtered = currentList.filter(item => {
      return (
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.activeIngredient.toLowerCase().includes(query) ||
        item.targetPests.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${t('No pesticide records match your query.')}</div>`;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'guide-card glass';
      const headerTitle = t('Pest Management');
      const activeLabel = isBn ? 'কার্যকর উপাদান:' : 'Active:';
      const effLabel = isBn ? 'কার্যকর দমন:' : 'Effective For:';
      const pestTypeLabel = isBn ? 'কীটনাশকের ধরন:' : 'Pesticide Type:';
      const dilutionLabel = isBn ? 'মিশ্রণের হার:' : 'Dilution Rate:';
      const waitLabel = isBn ? 'সংগ্রহের অপেক্ষাকাল:' : 'Harvest Wait:';
      const safetyLabel = isBn ? 'সতর্কতা:' : 'Safety:';

      card.innerHTML = `
        <div class="card-type" style="color: #e65f2b;"><i class="fa-solid fa-shield-virus"></i> ${headerTitle}</div>
        <h3>${item.name}</h3>
        <div class="sub-tag">${activeLabel} ${item.activeIngredient}</div>
        <p class="desc"><strong>${effLabel}</strong> ${item.targetPests}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${pestTypeLabel}</span><span class="value">${item.type}</span></div>
          <div class="detail-row"><span class="label">${dilutionLabel}</span><span class="value">${item.dilutionRate}</span></div>
          <div class="detail-row"><span class="label">${waitLabel}</span><span class="value" style="color: #c92a2a; font-weight: 600;">${item.safetyInterval}</span></div>
          <div class="detail-row" style="flex-direction: column; align-items: flex-start; gap: 4px; margin-top: 8px;">
            <span class="label"><i class="fa-solid fa-triangle-exclamation"></i> ${safetyLabel}</span>
            <span class="value" style="font-size: 0.85rem;">${item.safetyInstructions}</span>
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
function openCropDetail(cropId, defaultSubTab = 'diseases', updateHistory = true) {
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

  const t = window.translateText || (x => x);
  const isBn = (localStorage.getItem('language') || 'en') === 'bn';
  const cropName = formatLocalizedText(crop.name);
  const cropDiseases = getDiseasesForCrop(cropId);

  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="knowledgehub.html" onclick="event.preventDefault(); closeDetailView();" style="color: #52b788; text-decoration: none;">Knowledge Hub</a> > <span>${cropName}</span>`;
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
          <p style="max-width: 850px; line-height: 1.6; font-size: 1.05rem;">${crop.description}</p>
        </div>
        <div style="background: rgba(0,0,0,0.3); padding: 10px 18px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.25); text-align: center;">
          <div style="font-size: 0.85rem; text-transform: uppercase; color: #a7f3d0; font-weight: 700;"><i class="fa-solid fa-phone-volume"></i> ${helplineLabel}</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: #ffffff;">১৬১২৩ <span style="font-size: 0.8rem; font-weight: 500;">${tollFreeLabel}</span></div>
        </div>
      </div>
      <div class="badge-grid">
        <span class="spec-badge" style="background: #064e3b;"><i class="fa-solid fa-wheat-awn"></i> ${bighaSeedLabel} ${crop.bighaSeedRate || crop.seedInfo.rate}</span>
        <span class="spec-badge"><i class="fa-solid fa-layer-group"></i> ${typeLabel} ${crop.type}</span>
        <span class="spec-badge"><i class="fa-solid fa-flask"></i> ${soilLabel} ${crop.idealSoil}</span>
        <span class="spec-badge"><i class="fa-solid fa-clock"></i> ${durationLabel} ${crop.growthDuration}</span>
        <span class="spec-badge"><i class="fa-solid fa-calendar-days"></i> ${seasonLabel} ${crop.plantingSeason}</span>
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
  const crop = (guidesData.crops || []).find(c => c.id === cropId);
  if (!crop) return;

  const contentDiv = document.getElementById('crop-subtab-content');
  if (!contentDiv) return;

  const buttons = document.querySelectorAll('.subtab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(buttons).find(b => b.getAttribute('onclick').includes(subTabName));
  if (activeBtn) activeBtn.classList.add('active');

  const t = window.translateText || (x => x);
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
            <span class="pathogen-pill"><i class="fa-solid fa-microscope"></i> ${dis.pathogen}</span>
          </div>

          <!-- Easy Visual Symptoms for Farmer -->
          <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 12px; margin-bottom: 18px;">
            <h4 style="color: #b91c1c; font-size: 1.05rem; margin-bottom: 6px;"><i class="fa-solid fa-eye"></i> ${visualLabel}</h4>
            <p style="font-size: 1.02rem; font-weight: 600; color: #991b1b; line-height: 1.6;">${dis.easySymptoms || dis.symptoms}</p>
          </div>

          <!-- 16L Tank Dosage Highlight Box -->
          <div style="background: #ecfdf5; border: 2px solid #059669; padding: 18px; border-radius: 12px; margin-bottom: 18px;">
            <h4 style="color: #065f46; font-size: 1.1rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-spray-can-sparkles"></i> ${tankLabel}
            </h4>
            <p style="font-size: 1.08rem; font-weight: 800; color: #047857; margin-bottom: 6px;">${dis.tankDosage || dis.treatment}</p>
            ${dis.brandNames ? `<p style="font-size: 0.95rem; color: #065f46; margin-top: 4px;"><strong>${brandLabel}</strong> <span style="background: #d1fae5; padding: 3px 8px; border-radius: 6px; font-weight: 700;">${dis.brandNames}</span></p>` : ''}
          </div>

          <div class="prevention-box">
            <h4><i class="fa-solid fa-shield-halved"></i> ${prevLabel}</h4>
            <p style="font-size: 0.98rem; color: #1e293b; line-height: 1.6;">${dis.prevention}</p>
          </div>

          <div class="treatment-section" style="margin-top: 18px;">
            <div class="treatment-grid">
              <div class="chemical-box">
                <h5><i class="fa-solid fa-vial"></i> ${chemLabel}</h5>
                <p style="font-size: 0.98rem; font-weight: 600; color: #14532d;">${dis.treatment}</p>
              </div>
              <div class="organic-box">
                <h5><i class="fa-solid fa-leaf"></i> ${orgLabel}</h5>
                <p style="font-size: 0.98rem; font-weight: 600; color: #78350f;">${dis.organicTreatment || orgFallback}</p>
              </div>
            </div>
          </div>

          ${dis.emergencyNotice ? `
            <div style="margin-top: 16px; background: #fff7ed; border-left: 4px solid #ea580c; padding: 12px 16px; border-radius: 6px; font-size: 0.92rem; color: #9a3412;">
              <i class="fa-solid fa-bell"></i> <strong>${tipLabel}</strong> ${dis.emergencyNotice}
            </div>
          ` : ''}
        </div>
      `;
    });

    contentDiv.innerHTML = diseasesHTML;
  } 
  else if (subTabName === 'planting') {
    contentDiv.innerHTML = `
      <div class="disease-detail-card">
        <div class="disease-title-row">
          <h2 style="color: #1b5f43;"><i class="fa-solid fa-wheat-awn"></i> ${t(crop.name)} - ${t('বিঘাভিত্তিক বীজ ও চাষাবাদ নির্দেশিকা')}</h2>
          <span class="pathogen-pill" style="background: #e0f2fe; color: #0369a1;"><i class="fa-solid fa-sun"></i> ${crop.plantingSeason}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 15px;">
          <div style="background: #f0fdf4; padding: 18px; border-radius: 12px; border: 1px solid #bbf7d0;">
            <h4 style="color: #166534; margin-bottom: 8px;"><i class="fa-solid fa-seedling"></i> ${t('বিঘায় বীজের হার (Per Bigha Seed):')}</h4>
            <p style="font-size: 1.15rem; font-weight: 800; color: #14532d;">${crop.bighaSeedRate || crop.seedInfo.rate}</p>
          </div>

          <div style="background: #f0f9ff; padding: 18px; border-radius: 12px; border: 1px solid #bae6fd;">
            <h4 style="color: #0369a1; margin-bottom: 8px;"><i class="fa-solid fa-ruler-vertical"></i> ${t('বীজ গভীরতা (Depth):')}</h4>
            <p style="font-size: 1.1rem; font-weight: 700; color: #0284c7;">${crop.seedInfo.depth}</p>
          </div>

          <div style="background: #fffbeb; padding: 18px; border-radius: 12px; border: 1px solid #fde68a;">
            <h4 style="color: #b45309; margin-bottom: 8px;"><i class="fa-solid fa-arrows-left-right"></i> ${t('চারার দূরত্ব (Spacing):')}</h4>
            <p style="font-size: 1.05rem; font-weight: 700; color: #92400e;">${crop.seedInfo.spacing}</p>
          </div>
        </div>

        <div style="margin-top: 22px; background: #ffffff; border: 2px solid #166534; padding: 20px; border-radius: 12px;">
          <h4 style="color: #166534; font-size: 1.15rem; margin-bottom: 8px;"><i class="fa-solid fa-star"></i> ${t('বাংলাদেশের অনুমোদিত জনপ্রিয় উচ্চ ফলনশীল জাতসমূহ:')}</h4>
          <p style="font-size: 1.08rem; font-weight: 700; color: #14532d;">${crop.seedInfo.popularVarieties}</p>
        </div>

        ${crop.farmerTips ? `
          <div style="margin-top: 20px; background: #eff6ff; border-left: 5px solid #2563eb; padding: 18px; border-radius: 8px;">
            <h4 style="color: #1e40af; font-size: 1.05rem; margin-bottom: 6px;"><i class="fa-solid fa-lightbulb"></i> ${t('কৃষকের মাঠপর্যায়ের পরামর্শ (Farmer Field Tips):')}</h4>
            <p style="font-size: 1rem; color: #1e3a8a; line-height: 1.6;">${crop.farmerTips}</p>
          </div>
        ` : ''}

        <div style="margin-top: 20px; line-height: 1.7; color: #334155;">
          <h4 style="font-size: 1.05rem; color: #0f172a; margin-bottom: 6px;"><i class="fa-solid fa-mountain-sun"></i> ${t('উপযুক্ত মাটি ও জমি প্রস্তুতি:')}</h4>
          <p><strong>${crop.idealSoil}</strong> (pH: ${crop.optimalPH}). ${t('জমি ৪-৫ টি চাষ ও মই দিয়ে মাটি ঝুরঝুরে ও সমতল করে নেওয়া জরুরি।')}</p>
        </div>
      </div>
    `;
  }
  else if (subTabName === 'fertilizers') {
    const bFert = crop.bighaFertilizer;
    let fertsHTML = `
      <div class="disease-detail-card">
        <div class="disease-title-row">
          <h2 style="color: #1e3a8a;"><i class="fa-solid fa-flask"></i> ${t(crop.name)} ${t('- প্রতি বিঘা (৩৩ শতক) জমির জন্য সারের সঠিক প্রয়োগ মাত্রা')}</h2>
        </div>
        <p style="margin-bottom: 20px; color: #334155; font-size: 1.02rem;">${t('বিঘা প্রতি সুষম সারের সঠিক পরিমাণ ও কিস্তিতে প্রয়োগের সময়সূচী:')}</p>
    `;

    if (bFert) {
      fertsHTML += `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 25px;">
          ${bFert.urea ? `<div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 18px; border-radius: 12px;"><h4 style="color: #166534;"><i class="fa-solid fa-circle-dot"></i> ইউরিয়া (Urea)</h4><p style="font-weight: 700; color: #14532d; font-size: 1.05rem;">${bFert.urea}</p></div>` : ''}
          ${bFert.tsp ? `<div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 18px; border-radius: 12px;"><h4 style="color: #0369a1;"><i class="fa-solid fa-circle-dot"></i> টিএসপি (TSP)</h4><p style="font-weight: 700; color: #0c4a6e; font-size: 1.05rem;">${bFert.tsp}</p></div>` : ''}
          ${bFert.dap ? `<div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 18px; border-radius: 12px;"><h4 style="color: #0369a1;"><i class="fa-solid fa-circle-dot"></i> ডিএপি (DAP)</h4><p style="font-weight: 700; color: #0c4a6e; font-size: 1.05rem;">${bFert.dap}</p></div>` : ''}
          ${bFert.mop ? `<div style="background: #fffbeb; border: 1px solid #fde68a; padding: 18px; border-radius: 12px;"><h4 style="color: #b45309;"><i class="fa-solid fa-circle-dot"></i> এমওপি পটাশ (MOP)</h4><p style="font-weight: 700; color: #78350f; font-size: 1.05rem;">${bFert.mop}</p></div>` : ''}
          ${bFert.gypsum ? `<div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 18px; border-radius: 12px;"><h4 style="color: #6b21a8;"><i class="fa-solid fa-circle-dot"></i> জিপসাম (Gypsum)</h4><p style="font-weight: 700; color: #581c87; font-size: 1.05rem;">${bFert.gypsum}</p></div>` : ''}
          ${bFert.zinc ? `<div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 18px; border-radius: 12px;"><h4 style="color: #be185d;"><i class="fa-solid fa-circle-dot"></i> দস্তা সার (Zinc)</h4><p style="font-weight: 700; color: #831843; font-size: 1.05rem;">${bFert.zinc}</p></div>` : ''}
        </div>
      `;
    }

    const fertList = crop.fertilizers || ["Urea", "TSP", "MOP", "Gypsum", "Zinc Sulphate"];
    fertsHTML += `<h4 style="color: #0f172a; margin-bottom: 12px;"><i class="fa-solid fa-list-check"></i> ${t('সারের বিস্তারিত বিবরণ ও প্রয়োগবিধি:')}</h4><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">`;

    fertList.forEach(fName => {
      const matchFert = (guidesData.fertilizers || []).find(f => f.name.toLowerCase().includes(fName.toLowerCase()));
      if (matchFert) {
        fertsHTML += `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 12px;">
            <h4 style="color: #0369a1; font-size: 1.05rem; margin-bottom: 6px;"><i class="fa-solid fa-flask-vial"></i> ${matchFert.name}</h4>
            <p style="font-size: 0.88rem; color: #0284c7; margin-bottom: 8px;"><strong>${t('উপাদান:')}</strong> ${matchFert.composition}</p>
            <p style="font-size: 0.92rem; color: #1e293b; margin-bottom: 6px;"><strong>${t('প্রয়োগ মাত্রা:')}</strong> ${matchFert.bighaDosage || matchFert.applicationRate}</p>
            <p style="font-size: 0.88rem; color: #475569;"><strong>${t('প্রয়োগ পদ্ধতি:')}</strong> ${matchFert.method}</p>
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
  if (item.imageUrl && item.imageUrl.trim() !== '') {
    return item.imageUrl.trim();
  }

  const type = (item.itemType || 'Equipment').toLowerCase();
  const text = ((item.title || '') + ' ' + (item.description || '')).toLowerCase();

  // Equipment Category
  if (type === 'equipment') {
    if (text.includes('tractor') || text.includes('ট্রাক্টর')) {
      return 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('irrigation') || text.includes('drip') || text.includes('pump') || text.includes('সেচ') || text.includes('পাম্প') || text.includes('water')) {
      return 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('tiller') || text.includes('rotary') || text.includes('plow') || text.includes('টিলার') || text.includes('লাঙ্গল')) {
      return 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('harvester') || text.includes('cutter') || text.includes('হারভেস্টার')) {
      return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('spray') || text.includes('স্প্রে')) {
      return 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80';
    }
    // Default Equipment
    return 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=600&q=80';
  }

  // Seed & Compost Category
  if (type === 'seed') {
    if (text.includes('compost') || text.includes('fertilizer') || text.includes('manure') || text.includes('কম্পোস্ট') || text.includes('সার')) {
      return 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('potato') || text.includes('আলু') || text.includes('tuber')) {
      return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('rice') || text.includes('paddy') || text.includes('dhan') || text.includes('ধান') || text.includes('চাল') || text.includes('brri')) {
      return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('wheat') || text.includes('গম') || text.includes('grain')) {
      return 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80';
    }
    // Default Seed
    return 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80';
  }

  // Crop Category
  if (type === 'crop') {
    if (text.includes('tomato') || text.includes('টমেটো')) {
      return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('potato') || text.includes('আলু')) {
      return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('rice') || text.includes('paddy') || text.includes('ধান') || text.includes('grain')) {
      return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80';
    }
    if (text.includes('mango') || text.includes('fruit') || text.includes('আম') || text.includes('ফল')) {
      return 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80';
    }
    // Default Crop
    return 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80';
  }

  // Service Category
  if (type === 'service') {
    if (text.includes('tractor') || text.includes('plow') || text.includes('tilling') || text.includes('চাষ') || text.includes('হাল')) {
      return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';
    }
    // Default Service
    return 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80';
  }

  return 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=600&q=80';
}

function getItemTypeIcon(itemType) {
  const t = (itemType || '').toLowerCase();
  if (t === 'equipment') return 'fa-tractor';
  if (t === 'seed') return 'fa-seedling';
  if (t === 'crop') return 'fa-wheat-awn';
  if (t === 'service') return 'fa-handshake-angle';
  return 'fa-store';
}

async function fetchMarketplace(){
  try {
    const res = await fetch('/api/public/marketplace');
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

  if (marketplaceData.length === 0) {
    const emptyText = window.translateText ? window.translateText('No listings active in the marketplace.') : 'No listings active in the marketplace.';
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">${emptyText}</div>`;
    return;
  }

  marketplaceData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'market-card glass';

    const isOwner = Boolean(currentUser && (
      (currentUser._id && String(currentUser._id) === String(item.sellerId)) ||
      (currentUser.id && String(currentUser.id) === String(item.sellerId)) ||
      (currentUser.username && item.sellerName && currentUser.username.trim().toLowerCase() === item.sellerName.trim().toLowerCase()) ||
      currentUser.role === 'admin'
    ));

    const deleteText = window.translateText ? window.translateText('Delete Post') : 'Delete Post';
    const deleteButton = isOwner 
      ? `<button class="btn-delete-listing" onclick="handleDeleteListing('${item._id}')"><i class="fa-solid fa-trash-can"></i> ${deleteText}</button>`
      : '';
    const headerTrashBtn = isOwner
      ? `<button class="btn-card-trash" onclick="handleDeleteListing('${item._id}')" title="${deleteText}"><i class="fa-solid fa-trash-can"></i></button>`
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
  document.getElementById('listing-modal').style.display = 'flex';
}

function closeListingModal() {
  document.getElementById('listing-modal').style.display = 'none';
  document.getElementById('create-listing-form').reset();
  clearImagePreview();
}

async function handleCreateListing(e) {
  e.preventDefault();
  
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
      body: formData
    });

    if (res.ok) {
      closeListingModal();
      await fetchMarketplace();
    } else {
      const errData = await res.json().catch(() => ({}));
      alert(`Listing creation failed: ${errData.message || 'Please log in again.'}`);
    }
  } catch (err) {
    alert('An error occurred during submission.');
  }
}

async function handleDeleteListing(id) {
  const confirmMsg = window.translateText ? window.translateText('Are you sure you want to delete this listing?') : 'Are you sure you want to delete this listing?';
  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch(`/api/public/marketplace/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      await fetchMarketplace();
    } else {
      const errData = await res.json().catch(() => ({}));
      alert(`Deletion failed: ${errData.message || 'Unauthorized or error occurred.'}`);
    }
  } catch (err) {
    alert('An error occurred during deletion.');
  }
}

