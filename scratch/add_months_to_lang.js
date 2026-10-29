const fs = require('fs');
const path = require('path');

const langPath = path.join(__dirname, '../public/js/lang.js');
let langCode = fs.readFileSync(langPath, 'utf8');

const enMonths = `
      month_boishakh: "Baishakh",
      month_jaishtha: "Jaishtha",
      month_ashar: "Ashar",
      month_shrabon: "Shrabon",
      month_bhadro: "Bhadro",
      month_ashwin: "Ashwin",
      month_kartik: "Kartik",
      month_ogrohayon: "Agrahayan",
      month_poush: "Poush",
      month_magh: "Magh",
      month_falgun: "Falgun",
      month_choitro: "Choitra",
`;

const bnMonths = `
      month_boishakh: "বৈশাখ",
      month_jaishtha: "জ্যৈষ্ঠ",
      month_ashar: "আষাঢ়",
      month_shrabon: "শ্রাবণ",
      month_bhadro: "ভাদ্র",
      month_ashwin: "আশ্বিন",
      month_kartik: "কার্তিক",
      month_ogrohayon: "অগ্রহায়ণ",
      month_poush: "পৌষ",
      month_magh: "মাঘ",
      month_falgun: "ফাল্গুন",
      month_choitro: "চৈত্র",
`;

langCode = langCode.replace('filter_crop_milestones: "Crop Milestones",', 'filter_crop_milestones: "Crop Milestones",' + enMonths);
langCode = langCode.replace('filter_crop_milestones: "ফসলভিত্তিক সময়সূচি",', 'filter_crop_milestones: "ফসলভিত্তিক সময়সূচি",' + bnMonths);

fs.writeFileSync(langPath, langCode, 'utf8');
console.log('Months added to lang.js');

// Now update public/crop-calendar.html
const calPath = path.join(__dirname, '../public/crop-calendar.html');
let calHtml = fs.readFileSync(calPath, 'utf8');

const oldPills = `<button class="filter-pill" data-tab="বৈশাখ" onclick="setFilterTab('বৈশাখ', this)">বৈশাখ</button>
      <button class="filter-pill" data-tab="জ্যৈষ্ঠ" onclick="setFilterTab('জ্যৈষ্ঠ', this)">জ্যৈষ্ঠ</button>
      <button class="filter-pill" data-tab="আষাঢ়" onclick="setFilterTab('আষাঢ়', this)">আষাঢ়</button>
      <button class="filter-pill" data-tab="শ্রাবণ" onclick="setFilterTab('শ্রাবণ', this)">শ্রাবণ</button>
      <button class="filter-pill" data-tab="ভাদ্র" onclick="setFilterTab('ভাদ্র', this)">ভাদ্র</button>
      <button class="filter-pill" data-tab="আশ্বিন" onclick="setFilterTab('আশ্বিন', this)">আশ্বিন</button>
      <button class="filter-pill" data-tab="কার্তিক" onclick="setFilterTab('কার্তিক', this)">কার্তিক</button>
      <button class="filter-pill" data-tab="অগ্রহায়ণ" onclick="setFilterTab('অগ্রহায়ণ', this)">অগ্রহায়ণ</button>
      <button class="filter-pill" data-tab="পৌষ" onclick="setFilterTab('পৌষ', this)">পৌষ</button>
      <button class="filter-pill" data-tab="মাঘ" onclick="setFilterTab('মাঘ', this)">মাঘ</button>
      <button class="filter-pill" data-tab="ফাল্গুন" onclick="setFilterTab('ফাল্গুন', this)">ফাল্গুন</button>
      <button class="filter-pill" data-tab="চৈত্র" onclick="setFilterTab('চৈত্র', this)">চৈত্র</button>`;

const newPills = `<button class="filter-pill" data-tab="বৈশাখ" onclick="setFilterTab('বৈশাখ', this)"><span data-i18n="month_boishakh">বৈশাখ</span></button>
      <button class="filter-pill" data-tab="জ্যৈষ্ঠ" onclick="setFilterTab('জ্যৈষ্ঠ', this)"><span data-i18n="month_jaishtha">জ্যৈষ্ঠ</span></button>
      <button class="filter-pill" data-tab="আষাঢ়" onclick="setFilterTab('আষাঢ়', this)"><span data-i18n="month_ashar">আষাঢ়</span></button>
      <button class="filter-pill" data-tab="শ্রাবণ" onclick="setFilterTab('শ্রাবণ', this)"><span data-i18n="month_shrabon">শ্রাবণ</span></button>
      <button class="filter-pill" data-tab="ভাদ্র" onclick="setFilterTab('ভাদ্র', this)"><span data-i18n="month_bhadro">ভাদ্র</span></button>
      <button class="filter-pill" data-tab="আশ্বিন" onclick="setFilterTab('আশ্বিন', this)"><span data-i18n="month_ashwin">আশ্বিন</span></button>
      <button class="filter-pill" data-tab="কার্তিক" onclick="setFilterTab('কার্তিক', this)"><span data-i18n="month_kartik">কার্তিক</span></button>
      <button class="filter-pill" data-tab="অগ্রহায়ণ" onclick="setFilterTab('অগ্রহায়ণ', this)"><span data-i18n="month_ogrohayon">অগ্রহায়ণ</span></button>
      <button class="filter-pill" data-tab="পৌষ" onclick="setFilterTab('পৌষ', this)"><span data-i18n="month_poush">পৌষ</span></button>
      <button class="filter-pill" data-tab="মাঘ" onclick="setFilterTab('মাঘ', this)"><span data-i18n="month_magh">মাঘ</span></button>
      <button class="filter-pill" data-tab="ফাল্গুন" onclick="setFilterTab('ফাল্গুন', this)"><span data-i18n="month_falgun">ফাল্গুন</span></button>
      <button class="filter-pill" data-tab="চৈত্র" onclick="setFilterTab('চৈত্র', this)"><span data-i18n="month_choitro">চৈত্র</span></button>`;

calHtml = calHtml.replace(oldPills, newPills);
fs.writeFileSync(calPath, calHtml, 'utf8');
console.log('crop-calendar.html updated with month i18n tags');
