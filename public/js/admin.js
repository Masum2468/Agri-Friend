// // Admin State Variables
// let currentUser =null;
// let systemStats = {};
// let usersList = [];
// let marketplaceList = [];

// document.addEventListener('DOMContentLoaded', () => {
//   checkAdminAuth();
// });

// document.addEventListener('languagechanged', () => {
//   renderUsersTable();
//   renderAdminMarketTable();
//   if (window.applyTranslations) window.applyTranslations();
// });

// // ----------------------------------------------------
// // AUTH CHECK & INITIALIZATION
// // ----------------------------------------------------
// async function checkAdminAuth() {
//   try {
//     const res = await fetch('/api/auth/me');
//     if (!res.ok) {
//       window.location.href = '/login';
//       return;
//     }

//     currentUser = await res.json();
//     if (currentUser.role !== 'admin') {
//       window.location.href = '/dashboard'; // Redirect farmers back to their console
//       return;
//     }

//     // Set UI profile text
//     document.getElementById('admin-display-name').innerText = `${currentUser.username} (Admin)`;

//     // Load admin panel data
//     await loadAdminData();

//   } catch (err) {
//     window.location.href = '/login';
//   }
// }

// async function loadAdminData() {
//   try {
//     // Parallel fetch administrative views
//     const [statsRes, usersRes, marketRes] = await Promise.all([
//       fetch('/api/admin/stats'),
//       fetch('/api/admin/users'),
//       fetch('/api/public/marketplace')
//     ]);

//     systemStats = await statsRes.json();
//     usersList = await usersRes.json();
//     marketplaceList = await marketRes.json();

//     // Populate UI
//     updateAdminStatsUI();
//     renderUsersTable();
//     renderAdminMarketTable();

//   } catch (err) {
//     console.error('Error fetching admin data logs:', err);
//   }
// }

// function updateAdminStatsUI() {
//   document.getElementById('admin-card-farmers').innerText = systemStats.farmersCount || 0;
//   document.getElementById('admin-card-listings').innerText = systemStats.listingsCount || 0;
//   document.getElementById('admin-card-farms').innerText = systemStats.farmsCount || 0;
//   document.getElementById('admin-card-crops').innerText = systemStats.cropsCount || 0;
// }

// // ----------------------------------------------------
// // SECTION SWITCH NAVIGATION
// // ----------------------------------------------------
// function switchAdminSection(sectionId) {
//   const items = document.querySelectorAll('.sidebar-item');
//   items.forEach(item => item.classList.remove('active'));

//   const targetItem = Array.from(items).find(item => item.getAttribute('onclick').includes(sectionId));
//   if (targetItem) targetItem.classList.add('active');

//   const sections = document.querySelectorAll('.dash-section');
//   sections.forEach(sec => sec.classList.remove('active'));
//   document.getElementById(`admin-section-${sectionId}`).classList.add('active');

//   const titleMap = {
//     overview: 'System Administration Overview',
//     users: 'Farmers Accounts Registry',
//     broadcast: 'Global Alert Broadcast System',
//     market: 'Community Marketplace Moderation'
//   };
//   const titleText = titleMap[sectionId] || 'System Administration';
//   document.getElementById('admin-dash-title').innerText = window.translateText ? window.translateText(titleText) : titleText;
// }

// // ----------------------------------------------------
// // REGISTRIES RENDER
// // ----------------------------------------------------
// function renderUsersTable() {
//   const t = window.translateText || (x => x);
//   const body = document.getElementById('admin-users-table-body');
//   body.innerHTML = '';

//   if (usersList.length === 0) {
//     body.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-light);">${t('No user accounts found.')}</td></tr>`;
//     return;
//   }

//   usersList.forEach(user => {
//     const tr = document.createElement('tr');
//     const termBtn = t('Terminate');
//     const protAdmin = t('Protected Admin');
//     const roleLabel = t(user.role.toUpperCase());
    
//     // Only permit deleting normal farmers, prevent deleting self or other admins
//     const deleteButton = user.role !== 'admin' 
//       ? `<button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="deleteUserAccount('${user._id}')"><i class="fa-solid fa-user-minus"></i> ${termBtn}</button>`
//       : `<span style="color:var(--text-light); font-size:0.85rem; font-style:italic;">${protAdmin}</span>`;

