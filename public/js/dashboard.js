// Dashboard Global State
let currentUser = null;
let currentFarms = [];
let currentCrops = [];
let currentInventory = [];
let currentEquipment = [];
let currentFinance = [];
let currentHarvests = [];
let currentSales = [];
let currentNotifications = [];
let currentActiveSection = 'overview';
let currentDashboardWeatherData = null;

// Chart references
let financialChartRef = null;
let cropChartRef = null;
let harvestChartRef = null;

// Section title mapping for translations
const dashboardSectionTitles = {
  overview: 'Farmer Console Overview',
  farms: 'My Farm Fields',
  crops: 'Seasonal Crop Scheduler',
  inventory: 'Inventory & Resource Ledger',
  equipment: 'Operations Equipment Logs',
  finance: 'Cash Flow Ledgers',
  harvest: 'Harvest yields & Sale Logs',
  reports: 'Analytical Charts & Reports',
  notifications: 'Alert Center Notifications'
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set default dates in form inputs to today
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = ['crop-planted', 'crop-expected', 'fin-date', 'har-date', 'sale-date'];
  dateInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = today;
  });

  checkDashboardAuth();
});

// Re-render dynamic dashboard content on language change
document.addEventListener('languagechanged', () => {
  const t = window.translateText || (x => x);
  const titleText = dashboardSectionTitles[currentActiveSection] || 'Farmer Console';
  const titleEl = document.getElementById('dash-title');
  if (titleEl) titleEl.innerText = t(titleText);

  renderDashboardWeatherCard();
  renderOverviewTables();
  renderFarmsTable();
  renderCropsTable();
  renderInventoryTable();
  renderEquipmentTable();
  renderFinanceTable();
  renderHarvestAndSalesTables();
  renderNotificationsList();
  if (window.applyTranslations) window.applyTranslations();
});

// ----------------------------------------------------
// AUTH AND INITIAL SETUP
// ----------------------------------------------------
async function checkDashboardAuth() {
  try {
    const res = await fetch('/api/auth/me');
    if (!res.ok) {
      window.location.href = '/login';
      return;
    }
    
    currentUser = await res.json();
    
    // if (currentUser.role !== 'farmer') {
    //   window.location.href = '/admin'; // Redirect admins to admin console
    //   return;
    // }

    // Set User Profile UI values
    document.getElementById('user-display-name').innerText = currentUser.username;
    
    // Load all data
    await loadAllDashboardData();
    
    // Check farmer weather location, default to Dhaka
    if (currentUser.location && currentUser.location.trim().length > 0) {
      fetchDashboardWeather(currentUser.location);
    } else {
      fetchDashboardWeather('Dhaka');
    }

  } catch (err) {
    window.location.href = '/login';
  }
}

async function loadAllDashboardData() {
  try {
    // Perform parallel fetches
    const [farmsRes, cropsRes, invRes, eqRes, finRes, harRes, salesRes, notifRes] = await Promise.all([
      fetch('/api/dashboard/farms'),
      fetch('/api/dashboard/crops'),
      fetch('/api/dashboard/inventory'),
      fetch('/api/dashboard/equipment'),
      fetch('/api/dashboard/finance'),
      fetch('/api/dashboard/harvest'),
      fetch('/api/dashboard/sales'),
      fetch('/api/dashboard/notifications')
    ]);

    currentFarms = await farmsRes.json();
    currentCrops = await cropsRes.json();
    currentInventory = await invRes.json();
    currentEquipment = await eqRes.json();
    currentFinance = await finRes.json();
    currentHarvests = await harRes.json();
    currentSales = await salesRes.json();
    currentNotifications = await notifRes.json();

    // Populate dropdowns & stats
    populateDropdowns();
    updateStatsCards();
    renderOverviewTables();
    
    // Render specific tables
    renderFarmsTable();
    renderCropsTable();
    renderInventoryTable();
    renderEquipmentTable();
    renderFinanceTable();
    renderHarvestAndSalesTables();
    renderNotificationsList();

  } catch (err) {
    console.error('Error fetching dashboard datasets:', err);
  }
}

