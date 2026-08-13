export const getTranslations = (lang) => ({
  home: lang === 'ar' ? 'الرئيسية' : 'Home',
  aboutUs: lang === 'ar' ? 'من نحن' : 'About Us',
  allCategories: lang === 'ar' ? 'جميع الفئات' : 'All Categories',
  subTitle: lang === 'ar' ? 'اكتشف المزيد، اسأل بذكاء، استكشف أبوظبي' : 'Discover More, Ask Smarter, Explore Abu Dhabi',
  description: lang === 'ar' ? 'ابحث باستخدام اللغة الطبيعية أو استكشف الخرائط التفاعلية عبر أبوظبي — مع أكثر من 5,000 نقطة بيانات في متناول يدك.' : 'Search using natural language or explore interactive maps across Abu Dhabi — with 5K+ data points at your fingertips.',
  searchPlaceholder: lang === 'ar' ? 'اسأل الخريطة الذكية عن أي شيء يتعلق بالأماكن أو الخدمات...' : 'Ask Smart Map Anything About Places, Services, Or Locations...',
  searchBtn: lang === 'ar' ? 'بحث' : 'Search',
  exploreMap: lang === 'ar' ? 'استكشف الخريطة' : 'Explore Map View',
  categories: lang === 'ar' ? 'الفئات' : 'Categories',
  search: lang === 'ar' ? 'بحث' : 'Search',
  education: lang === 'ar' ? 'التعليم' : 'Education',
  healthcare: lang === 'ar' ? 'الرعاية الصحية' : 'Healthcare',
  transportation: lang === 'ar' ? 'النقل' : 'Transport',
  environment: lang === 'ar' ? 'البيئة' : 'Environment',
  government: lang === 'ar' ? 'الخدمات الحكومية' : 'Government Services',
  tourism: lang === 'ar' ? 'السياحة' : 'Tourism',
  infrastructure: lang === 'ar' ? 'البنية التحتية' : 'Infrastructure',
  housing: lang === 'ar' ? 'الإسكان' : 'Housing',
  publicSafety: lang === 'ar' ? 'السلامة العامة' : 'Public Safety',
  utilities: lang === 'ar' ? 'المرافق' : 'Utilities',
  climate: lang === 'ar' ? 'المناخ' : 'Climate',
  construction: lang === 'ar' ? 'البناء والتشييد' : 'Construction',
  energy: lang === 'ar' ? 'الطاقة' : 'Energy',
  parks: lang === 'ar' ? 'الحدائق' : 'Parks',
  agriculture: lang === 'ar' ? 'الزراعة' : 'Agriculture',
  employment: lang === 'ar' ? 'التوظيف' : 'Employment',
  moreChips: lang === 'ar' ? '12 أكثر' : '12 More',
  history: lang === 'ar' ? 'السجل' : 'History',
  shareFeedback: lang === 'ar' ? 'ملاحظاتك وتقييمك' : 'Share Feedback',
  help: lang === 'ar' ? 'المساعدة' : 'Help',
  signIn: lang === 'ar' ? 'تسجيل الدخول' : 'Sign In',
  getCatName: (name) => {
    if (lang !== 'ar') return name;
    const dict = {
      'Education': 'التعليم',
      'Healthcare': 'الرعاية الصحية',
      'Transport': 'النقل',
      'Transportation': 'النقل',
      'Environment': 'البيئة',
      'Government Services': 'الخدمات الحكومية',
      'Government': 'الخدمات الحكومية',
      'Tourism': 'السياحة',
      'Infrastructure': 'البنية التحتية',
      'Housing': 'الإسكان',
      'Public Safety': 'السلامة العامة',
      'Utilities': 'المرافق',
      'Climate': 'المناخ',
      'Construction': 'البناء والتشييد',
      'Energy': 'الطاقة',
      'Parks': 'الحدائق',
      'Park': 'الحدائق',
      'Agriculture': 'الزراعة',
      'Employment': 'التوظيف'
    };
    return dict[name] || name;
  },
  getSubcatName: (name) => {
    if (lang !== 'ar') return name;
    const dict = {
      'Charter Schools': 'مدارس الشراكة',
      'Nurseries': 'دور الحضانة',
      'POD': 'أصحاب الهمم',
      'Public Schools': 'المدارس الحكومية',
      'Private Schools': 'المدارس الخاصة',
      'Hospitals': 'المستشفيات',
      'Clinics': 'العيادات',
      'Pharmacies': 'الصيدليات',
      'Bus Stations': 'محطات الحافلات',
      'Metro Line': 'خط المترو',
      'Parking': 'مواقف السيارات',
      'Municipalities': 'البلديات',
      'Police Stations': 'مراكز الشرطة',
      'Public Parks': 'الحدائق العامة',
      'Playgrounds': 'الملاعب'
    };
    return dict[name] || name;
  }
});

export const getArabicTitle = (title) => {
  if (title.includes('Choueifat')) return 'مدرسة الشويفات الدولية- المشرف';
  if (title.includes('Khalifa University')) return 'جامعة خليفة للعلوم والتكنولوجيا';
  if (title.includes('NYU')) return 'جامعة نيويورك أبوظبي';
  if (title.includes('Sorbonne')) return 'جامعة سوربون أبوظبي';
  if (title.includes('Brighton')) return 'برايتون كوليدج أبوظبي';
  if (title.includes('Yasmina')) return 'أكاديمية الياسمينة';
  if (title.includes('Cleveland')) return 'مستشفى كليفلاند كلينك أبوظبي';
  if (title.includes('Burjeel')) return 'مستشفى برجيل أبوظبي';
  if (title.includes('Shakhbout')) return 'مدينة الشيخ شخبوط الطبية';
  if (title.includes('Danat')) return 'مستشفى دانة الإمارات للنساء والأطفال';
  if (title.includes('Mediclinic')) return 'مستشفى ميديكلينيك طريق المطار';
  if (title.includes('Mangrove')) return 'منتزه القرم الوطني';
  if (title.includes('Umm Al Emarat')) return 'منتزه أم الإمارات';
  if (title.includes('Capital Park')) return 'حديقة العاصمة';
  if (title.includes('Khalifa Park')) return 'منتزه خليفة';
  if (title.includes('Grand Mosque')) return 'جامع الشيخ زايد الكبير';
  if (title.includes('Louvre')) return 'متحف اللوفر أبوظبي';
  if (title.includes('Qasr Al Watan')) return 'قصر الوطن';
  if (title.includes('Ferrari')) return 'عالم فيراري أبوظبي';
  if (title.includes('Airport')) return 'مطار زايد الدولي';
  if (title.includes('Bus Terminal')) return 'محطة الحافلات الرئيسية أبوظبي';
  return 'مركز أبوظبي الجغرافي';
};
