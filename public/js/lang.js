// AgriFriend Language Translation Engine (English <-> Bangla)
// Comprehensive Bilingual Support across all pages and data
(function() {
  const translations = {
    en: {
      // Navbar links
      nav_weather: "Weather Advisory",
      nav_guides: "Ag-Guides",
      nav_crop_guides: "Crop Guides",
      nav_disease_guides: "Diseases & Pests",
      nav_fert_guides: "Fertilizers & Inputs",
      nav_cal_guides: "Crop Calendar",
      nav_seasonal_guides: "Seasonal Advisory",
      nav_marketplace: "Marketplace",
      nav_back: "Back to Portal",
      nav_dashboard: "Farm Dashboard",
      nav_admin: "Admin Panel",
      nav_signout: "Sign Out",
      nav_signin: "Sign In / Register",
      nav_home: "Home",

      // Hero section
      hero_title_1: "Empowering Farmers with",
      hero_title_2: "Smart Digital Agriculture",
      hero_weather_btn: "Check Weather Advice",
      hero_dashboard_btn: "Go to My Farm Dashboard",

      // Weather section
      weather_section_title: "Weather-Based Agricultural Advice",
      weather_section_desc: "Enter your location below. Our engine analyzes meteorological parameters to deliver customized farming actions, spray safety advisories, and irrigation plans.",
      weather_report_title: "Location Weather",
      weather_search_placeholder: "Search District (e.g. Dhaka, Bogura)...",
      weather_search_btn: "Search",
      quick_districts_label: "Popular Districts:",
      weather_humidity_label: "Humidity",
      weather_wind_label: "Wind Speed",
      weather_advice_title: "Farming Recommendations",
      weather_fetching: "Fetching weather data...",
      weather_live: "Live weather data loaded.",
      weather_mock: "Simulated offline weather. Connect to the internet for live data.",
      weather_failed: "Weather lookup failed. Try another district.",
      weather_error: "Could not load weather",
      dash_weather_loading: "Loading location...",
      dash_weather_checking: "Checking agricultural advice...",
      dash_weather_clear: "Clear sky. Proceed with normal farm work.",

      // Marketplace section
      marketplace_section_title: "Equipment and Seed Marketplace",
      marketplace_section_desc: "Buy, sell, and explore agricultural products.",
      marketplace_post_btn: "Post a Listing",
      marketplace_search_placeholder: "Search items by name (e.g. Tractor, Seed, Rice)...",
      filter_all: "All Items",
      no_search_results: "No items found matching your search.",
      view_all_listings: "View All Listings",

      // Marketplace Modal Form
      modal_title: "Create Marketplace Listing",
      form_title_label: "Listing Title",
      form_title_placeholder: "e.g. Hand Seeder for Sale, Power Tiller for Rent",
      form_itemtype_label: "Item Type",
      form_dealtype_label: "Listing Category",
      form_price_label: "Price (TK)",
      form_contact_label: "Contact Info",
      form_contact_placeholder: "e.g. Phone number, Email",
      form_image_label: "Upload Picture (Optional)",
      choose_file_btn: "Click to browse & upload item photo",
      upload_auto_hint: "(Leave blank for automatic smart picture)",
      form_desc_label: "Item Description",
      form_desc_placeholder: "Mention item age, condition, delivery availability, etc.",
      form_submit_btn: "Submit Post",

      // Marketplace listing options
      opt_equipment: "Equipment",
      opt_seed: "Seeds / Plants",
      opt_crop: "Crops",
      opt_service: "Labor / Service",
      opt_sale: "For Sale",
      opt_rent: "For Rent",
      opt_share: "Free Share",

      // Knowledge Hub Main Page
      guides_title: "Agricultural Knowledge Hub",
      guides_desc: "Search through crop catalogs, plant diagnostic charts, fertilization guides, and safe chemical pesticide usage policies.",
      kh_banner_title: "Agricultural Knowledge & Information Hub",
      kh_banner_subtitle: "Learn modern agriculture, diagnose problems, and take the right decisions. Click any center for complete guidelines.",
      kh_search_placeholder: "Search crops, diseases, fertilizers, or farm topics...",
      btn_back_catalog: "Back to Knowledge Hub",
      kh_bookmark: "Bookmark",
      kh_all_guides: "Complete Guides & Tools",
      kh_use_tools: "Explore & Use Tools",

      // Dedicated Guides Page Titles & Descriptions
      crops_page_title: "Crop Cultivation Guides",
      crops_page_desc: "Scientific agricultural guidelines for seed selection, sowing, crop care, and maximizing yields.",
      diseases_page_title: "Disease Diagnostics & Pesticide Prescriptions",
      diseases_page_desc: "Crop disease symptoms, organic remedies, and approved chemical pesticide dosages per spray tank.",
      fert_page_title: "Fertilizers & Crop Inputs Guide",
      fert_page_desc: "Balanced fertilizer dosing, application methods, safety precautions, and pesticide guidelines.",
      seasonal_page_title: "Snpm steasonal Advisory & Disaster Preparation",
      seasonal_page_desc: "Optimal crops for Rabi, Kharif-1, Kharif-2 seasons and proactive disaster management.",
      cal_page_title: "Crop Calendar & Farm Task Timeline",
      cal_page_desc: "12-month guide for sowing, planting, irrigation, fertilizing, pest control, and harvesting.",

      // Filters
      filter_all_crops: "All Crops",
      filter_cereal: "Cereals",
      filter_tuber: "Tubers",
      filter_vegetable: "Vegetables",
      filter_cash: "Cash Crops",
      filter_oilseed: "Oilseeds",

      filter_all_diseases: "All Diseases",
      filter_rice_dis: "Rice Diseases",
      filter_potato_dis: "Potato Diseases",
      filter_tomato_dis: "Tomato Diseases",
      filter_eggplant_dis: "Eggplant Pests/Diseases",
      filter_corn_dis: "Maize Diseases",
      filter_chilli_dis: "Chilli Diseases",

      filter_all_inputs: "All Inputs (20+)",
      filter_chemical_fert: "Chemical Fertilizers",
      filter_organic_fert: "Organic Bio-Fertilizers",
      filter_pesticides: "Pesticides & Insecticides",
      filter_fungicides: "Fungicides",

      filter_all_months: "12 Months",
      filter_all_seasons: "All Seasons",
      filter_rabi: "Rabi Season",
      filter_kharif1: "Kharif-1 Season",
      filter_kharif2: "Kharif-2 Season",
      filter_disaster: "Disaster Preparation",
      filter_crop_milestones: "Crop Timelines",

      // Search Placeholders
      search_crops_placeholder: "Search crop name (e.g. Rice, Wheat, Potato)...",
      search_disease_placeholder: "Search disease or crop (e.g. Blast, Late Blight, Aphid)...",
      search_fert_placeholder: "Search fertilizer or pesticide (e.g. Urea, Imidacloprid, Mancozeb)...",
      search_cal_placeholder: "Search month or crop task (e.g. Baishakh, Kartik, Rice)...",
      search_seasonal_placeholder: "Search season or topic (e.g. Rabi, Kharif, Flood, Drought)...",

      // Fertilizer Calculator
      calc_title: "Fertilizer Dosing Calculator",
      calc_crop_label: "Select Crop:",
      calc_land_label: "Land Area (Bigha):",
      calc_btn: "Calculate Dose",
      calc_urea: "Urea:",
      calc_tsp: "TSP:",
      calc_mop: "MOP (Potash):",
      calc_gypsum: "Gypsum:",
      calc_zinc: "Zinc Sulphate:",
      calc_kg: "kg",

      // Card Information Labels
      label_duration: "Duration:",
      label_soil_ph: "Soil pH:",
      label_seed_rate: "Seed Rate / Bigha:",
      label_ideal_soil: "Suitable Soil:",
      label_varieties: "Recommended Varieties:",
      label_symptoms: "Symptoms & Causes:",
      label_prevention: "Prevention & Cultural Care:",
      label_prescription: "Pesticide Prescription & Dosage:",
      label_organic_remedy: "Organic / Herbal Remedy:",
      label_warning_tip: "Emergency Advisory & Precaution:",
      label_purpose: "Role & Benefits:",
      label_usage_method: "How to Apply & Exact Dosage:",
      label_timing_precaution: "Precaution & Farmer Safety:",
      label_month_crops: "Crops Sown/Planted This Month:",
      label_key_tasks: "Key Agricultural Actions:",
      label_pest_alert: "Pest & Disease Advisory:",
      btn_view_fert: "Fertilizer List",
      btn_view_disease: "Diseases & Pests",
      btn_reset_search: "Reset Search",
      no_results_found: "No matching items found",

      // Footer
      footer_brand_desc: "A smart, digital hub designed for local farmers. Access guides, manage crop records, optimize inventory stock levels, and coordinate local marketplaces in a single application.",
      footer_section_title: "Sections",
      footer_user_console: "User Console",
      footer_farmer_signin: "Farmer Sign In",
      footer_register_farm: "Register Farm",
      footer_admin_link: "Admin Portal",
      footer_copyright: "© 2026 AgriFriend Digital Agriculture Systems. Developed By Masum Reza, Department of Computer Science, Pirojpur Science and Technology University. All rights reserved.",

      // Login & Register
      auth_tab_login: "Sign In",
      auth_tab_register: "Register Farm",
      login_title: "Welcome Back",
      login_subtitle: "Access your crop scheduler and farm management records",
      login_username_label: "Username",
      login_password_label: "Password",
      login_submit_btn: "Sign In",
      register_title: "Create Farm Account",
      register_subtitle: "Join the AgriFriend🌱 community network",
      register_username_label: "Username",
      register_email_label: "Email Address",
      register_password_label: "Password",
      register_role_label: "Account Role",
      opt_farmer_role: "Farmer / Grower",
      opt_admin_role: "Administrator",
      register_farmname_label: "Farm Entity Name",
      register_location_label: "Location / Region",
      register_contact_label: "Contact Phone",
      register_submit_btn: "Create Account",

      // Dashboard Common
      dash_header_title: "Farmer Console",
      dash_header_subtitle: "Real-time agricultural statistics & records",
      dash_menu_overview: "Overview",
      dash_menu_farms: "Farm Fields",
      dash_menu_crops: "Crops Track",
      dash_menu_inventory: "Inventory Logs",
      dash_menu_equipment: "Equipment Logs",
      dash_menu_finance: "Financials",
      dash_menu_harvest: "Harvests & Sales",
      dash_menu_reports: "Charts & Reports",
      dash_menu_notifications: "Alert Center",
      dash_signout: "Sign Out",

      // Dashboard Metrics
      metric_revenue: "Total Revenue",
      metric_expenses: "Total Expenses",
      metric_active_crops: "Active Crops",
      metric_low_stock: "Low Stock Items",

      // Dashboard Table Headers
      th_crop_variety: "Crop / Variety",
      th_date_planted: "Date Planted",
      th_expected_harvest: "Expected Harvest",
      th_status: "Status",
      th_date: "Date",
      th_category: "Category",
      th_type: "Type",
      th_amount: "Amount",
      th_description: "Description",
      th_field_name: "Field Name",
      th_location: "Location",
      th_size_acres: "Size (Acres)",
      th_soil_type: "Soil Type",
      th_actions: "Actions",
      th_crop_name: "Crop Name",
      th_variety: "Variety",
      th_field_plot: "Field / Plot",
      th_planting_date: "Planting Date",
      th_notes: "Notes",
      th_item_name: "Item Name",
      th_current_stock: "Current Stock",
      th_unit: "Unit",
      th_safety_threshold: "Safety Threshold",
      th_purchase_date: "Purchase Date",
      th_harvest_date: "Harvest Date",
      th_crop: "Crop",
      th_qty_collected: "Quantity Collected",
      th_quality_grade: "Quality Grade",
      th_sale_date: "Sale Date",
      th_harvest_ref: "Harvest Reference",
      th_buyer_name: "Buyer Name",
      th_qty_sold: "Quantity Sold",
      th_revenue: "Revenue (TK)",

      // Admin Panel
      
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

      admin_panel_title: "AgriFriend Admin Management Panel",
      admin_passkey_prompt: "Enter Admin Passkey",
      admin_auth_btn: "Authenticate",
      admin_add_new_card: "Add New Card",
      admin_manage_cards: "Manage Knowledge Cards"
    },

    bn: {
      // Navbar links
      nav_weather: "আবহাওয়া ও পরামর্শ",
      nav_guides: "কৃষি তথ্যভাণ্ডার",
      nav_crop_guides: "ফসলের গাইড",
      nav_disease_guides: "রোগবালাই ও প্রতিকার",
      nav_fert_guides: "সার ও উপকরণ",
      nav_cal_guides: "ফসলের ক্যালেন্ডার",
      nav_seasonal_guides: "মৌসুমী পরামর্শ",
      nav_marketplace: "কৃষি হাটবাজার",
      nav_back: "হোমপেজে ফিরুন",
      nav_dashboard: "খামার ড্যাশবোর্ড",
      nav_admin: "অ্যাডমিন প্যানেল",
      nav_signout: "লগআউট",
      nav_signin: "প্রবেশ / নিবন্ধন",
      nav_home: "হোম",

      // Hero section
      hero_title_1: "কৃষকদের পাশে আধুনিক প্রযুক্তির",
      hero_title_2: "স্মার্ট ডিজিটাল কৃষি সেবা",
      hero_weather_btn: "আবহাওয়ার পরামর্শ দেখুন",
      hero_dashboard_btn: "আমার খামার ড্যাশবোর্ডে যান",

      // Weather section
      weather_section_title: "আবহাওয়া-ভিত্তিক কৃষি পরামর্শ ও সতর্কতা",
      weather_section_desc: "আপনার জেলা নির্বাচন করুন। আমাদের স্মার্ট সিস্টেম আবহাওয়ার তাপমাত্রা, বৃষ্টি ও আর্দ্রতা বিশ্লেষণ করে সেচ, সার ও স্প্রে করার সঠিক দিকনির্দেশনা প্রদান করে।",
      weather_report_title: "স্থানভিত্তিক আবহাওয়া",
      weather_search_placeholder: "জেলা নির্বাচন বা লিখুন (যেমন: ঢাকা, বগুড়া, নওগাঁ)...",
      weather_search_btn: "অনুসন্ধান",
      quick_districts_label: "জনপ্রিয় জেলাসমূহ:",
      weather_humidity_label: "বাতাসের আর্দ্রতা",
      weather_wind_label: "বাতাসের গতি",
      weather_advice_title: "কৃষকের করণীয় পরামর্শ",
      weather_fetching: "আবহাওয়ার তথ্য আনা হচ্ছে...",
      weather_live: "লাইভ আবহাওয়ার তথ্য লোড হয়েছে।",
      weather_mock: "অফলাইন সিমুলেটেড আবহাওয়া। লাইভ তথ্যের জন্য ইন্টারনেট সংযোগ দিন।",
      weather_failed: "আবহাওয়া খুঁজে পাওয়া যায়নি। অন্য জেলা চেষ্টা করুন।",
      weather_error: "আবহাওয়া লোড করা যায়নি",
      dash_weather_loading: "অবস্থান লোড হচ্ছে...",
      dash_weather_checking: "কৃষি পরামর্শ যাচাই করা হচ্ছে...",
      dash_weather_clear: "আকাশ পরিষ্কার। নিয়মিত কৃষিকাজ চালিয়ে যান।",

      // Marketplace section
      marketplace_section_title: "কৃষি যন্ত্রপাতি, বীজ ও ফসল কেনাবেচা",
      marketplace_section_desc: "কৃষিপণ্য ক্রয় করুন, বিক্রয় করুন এবং বিভিন্ন কৃষিপণ্য সম্পর্কে জানুন",
      marketplace_post_btn: "বিজ্ঞাপন পোস্ট করুন",
      marketplace_search_placeholder: "পণ্যের নাম দিয়ে খুঁজুন (যেমন: পাওয়ার টিলার, বীজ, ধান)...",
      filter_all: "সকল পণ্য",
      no_search_results: "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো বিজ্ঞাপন পাওয়া যায়নি।",
      view_all_listings: "সকল বিজ্ঞাপন দেখুন",

      // Marketplace Modal Form
      modal_title: "নতুন বিজ্ঞাপনের বিবরণ",
      form_title_label: "বিজ্ঞাপনের শিরোনাম",
      form_title_placeholder: "যেমন: পাওয়ার টিলার ভাড়া হবে, বোরো ধানের বীজ বিক্রি",
      form_itemtype_label: "পণ্যের ধরন",
      form_dealtype_label: "বিজ্ঞাপনের বিভাগ",
      form_price_label: "মূল্য (টাকা)",
      form_contact_label: "যোগাযোগের ফোন নম্বর",
      form_contact_placeholder: "যেমন: ০১৭xxxxxxxx",
      form_image_label: "পণ্যের ছবি (ঐচ্ছিক)",
      choose_file_btn: "ছবি আপলোড করতে ক্লিক করুন",
      upload_auto_hint: "(ছবি না দিলে স্বয়ংক্রিয় ছবি যুক্ত হবে)",
      form_desc_label: "বিস্তারিত বিবরণ",
      form_desc_placeholder: "পণ্যের অবস্থা, পরিমাণ, ডেলিভারি ব্যবস্থা ইত্যাদি লিখুন।",
      form_submit_btn: "বিজ্ঞাপন প্রকাশ করুন",

      // Marketplace listing options
      opt_equipment: "যন্ত্রপাতি",
      opt_seed: "বীজ ও চারা",
      opt_crop: "ফসল ও শস্য",
      opt_service: "শ্রমিক / সেবা",
      opt_sale: "বিক্রয়ের জন্য",
      opt_rent: "ভাড়ার জন্য",
      opt_share: "বিনামূল্যে শেয়ার",

      // Knowledge Hub Main Page
      guides_title: "কৃষি তথ্য ও জ্ঞান কেন্দ্র",
      guides_desc: "ফসলের আবাদ পদ্ধতি, রোগবালাই শনাক্তকরণ, সুষম সার প্রয়োগ এবং বালাইনাশক ব্যবহারের পূর্ণাঙ্গ গাইডলাইন।",
      kh_banner_title: "কৃষি তথ্য ও পূর্ণাঙ্গ জ্ঞান কেন্দ্র",
      kh_banner_subtitle: "কৃষি শিখুন, সমস্যা বুঝুন, সঠিক সিদ্ধান্ত নিন। প্রতিটি বিষয়ে পূর্ণাঙ্গ তথ্যের জন্য কার্ডে ক্লিক করুন।",
      kh_search_placeholder: "ফসল, রোগ, সার বা কৃষি বিষয় দিয়ে অনুসন্ধান করুন...",
      btn_back_catalog: "জ্ঞান কেন্দ্রে ফিরে যান",
      kh_bookmark: "সংরক্ষণ",
      kh_all_guides: "সম্পূর্ণ গাইড ও টুলস",
      kh_use_tools: "টুলস ব্যবহার করুন",

      // Dedicated Guides Page Titles & Descriptions
      crops_page_title: "ফসলের গাইড ও চাষ পদ্ধতি",
      crops_page_desc: "বীজ নির্বাচন, সঠিক নিয়মে বপন, চারার যত্ন ও ফলন বৃদ্ধির সম্পূর্ণ বৈজ্ঞানিক কৃষি নির্দেশিকা।",
      diseases_page_title: "রোগ শনাক্তকরণ ও কীটনাশক প্রেসক্রিপশন",
      diseases_page_desc: "ফসলের রোগের লক্ষণ, প্রতিকার ও অনুমোদিত রাসায়নিক কীটনাশক ও ছত্রাকনাশক প্রয়োগের সঠিক মাত্রা।",
      fert_page_title: "সার ও কৃষি উপকরণ গাইড",
      fert_page_desc: "সুষম সার প্রয়োগ মাত্রা, কিস্তিভিত্তিক শিডিউল, কীটনাশক প্রয়োগের সঠিক নিয়ম ও মাটির স্বাস্থ্য বৃদ্ধি।",
      seasonal_page_title: "মৌসুমভিত্তিক কৃষি পরামর্শ ও দুর্যোগ প্রস্তুতি",
      seasonal_page_desc: "রবি, খরিপ-১, খরিপ-২ মৌসুমের উপযুক্ত ফসল এবং বন্যা, খরা ও দুর্যোগের পূর্বপ্রস্তুতি।",
      cal_page_title: "ফসলের বাৎসরিক ক্যালেন্ডার ও সময়সূচি",
      cal_page_desc: "১২ মাসের বীজ বপন, চারা রোপণ, সেচ-সার প্রয়োগ, বালাই দমন ও ফসল সংগ্রহের পূর্ণাঙ্গ গাইড।",

      // Filters
      filter_all_crops: "সকল ফসল",
      filter_cereal: "দানাশস্য",
      filter_tuber: "কন্দজাতীয়",
      filter_vegetable: "শাকসবজি",
      filter_cash: "অর্থকরী",
      filter_oilseed: "তেলবীজ",

      filter_all_diseases: "সকল রোগ",
      filter_rice_dis: "ধানের রোগ",
      filter_potato_dis: "আলুর রোগ",
      filter_tomato_dis: "টমেটোর রোগ",
      filter_eggplant_dis: "বেগুনের রোগ/পোকা",
      filter_corn_dis: "ভুট্টার রোগ",
      filter_chilli_dis: "মরিচের রোগ",

      filter_all_inputs: "সকল উপকরণ (২০+)",
      filter_chemical_fert: "রাসায়নিক সার",
      filter_organic_fert: "জৈব সার",
      filter_pesticides: "কীটনাশক",
      filter_fungicides: "ছত্রাকনাশক",

      filter_all_months: "১২ মাস",
      filter_all_seasons: "সকল মৌসুম",
      filter_rabi: "রবি মৌসুম",
      filter_kharif1: "খরিপ-১ মৌসুম",
      filter_kharif2: "খরিপ-২ মৌসুম",
      filter_disaster: "দুর্যোগ প্রস্তুতি",
      filter_crop_milestones: "ফসলভিত্তিক সময়সূচি",
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


      // Search Placeholders
      search_crops_placeholder: "ফসলের নাম দিয়ে খুঁজুন (যেমন: ধান, গম, আলু)...",
      search_disease_placeholder: "রোগের নাম বা ফসলের নাম দিয়ে খুঁজুন (যেমন: ব্লাস্ট, নাবি ধসা, জাব পোকা)...",
      search_fert_placeholder: "সার বা কীটনাশকের নাম দিয়ে খুঁজুন (যেমন: ইউরিয়া, ইমিডাক্লোপ্রিড, ম্যানকোজেব)...",
      search_cal_placeholder: "মাস বা ফসলের কাজ দিয়ে খুঁজুন (যেমন: বৈশাখ, কার্তিক, ধান, আলু)...",
      search_seasonal_placeholder: "মৌসুম বা বিষয় দিয়ে খুঁজুন (যেমন: রবি, খরিপ, বন্যা, খরা)...",

      // Fertilizer Calculator
      calc_title: "সার প্রয়োগ মাত্রা ক্যালকুলেটর",
      calc_crop_label: "ফসল নির্বাচন করুন:",
      calc_land_label: "জমির পরিমাণ (বিঘা):",
      calc_btn: "হিসাব করুন",
      calc_urea: "ইউরিয়া:",
      calc_tsp: "টিএসপি:",
      calc_mop: "এমওপি (পটাশ):",
      calc_gypsum: "জিপসাম:",
      calc_zinc: "জিঙ্ক সালফেট:",
      calc_kg: "কেজি",

      // Card Information Labels
      label_duration: "জীবনকাল:",
      label_soil_ph: "মাটির pH:",
      label_seed_rate: "বিঘা প্রতি বীজ:",
      label_ideal_soil: "উপযুক্ত মাটি:",
      label_varieties: "উন্নত জাতসমূহ:",
      label_symptoms: "লক্ষণ ও কারণ:",
      label_prevention: "প্রতিরোধমূলক ব্যবস্থা:",
      label_prescription: "কীটনাশক পরামর্শ ও প্রয়োগ মাত্রা:",
      label_organic_remedy: "জৈব ও দেশি টোটকা:",
      label_warning_tip: "জরুরি সতর্কতা ও কৃষকের পরামর্শ:",
      label_purpose: "কাজের ভূমিকা ও উপকারিতা:",
      label_usage_method: "কী করে ব্যবহার করবে ও সঠিক মাত্রা:",
      label_timing_precaution: "সতর্কতা ও কৃষকের করণীয়:",
      label_month_crops: "চলতি মাসের আবাদযোগ্য ফসল:",
      label_key_tasks: "প্রধান করণীয় কৃষি কাজ:",
      label_pest_alert: "রোগবালাই ও পোকা দমন সতর্কতা:",
      btn_view_fert: "সার তালিকা",
      btn_view_disease: "রোগবালাই",
      btn_reset_search: "অনুসন্ধান রিসেট করুন",
      no_results_found: "কোনো ফলাফল পাওয়া যায়নি",

      // Footer
      footer_brand_desc: "বাংলাদেশের প্রান্তিক কৃষকদের জন্য তৈরি একটি সম্পূর্ণ ডিজিটাল কৃষি প্ল্যাটফর্ম। কৃষি তথ্য, ফসলের রেকর্ড, সার-কীটনাশক গাইড এবং হাটবাজার এক ঠিকানায়।",
      footer_section_title: "গুরুত্বপূর্ণ লিংক",
      footer_user_console: "ইউজার কনসোল",
      footer_farmer_signin: "কৃষক লগইন",
      footer_register_farm: "খামার নিবন্ধন",
      footer_admin_link: "অ্যাডমিন পোর্টাল",
      footer_copyright: "© ২০২৬ এগ্রিফ্রেন্ড ডিজিটাল এগ্রিকালচার সিস্টেমস। মাসুম রেজা, কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং বিভাগ, পিরোজপুর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় কর্তৃক নির্মিত। সর্বস্বত্ব সংরক্ষিত।",

      // Login & Register
      auth_tab_login: "প্রবেশ করুন",
      auth_tab_register: "খামার নিবন্ধন",
      login_title: "স্বাগতম",
      login_subtitle: "আপনার খামার ড্যাশবোর্ড ও কৃষি তথ্য পরিচালনা করতে প্রবেশ করুন",
      login_username_label: "ব্যবহারকারীর নাম (Username)",
      login_password_label: "পাসওয়ার্ড",
      login_submit_btn: "প্রবেশ করুন",
      register_title: "নতুন খামার অ্যাকাউন্ট তৈরি করুন",
      register_subtitle: "এগ্রিফ্রেন্ড কৃষক নেটওয়ার্কে যুক্ত হোন",
      register_username_label: "ব্যবহারকারীর নাম",
      register_email_label: "ইমেইল ঠিকানা",
      register_password_label: "পাসওয়ার্ড",
      register_role_label: "অ্যাকাউন্টের ধরন",
      opt_farmer_role: "কৃষক / চাষি",
      opt_admin_role: "অ্যাডমিনিস্ট্রেটর",
      register_farmname_label: "খামারের নাম",
      register_location_label: "অবস্থান / এলাকা",
      register_contact_label: "মোবাইল নম্বর",
      register_submit_btn: "নিবন্ধন সম্পন্ন করুন",

      // Dashboard Common
      dash_header_title: "কৃষক ড্যাশবোর্ড",
      dash_header_subtitle: "খামারের বাস্তব সময়ের হিসাব ও তদারকি",
      dash_menu_overview: "সারসংক্ষেপ",
      dash_menu_farms: "খামারের জমি ও প্লট",
      dash_menu_crops: "ফসলের ট্র্যাকিং",
      dash_menu_inventory: "সার ও মজুত হিসাব",
      dash_menu_equipment: "যন্ত্রপাতি খতিয়ান",
      dash_menu_finance: "আয়-ব্যয়ের হিসাব",
      dash_menu_harvest: "ফসল সংগ্রহ ও বিক্রয়",
      dash_menu_reports: "চার্ট ও রিপোর্ট",
      dash_menu_notifications: "সতর্কতা কেন্দ্র",
      dash_signout: "লগআউট",

      // Dashboard Metrics
      metric_revenue: "মোট বিক্রয়",
      metric_expenses: "মোট ব্যয়",
      metric_active_crops: "চলতি ফসল",
      metric_low_stock: "কম মজুত আইটেম",

      // Dashboard Table Headers
      th_crop_variety: "ফসল ও জাত",
      th_date_planted: "বপন/রোপণের তারিখ",
      th_expected_harvest: "সম্ভাব্য সংগ্রহের তারিখ",
      th_status: "বর্তমান অবস্থা",
      th_date: "তারিখ",
      th_category: "বিভাগ",
      th_type: "ধরন",
      th_amount: "পরিমাণ (টাকা)",
      th_description: "বিবরণ",
      th_field_name: "জমির নাম",
      th_location: "অবস্থান",
      th_size_acres: "আয়তন (একর)",
      th_soil_type: "মাটির ধরন",
      th_actions: "কার্যক্রম",
      th_crop_name: "ফসলের নাম",
      th_variety: "জাত",
      th_field_plot: "জমি / প্লট",
      th_planting_date: "বপনের তারিখ",
      th_notes: "নোট",
      th_item_name: "পণ্যের নাম",
      th_current_stock: "বর্তমান মজুত",
      th_unit: "একক",
      th_safety_threshold: "নিরাপত্তা সীমা",
      th_purchase_date: "ক্রয়ের তারিখ",
      th_harvest_date: "সংগ্রহের তারিখ",
      th_crop: "ফসল",
      th_qty_collected: "সংগৃহীত পরিমাণ",
      th_quality_grade: "মানের গ্রেড",
      th_sale_date: "বিক্রয়ের তারিখ",
      th_harvest_ref: "সংগ্রহ রেফারেন্স",
      th_buyer_name: "ক্রেতার নাম",
      th_qty_sold: "বিক্রিত পরিমাণ",
      th_revenue: "রাজস্ব (টাকা)",

      // Admin Panel
      
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

      admin_panel_title: "এগ্রিফ্রেন্ড অ্যাডমিন ম্যানেজমেন্ট প্যানেল",
      admin_passkey_prompt: "অ্যাডমিন পাসকি লিখুন",
      admin_auth_btn: "প্রবেশ যাচাই",
      admin_add_new_card: "নতুন কার্ড যোগ করুন",
      admin_manage_cards: "জ্ঞান কেন্দ্রের কার্ড পরিচালনা"
    }
  };

  // Helper dictionary for common agricultural, district, and weather phrases
  const translationDictionary = {
    'Rice': 'ধান', 'Wheat': 'গম', 'Maize': 'ভুট্টা', 'Potato': 'আলু',
    'Tomato': 'টমেটো', 'Eggplant': 'বেগুন', 'Jute': 'পাট', 'Mustard': 'সরিষা',
    'Chilli': 'মরিচ', 'Lentil': 'মসুর ডাল', 'Onion': 'পেঁয়াজ', 'Garlic': 'রসুন',
    'Urea': 'ইউরিয়া', 'TSP': 'টিএসপি', 'DAP': 'ডিএপি', 'MOP': 'এমওপি (পটাশ)',
    'Gypsum': 'জিপসাম', 'Zinc': 'দস্তা', 'Boron': 'বোরন', 'Vermicompost': 'ভার্মিকম্পোস্ট',
    'Insecticide': 'কীটনাশক', 'Fungicide': 'ছত্রাকনাশক', 'Pesticide': 'বালাইনাশক',
    'Herbicide': 'আগাছানাশক', 'Bio-fertilizer': 'জৈব সার',
    'Equipment': 'যন্ত্রপাতি', 'Seed': 'বীজ', 'Sale': 'বিক্রয়', 'Rent': 'ভাড়া',
    'Rabi': 'রবি', 'Kharif-1': 'খরিপ-১', 'Kharif-2': 'খরিপ-২',
    'Bangladesh': 'বাংলাদেশ',
    'Humidity': 'বাতাসের আর্দ্রতা',
    'Wind Speed': 'বাতাসের গতি',
    'Fetching weather data...': 'আবহাওয়ার তথ্য আনা হচ্ছে...',
    'Weather lookup failed': 'আবহাওয়া খুঁজে পাওয়া যায়নি',
    '(Simulated offline weather. Configure OPENWEATHER_API_KEY for real data.)': 'অফলাইন সিমুলেটেড আবহাওয়া। লাইভ তথ্যের জন্য ইন্টারনেট সংযোগ দিন।',
    '(Live weather data loaded!)': 'লাইভ আবহাওয়ার তথ্য লোড হয়েছে।',
    'Loading Location...': 'অবস্থান লোড হচ্ছে...',
    'Checking agricultural advice...': 'কৃষি পরামর্শ যাচাই করা হচ্ছে...',
    'Clear sky. Proceed with normal scheduling.': 'আকাশ পরিষ্কার। নিয়মিত কৃষিকাজ চালিয়ে যান।',
    'Sunny': 'রৌদ্রোজ্জ্বল',
    'Mainly Clear': 'প্রধানত পরিষ্কার',
    'Partly Cloudy': 'আংশিক মেঘলা',
    'Cloudy': 'মেঘলা',
    'Overcast': 'ঘন মেঘলা',
    'Overcast with Rain': 'মেঘলা ও বৃষ্টি',
    'Foggy': 'কুয়াশাচ্ছন্ন',
    'Drizzle': 'গুঁড়ি গুঁড়ি বৃষ্টি',
    'Dense Drizzle': 'ঘন গুঁড়ি গুঁড়ি বৃষ্টি',
    'Freezing Drizzle': 'হিমশীতল গুঁড়ি বৃষ্টি',
    'Light Rain': 'হালকা বৃষ্টি',
    'Moderate Rain': 'মাঝারি বৃষ্টি',
    'Heavy Rain': 'ভারী বৃষ্টি',
    'Freezing Rain': 'হিমশীতল বৃষ্টি',
    'Slight Snow': 'হালকা তুষারপাত',
    'Moderate Snow': 'মাঝারি তুষারপাত',
    'Heavy Snow': 'ভারী তুষারপাত',
    'Snow Grains': 'তুষারকণা',
    'Rain Showers': 'ঝড়ো বৃষ্টি',
    'Heavy Rain Showers': 'ভারী ঝড়ো বৃষ্টি',
    'Violent Rain Showers': 'প্রবল ঝড়ো বৃষ্টি',
    'Snow Showers': 'তুষারবৃষ্টি',
    'Heavy Snow Showers': 'ভারী তুষারবৃষ্টি',
    'Thunderstorm': 'বজ্রসহ বৃষ্টি',
    'Thunderstorm with Hail': 'শিলাবৃষ্টিসহ বজ্রঝড়',
    'Severe Thunderstorm': 'প্রবল বজ্রঝড়',
    'Windy': 'ঝোড়ো বাতাস',
    'Clear': 'পরিষ্কার আকাশ',
    'Natural irrigation active. Postpone scheduled field watering.': 'প্রাকৃতিক সেচ চলছে। নির্ধারিত সেচ স্থগিত রাখুন।',
    'Avoid applying foliar spray pesticides or chemical fertilizers since rain will wash them away.': 'পাতায় স্প্রে বা রাসায়নিক সার দেবেন না; বৃষ্টিতে ধুয়ে যাবে।',
    'Ensure proper drainage in fields to prevent waterlogging and root rot.': 'জলাবদ্ধতা ও শিকড় পচা রোধে নালা খোলা রাখুন।',
    'Standard irrigation schedule recommended.': 'নিয়মিত সেচের সময়সূচি অনুসরণ করুন।',
    'High temperature detected. Increase watering frequency for shallow-rooted crops.': 'তাপমাত্রা বেশি। অগভীর শিকড়ের ফসলে সেচ বাড়ান।',
    'Excellent conditions for soil drying and land clearing.': 'মাটি শুকানো ও জমি পরিষ্কারের জন্য অনুকূল সময়।',
    'Avoid transplanting delicate seedlings during mid-day heat to prevent transplant shock.': 'দুপুরের তীব্র গরমে নাজুক চারা রোপণ করবেন না।',
    'Favorable ambient temperature for sowing and crop maintenance.': 'বপন ও পরিচর্যার জন্য তাপমাত্রা অনুকূল।',
    'High humidity levels. Monitor susceptible plants for fungal leaf spots or Powdery Mildew.': 'আর্দ্রতা বেশি। ছত্রাকজনিত দাগ ও পাউডারি মিলডিউ নজরদারি করুন।',
    'Limit morning watering; water closer to the soil to avoid wet leaves.': 'সকালে পাতায় পানি না দিয়ে মাটির গোড়ায় সেচ দিন।',
    'Strong winds alert. Avoid spraying liquid chemicals as drift will reduce efficiency and harm surrounding areas.': 'ঝোড়ো হাওয়া। তরল স্প্রে করবেন না; উড়ে গিয়ে ক্ষতি হতে পারে।',
    'Inspect tall crop stakes or netting supports for wind stability.': 'লম্বা ফসলের খুঁটি ও জালের ভিত্তি পরীক্ষা করুন।',
    'Calm winds, but postpone spraying pesticides or fertilizers until active precipitation stops.': 'বাতাস শান্ত, তবে বৃষ্টি থামার আগে স্প্রে করবেন না।',
    'Calm winds. Perfect time for spraying organic pesticides or foliar feeds.': 'বাতাস শান্ত। জৈব কীটনাশক বা পাতার সার স্প্রে করার উপযুক্ত সময়।',
    'Dhaka': 'ঢাকা', 'Gazipur': 'গাজীপুর', 'Narayanganj': 'নারায়ণগঞ্জ',
    'Tangail': 'টাঙ্গাইল', 'Narsingdi': 'নরসিংদী', 'Manikganj': 'মানিকগঞ্জ',
    'Munshiganj': 'মুন্সীগঞ্জ', 'Faridpur': 'ফরিদপুর', 'Gopalganj': 'গোপালগঞ্জ',
    'Madaripur': 'মাদারীপুর', 'Rajbari': 'রাজবাড়ী', 'Shariatpur': 'শরীয়তপুর',
    'Kishoreganj': 'কিশোরগঞ্জ', 'Chattogram': 'চট্টগ্রাম', "Cox's Bazar": 'কক্সবাজার',
    'Cumilla': 'কুমিল্লা', 'Feni': 'ফেনী', 'Brahmanbaria': 'ব্রাহ্মণবাড়িয়া',
    'Noakhali': 'নোয়াখালী', 'Chandpur': 'চাঁদপুর', 'Lakshmipur': 'লক্ষ্মীপুর',
    'Rangamati': 'রাঙ্গামাটি', 'Bandarban': 'বান্দরবান', 'Khagrachhari': 'খাগড়াছড়ি',
    'Rajshahi': 'রাজশাহী', 'Bogura': 'বগুড়া', 'Pabna': 'পাবনা',
    'Sirajganj': 'সিরাজগঞ্জ', 'Naogaon': 'নওগাঁ', 'Natore': 'নাটোর',
    'Chapainawabganj': 'চাঁপাইনবাবগঞ্জ', 'Joypurhat': 'জয়পুরহাট', 'Khulna': 'খুলনা',
    'Jashore': 'যশোর', 'Satkhira': 'সাতক্ষীরা', 'Bagerhat': 'বাগেরহাট',
    'Kushtia': 'কুষ্টিয়া', 'Chuadanga': 'চুয়াডাঙ্গা', 'Meherpur': 'মেহেরপুর',
    'Jhenaidah': 'ঝিনাইদহ', 'Magura': 'মাগুরা', 'Narail': 'নড়াইল',
    'Barishal': 'বরিশাল', 'Patuakhali': 'পটুয়াখালী', 'Bhola': 'ভোলা',
    'Pirojpur': 'পিরোজপুর', 'Barguna': 'বরগুনা', 'Jhalokathi': 'ঝালকাঠি',
    'Sylhet': 'সিলেট', 'Moulvibazar': 'মৌলভীবাজার', 'Habiganj': 'হবিগঞ্জ',
    'Sunamganj': 'সুনামগঞ্জ', 'Rangpur': 'রংপুর', 'Dinajpur': 'দিনাজপুর',
    'Gaibandha': 'গাইবান্ধা', 'Kurigram': 'কুড়িগ্রাম', 'Lalmonirhat': 'লালমনিরহাট',
    'Nilphamari': 'নীলফামারী', 'Panchagarh': 'পঞ্চগড়', 'Thakurgaon': 'ঠাকুরগাঁও',
    'Mymensingh': 'ময়মনসিংহ', 'Jamalpur': 'জামালপুর', 'Netrokona': 'নেত্রকোণা',
    'Sherpur': 'শেরপুর'
  };

  const reverseDictionary = {};
  Object.keys(translationDictionary).forEach((en) => {
    reverseDictionary[translationDictionary[en]] = en;
  });

  function foldBangla(text) {
    return String(text || '')
      .replace(/য়/g, 'য়')
      .replace(/ড়/g, 'ড়')
      .replace(/ঢ়/g, 'ঢ়')
      .replace(/র়/g, 'ড়');
  }

  function lookupPhrase(text, currentLang) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return trimmed;

    if (currentLang === 'en') {
      if (reverseDictionary[trimmed]) return reverseDictionary[trimmed];
      const folded = foldBangla(trimmed);
      if (reverseDictionary[folded]) return reverseDictionary[folded];
      for (const [en, bn] of Object.entries(translationDictionary)) {
        if (foldBangla(bn) === folded || en.toLowerCase() === trimmed.toLowerCase()) return en;
      }
      return trimmed;
    }

    if (translationDictionary[trimmed]) return translationDictionary[trimmed];
    for (const [en, bn] of Object.entries(translationDictionary)) {
      if (en.toLowerCase() === trimmed.toLowerCase()) return bn;
      if (foldBangla(bn) === foldBangla(trimmed)) return bn;
    }
    return trimmed;
  }

  // Get current active language ('bn' is default)
  window.getCurrentLanguage = function() {
    return localStorage.getItem('language') || 'bn';
  };

  window.tKey = function(key, fallback) {
    const lang = window.getCurrentLanguage();
    if (translations[lang] && translations[lang][key]) return translations[lang][key];
    if (translations.en && translations.en[key]) return translations.en[key];
    return fallback || key;
  };

  // Convert typed Bangla/English district names to the English key used by the weather API
  window.resolveDistrictName = function(input) {
    if (!input || typeof input !== 'string') return input;
    let trimmed = input.trim()
      .replace(/,?\s*(Bangladesh|বাংলাদেশ)\s*$/i, '')
      .trim();
    if (trimmed.includes(' / ')) trimmed = trimmed.split(' / ')[0].trim();
    return lookupPhrase(trimmed, 'en') || trimmed;
  };

  // Intelligent text translator for bilingual format like "English / বাংলা"
  window.translateText = function(text) {
    if (!text || typeof text !== 'string') return text;
    const currentLang = window.getCurrentLanguage();
    const trimmed = text.trim();

    if (trimmed.includes(' / ')) {
      const parts = trimmed.split(' / ');
      if (parts.length >= 2) {
        return currentLang === 'en' ? parts[0].trim() : parts[parts.length - 1].trim();
      }
    }

    // Short "City, Country" labels
    if (/^[^,]{2,40},\s*[^,]{2,40}$/.test(trimmed)) {
      return trimmed.split(',').map((part) => lookupPhrase(part.trim(), currentLang)).join(', ');
    }

    return lookupPhrase(trimmed, currentLang);
  };

  // Apply translations to all DOM elements
  window.applyTranslations = function() {
    const currentLang = window.getCurrentLanguage();
    document.documentElement.lang = currentLang;

    // 1. Text elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[currentLang] && translations[currentLang][key]) {
        const textValue = translations[currentLang][key];
        const icon = el.querySelector('i');
        if (icon) {
          const textSpan = el.querySelector('.i18n-text');
          if (textSpan) {
            textSpan.textContent = textValue;
          } else {
            // Find text node and replace
            let replaced = false;
            el.childNodes.forEach(node => {
              if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                node.textContent = ' ' + textValue.trim();
                replaced = true;
              }
            });
            if (!replaced) {
              el.innerHTML = icon.outerHTML + ' <span class="i18n-text">' + textValue + '</span>';
            }
          }
        } else {
          el.textContent = textValue;
        }
      }
    });

    // 2. Input placeholders with data-i18n-placeholder
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[currentLang] && translations[currentLang][key]) {
        el.setAttribute('placeholder', translations[currentLang][key]);
      }
    });

    // 3. Option elements with data-i18n
    const options = document.querySelectorAll('option[data-i18n]');
    options.forEach(opt => {
      const key = opt.getAttribute('data-i18n');
      if (translations[currentLang] && translations[currentLang][key]) {
        opt.textContent = translations[currentLang][key];
      }
    });

    // 4. Update all toggle button labels (showing the opposite language)
    const toggleLabels = document.querySelectorAll('#lang-toggle-label');
    toggleLabels.forEach(label => {
      label.textContent = currentLang === 'bn' ? 'English' : 'বাংলা';
    });

    // 5. Weather district chips (English <-> Bangla)
    document.querySelectorAll('.btn-chip[data-district]').forEach((btn) => {
      const en = btn.getAttribute('data-district');
      btn.textContent = window.translateText(en);
    });

    document.querySelectorAll('#dash-weather-district-select option').forEach((opt) => {
      const en = opt.getAttribute('data-district') || opt.value;
      const bn = translationDictionary[en] || en;
      opt.textContent = currentLang === 'bn' ? `${bn} (${en})` : `${en} / ${bn}`;
    });
  };

  // Toggle between English and Bangla
  window.toggleLanguage = function() {
    const currentLang = window.getCurrentLanguage();
    const nextLang = currentLang === 'bn' ? 'en' : 'bn';
    localStorage.setItem('language', nextLang);
    window.applyTranslations();

    // Broadcast languagechanged event across whole app
    document.dispatchEvent(new CustomEvent('languagechanged', { detail: nextLang }));
  };

  // Export dictionary references globally for other scripts
  window.translations = translations;
  window.i18nData = translations;
  window.translationDictionary = translationDictionary;

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.applyTranslations());
  } else {
    window.applyTranslations();
  }
})();