// ----------------------------------------------------
// METRIC STAT CARDS
// ----------------------------------------------------
function updateStatsCards() {
  // 1. Finance math
  let totalIncome = 0;
  let totalExpenses = 0;
  currentFinance.forEach(f => {
    const amt = parseFloat(f.amount) || 0;
    if (f.type === 'Income') totalIncome += amt;
    else totalExpenses += amt;
  });

  document.getElementById('card-total-revenue').innerText = `${totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}TK`;
  document.getElementById('card-total-expenses').innerText = `${totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}TK`;

  // 2. Active crops
  const activeCount = currentCrops.filter(c => c.status === 'Planted' || c.status === 'Growing').length;
  document.getElementById('card-active-crops').innerText = activeCount;

  // 3. Low stock inventory items
  const lowStockCount = currentInventory.filter(i => parseFloat(i.quantity) < parseFloat(i.minThreshold)).length;
  document.getElementById('card-low-stock').innerText = lowStockCount;
}
// ----------------------------------------------------
// DROPDOWN INJECTORS
// ----------------------------------------------------
function populateDropdowns() {
  // Farm list for crop sowing
  const cropFarmSelect = document.getElementById('crop-farm');
  cropFarmSelect.innerHTML = '';
  if (currentFarms.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.innerText = '-- Register field first --';
    cropFarmSelect.appendChild(opt);
  } else {
    currentFarms.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f._id;
      opt.innerText = `${f.name} (${f.size} Acres)`;
      cropFarmSelect.appendChild(opt);
    });
  }
  // Active crop list for harvest record
  const harCropSelect = document.getElementById('har-crop');
  harCropSelect.innerHTML = '';
  const activeCropsList = currentCrops.filter(c => c.status === 'Planted' || c.status === 'Growing');
  if (activeCropsList.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.innerText = '-- No active crops available --';
    harCropSelect.appendChild(opt);
  } else {
    activeCropsList.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c._id;
      opt.innerText = `${c.name} - ${c.variety}`;
      harCropSelect.appendChild(opt);
    });
  }

  // Harvest reference for sales log
  const saleHarvestSelect = document.getElementById('sale-harvest');
  saleHarvestSelect.innerHTML = '';
  if (currentHarvests.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.innerText = '-- No yields harvested yet --';
    saleHarvestSelect.appendChild(opt);
  } else {
    currentHarvests.forEach(h => {
      const crop = currentCrops.find(c => c._id === h.cropId);
      const cName = crop ? crop.name : 'Unknown Crop';
      const opt = document.createElement('option');
      opt.value = h._id;
      opt.innerText = `${cName} - ${h.quantity} ${h.unit} (Quality: ${h.quality})`;
      saleHarvestSelect.appendChild(opt);
    });
  }
}

// ----------------------------------------------------
// SECTION SWITCH NAVIGATION
// ----------------------------------------------------
function switchSection(sectionId) {
  // Highlight active sidebar link
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => item.classList.remove('active'));
  
  // Find matching sidebar item
  const targetItem = Array.from(sidebarItems).find(item => item.getAttribute('onclick').includes(sectionId));
  if (targetItem) targetItem.classList.add('active');

  // Toggle active section div
  const sections = document.querySelectorAll('.dash-section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(`section-${sectionId}`).classList.add('active');

  // Set top header label text
  currentActiveSection = sectionId;
  const titleText = dashboardSectionTitles[sectionId] || 'Farmer Console';
  const t = window.translateText || (x => x);
  document.getElementById('dash-title').innerText = t(titleText);
  
  // If reports tab, load and render charts
  if (sectionId === 'reports') {
    loadReportsCharts();
  }
}

// ----------------------------------------------------
// TABLE RENDERS
// ----------------------------------------------------

