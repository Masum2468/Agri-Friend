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
    // Authenticated state
    // const isFarmer = currentUser.role === 'farmer';
    //modified by me
    const linkPath = '/dashboard';
    const linkText = 'Farm Dashboard';
    const linkIcon = 'fa-chalkboard-user';

    authContainer.innerHTML = `
      <a href="${linkPath}" class="btn btn-outline" style="margin-right: 10px;"><i class="fa-solid ${linkIcon}"></i> ${linkText}</a>
      <button onclick="handleLogout()" class="btn btn-primary" style="background: #c92a2a;"><i class="fa-solid fa-power-off"></i> Sign Out</button>
    `;
    if (heroBtn) {
      heroBtn.href = linkPath;
      heroBtn.innerHTML = `<i class="fa-solid ${linkIcon}"></i> Go to My ${linkText}`;
    }
    if (postListingBtn) {
      postListingBtn.style.display = 'inline-flex'; //modified by me
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
  } catch (err) {
    console.error('Error loading reference guides:', err);
  }
}

function renderGuides(filterQuery = '') {
  const grid = document.getElementById('guides-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const currentList = guidesData[activeTab] || [];
  const query = filterQuery.toLowerCase();

  const filtered = currentList.filter(item => {
    return (
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.scientificName && item.scientificName.toLowerCase().includes(query)) ||
      (item.type && item.type.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.targetCrops && item.targetCrops.toLowerCase().includes(query)) ||
      (item.pathogen && item.pathogen.toLowerCase().includes(query)) ||
      (item.activeIngredient && item.activeIngredient.toLowerCase().includes(query))
    );
  });
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">No advisory records match your query.</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'guide-card glass';

    const t = window.translateText || (x => x);

    if (activeTab === 'crops') {
      const typeText = t(item.type + ' Guide');
      const cropName = t(item.name);
      card.innerHTML = `
        <div class="card-type">${typeText}</div>
        <h3>${cropName}</h3>
        <div class="sub-tag">${item.scientificName}</div>
        <p class="desc">${item.description}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${t('Sowing Rate:')}</span><span class="value">${item.seedInfo.rate}</span></div>
          <div class="detail-row"><span class="label">${t('Sowing Depth:')}</span><span class="value">${item.seedInfo.depth}</span></div>
          <div class="detail-row"><span class="label">${t('Spacing:')}</span><span class="value">${item.seedInfo.spacing}</span></div>
          <div class="detail-row"><span class="label">${t('Varieties:')}</span><span class="value" style="font-size: 0.85rem;">${item.seedInfo.popularVarieties}</span></div>
          <div class="detail-row"><span class="label">${t('Soil pH:')}</span><span class="value">${item.optimalPH}</span></div>
          <div class="detail-row"><span class="label">${t('Duration:')}</span><span class="value">${item.growthDuration}</span></div>
        </div>
      `;
    } 
    else if (activeTab === 'diseases') {
      const headerTitle = t('Pathological Library');
      const agentLabel = t('Agent:');
      const suscLabel = t('Susceptible:');
      const sympLabel = t('Symptoms:');
      const prevLabel = t('Prevention:');
      const treatLabel = t('Treatment:');
      card.innerHTML = `
        <div class="card-type" style="color: #d90429;">${headerTitle}</div>
        <h3>${item.name}</h3>
        <div class="sub-tag">${agentLabel} ${item.pathogen}</div>
        <p class="desc"><strong>${suscLabel}</strong> ${item.targetCrops}</p>
        <p class="desc"><strong>${sympLabel}</strong> ${item.symptoms}</p>
        <div class="card-details" style="margin-top: 10px;">
          <div class="detail-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <span class="label"><i class="fa-solid fa-ban"></i> ${prevLabel}</span>
            <span class="value" style="font-size: 0.9rem;">${item.prevention}</span>
          </div>
          <div class="detail-row" style="flex-direction: column; align-items: flex-start; gap: 4px; margin-top: 8px;">
            <span class="label"><i class="fa-solid fa-prescription-bottle-medical"></i> ${treatLabel}</span>
            <span class="value" style="font-size: 0.9rem; color: #1b4332; font-weight: 600;">${item.treatment}</span>
          </div>
        </div>
      `;
    } 
    else if (activeTab === 'fertilizers') {
      const headerTitle = t('Soil Nutrients');
      const compLabel = t('Composition:');
      card.innerHTML = `
        <div class="card-type" style="color: #2a6f97;">${headerTitle}</div>
        <h3>${item.name}</h3>
        <div class="sub-tag">${compLabel} ${item.composition}</div>
        <p class="desc">${item.purpose}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${t('Category:')}</span><span class="value">${item.type}</span></div>
          <div class="detail-row"><span class="label">${t('Rate:')}</span><span class="value">${item.applicationRate}</span></div>
          <div class="detail-row"><span class="label">${t('Method:')}</span><span class="value">${item.method}</span></div>
          <div class="detail-row"><span class="label">${t('Target Crops:')}</span><span class="value" style="font-size: 0.85rem;">${item.targetCrops}</span></div>
        </div>
      `;
    } 
    else if (activeTab === 'pesticides') {
      const headerTitle = t('Pest Management');
      const activeLabel = t('Active:');
      const effLabel = t('Effective For:');
      card.innerHTML = `
        <div class="card-type" style="color: #e65f2b;">${headerTitle}</div>
        <h3>${item.name}</h3>
        <div class="sub-tag">${activeLabel} ${item.activeIngredient}</div>
        <p class="desc"><strong>${effLabel}</strong> ${item.targetPests}</p>
        <div class="card-details">
          <div class="detail-row"><span class="label">${t('Pesticide Type:')}</span><span class="value">${item.type}</span></div>
          <div class="detail-row"><span class="label">${t('Dilution Rate:')}</span><span class="value">${item.dilutionRate}</span></div>
          <div class="detail-row"><span class="label">${t('Harvest Wait:')}</span><span class="value" style="color: #c92a2a; font-weight: 600;">${item.safetyInterval}</span></div>
          <div class="detail-row" style="flex-direction: column; align-items: flex-start; gap: 4px; margin-top: 8px;">
            <span class="label"><i class="fa-solid fa-triangle-exclamation"></i> ${t('Safety:')}</span>
            <span class="value" style="font-size: 0.85rem;">${item.safetyInstructions}</span>
          </div>
        </div>
      `;
    }

    grid.appendChild(card);
  });
}

function switchTab(tabId) {
  activeTab = tabId;
  
  // Set active class on buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Find which button triggered and set active
  const targetBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(tabId));
  if (targetBtn) targetBtn.classList.add('active');

  // Clear search bar
  const searchInput = document.getElementById('guide-search-input');
  if (searchInput) searchInput.value = '';
  
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

