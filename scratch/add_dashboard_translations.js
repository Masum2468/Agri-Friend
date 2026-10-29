const fs = require('fs');
const path = require('path');

const langPath = path.join(__dirname, '../public/js/lang.js');
let content = fs.readFileSync(langPath, 'utf8');

const enDashboard = `
      // Dashboard Section Titles & Buttons
      overview_crops_title: "Active Cultivations",
      overview_crops_btn: "Add Cultivation",
      overview_weather_title: "Current Farm Weather",
      overview_transactions_title: "Recent Financial Transactions",
      overview_transactions_btn: "Log Transaction",
      farms_sec_title: "Registered Farm Land & Plots",
      farms_add_btn: "Register New Field",
      crops_sec_title: "Active Crop Cultivations",
      crops_add_btn: "Record New Planting",
      inv_sec_title: "Farm Inputs & Inventory",
      inv_add_btn: "Add Stock Item",
      eq_sec_title: "Machinery & Equipment",
      eq_add_btn: "Register Equipment",
      fin_sec_title: "Financial Ledger & Accounts",
      fin_add_btn: "Log Transaction",
      har_sec_title: "Crop Harvest Records",
      har_add_btn: "Record New Harvest",
      sales_sec_title: "Produce Sales & Revenue",
      sales_add_btn: "Record Direct Sale",
      reports_fin_title: "Cash Flow & Finance Report",
      reports_crop_title: "Cultivation Distribution",
      reports_yield_title: "Yield & Harvest Performance",
      notif_sec_title: "Alerts & Notifications",
      notif_read_all_btn: "Mark All as Read",

      // Dashboard Modal Dialogs & Fields
      modal_farm_title: "Register New Field Plot",
      label_farm_name: "Plot / Field Name:",
      label_farm_location: "Location / Mouza:",
      label_farm_size: "Area (Bigha / Decimal):",
      label_farm_soil: "Soil Type:",
      label_farm_desc: "Description & Boundary Notes:",
      btn_register_field: "Register Field",

      modal_crop_title: "Record New Crop Planting",
      label_crop_farm: "Select Field / Plot:",
      label_crop_name: "Crop Type:",
      label_crop_variety: "Seed Variety / Cultivar:",
      label_crop_planted: "Planting / Sowing Date:",
      label_crop_expected: "Expected Harvest Date:",
      label_crop_status: "Initial Growth Stage:",
      label_crop_notes: "Agronomic Care Notes:",
      btn_save_crop: "Save Crop Planting",

      modal_inv_title: "Record Input / Inventory Item",
      label_inv_name: "Item Name (Fertilizer, Seed, Pesticide):",
      label_inv_type: "Category:",
      label_inv_qty: "Initial Quantity:",
      label_inv_unit: "Measurement Unit (kg, liter, bag):",
      label_inv_threshold: "Low Stock Alert Threshold:",
      label_inv_notes: "Supplier / Storage Location:",
      btn_record_stock: "Save Inventory Record",

      modal_eq_title: "Register Machinery & Equipment",
      label_eq_name: "Equipment / Machine Name:",
      label_eq_type: "Machine Type:",
      label_eq_status: "Current Operational Condition:",
      label_eq_date: "Purchase / Service Date:",
      label_eq_desc: "Maintenance & Usage Guidelines:",
      btn_save_eq: "Save Equipment Record",

      modal_fin_title: "Log Financial Ledger Transaction",
      label_fin_type: "Transaction Nature:",
      label_fin_category: "Category:",
      label_fin_amount: "Amount (BDT):",
      label_fin_date: "Date of Transaction:",
      label_fin_desc: "Transaction Remarks / Receipt Ref:",
      btn_log_ledger: "Record Entry in Ledger",

      modal_har_title: "Record Harvest Batch",
      label_har_crop: "Cultivated Crop:",
      label_har_qty: "Harvested Quantity:",
      label_har_unit: "Measurement Unit:",
      label_har_date: "Harvesting Date:",
      label_har_quality: "Quality Grade:",
      label_har_notes: "Yield Observations & Storage Notes:",
      btn_record_harvest: "Save Harvest Record",

      modal_sale_title: "Record Direct Produce Sale",
      label_sale_harvest: "Select Harvest Lot:",
      label_sale_buyer: "Buyer / Market Name:",
      label_sale_qty: "Sold Quantity:",
      label_sale_rev: "Total Sales Revenue (BDT):",
      label_sale_date: "Date of Sale:",
      label_sale_notes: "Payment Status & Invoicing Notes:",
      btn_log_sale: "Save Sale Record",

      modal_edit_crop_title: "Update Crop Growth Status",
      label_edit_crop_status: "New Growth Status:",
      label_edit_crop_notes: "Updated Observation Notes:",
      btn_apply_crop_update: "Apply Status Update",
`;

