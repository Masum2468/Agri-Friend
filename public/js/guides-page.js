// AgriFriend Dedicated Knowledge Hub Pages Logic
// Fully bilingual (Bangla & English) rendering with live search & category filters
let guidesData = {
  crops: [],
  diseases: [],
  fertilizers: [],
  seasonal: [],
  calendar: []
};

let activeFilterTab = 'all';
let searchQuery = '';

// Load data from backend API
async function loadGuidesData() {
  try {
    const res = await fetch('/api/public/guides/all-centers');
    const data = await res.json();
    guidesData = data;
    renderCurrentPage();
  } catch (err) {
    console.error('Error loading guides data:', err);
  }
}

// Helper to get text based on current language
function getLang() {
  return (window.getCurrentLanguage && window.getCurrentLanguage()) || localStorage.getItem('language') || 'bn';
}

function getText(item, key) {
  if (!item) return '';
  const lang = getLang();
  if (lang === 'en') {
    return item[key + 'En'] || item[key + '_en'] || item[key] || '';
  }
  return item[key + 'Bn'] || item[key + '_bn'] || item[key] || '';
}

function resolveBilingual(val) {
  if (!val || typeof val !== 'string') return val || '';
  if (window.translateText) return window.translateText(val);
  return val;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Determine active page from body data-page-type
function renderCurrentPage() {
  const pageType = document.body.getAttribute('data-page-type');
  if (pageType === 'crops') renderCropsPage();
  else if (pageType === 'diseases') renderDiseasesPage();
  else if (pageType === 'fertilizers') renderFertilizersPage();
  else if (pageType === 'seasonal') renderSeasonalPage();
  else if (pageType === 'calendar') renderCalendarPage();

  if (window.applyTranslations) window.applyTranslations();
}

// --------------------------------------------------------------------------
// 1. CROPS GUIDE PAGE
// --------------------------------------------------------------------------
function renderCropsPage() {
  const container = document.getElementById('crops-grid');
  if (!container) return;
  container.innerHTML = '';

  const isEn = getLang() === 'en';
  const q = (searchQuery || '').toLowerCase().trim();
  const list = guidesData.crops || [];

  const filtered = list.filter(crop => {
    if (activeFilterTab !== 'all') {
      const type = (crop.type || crop.typeBn || crop.typeEn || '').toLowerCase();
      if (!type.includes(activeFilterTab.toLowerCase())) return false;
    }
    if (q) {
      const name = (crop.name || crop.nameBn || crop.nameEn || '').toLowerCase();
      const sci = (crop.scientificName || '').toLowerCase();
      const soil = (crop.idealSoil || crop.idealSoilBn || crop.idealSoilEn || '').toLowerCase();
      return name.includes(q) || sci.includes(q) || soil.includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = renderEmptyState(q);
    return;
  }

  filtered.forEach(crop => {
    const card = document.createElement('div');
    card.className = 'guide-card';

    const title = isEn ? (crop.nameEn || resolveBilingual(crop.name)) : (crop.nameBn || resolveBilingual(crop.name));
    const type = isEn ? (crop.typeEn || resolveBilingual(crop.type)) : (crop.typeBn || resolveBilingual(crop.type));
    const duration = isEn ? (crop.growthDurationEn || resolveBilingual(crop.growthDuration)) : (crop.growthDurationBn || resolveBilingual(crop.growthDuration));
    const soil = isEn ? (crop.idealSoilEn || resolveBilingual(crop.idealSoil)) : (crop.idealSoilBn || resolveBilingual(crop.idealSoil));
    const seedRate = isEn ? (crop.bighaSeedRateEn || resolveBilingual(crop.bighaSeedRate)) : (crop.bighaSeedRateBn || resolveBilingual(crop.bighaSeedRate));
    const water = isEn ? (crop.waterRequirementEn || resolveBilingual(crop.waterRequirement)) : (crop.waterRequirementBn || resolveBilingual(crop.waterRequirement));
    const varieties = crop.seedInfo && crop.seedInfo.popularVarieties ? resolveBilingual(crop.seedInfo.popularVarieties) : (isEn ? 'Recommended certified varieties' : 'উন্নত অনুমোদিত জাত');

    card.innerHTML = `
      <div class="guide-card-img-wrap">
        <img src="${crop.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600'}" alt="${title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600'">
        <div class="card-badge-top">${type}</div>
      </div>
      <div class="guide-card-content">
        <div class="crop-header">
          <h3>${title}</h3>
          <span class="crop-scientific"><em>${crop.scientificName || ''}</em></span>
        </div>
        <div class="crop-meta-grid">
          <div class="meta-item"><i class="fa-solid fa-clock"></i> <strong>${isEn ? 'Duration:' : 'জীবনকাল:'}</strong> ${duration}</div>
          <div class="meta-item"><i class="fa-solid fa-vial"></i> <strong>${isEn ? 'Soil pH:' : 'মাটির pH:'}</strong> ${crop.optimalPH || '6.0 - 7.0'}</div>
          <div class="meta-item"><i class="fa-solid fa-seedling"></i> <strong>${isEn ? 'Seed Rate / Bigha:' : 'বিঘা প্রতি বীজ:'}</strong> ${seedRate}</div>
          <div class="meta-item"><i class="fa-solid fa-mountain"></i> <strong>${isEn ? 'Suitable Soil:' : 'উপযুক্ত মাটি:'}</strong> ${soil}</div>
          <div class="meta-item" style="grid-column: 1/-1;"><i class="fa-solid fa-droplet" style="color: #0284c7;"></i> <strong>${isEn ? 'Watering:' : 'পানির চাহিদা:'}</strong> ${water}</div>
        </div>
        <div class="varieties-box">
          <i class="fa-solid fa-star" style="color: #f59e0b;"></i> <strong>${isEn ? 'Recommended Varieties:' : 'উন্নত জাতসমূহ:'}</strong> ${varieties}
        </div>
        <div class="card-action-links">
          <a href="/fertilizer-guide.html?crop=${encodeURIComponent(title)}" class="btn-sub-link"><i class="fa-solid fa-flask"></i> ${isEn ? 'Fertilizers & Inputs' : 'সার ও উপকরণ'}</a>
          <a href="/disease-guide.html?crop=${encodeURIComponent(title)}" class="btn-sub-link btn-danger-link"><i class="fa-solid fa-bug"></i> ${isEn ? 'Diseases & Pests' : 'রোগবালাই ও প্রতিকার'}</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 2. DISEASES & PESTICIDES PAGE
// --------------------------------------------------------------------------
function renderDiseasesPage() {
  const container = document.getElementById('diseases-grid');
  if (!container) return;
  container.innerHTML = '';

  const isEn = getLang() === 'en';
  const q = (searchQuery || '').toLowerCase().trim();
  const list = guidesData.diseases || [];

  const filtered = list.filter(d => {
    if (activeFilterTab !== 'all') {
      const crop = (d.crop || d.crop_bn || d.crop_en || '').toLowerCase();
      if (!crop.includes(activeFilterTab.toLowerCase())) return false;
    }
    if (q) {
      const name = (d.name || d.name_bn || d.name_en || '').toLowerCase();
      const crop = (d.crop || d.crop_bn || d.crop_en || '').toLowerCase();
      const sym = (d.symptoms || d.symptoms_bn || d.symptoms_en || '').toLowerCase();
      const pest = (d.pesticide || d.pesticide_bn || d.pesticide_en || '').toLowerCase();
      return name.includes(q) || crop.includes(q) || sym.includes(q) || pest.includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = renderEmptyState(q);
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'guide-card disease-card';

    const title = isEn ? (item.name_en || resolveBilingual(item.name)) : (item.name_bn || resolveBilingual(item.name));
    const crop = isEn ? (item.crop_en || resolveBilingual(item.crop)) : (item.crop_bn || resolveBilingual(item.crop));
    const symptoms = isEn ? (item.symptoms_en || item.symptoms) : (item.symptoms_bn || item.symptoms);
    const prevention = isEn ? (item.prevention_en || item.prevention) : (item.prevention_bn || item.prevention);
    const pesticide = isEn ? (item.pesticide_en || item.pesticide) : (item.pesticide_bn || item.pesticide);
    const organic = isEn ? (item.organicTreatment_en || item.organicTreatment) : (item.organicTreatment_bn || item.organicTreatment);
    const notice = isEn ? (item.emergencyNoticeEn || item.emergencyNotice) : (item.emergencyNoticeBn || item.emergencyNotice);

    card.innerHTML = `
      <div class="guide-card-img-wrap">
        <img src="${item.image || 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600'}" alt="${title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600'">
        <div class="card-badge-top badge-danger"><i class="fa-solid fa-triangle-exclamation"></i> ${crop}</div>
      </div>
      <div class="guide-card-content">
        <h3 style="color: #991b1b; margin-bottom: 6px;">${title}</h3>
        <span class="crop-scientific" style="display: block; margin-bottom: 12px;"><em>${item.pathogen || ''}</em></span>

        <div class="info-block">
          <h4 style="color: #b91c1c;"><i class="fa-solid fa-magnifying-glass"></i> ${isEn ? 'Symptoms & Causes:' : 'লক্ষণ ও কারণ:'}</h4>
          <p>${symptoms}</p>
        </div>

        <div class="info-block">
          <h4 style="color: #047857;"><i class="fa-solid fa-shield-halved"></i> ${isEn ? 'Prevention & Cultural Care:' : 'প্রতিরোধমূলক ব্যবস্থা:'}</h4>
          <p>${prevention}</p>
        </div>

        <div class="prescription-box">
          <h4><i class="fa-solid fa-prescription"></i> ${isEn ? 'Pesticide Prescription & Dosage:' : 'কীটনাশক প্রেসক্রিপশন ও ১৬ লিটার ট্যাংকের ডোজ:'}</h4>
          <p style="margin: 0; font-weight: 600; color: #7f1d1d;">${pesticide}</p>
        </div>

        ${organic ? `
          <div class="info-block" style="margin-top: 10px; background: #f0fdf4; padding: 10px; border-radius: 8px; border: 1px dashed #86efac;">
            <h4 style="color: #15803d; margin-bottom: 4px;"><i class="fa-solid fa-leaf"></i> ${isEn ? 'Organic / Herbal Remedy:' : 'জৈব ও দেশি টোটকা:'}</h4>
            <p style="margin: 0; color: #166534; font-size: 0.9rem;">${organic}</p>
          </div>
        ` : ''}

        ${notice ? `
          <div style="margin-top: 10px; padding: 8px 12px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b; font-size: 0.85rem; color: #92400e;">
            <i class="fa-solid fa-circle-exclamation"></i> <strong>${isEn ? 'Alert:' : 'সতর্কতা:'}</strong> ${notice}
          </div>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 3. FERTILIZER & CROP INPUTS GUIDE (20+ Cards with Application Instructions)
// --------------------------------------------------------------------------
function renderFertilizersPage() {
  const container = document.getElementById('fertilizers-grid');
  if (!container) return;
  container.innerHTML = '';

  const isEn = getLang() === 'en';
  const q = (searchQuery || '').toLowerCase().trim();
  const list = guidesData.fertilizers || [];

  const filtered = list.filter(item => {
    if (activeFilterTab !== 'all') {
      const cat = (item.category || '').toLowerCase();
      const type = (item.type || item.typeBn || item.typeEn || '').toLowerCase();
      if (activeFilterTab === 'fertilizer') {
        if (!(cat === 'fertilizer' || type.includes('fertilizer') || type.includes('সার'))) return false;
      } else if (activeFilterTab === 'pesticide') {
        if (!(cat === 'pesticide' || type.includes('pesticide') || type.includes('insecticide') || type.includes('কীটনাশক') || type.includes('বালাইনাশক'))) return false;
      } else if (activeFilterTab === 'fungicide') {
        if (!(cat === 'fungicide' || type.includes('fungicide') || type.includes('ছত্রাকনাশক'))) return false;
      } else if (activeFilterTab === 'organic') {
        if (!(cat === 'organic' || type.includes('organic') || type.includes('জৈব'))) return false;
      }
    }
    if (q) {
      const name = (item.name || item.nameBn || item.nameEn || '').toLowerCase();
      const purpose = (item.purpose || item.purposeBn || item.purposeEn || '').toLowerCase();
      const usage = (item.usageMethod || item.usageMethodBn || item.usageMethodEn || '').toLowerCase();
      const crops = (item.targetCrops || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      const type = (item.type || item.typeBn || item.typeEn || '').toLowerCase();
      return name.includes(q) || purpose.includes(q) || usage.includes(q) || crops.includes(q) || cat.includes(q) || type.includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = renderEmptyState(q);
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'guide-card';

    const title = isEn ? (item.nameEn || resolveBilingual(item.name)) : (item.nameBn || resolveBilingual(item.name));
    const type = isEn ? (item.typeEn || resolveBilingual(item.type)) : (item.typeBn || resolveBilingual(item.type));
    const purpose = isEn ? (item.purposeEn || item.purpose) : (item.purposeBn || item.purpose);
    const usage = isEn ? (item.usageMethodEn || item.usageMethod) : (item.usageMethodBn || item.usageMethod);
    const precaution = isEn ? (item.precautionEn || item.precaution) : (item.precautionBn || item.precaution);
    const dosage = isEn ? (item.dosageEn || item.dosage) : (item.dosageBn || item.dosage);
    const targetCrops = resolveBilingual(item.targetCrops || 'All Crops');

    // Category styling
    let badgeClass = 'card-badge-top';
    if (item.category === 'pesticide') badgeClass += ' badge-danger';
    else if (item.category === 'fungicide') badgeClass += ' badge-warning';
    else if (item.category === 'organic') badgeClass += ' badge-success';

    card.innerHTML = `
      <div class="guide-card-img-wrap">
        <img src="${item.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600'}" alt="${title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600'">
        <div class="${badgeClass}">${type}</div>
      </div>
      <div class="guide-card-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
          <h3 style="color: #047857; margin: 0; font-size: 1.25rem;">${title}</h3>
        </div>
        
        <p style="color: #64748b; font-size: 0.88rem; margin-bottom: 12px;">
          <i class="fa-solid fa-wheat-awn" style="color: #10b981;"></i> <strong>${isEn ? 'Applicable Crops:' : 'প্রযোজ্য ফসল:'}</strong> ${targetCrops}
        </p>

        <div class="info-block">
          <h4 style="color: #047857;"><i class="fa-solid fa-seedling"></i> ${isEn ? 'Role & Benefits:' : 'কাজের ভূমিকা ও উপকারিতা:'}</h4>
          <p>${purpose}</p>
        </div>

        <div class="info-block" style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 12px; border-radius: 8px; margin: 10px 0;">
          <h4 style="color: #0369a1;"><i class="fa-solid fa-hand-holding-droplet"></i> ${isEn ? 'How to Apply & Exact Dosage:' : 'কী করে ব্যবহার করবে ও সঠিক মাত্রা:'}</h4>
          <p style="margin: 0; color: #1e293b; line-height: 1.5;">${usage}</p>
          ${dosage ? `<div style="margin-top: 8px; font-weight: 700; color: #0284c7; font-size: 0.9rem;"><i class="fa-solid fa-gauge-high"></i> ${isEn ? 'Standard Dose:' : 'প্রস্তাবিত ডোজ:'} ${dosage}</div>` : ''}
        </div>

        ${precaution ? `
          <div class="prescription-box" style="border-left-color: #ef4444; background: #fef2f2; padding: 10px; margin-top: 10px;">
            <h4 style="color: #b91c1c; font-size: 0.9rem; margin-bottom: 4px;"><i class="fa-solid fa-triangle-exclamation"></i> ${isEn ? 'Precaution & Safety:' : 'সতর্কতা ও কৃষকের করণীয়:'}</h4>
            <p style="margin: 0; color: #991b1b; font-size: 0.88rem;">${precaution}</p>
          </div>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 4. SEASONAL ADVISORY PAGE
// --------------------------------------------------------------------------
function renderSeasonalPage() {
  const container = document.getElementById('seasonal-grid');
  if (!container) return;
  container.innerHTML = '';

  const isEn = getLang() === 'en';
  const list = guidesData.seasonal || [];
  const q = (searchQuery || '').toLowerCase().trim();

  const filtered = list.filter(item => {
    if (activeFilterTab !== 'all') {
      const season = (item.season || item.season_bn || item.season_en || '').toLowerCase();
      if (!season.includes(activeFilterTab.toLowerCase())) return false;
    }
    if (q) {
      const title = (item.title || item.title_bn || item.title_en || '').toLowerCase();
      const desc = (item.description || item.description_bn || item.description_en || '').toLowerCase();
      return title.includes(q) || desc.includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = renderEmptyState(q);
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'guide-card';

    const title = isEn ? (item.title_en || resolveBilingual(item.title)) : (item.title_bn || resolveBilingual(item.title));
    const season = isEn ? (item.season_en || resolveBilingual(item.season)) : (item.season_bn || resolveBilingual(item.season));
    const period = isEn ? (item.period_en || resolveBilingual(item.period)) : (item.period_bn || resolveBilingual(item.period));
    const crops = isEn ? (item.crops_en || resolveBilingual(item.crops)) : (item.crops_bn || resolveBilingual(item.crops));
    const desc = isEn ? (item.description_en || item.description) : (item.description_bn || item.description);
    const prep = isEn ? (item.preparation || item.prep_bn) : (item.prep_bn || item.preparation);

    card.innerHTML = `
      <div class="guide-card-img-wrap">
        <img src="${item.image || 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=700'}" alt="${title}" loading="lazy">
        <div class="card-badge-top">${season}</div>
      </div>
      <div class="guide-card-content">
        <h3 style="color: #1e3a8a; margin-bottom: 6px;">${title}</h3>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 12px;"><i class="fa-regular fa-calendar"></i> <strong>${isEn ? 'Period:' : 'সময়কাল:'}</strong> ${period}</p>
        
        <div class="info-block">
          <h4 style="color: #047857;"><i class="fa-solid fa-wheat-awn"></i> ${isEn ? 'Recommended Crops:' : 'উপযুক্ত প্রধান ফসলসমূহ:'}</h4>
          <p>${crops}</p>
        </div>

        <div class="info-block">
          <h4 style="color: #334155;"><i class="fa-solid fa-file-lines"></i> ${isEn ? 'Directives & Care:' : 'মৌসুমভিত্তিক দিকনির্দেশনা:'}</h4>
          <p>${desc}</p>
        </div>

        <div class="prescription-box" style="border-left-color: #f59e0b; background: #fffbeb;">
          <h4 style="color: #b45309;"><i class="fa-solid fa-triangle-exclamation"></i> ${isEn ? 'Disaster Preparation & Emergency Advice:' : 'দুর্যোগ প্রস্তুতি ও জরুরি পরামর্শ:'}</h4>
          <p style="margin: 0; color: #78350f;">${prep}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 5. CROP CALENDAR PAGE (12 Months Calendar + Crop Milestones)
// --------------------------------------------------------------------------
function renderCalendarPage() {
  const container = document.getElementById('calendar-grid');
  if (!container) return;
  container.innerHTML = '';

  const isEn = getLang() === 'en';
  const list = guidesData.calendar || [];
  const q = (searchQuery || '').toLowerCase().trim();

  const filtered = list.filter(item => {
    if (activeFilterTab !== 'all') {
      if (activeFilterTab === 'milestones') {
        if (!item.milestones) return false;
      } else {
        const m = (item.month || item.month_bn || item.month_en || '').toLowerCase();
        if (!m.includes(activeFilterTab.toLowerCase())) return false;
      }
    }
    if (q) {
      const m = (item.month || item.month_bn || item.month_en || item.name || '').toLowerCase();
      const crops = (item.crops || item.crops_bn || item.crops_en || '').toLowerCase();
      const tasks = (item.tasks || item.tasks_bn || item.tasks_en || '').toLowerCase();
      return m.includes(q) || crops.includes(q) || tasks.includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = renderEmptyState(q);
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'guide-card calendar-card';

    // If it's a 12-month calendar item
    if (item.isMonth || item.month || item.month_bn) {
      const month = isEn ? (item.month_en || resolveBilingual(item.month)) : (item.month_bn || resolveBilingual(item.month));
      const engMonth = isEn ? (item.englishMonthsEn || item.englishMonths) : (item.englishMonths || item.englishMonthsEn);
      const season = isEn ? (item.season_en || resolveBilingual(item.season)) : (item.season_bn || resolveBilingual(item.season));
      const crops = isEn ? (item.crops_en || item.crops) : (item.crops_bn || item.crops);
      const tasks = isEn ? (item.tasks_en || item.tasks) : (item.tasks_bn || item.tasks);
      const pestAlert = isEn ? (item.pestAlertEn || item.pestAlert) : (item.pestAlertBn || item.pestAlert);
      const tips = item.tips || '';

      card.innerHTML = `
        <div class="calendar-card-header">
          <div class="calendar-month-badge">
            <i class="fa-regular fa-calendar-check"></i> ${month}
          </div>
          <span class="cal-eng-sub">${engMonth}</span>
        </div>
        <div class="guide-card-content" style="padding-top: 15px;">
          <div style="margin-bottom: 10px;">
            <span class="card-badge-top" style="position: static; display: inline-block;">${season}</span>
          </div>

          <div class="info-block">
            <h4 style="color: #1b5f43;"><i class="fa-solid fa-seedling"></i> ${isEn ? 'Crops Sown/Planted This Month:' : 'চলতি মাসের আবাদযোগ্য ফসল:'}</h4>
            <p>${crops}</p>
          </div>

          <div class="info-block">
            <h4 style="color: #047857;"><i class="fa-solid fa-list-check"></i> ${isEn ? 'Key Farm Actions & Irrigation:' : 'প্রধান করণীয় কৃষি কাজ ও সেচ:'}</h4>
            <p>${tasks}</p>
          </div>

          ${pestAlert ? `
            <div class="info-block" style="background: #fef2f2; border-left: 3px solid #ef4444; padding: 8px 12px; border-radius: 6px;">
              <h4 style="color: #b91c1c; font-size: 0.9rem; margin-bottom: 3px;"><i class="fa-solid fa-shield-virus"></i> ${isEn ? 'Pest & Disease Advisory:' : 'রোগবালাই ও পোকা দমন সতর্কতা:'}</h4>
              <p style="margin: 0; color: #991b1b; font-size: 0.88rem;">${pestAlert}</p>
            </div>
          ` : ''}

          ${tips ? `
            <div style="margin-top: 10px; font-size: 0.85rem; color: #475569; background: #f8fafc; padding: 6px 10px; border-radius: 6px;">
              <i class="fa-solid fa-lightbulb" style="color: #eab308;"></i> <strong>${isEn ? 'Farmer Tip:' : 'কৃষকের টিপস:'}</strong> ${tips}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      // Crop milestone timeline item
      const title = isEn ? (item.name_en || resolveBilingual(item.name)) : (item.name_bn || resolveBilingual(item.name));
      const milestonesHTML = (item.milestones || []).map((m, idx) => `
        <div style="margin-bottom: 10px; padding-left: 12px; border-left: 2px solid #10b981;">
          <div style="font-weight: 700; color: #065f46; font-size: 0.95rem;">${idx + 1}. ${m.phase}</div>
          <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 2px;"><i class="fa-regular fa-clock"></i> ${m.timing}</div>
          <div style="font-size: 0.88rem; color: #1e293b;">${m.task}</div>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="guide-card-img-wrap">
          <img src="${item.image || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'}" alt="${title}" loading="lazy">
          <div class="card-badge-top">${item.season || 'মৌসুম'}</div>
        </div>
        <div class="guide-card-content">
          <h3 style="color: #047857; margin-bottom: 12px;"><i class="fa-solid fa-timeline"></i> ${title}</h3>
          <div class="milestones-box">
            ${milestonesHTML}
          </div>
        </div>
      `;
    }
    container.appendChild(card);
  });
}

function renderEmptyState(query) {
  const isEn = getLang() === 'en';
  return `
    <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1; margin: 20px 0;">
      <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 12px;"></i>
      <h3 style="color: #334155; margin-bottom: 8px;">${isEn ? 'No results found' : 'কোনো ফলাফল পাওয়া যায়নি'}</h3>
      <p style="color: #64748b;">"${escapeHtml(query)}" ${isEn ? 'did not match any item.' : 'এর সাথে মিলে এমন কোনো তথ্য নেই।'}</p>
      <button class="btn btn-outline" style="margin-top: 16px;" onclick="resetSearch()">${isEn ? 'Reset Search' : 'অনুসন্ধান রিসেট করুন'}</button>
    </div>
  `;
}

function handleSearchInput(val) {
  searchQuery = val.trim();
  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) clearBtn.style.display = searchQuery ? 'flex' : 'none';
  renderCurrentPage();
}

function resetSearch() {
  searchQuery = '';
  const input = document.getElementById('search-input');
  if (input) input.value = '';
  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';
  activeFilterTab = 'all';
  document.querySelectorAll('.filter-pill').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-tab') === 'all');
  });
  renderCurrentPage();
}

function setFilterTab(tab, btn) {
  activeFilterTab = tab;
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCurrentPage();
}

// Interactive Fertilizer Calculator
function calculateFertilizer() {
  const cropSelect = document.getElementById('calc-crop');
  const sizeInput = document.getElementById('calc-size');
  const resultBox = document.getElementById('calc-results');
  if (!cropSelect || !sizeInput || !resultBox) return;

  const isEn = getLang() === 'en';
  const bigha = parseFloat(sizeInput.value) || 1;
  const crop = cropSelect.value;

  const rates = {
    rice: { urea: 33, tsp: 18, mop: 22, gypsum: 10, zinc: 1.5 },
    wheat: { urea: 35, tsp: 20, mop: 20, gypsum: 12, zinc: 1.5 },
    potato: { urea: 40, tsp: 30, mop: 35, gypsum: 15, zinc: 2 },
    maize: { urea: 45, tsp: 25, mop: 25, gypsum: 15, zinc: 2 },
    tomato: { urea: 35, tsp: 28, mop: 30, gypsum: 12, zinc: 1.5 }
  };

  const r = rates[crop] || rates.rice;
  const unit = isEn ? 'kg' : 'কেজি';

  resultBox.innerHTML = `
    <div class="calc-res-grid">
      <div class="res-item"><span>${isEn ? 'Urea:' : 'ইউরিয়া (Urea):'}</span> <strong>${(r.urea * bigha).toFixed(1)} ${unit}</strong></div>
      <div class="res-item"><span>${isEn ? 'TSP:' : 'টিএসপি (TSP):'}</span> <strong>${(r.tsp * bigha).toFixed(1)} ${unit}</strong></div>
      <div class="res-item"><span>${isEn ? 'MOP:' : 'এমওপি (MOP):'}</span> <strong>${(r.mop * bigha).toFixed(1)} ${unit}</strong></div>
      <div class="res-item"><span>${isEn ? 'Gypsum:' : 'জিপসাম (Gypsum):'}</span> <strong>${(r.gypsum * bigha).toFixed(1)} ${unit}</strong></div>
      <div class="res-item"><span>${isEn ? 'Zinc Sulphate:' : 'জিঙ্ক সালফেট:'}</span> <strong>${(r.zinc * bigha).toFixed(1)} ${unit}</strong></div>
    </div>
  `;
}

// Listen to global language change event
document.addEventListener('languagechanged', () => {
  renderCurrentPage();
  calculateFertilizer();
});

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('nav-open');
    });
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('nav-open');
      }
    });
  }
  // Parse URL search parameters if any
  try {
    const params = new URLSearchParams(window.location.search);
    const cropParam = params.get('crop');
    const tabParam = params.get('tab');
    if (cropParam) {
      searchQuery = cropParam;
      const input = document.getElementById('search-input');
      if (input) input.value = cropParam;
      const clearBtn = document.getElementById('search-clear-btn');
      if (clearBtn) clearBtn.style.display = 'flex';
    }
    if (tabParam) {
      activeFilterTab = tabParam;
      document.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-tab') === tabParam);
      });
    }
  } catch (err) {
    console.error('URL params error:', err);
  }

  loadGuidesData();
});