function renderOverviewTables() {
  const t = window.translateText || (x => x);

  // Crops overview (Recent 5)
  const cropsBody = document.getElementById('overview-crops-table');
  cropsBody.innerHTML = '';
  const sortedCrops = [...currentCrops].sort((a,b) => new Date(b.plantingDate) - new Date(a.plantingDate)).slice(0, 5);
  
  if (sortedCrops.length === 0) {
    cropsBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-light);">${t('No crops registered yet.')}</td></tr>`;
  } else {
    sortedCrops.forEach(c => {
      const tr = document.createElement('tr');
      const statusLabel = t(c.status);
      tr.innerHTML = `
        <td><strong>${c.name}</strong><br><span style="font-size:0.8rem; color:var(--text-light);">${c.variety}</span></td>
        <td>${new Date(c.plantingDate).toLocaleDateString()}</td>
        <td>${new Date(c.expectedHarvestDate).toLocaleDateString()}</td>
        <td><span class="status-badge status-${c.status.toLowerCase()}">${statusLabel}</span></td>
      `;
      cropsBody.appendChild(tr);
    });
  }

  // Finance overview (Recent 5)
  const finBody = document.getElementById('overview-finance-table');
  finBody.innerHTML = '';
  const recentFinance = currentFinance.slice(0, 5);

  if (recentFinance.length === 0) {
    finBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-light);">${t('No transactions recorded.')}</td></tr>`;
  } else {
    recentFinance.forEach(f => {
      const tr = document.createElement('tr');
      const typeLabel = t(f.type);
      const catLabel = t(f.category);
      tr.innerHTML = `
        <td>${new Date(f.date).toLocaleDateString()}</td>
        <td>${catLabel}</td>
        <td><span class="type-${f.type.toLowerCase()}">${typeLabel}</span></td>
        <td class="type-${f.type.toLowerCase()}">${f.type === 'Income' ? '+' : '-'}$${parseFloat(f.amount).toFixed(2)}</td>
        <td style="font-size:0.85rem; color:var(--text-light); max-width:250px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${f.description || '-'}</td>
      `;
      finBody.appendChild(tr);
    });
  }
}