//     tr.innerHTML = `
//       <td><strong>${user.username}</strong></td>
//       <td>${user.email}</td>
//       <td><span class="status-badge" style="background-color:${user.role === 'admin' ? '#e1f5fe; color:#2a6f97;' : '#e8f5e9; color:#2e7d32;'}">${roleLabel}</span></td>
//       <td>${user.farmName || '-'}</td>
//       <td>${user.location || '-'}</td>
//       <td>${user.contact || '-'}</td>
//       <td>${deleteButton}</td>
//     `;
//     body.appendChild(tr);
//   });
// }

// function renderAdminMarketTable() {
//   const t = window.translateText || (x => x);
//   const body = document.getElementById('admin-market-table-body');
//   body.innerHTML = '';

//   if (marketplaceList.length === 0) {
//     body.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-light);">${t('No active listings in the marketplace.')}</td></tr>`;
//     return;
//   }

//   marketplaceList.forEach(item => {
//     const tr = document.createElement('tr');
//     const itemCategory = t(item.itemType);
//     const dealTypeLabel = t(item.dealType);
//     const deleteText = t('Delete Post');

//     tr.innerHTML = `
//       <td>${new Date(item.createdAt).toLocaleDateString()}</td>
//       <td><strong>${item.title}</strong></td>
//       <td>${itemCategory}</td>
//       <td><span class="status-badge badge-${item.dealType.toLowerCase()}">${dealTypeLabel}</span></td>
//       <td style="font-weight:700;">$${item.price}</td>
//       <td>${item.sellerName}</td>
//       <td>
//         <button class="btn btn-outline" style="border-color:#c92a2a; color:#c92a2a; padding:6px 12px; font-size:0.8rem;" onclick="moderateDeleteListing('${item._id}')"><i class="fa-solid fa-trash"></i> ${deleteText}</button>
//       </td>
//     `;
//     body.appendChild(tr);
//   });
// }

// // ----------------------------------------------------
// // ANNOUNCEMENT BROADCAST
// // ----------------------------------------------------
// async function handleBroadcastSubmit(e) {
//   e.preventDefault();
//   const title = document.getElementById('broad-title').value;
//   const type = document.getElementById('broad-type').value;
//   const message = document.getElementById('broad-msg').value;

//   try {
//     const res = await fetch('/api/admin/notifications/broadcast', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, type, message })
//     });

//     if (res.ok) {
//       alert('Alert successfully broadcasted to all farmer consoles!');
//       document.getElementById('admin-broadcast-form').reset();
//       switchAdminSection('overview');
//       loadAdminData();
//     } else {
//       const err = await res.json();
//       alert(`Broadcast failed: ${err.message}`);
//     }
//   } catch (err) {
//     alert('Failed to send broadcast.');
//   }
// }

// // ----------------------------------------------------
// // ACCOUNT & LISTING DELETIONS
// // ----------------------------------------------------
// async function deleteUserAccount(id) {
//   if (!confirm('Are you sure you want to terminate this farmer account? All their fields, crop tracking, and finance data will remain on database but they will no longer be able to sign in.')) return;

//   try {
//     const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
//     if (res.ok) {
//       alert('Farmer account successfully removed.');
//       loadAdminData();
//     } else {
//       const err = await res.json();
//       alert(`Removal failed: ${err.message}`);
//     }
//   } catch (err) {
//     alert('Connection error.');
//   }
// }

// async function moderateDeleteListing(id) {
//   if (!confirm('Are you sure you want to delete this listing as a moderator?')) return;

//   try {
//     const res = await fetch(`/api/public/marketplace/${id}`, { method: 'DELETE' });
//     if (res.ok) {
//       alert('Marketplace listing removed.');
//       loadAdminData();
//     } else {
//       const err = await res.json();
//       alert(`Moderation deletion failed: ${err.message}`);
//     }
//   } catch (err) {
//     alert('Connection error.');
//   }
// }

// // Logout action
// async function handleLogout() {
//   if (!confirm('Are you sure you want to sign out?')) return;
//   try {
//     const res = await fetch('/api/auth/logout', { method: 'POST' });
//     if (res.ok) window.location.href = '/';
//   } catch (err) {
//     alert('Log out failed.');
//   }
// }