const bnDashboard = `
      // Dashboard Section Titles & Buttons
      overview_crops_title: "চলতি চাষাবাদ",
      overview_crops_btn: "নতুন চাষাবাদ যুক্ত করুন",
      overview_weather_title: "খামারের বর্তমান আবহাওয়া",
      overview_transactions_title: "সাম্প্রতিক আর্থিক লেনদেন",
      overview_transactions_btn: "লেনদেন রেকর্ড করুন",
      farms_sec_title: "নিবন্ধিত জমি ও প্লট",
      farms_add_btn: "নতুন জমি নিবন্ধন করুন",
      crops_sec_title: "চলতি ফসলের চাষাবাদ",
      crops_add_btn: "নতুন ফসল রোপণ রেকর্ড করুন",
      inv_sec_title: "কৃষি উপকরণ ও মজুত ভাণ্ডার",
      inv_add_btn: "নতুন উপকরণ যুক্ত করুন",
      eq_sec_title: "কৃষি যন্ত্রপাতি ও সরঞ্জাম",
      eq_add_btn: "নতুন যন্ত্রপাতি যুক্ত করুন",
      fin_sec_title: "আর্থিক খতিয়ান ও হিসাব",
      fin_add_btn: "লেনদেন যোগ করুন",
      har_sec_title: "ফসল কাটার রেকর্ড",
      har_add_btn: "নতুন ফসল তোলা রেকর্ড করুন",
      sales_sec_title: "পণ্য বিক্রয় ও আয়",
      sales_add_btn: "বিক্রয় রেকর্ড যোগ করুন",
      reports_fin_title: "আর্থিক লেনদেন ও নগদ প্রবাহ প্রতিবেদন",
      reports_crop_title: "ফসল চাষের অনুপাত",
      reports_yield_title: "উৎপাদন ও ফলনের দক্ষতা",
      notif_sec_title: "সতর্কবার্তা ও নোটিফিকেশন",
      notif_read_all_btn: "সবগুলো পঠিত হিসেবে চিহ্নিত করুন",

      // Dashboard Modal Dialogs & Fields
      modal_farm_title: "নতুন খামার বা জমি নিবন্ধন করুন",
      label_farm_name: "জমির বা প্লটের নাম:",
      label_farm_location: "অবস্থান / মৌজা:",
      label_farm_size: "জমির পরিমাণ (বিঘা / শতাংশ):",
      label_farm_soil: "মাটির ধরন:",
      label_farm_desc: "বিবরণ ও সীমানা বিবরণ:",
      btn_register_field: "জমি নিবন্ধন সম্পন্ন করুন",

      modal_crop_title: "নতুন ফসল রোপণ লিপিবদ্ধ করুন",
      label_crop_farm: "জমি বা প্লট নির্বাচন করুন:",
      label_crop_name: "ফসলের ধরন:",
      label_crop_variety: "বীজের জাত বা প্রকার:",
      label_crop_planted: "রোপণ বা বপনের তারিখ:",
      label_crop_expected: "সম্ভাব্য ফসল কাটার তারিখ:",
      label_crop_status: "প্রাথমিক বৃদ্ধির পর্যায়:",
      label_crop_notes: "পরিচর্যা ও সার প্রয়োগ নোট:",
      btn_save_crop: "রোপণ রেকর্ড সংরক্ষণ করুন",

      modal_inv_title: "নতুন কৃষি উপকরণ মজুত সংরক্ষণ",
      label_inv_name: "উপকরণের নাম (সার, বীজ, কীটনাশক):",
      label_inv_type: "বিভাগ / ক্যাটাগরি:",
      label_inv_qty: "প্রাথমিক মজুত পরিমাণ:",
      label_inv_unit: "পরিমাপের একক (কেজি, লিটার, বস্তা):",
      label_inv_threshold: "ন্যূনতম মজুত সতর্কতা সীমা:",
      label_inv_notes: "সরবরাহকারী বা মজুতের স্থান:",
      btn_record_stock: "উপকরণ মজুত সংরক্ষণ করুন",

      modal_eq_title: "কৃষি যন্ত্রপাতি ও সরঞ্জাম নিবন্ধন",
      label_eq_name: "যন্ত্রের নাম:",
      label_eq_type: "যন্ত্রের প্রকার:",
      label_eq_status: "বর্তমান কর্মক্ষম অবস্থা:",
      label_eq_date: "ক্রয় বা সার্ভিসিংয়ের তারিখ:",
      label_eq_desc: "রক্ষণাবেক্ষণ ও ব্যবহার বিধি:",
      btn_save_eq: "যন্ত্রপাতির রেকর্ড সংরক্ষণ করুন",

      modal_fin_title: "আর্থিক খতিয়ানে লেনদেন লিপিবদ্ধ করুন",
      label_fin_type: "লেনদেনের ধরন:",
      label_fin_category: "খাত / ক্যাটাগরি:",
      label_fin_amount: "টাকার পরিমাণ (টাকা):",
      label_fin_date: "লেনদেনের তারিখ:",
      label_fin_desc: "লেনদেনের বিবরণ বা রসিদ নং:",
      btn_log_ledger: "খতিয়ানে সংরক্ষণ করুন",

      modal_har_title: "ফসল তোলার ব্যাচ রেকর্ড করুন",
      label_har_crop: "রোপণকৃত ফসল:",
      label_har_qty: "তোলা ফসলের পরিমাণ:",
      label_har_unit: "পরিমাপের একক:",
      label_har_date: "ফসল কাটার তারিখ:",
      label_har_quality: "ফসলের মান / গ্রেড:",
      label_har_notes: "ফলন পর্যবেক্ষণ ও মজুত নোট:",
      btn_record_harvest: "সংগ্রহের রেকর্ড সংরক্ষণ করুন",

      modal_sale_title: "সরাসরি পণ্য বিক্রয় রেকর্ড করুন",
      label_sale_harvest: "ফসল তোলার লট নির্বাচন করুন:",
      label_sale_buyer: "ক্রেতা বা বাজারের নাম:",
      label_sale_qty: "বিক্রিত পরিমাণ:",
      label_sale_rev: "মোট বিক্রয় মূল্য (টাকা):",
      label_sale_date: "বিক্রয়ের তারিখ:",
      label_sale_notes: "পেমেন্ট অবস্থা ও রসিদ নোট:",
      btn_log_sale: "বিক্রয় রেকর্ড সংরক্ষণ করুন",

      modal_edit_crop_title: "ফসলের বৃদ্ধির পর্যায় আপডেট করুন",
      label_edit_crop_status: "নতুন অবস্থা বা পর্যায়:",
      label_edit_crop_notes: "নতুন পর্যবেক্ষণ ও নোট:",
      btn_apply_crop_update: "আপডেট সম্পন্ন করুন",
`;

// Insert into en right before 'admin_panel_title:'
content = content.replace('admin_panel_title: "AgriFriend Admin Management Panel",', enDashboard + '\n      admin_panel_title: "AgriFriend Admin Management Panel",');

// Insert into bn right before 'admin_panel_title:'
content = content.replace('admin_panel_title: "এগ্রিফ্রেন্ড অ্যাডমিন ম্যানেজমেন্ট প্যানেল",', bnDashboard + '\n      admin_panel_title: "এগ্রিফ্রেন্ড অ্যাডমিন ম্যানেজমেন্ট প্যানেল",');

fs.writeFileSync(langPath, content, 'utf8');
console.log('Successfully added dashboard keys to lang.js!');