function renderFarmsTable() {
  const t = window.translateText || (x => x);
  const body = document.getElementById('farms-table-body');
  body.innerHTML = '';
  if (currentFarms.length === 0) {
    body.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-light);">${t("No field plots registered. Click 'Add New Field' to start.")}</td></tr>`;
    return;
  }
  currentFarms.forEach(f => {
    const tr = document.createElement('tr');
    const soilLabel = t(f.soilType);
    const deleteBtn = t('Delete');
    tr.innerHTML = `
      <td><strong>${f.name}</strong></td>
      <td>${f.location}</td>
      <td>${f.size} ${t('Acres')}</td>
      <td>${soilLabel}</td>
      <td style="font-size:0.9rem; color:var(--text-light);">${f.description || '-'}</td>
      <td>
        <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteFarm('${f._id}')"><i class="fa-solid fa-trash"></i> ${deleteBtn}</button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function renderCropsTable() {
  const t = window.translateText || (x => x);
  const body = document.getElementById('crops-table-body');
  body.innerHTML = '';
  if (currentCrops.length === 0) {
    body.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-light);">${t("No crops active. Click 'Plant Crop' to log.")}</td></tr>`;
    return;
  }
  currentCrops.forEach(c => {
    const farm = currentFarms.find(f => f._id === c.farmId);
    const farmName = farm ? farm.name : 'Unknown Plot';
    const tr = document.createElement('tr');
    const statusLabel = t(c.status);
    const updateBtn = t('Update');
    const deleteBtn = t('Delete');
    tr.innerHTML = `
      <td><strong>${c.name}</strong></td>
      <td>${c.variety}</td>
      <td>${farmName}</td>
      <td>${new Date(c.plantingDate).toLocaleDateString()}</td>
      <td>${new Date(c.expectedHarvestDate).toLocaleDateString()}</td>
      <td><span class="status-badge status-${c.status.toLowerCase()}">${statusLabel}</span></td>
      <td style="font-size:0.85rem; color:var(--text-light); max-width:180px;">${c.notes || '-'}</td>
      <td>
        <button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem; margin-right:5px;" onclick="openEditCropModal('${c._id}', '${c.status}', '${c.notes}')"><i class="fa-solid fa-pen"></i> ${updateBtn}</button>
        <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteCrop('${c._id}')"><i class="fa-solid fa-trash"></i> ${deleteBtn}</button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function renderInventoryTable() {
  const t = window.translateText || (x => x);
  const body = document.getElementById('inventory-table-body');
  body.innerHTML = '';
  if (currentInventory.length === 0) {
    body.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-light);">${t("No inventory records. Click 'Add Stock Item' to record resource stocks.")}</td></tr>`;
    return;
  }
  currentInventory.forEach(item => {
    const isLow = parseFloat(item.quantity) < parseFloat(item.minThreshold);
    const tr = document.createElement('tr');
    const typeLabel = t(item.type);
    const restockBtn = t('Restock');
    const deleteBtn = t('Delete');
    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td>${typeLabel}</td>
      <td style="${isLow ? 'color:var(--danger); font-weight:700;' : ''}">${item.quantity} ${isLow ? '<i class="fa-solid fa-triangle-exclamation"></i> ' + t('Low') : ''}</td>
      <td>${item.unit}</td>
      <td>${item.minThreshold} ${item.unit}</td>
      <td style="font-size:0.85rem; color:var(--text-light);">${item.notes || '-'}</td>
      <td>
        <button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem; margin-right:5px;" onclick="addStockQuick('${item._id}', ${item.quantity})"><i class="fa-solid fa-plus"></i> ${restockBtn}</button>
        <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteInventory('${item._id}')"><i class="fa-solid fa-trash"></i> ${deleteBtn}</button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function renderEquipmentTable() {
  const t = window.translateText || (x => x);
  const body = document.getElementById('equipment-table-body');
  body.innerHTML = '';
  if (currentEquipment.length === 0) {
    body.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-light);">${t('No operational equipment logged.')}</td></tr>`;
    return;
  }
  currentEquipment.forEach(eq => {
    const tr = document.createElement('tr');
    const statusLabel = t(eq.status);
    const changeStatusBtn = t('Change Status');
    const deleteBtn = t('Delete');
    tr.innerHTML = `
      <td><strong>${eq.name}</strong></td>
      <td>${eq.type}</td>
      <td><span class="status-badge status-${eq.status.replace(' ', '').toLowerCase()}">${statusLabel}</span></td>
      <td>${eq.purchaseDate ? new Date(eq.purchaseDate).toLocaleDateString() : '-'}</td>
      <td style="font-size:0.85rem; color:var(--text-light);">${eq.description || '-'}</td>
      <td>
        <button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem; margin-right:5px;" onclick="toggleEquipmentStatus('${eq._id}', '${eq.status}')"><i class="fa-solid fa-arrows-rotate"></i> ${changeStatusBtn}</button>
        <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteEquipment('${eq._id}')"><i class="fa-solid fa-trash"></i> ${deleteBtn}</button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function renderFinanceTable() {
  const t = window.translateText || (x => x);
  const body = document.getElementById('finance-table-body');
  body.innerHTML = '';
  if (currentFinance.length === 0) {
    body.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-light);">${t('No ledger transactions recorded.')}</td></tr>`;
    return;
  }
  currentFinance.forEach(f => {
    const tr = document.createElement('tr');
    const typeLabel = t(f.type);
    const catLabel = t(f.category);
    const deleteBtn = t('Delete');
    tr.innerHTML = `
      <td>${new Date(f.date).toLocaleDateString()}</td>
      <td><span class="type-${f.type.toLowerCase()}">${typeLabel}</span></td>
      <td>${catLabel}</td>
      <td class="type-${f.type.toLowerCase()}">${f.type === 'Income' ? '+' : '-'}$${parseFloat(f.amount).toFixed(2)}</td>
      <td style="font-size:0.85rem; color:var(--text-light);">${f.description || '-'}</td>
      <td>
        <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteFinance('${f._id}')"><i class="fa-solid fa-trash"></i> ${deleteBtn}</button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function renderHarvestAndSalesTables() {
  const t = window.translateText || (x => x);

  // Harvest yields table
  const harBody = document.getElementById('harvest-table-body');
  harBody.innerHTML = '';
  if (currentHarvests.length === 0) {
    harBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-light);">${t('No yields harvested. Log harvest fields outputs here.')}</td></tr>`;
  } else {
    currentHarvests.forEach(h => {
      const crop = currentCrops.find(c => c._id === h.cropId);
      const cName = crop ? `${crop.name} (${crop.variety})` : t('Unknown Crop');
      const tr = document.createElement('tr');
      const qualityLabel = t(h.quality);
      const deleteBtn = t('Delete');
      tr.innerHTML = `
        <td>${new Date(h.harvestDate).toLocaleDateString()}</td>
        <td><strong>${cName}</strong></td>
        <td>${h.quantity} ${h.unit}</td>
        <td><span class="status-badge quality-${h.quality.toLowerCase()}">${qualityLabel}</span></td>
        <td style="font-size:0.85rem; color:var(--text-light);">${h.notes || '-'}</td>
        <td>
          <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteHarvest('${h._id}')"><i class="fa-solid fa-trash"></i> ${deleteBtn}</button>
        </td>
      `;
      harBody.appendChild(tr);
    });
  }

  // Sales logs table
  const salesBody = document.getElementById('sales-table-body');
  salesBody.innerHTML = '';
  if (currentSales.length === 0) {
    salesBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-light);">${t('No sales log transactions.')}</td></tr>`;
  } else {
    currentSales.forEach(s => {
      // Find harvest and crop
      const harvest = currentHarvests.find(h => h._id === s.harvestId);
      let cName = t('Unknown Yield');
      if (harvest) {
        const crop = currentCrops.find(c => c._id === harvest.cropId);
        if (crop) cName = `${crop.name} (${crop.variety})`;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${new Date(s.date).toLocaleDateString()}</td>
        <td>${cName}</td>
        <td>${s.buyerName}</td>
        <td>${s.quantity} ${harvest ? harvest.unit : t('units')}</td>
        <td style="font-weight:700; color:var(--primary-light);">$${parseFloat(s.revenue).toFixed(2)}</td>
        <td style="font-size:0.85rem; color:var(--text-light); max-width:180px;">${s.notes || '-'}</td>
        <td>
          <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteSale('${s._id}')"><i class="fa-solid fa-trash"></i> ${t('Delete')}</button>
        </td>
      `;
      salesBody.appendChild(tr);
    });
  }
}

function renderNotificationsList(){
  const t = window.translateText || (x => x);
  const list = document.getElementById('notifications-list');
  list.innerHTML = '';
  const notifCountBadge = document.getElementById('notification-count');
  
  const unreadList = currentNotifications.filter(n => !n.isRead);
  notifCountBadge.innerText = unreadList.length;
  if (unreadList.length === 0) {
    notifCountBadge.style.display ='none';
  } else {
    notifCountBadge.style.display ='flex';
  }

  if (currentNotifications.length === 0) {
    list.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-light);">${t('No alerts registered in notification center.')}</div>`;
    return;
  }

  currentNotifications.forEach(n => {
    const item = document.createElement('div');
    item.className = `notification-item ${n.type} ${n.isRead ? 'read' : ''}`;
    
    const readAction = !n.isRead 
      ? `<button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem;" onclick="markNotificationRead('${n._id}')"><i class="fa-solid fa-check"></i> ${t('Read')}</button>`
      : `<button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteNotification('${n._id}')"><i class="fa-solid fa-trash"></i> ${t('Dismiss')}</button>`;

    item.innerHTML = `
      <div class="notification-item-content">
        <h4>${t(n.title)}</h4>
        <p>${t(n.message)}</p>
        <span style="font-size: 0.75rem; color: var(--text-light);"><i class="fa-regular fa-clock"></i> ${new Date(n.createdAt).toLocaleString()}</span>
      </div>
      <div>
        ${readAction}
      </div>
    `;

    list.appendChild(item);
  });
}

// ----------------------------------------------------
// ACTIONS & FORM SUBMISSIONS (CRUD)
// ----------------------------------------------------

// Modal Helpers
function openModal(id) {
  document.getElementById(`modal-${id}`).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(`modal-${id}`).style.display = 'none';
  const form = document.getElementById(`form-${id}`);
  if (form) form.reset();
}

// Farm submit
async function handleFarmSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('farm-name').value;
  const location = document.getElementById('farm-location').value;
  const size = document.getElementById('farm-size').value;
  const soilType = document.getElementById('farm-soil').value;
  const description = document.getElementById('farm-desc').value;

  try {
    const res = await fetch('/api/dashboard/farms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location, size, soilType, description })
    });
    if (res.ok) {
      closeModal('farm');
      loadAllDashboardData();
    } else {
      alert('Failed to register field.');
    }
  } catch (err) {
    alert('Connectivity error.');
  }
}

async function deleteFarm(id) {
  if (!confirm('Are you sure you want to delete this field? All linked crop schedules will be unaffected but lack field linkage.')) return;
  try {
    const res = await fetch(`/api/dashboard/farms/${id}`, { method: 'DELETE' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Action failed.');
  }
}

// Crop submit
async function handleCropSubmit(e) {
  e.preventDefault();
  const farmId = document.getElementById('crop-farm').value;
  const name = document.getElementById('crop-name').value;
  const variety = document.getElementById('crop-variety').value;
  const plantingDate = document.getElementById('crop-planted').value;
  const expectedHarvestDate = document.getElementById('crop-expected').value;
  const status = document.getElementById('crop-status').value;
  const notes = document.getElementById('crop-notes').value;

  if (!farmId) {
    alert('Please select a registered Field plot.');
    return;
  }

  try {
    const res = await fetch('/api/dashboard/crops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ farmId, name, variety, plantingDate, expectedHarvestDate, status, notes })
    });
    if (res.ok) {
      closeModal('crop');
      loadAllDashboardData();
    } else {
      alert('Failed to save crop schedule.');
    }
  } catch (err) {
    alert('Connectivity error.');
  }
}

function openEditCropModal(id, status, notes) {
  document.getElementById('edit-crop-id').value = id;
  document.getElementById('edit-crop-status').value = status;
  document.getElementById('edit-crop-notes').value = notes;
  openModal('edit-crop');
}

async function handleCropUpdateSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('edit-crop-id').value;
  const status = document.getElementById('edit-crop-status').value;
  const notes = document.getElementById('edit-crop-notes').value;

  try {
    const res = await fetch(`/api/dashboard/crops/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes })
    });
    if (res.ok) {
      closeModal('edit-crop');
      loadAllDashboardData();
    } else {
      alert('Failed to update crop.');
    }
  } catch (err) {
    alert('Connectivity error.');
  }
}

async function deleteCrop(id) {
  if (!confirm('Are you sure you want to delete this crop record?')) return;
  try {
    const res = await fetch(`/api/dashboard/crops/${id}`, { method: 'DELETE' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Action failed.');
  }
}

// Inventory submit
async function handleInventorySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('inv-name').value;
  const type = document.getElementById('inv-type').value;
  const quantity = document.getElementById('inv-qty').value;
  const unit = document.getElementById('inv-unit').value;
  const minThreshold = document.getElementById('inv-threshold').value;
  const notes = document.getElementById('inv-notes').value;

  try {
    const res = await fetch('/api/dashboard/inventory',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, quantity, unit, minThreshold, notes })
    });
    if (res.ok) {
      closeModal('inventory');
      loadAllDashboardData();
    } else {
      alert('Failed to record stock item.');
    }
  } catch (err) {
    alert('Connectivity error.');
  }
}

async function addStockQuick(id, currentQty) {
  const addVal = prompt('Enter quantity to ADD to current stock:', '50');
  if (addVal === null) return;
  const addNum = parseFloat(addVal);
  if (isNaN(addNum) || addNum <= 0) {
    alert('Invalid quantity entered.');
    return;
  }

  const finalQty = parseFloat(currentQty) + addNum;

  try {
    const res = await fetch(`/api/dashboard/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: finalQty })
    });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Failed to quick restock.');
  }
}

async function deleteInventory(id) {
  if (!confirm('Are you sure you want to delete this stock item?')) return;
  try {
    const res = await fetch(`/api/dashboard/inventory/${id}`, { method: 'DELETE' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Action failed.');
  }
}

// Equipment submit
async function handleEquipmentSubmit(e){
  e.preventDefault();
  const name = document.getElementById('eq-name').value;
  const type = document.getElementById('eq-type').value;
  const status = document.getElementById('eq-status').value;
  const purchaseDate = document.getElementById('eq-date').value;
  const description = document.getElementById('eq-desc').value;
  try {
    const res = await fetch('/api/dashboard/equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, status, purchaseDate, description })
    });
    if (res.ok) {
      closeModal('equipment');
      loadAllDashboardData();
    }
  } catch (err) {
    alert('Connection failure.');
  }
}

async function toggleEquipmentStatus(id, currentStatus) {
  const stages = ['Available', 'In Use', 'Maintenance'];
  const nextIdx = (stages.indexOf(currentStatus) + 1) % stages.length;
  const nextStatus = stages[nextIdx];

  try {
    const res = await fetch(`/api/dashboard/equipment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Failed to modify status.');
  }
}

async function deleteEquipment(id) {
  if (!confirm('Are you sure you want to delete this equipment?')) return;
  try {
    const res = await fetch(`/api/dashboard/equipment/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadAllDashboardData();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message || 'Failed to delete equipment.');
    }
  } catch (err) {
    alert('Action failed due to connectivity issue.');
  }
}

// Finance submit
async function handleFinanceSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('fin-type').value;
  const category = document.getElementById('fin-category').value;
  const amount = document.getElementById('fin-amount').value;
  const date = document.getElementById('fin-date').value;
  const description = document.getElementById('fin-desc').value;

  try {
    const res = await fetch('/api/dashboard/finance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, category, amount, date, description })
    });
    if (res.ok) {
      closeModal('finance');
      loadAllDashboardData();
    }
  } catch (err) {
    alert('Connection failure.');
  }
}

async function deleteFinance(id) {
  if (!confirm('Are you sure you want to delete this ledger transaction log?')) return;
  try {
    const res = await fetch(`/api/dashboard/finance/${id}`, { method: 'DELETE' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Action failed.');
  }
}

// Harvest submit
async function handleHarvestSubmit(e) {
  e.preventDefault();
  const cropId = document.getElementById('har-crop').value;
  const quantity = document.getElementById('har-qty').value;
  const unit = document.getElementById('har-unit').value;
  const harvestDate = document.getElementById('har-date').value;
  const quality = document.getElementById('har-quality').value;
  const notes = document.getElementById('har-notes').value;

  if (!cropId) {
    alert('Plant active crops before logging harvests.');
    return;
  }

  try {
    const res = await fetch('/api/dashboard/harvest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cropId, quantity, unit, harvestDate, quality, notes })
    });
    if (res.ok) {
      closeModal('harvest');
      loadAllDashboardData();
    }
  } catch (err) {
    alert('Connection failure.');
  }
}

async function deleteHarvest(id) {
  if (!confirm('Are you sure you want to delete this harvest record? Linked crop status will remain unchanged.')) return;
  try {
    const res = await fetch(`/api/dashboard/harvest/${id}`, { method: 'DELETE' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Action failed.');
  }
}

// Sale submit
async function handleSaleSubmit(e) {
  e.preventDefault();
  const harvestId = document.getElementById('sale-harvest').value;
  const buyerName = document.getElementById('sale-buyer').value;
  const quantity = document.getElementById('sale-qty').value;
  const revenue = document.getElementById('sale-rev').value;
  const date = document.getElementById('sale-date').value;
  const notes = document.getElementById('sale-notes').value;

  if (!harvestId) {
    alert('Log yield harvests before creating sales tags.');
    return;
  }

  try {
    const res = await fetch('/api/dashboard/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ harvestId, buyerName, quantity, revenue, date, notes })
    });
    if (res.ok) {
      closeModal('sale');
      loadAllDashboardData();
    } else {
      alert('Failed to log sales transaction.');
    }
  } catch (err) {
    alert('Connection failure.');
  }
}

async function deleteSale(id) {
  if (!confirm('Are you sure you want to delete this sale? This will automatically reverse the revenue Income entry in the Finance ledger!')) return;
  try {
    const res = await fetch(`/api/dashboard/sales/${id}`, { method: 'DELETE' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    alert('Action failed.');
  }
}

// Notifications helpers
async function markNotificationRead(id) {
  try {
    const res = await fetch(`/api/dashboard/notifications/${id}/read`, { method: 'PUT' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    console.error(err);
  }
}

async function deleteNotification(id) {
  try {
    const res = await fetch(`/api/dashboard/notifications/${id}`, { method: 'DELETE' });
    if (res.ok) loadAllDashboardData();
  } catch (err) {
    console.error(err);
  }
}

async function clearAllNotifications() {
  // Read all unread notifications
  const unreads = currentNotifications.filter(n => !n.isRead);
  if (unreads.length === 0) return;
  try {
    await Promise.all(unreads.map(n => fetch(`/api/dashboard/notifications/${n._id}/read`, { method: 'PUT' })));
    loadAllDashboardData();
  } catch (err) {
    console.error(err);
  }
}

// ----------------------------------------------------
// DASHBOARD WEATHER ADVISORY
// ----------------------------------------------------
async function fetchDashboardWeather(city) {
  try {
    const res = await fetch(`/api/public/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();
    if (res.ok) {
      currentDashboardWeatherData = data;
      renderDashboardWeatherCard();

      const selectEl = document.getElementById('dash-weather-district-select');
      if (selectEl) {
        const matchingOpt = Array.from(selectEl.options).find(o => o.value.toLowerCase() === city.toLowerCase());
        if (matchingOpt) selectEl.value = matchingOpt.value;
      }
    }
  } catch (err) {
    console.warn('Dashboard weather panel failed.');
  }
}

function renderDashboardWeatherCard() {
  if (!currentDashboardWeatherData) return;
  const data = currentDashboardWeatherData;
  const t = window.translateText || (x => x);

  const locEl = document.getElementById('dash-weather-location');
  const tempEl = document.getElementById('dash-weather-temp');
  const condEl = document.getElementById('dash-weather-condition');
  const advEl = document.getElementById('dash-weather-advice');

  if (locEl) locEl.innerText = t(data.city);
  if (tempEl) tempEl.innerText = `${Math.round(data.temp)}°C`;
  if (condEl) condEl.innerText = t(data.condition);
  
  if (advEl && data.recommendation) {
    const adviseStr = data.recommendation.slice(0, 2).map(r => t(r)).join(' ');
    advEl.innerText = adviseStr || t('Clear sky. Proceed with normal scheduling.');
  }
}

// ----------------------------------------------------
// ANALYTICAL CHARTS (CHART.JS IMPLEMENTATIONS)
// ----------------------------------------------------
async function loadReportsCharts() {
  try {
    const res = await fetch('/api/dashboard/reports');
    const data = await res.json();

    // Destroy existing charts to prevent memory leaks or hover artifacts
    if (financialChartRef) financialChartRef.destroy();
    if (cropChartRef) cropChartRef.destroy();
    if (harvestChartRef) harvestChartRef.destroy();

    // 1. Financial Chart (Bar comparison of Income vs Expenses)
    const finCtx = document.getElementById('financialComparisonChart').getContext('2d');
    financialChartRef = new Chart(finCtx, {
      type: 'bar',
      data: {
        labels: ['Cash Flow Summaries'],
        datasets: [
          {
            label: 'Total Revenue ($)',
            data: [data.financials.totalIncome],
            backgroundColor: '#2d6a4f',
            borderWidth: 0,
            borderRadius: 6
          },
          {
            label: 'Total Expenses ($)',
            data: [data.financials.totalExpenses],
            backgroundColor: '#c92a2a',
            borderWidth: 0,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // 2. Crop Status Chart (Doughnut chart of statuses)
    const cropDist = data.crops.statusDistribution;
    const cropCtx = document.getElementById('cropStatusChart').getContext('2d');
    cropChartRef = new Chart(cropCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(cropDist),
        datasets: [{
          data: Object.values(cropDist),
          backgroundColor: ['#adb5bd', '#52b788', '#2d6a4f', '#e65f2b'], // Planted, Growing, Harvested, Failed
          hoverOffset: 4,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    // 3. Harvest Yields Chart (Horizontal bar of crop yields)
    const yields = data.harvests.cropYields;
    const yieldCtx = document.getElementById('harvestYieldsChart').getContext('2d');
    
    const cropLabels = Object.keys(yields);
    const cropYieldValues = Object.values(yields);

    harvestChartRef = new Chart(yieldCtx, {
      type: 'bar',
      data: {
        labels: cropLabels.length > 0 ? cropLabels : ['No Yields Harvested'],
        datasets: [{
          label: 'Total Harvested Weight (kg / units)',
          data: cropYieldValues.length > 0 ? cropYieldValues : [0],
          backgroundColor: '#52b788',
          borderWidth: 0,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y', // Horizontal bars
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { beginAtZero: true }
        }
      }
    });

  } catch (err) {
    console.error('Failed to compile reports chart details:', err);
  }
}

// Logout action
async function handleLogout() {
  if (!confirm('Are you sure you want to sign out?')) return;
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) window.location.href = '/';
  } catch (err) {
    alert('Log out failed.');
  }
}
