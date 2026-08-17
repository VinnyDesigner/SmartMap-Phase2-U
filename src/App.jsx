import { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Activity,
  Compass,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Info,
  Settings,
  Database,
  Play,
  Trash2,
  MapPin,
  Ruler,
  RefreshCw,
  Shield,
  Eye,
  HelpCircle,
  BarChart2,
  Map,
  Sliders,
  Search,
  ArrowRight,
  ArrowLeft,
  Home,
  User,
  GraduationCap,
  Heart,
  Car,
  Building,
  Trees,
  Plus,
  Sparkles,
  Send,
  ChevronRight,
  Bookmark,
  MessageSquare,
  LogIn,
  X,
  PanelLeft,
  PanelLeftClose,
  PanelRight,
  MoreVertical,
  Grid,
  List,
  Edit,
  Target,
  ChevronDown,
  ChevronUp,
  Globe,
  Mountain,
  Circle,
  Square,
  Pentagon,
  MousePointer,
  Minus,
  Clock,
  Star,
  Navigation,
  Phone,
  Mail
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { searchSpatialData, ABU_DHABI_SPATIAL_DATASET } from './services/spatialSearchService.js';
import leftLogo from './assets/left.png';
import rightLogo from './assets/right.png';
import lagIcon from './assets/lag.svg';
import themeIcon from './assets/theme.svg';
import profileIcon from './assets/profile.svg';
import aiIcon from './assets/Ai icon.svg';
import historyIcon from './assets/History.svg';
import feedbackIcon from './assets/share feedback.svg';
import basemapLightGrayImg from './assets/basemap_light_gray.png';
import basemapStreetsImg from './assets/basemap_streets.png';
import basemapSatelliteImg from './assets/basemap_satellite.png';
import helpIcon from './assets/help.svg';
import signInIcon from './assets/sign in.svg';
import './App.css';
import { CATEGORY_TREE, PROJECTS } from './config/constants.js';
import { GIS_CATEGORY_COLORS, getGisCategorySymbolSvg } from './utils/gisSymbols.js';
import { getTranslations, getArabicTitle } from './utils/translations.js';
import FourPointStar from './components/FourPointStar.jsx';
import LeafletMap from './components/LeafletMap.jsx';
import CommonHeader from './components/CommonHeader.jsx';
import Toast from './components/Toast.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CategoryDrawer from './components/CategoryDrawer.jsx';

function App() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('villa-royale');
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'collections' | 'layers' | 'analysis' | 'projects'
  const [collectionsTab, setCollectionsTab] = useState('queries'); // 'queries' | 'favorites'
  const [collectionsFilterQuery, setCollectionsFilterQuery] = useState('');
  const [savedQueries, setSavedQueries] = useState([
    { id: 1, title: 'Schools within 2 km in Abu Dhabi', date: 'Saved Yesterday', category: 'Education' },
    { id: 2, title: 'Hospitals & Medical Centers near Khalifa City', date: 'Saved 3 days ago', category: 'Healthcare' },
    { id: 3, title: 'Commercial Development Zones - High Traffic', date: 'Saved May 12', category: 'Planning' },
    { id: 4, title: 'Public Parks & Recreation Facilities', date: 'Saved Apr 28', category: 'Amenities' },
    { id: 5, title: 'Residential Villa Plots under Construction', date: 'Saved Apr 15', category: 'Real Estate' }
  ]);
  const [favoritesList, setFavoritesList] = useState([
    { id: 1, title: 'Khalifa City Medical Center', category: 'Hospital', coords: [24.428, 54.582], area: 'Khalifa City A' },
    { id: 2, title: 'Abu Dhabi Educational Complex', category: 'School Cluster', coords: [24.4539, 54.3773], area: 'Central Abu Dhabi' },
    { id: 3, title: 'Al Reem Waterfront Park', category: 'Public Park', coords: [24.498, 54.407], area: 'Al Reem Island' },
    { id: 4, title: 'Sheikh Zayed Heritage Zone', category: 'Cultural Landmark', coords: [24.412, 54.475], area: 'Al Maqta' },
    { id: 5, title: 'Corniche Community Health Center', category: 'Clinic', coords: [24.471, 54.335], area: 'Corniche West' }
  ]);
  const [isRecentAccordionOpen, setIsRecentAccordionOpen] = useState(true);
  const [historyFilterQuery, setHistoryFilterQuery] = useState('');
  const [activeHistoryId, setActiveHistoryId] = useState(1);
  const [searchHistory, setSearchHistory] = useState([
    { id: 1, text: 'Schools within 2 km', timestamp: 'Just now' },
    { id: 2, text: 'Hospitals Near Me', timestamp: '10m ago' },
    { id: 3, text: 'Government Offices', timestamp: '1h ago' },
    { id: 4, text: 'Restaurants', timestamp: '2h ago' },
    { id: 5, text: 'Hospitals Near Me', timestamp: 'Yesterday' },
    { id: 6, text: 'Find Schools near Khalifa city', timestamp: 'Yesterday' },
    { id: 7, text: 'Compare healthcare facilities...', timestamp: '2 days ago' },
    { id: 8, text: 'Public paks in abu dhabi regi...', timestamp: '3 days ago' },
    { id: 9, text: 'Find Schools near Khalifa city', timestamp: '3 days ago' },
    { id: 10, text: 'Compare healthcare facilities...', timestamp: '4 days ago' },
    { id: 11, text: 'Find Schools near Khalifa city', timestamp: '5 days ago' },
    { id: 12, text: 'Compare healthcare facilities...', timestamp: '5 days ago' },
    { id: 13, text: 'Hospitals Near Me', timestamp: '6 days ago' },
    { id: 14, text: 'Hospitals Near Me', timestamp: '1 week ago' },
    { id: 15, text: 'Compare healthcare facilities...', timestamp: '1 week ago' },
    { id: 16, text: 'Find Schools near Khalifa city', timestamp: '1 week ago' },
    { id: 17, text: 'Compare healthcare facilities...', timestamp: '1 week ago' },
    { id: 18, text: 'Hospitals Near Me', timestamp: '2 weeks ago' },
    { id: 19, text: 'Compare healthcare facilities...', timestamp: '2 weeks ago' },
  ]);

  // Left strip floating popovers & basemap selection
  const [activeLeftPopover, setActiveLeftPopover] = useState(null); // 'basemap' | 'legend' | 'draw' | null
  const [activeBasemap, setActiveBasemap] = useState('light');
  const [activeDrawTool, setActiveDrawTool] = useState('polygon');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const t = {
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
  };

  // Layer visibilities (default to clean view as per reference UI)
  const [layers, setLayers] = useState({
    elevationSurface: false,
    buildings3D: false,
    projectBoundary: false,
    bimSublayers: false,
    heatmapOverlay: false
  });

  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Sidebar open/close state (hidden initially as per reference UI)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Coordinates and elevation tracked on mouse move
  const [hoveredCoords, setHoveredCoords] = useState({ lat: 0, lon: 0, elevation: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Volume measurement states
  const [volumeToolActive, setVolumeToolActive] = useState(false);
  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    // Popup notifications disabled per request
    return;
  };

  const toast = Object.assign(
    (msg) => showToast(msg),
    {
      success: (msg) => showToast(msg),
      error: (msg) => showToast(msg),
      info: (msg) => showToast(msg),
      warn: (msg) => showToast(msg),
      warning: (msg) => showToast(msg)
    }
  );

  const getArabicTitle = (title) => {
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

  // AI Assistant Search state ('button' | 'panel')
  const [aiState, setAiState] = useState('panel');
  const [isAiClosing, setIsAiClosing] = useState(false);
  const isAISearchBarOpen = aiState === 'panel';

  const handleCloseAiPanel = () => {
    setIsAiClosing(true);
    setTimeout(() => {
      setAiState('button');
      setIsAiClosing(false);
    }, 300);
  };

  const setIsAISearchBarOpen = (open) => {
    if (open) {
      setIsAiClosing(false);
      setAiState('panel');
    } else {
      handleCloseAiPanel();
    }
  };
  const [isAIPanelExpanded, setIsAIPanelExpanded] = useState(false);
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi! I can find nearby places — hospitals, clinics, schools, pharmacies, parks, airports, and more — around your location. Ask for a full report on any category, or check layers in the category bar and say "generate a report". Try Quick Start or ask directly, e.g. "hospitals within 5km".'
    }
  ]);

  const chatMessagesContainerRef = useRef(null);
  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isAISearchBarOpen]);

  // AI Panel Height States (toggled between collapsed 72px and expanded 44vh)
  const [panelHeight, setPanelHeight] = useState(200);
  const [hoveredDockIndex, setHoveredDockIndex] = useState(null);

  // Right Categories Side Drawer states
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState('Education');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  // Profile Dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cursor splash ripple effect
  useEffect(() => {
    const handleSplash = (e) => {
      const splash = document.createElement('span');
      splash.className = 'cursor-splash';
      splash.style.left = `${e.clientX}px`;
      splash.style.top = `${e.clientY}px`;
      document.body.appendChild(splash);
      splash.addEventListener('animationend', () => splash.remove());
    };
    document.addEventListener('click', handleSplash);
    return () => document.removeEventListener('click', handleSplash);
  }, []);

  // Left popover auto-dismiss on click outside
  const leftPopoverRef = useRef(null);
  useEffect(() => {
    const handleClickOutsidePopover = (event) => {
      if (
        leftPopoverRef.current &&
        !leftPopoverRef.current.contains(event.target) &&
        !event.target.closest('.map-controls-left-strip')
      ) {
        setActiveLeftPopover(null);
      }
    };
    if (activeLeftPopover) {
      document.addEventListener('mousedown', handleClickOutsidePopover);
    }
    return () => document.removeEventListener('mousedown', handleClickOutsidePopover);
  }, [activeLeftPopover]);

  // Logs console
  const [logs, setLogs] = useState([]);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [clickPoints, setClickPoints] = useState([]);
  const [volumeResult, setVolumeResult] = useState(null);
  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);

  // Spatial Search Results States
  const [activeSearchResults, setActiveSearchResults] = useState([]);
  const [activeSearchFilterTag, setActiveSearchFilterTag] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('overview');

  const handleUnifiedSearch = (searchOptions = {}) => {
    setSelectedLocation(null);
    if (panelHeight <= 100) setPanelHeight(200);
    const { query = searchQuery, category = '' } = searchOptions;
    const cleanQuery = typeof query === 'string' ? query.trim() : '';
    const cleanCategory = typeof category === 'string' ? category.trim() : '';

    if (cleanQuery) {
      const newId = Date.now();
      setActiveHistoryId(newId);
      setSearchHistory(prev => [
        { id: newId, text: cleanQuery, timestamp: 'Just now' },
        ...prev.filter(item => item.text.toLowerCase() !== cleanQuery.toLowerCase())
      ]);
    }

    if (!cleanQuery && !cleanCategory) {
      setShowMap(true);
      setIsSidebarOpen(false);
      setAiState('button');
      return;
    }

    setIsSidebarOpen(false);
    setAiState('panel');

    const q = cleanQuery.toLowerCase();
    // BIM Project Match check
    if (q.includes('villa') || q.includes('royale') || q.includes('bim-01') || q.includes('bim-02') || q.includes('wellness')) {
      setSelectedProjectId('villa-royale');
      setSelectedBuilding(null);
      setSelectedLevel('All');
      setActiveSearchResults([]);
      setActiveSearchFilterTag({ query: cleanQuery, category: '', label: 'Villa Royale BIM' });
      setShowMap(true);
      addLog('AI Search', "Matched BIM project 'Villa Royale'. Loaded WebScene.", 'success');
      showToast("AI Match: Loaded Villa Royale Project");
      return;
    } else if (q.includes('downtown') || q.includes('commercial') || q.includes('tower') || q.includes('retail') || q.includes('hq')) {
      setSelectedProjectId('downtown-comm');
      setSelectedBuilding(null);
      setSelectedLevel('All');
      setActiveSearchResults([]);
      setActiveSearchFilterTag({ query: cleanQuery, category: '', label: 'Downtown Commercial' });
      setShowMap(true);
      addLog('AI Search', "Matched BIM project 'Downtown Commercial'. Loaded WebScene.", 'success');
      showToast("AI Match: Loaded Downtown Commercial");
      return;
    } else if (q.includes('transit') || q.includes('hub') || q.includes('terminal')) {
      setSelectedProjectId('transit-hub');
      setSelectedBuilding(null);
      setSelectedLevel('All');
      setActiveSearchResults([]);
      setActiveSearchFilterTag({ query: cleanQuery, category: '', label: 'Metropolitan Transit Hub' });
      setShowMap(true);
      addLog('AI Search', "Matched BIM project 'Metropolitan Transit Hub'. Loaded WebScene.", 'success');
      showToast("AI Match: Loaded Metropolitan Transit Hub");
      return;
    }

    // Spatial Search matching
    const results = searchSpatialData(cleanQuery, cleanCategory);
    setSelectedLocation(null);
    setActiveSearchResults(results);

    const tagLabel = cleanCategory || cleanQuery || 'All Locations';
    setActiveSearchFilterTag({ query: cleanQuery, category: cleanCategory, label: tagLabel });
    setShowMap(true);

    const count = results.length;
    showToast(`Found ${count} location${count === 1 ? '' : 's'} matching "${tagLabel}"`);
    addLog('Spatial Search', `Query "${tagLabel}" returned ${count} result(s)`, 'success');

    // Build subcategory tabs count
    const subcatCounts = {};
    results.forEach(r => {
      subcatCounts[r.subcategory] = (subcatCounts[r.subcategory] || 0) + 1;
    });

    const subcatTabs = Object.keys(subcatCounts).map(sc => ({
      id: sc,
      name: `${sc} (${subcatCounts[sc]})`,
      count: subcatCounts[sc]
    }));

    const defaultTab = subcatTabs.length > 0 ? subcatTabs[0].id : '';

    // Radius Chips
    const radiusCategory = cleanCategory || (cleanQuery ? cleanQuery.split(/\s+within\s+/i)[0].trim() : 'Schools');
    const radiusChips = [
      { label: lang === 'ar' ? `قريب · 2 كم` : `Nearby · 2 km`, query: `${radiusCategory} within 2km` },
      { label: lang === 'ar' ? `قريب · 5 كم` : `Nearby · 5 km`, query: `${radiusCategory} within 5km` },
      { label: lang === 'ar' ? `قريب · 7 كم` : `Nearby · 7 km`, query: `${radiusCategory} within 7km` }
    ];

    const structuredResultsPayload = {
      title: lang === 'ar' ? 'أفضل التطابقات' : 'Best Match',
      category: cleanCategory || 'Education',
      tabs: subcatTabs,
      activeTabId: defaultTab,
      items: results.map(r => ({
        id: r.id,
        title: r.title,
        arabicTitle: getArabicTitle(r.title),
        subcategory: r.subcategory,
        address: r.address,
        description: r.description,
        lat: r.lat,
        lon: r.lon,
        isFavorite: false
      }))
    };

    console.log('[GeoVision Spatial AI Search Response]:', {
      query: cleanQuery || cleanCategory,
      count: count,
      payload: structuredResultsPayload,
      results: results
    });

    let aiIntroText = `I found ${count} ${tagLabel.toLowerCase()} within 2 km. ${subcatTabs.length > 0 ? subcatTabs[0].id : 'Public schools'} are shown by default.`;
    if (count === 0) {
      aiIntroText = `No exact spatial dataset match found for "${tagLabel}". Displaying Abu Dhabi area.`;
    }

    const searchId = Date.now() + Math.random();
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: cleanQuery || cleanCategory },
      { sender: 'ai', isSearching: true, id: searchId }
    ]);

    setTimeout(() => {
      setChatMessages(prev => prev.map(msg =>
        msg.id === searchId
          ? {
            sender: 'ai',
            text: aiIntroText,
            structuredResults: structuredResultsPayload,
            isExpanded: true,
            chips: radiusChips,
            id: searchId
          }
          : msg
      ));
    }, 2000);
  };

  const handleSearchSubmit = (query = searchQuery) => {
    handleUnifiedSearch({ query });
  };

  // Initialize with theme and first logs
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    addLog('System', `GeoVision initialized. Ready in ${theme.toUpperCase()} mode.`, 'success');
    addLog('BIM', `WebScene portal layers loaded. Defaulting to: ${activeProject.name}`, 'info');
  }, []);

  // Sync theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Log on project change
  const handleProjectChange = (e) => {
    const newId = e.target.value;
    setSelectedProjectId(newId);
    const proj = PROJECTS.find(p => p.id === newId);
    setSelectedBuilding(null);
    setSelectedLevel('All');
    setClickPoints([]);
    setVolumeResult(null);
    addLog('System', `Switched active WebScene to [${proj.name}]`, 'info');
    addLog('BIM', `Loaded Building Scene Layer with ${proj.buildingsCount} components.`, 'success');
    showToast(`Project loaded: ${proj.name}`);
  };

  const addLog = (category, message, type = 'system') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      { time, category, message, type },
      ...prev.slice(0, 49) // Keep last 50 logs
    ]);
  };


  const toggleLayer = (layerKey) => {
    setLayers(prev => {
      const next = { ...prev, [layerKey]: !prev[layerKey] };
      addLog('Layer', `${layerKey.replace(/([A-Z])/g, ' $1')} visibility set to ${next[layerKey] ? 'VISIBLE' : 'HIDDEN'}`, 'system');
      return next;
    });
  };

  // Convert map SVG coordinates back to geospatial values
  const getGeoValues = (svgX, svgY) => {
    const scaleX = 0.0001;
    const scaleY = -0.00008;

    // Base coordinate on the center of the viewport (roughly 250, 200)
    const lat = activeProject.lat + (svgY - 200) * scaleY;
    const lon = activeProject.lon + (svgX - 250) * scaleX;

    // Simulate elevation calculation based on proximity to topographical features
    // Uses simple wave equation centered at coordinate values
    const distCenter = Math.sqrt(Math.pow(svgX - 250, 2) + Math.pow(svgY - 200, 2));
    const normalizedDist = Math.min(distCenter / 300, 1);
    const elevRange = activeProject.maxElevation - activeProject.minElevation;
    // Elev is highest in center, lowest at edges
    const elevation = activeProject.minElevation + (1 - normalizedDist) * elevRange + Math.sin(svgX / 20) * 3;

    return {
      lat: parseFloat(lat.toFixed(6)),
      lon: parseFloat(lon.toFixed(6)),
      elevation: parseFloat(elevation.toFixed(2))
    };
  };

  const handleMouseMove = (e) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Keep within bounds
    const svgX = Math.max(0, Math.min(x, 500));
    const svgY = Math.max(0, Math.min(y, 400));

    const geo = getGeoValues(svgX, svgY);
    setHoveredCoords(geo);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMapClick = (e) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const svgX = Math.max(0, Math.min(x, 500));
    const svgY = Math.max(0, Math.min(y, 400));

    const geo = getGeoValues(svgX, svgY);

    if (volumeToolActive) {
      if (clickPoints.length >= 2) {
        // Reset and start over with point A
        const pA = { x: svgX, y: svgY, ...geo };
        setClickPoints([pA]);
        setVolumeResult(null);
        addLog('Analysis', `Volume Analysis: Point A registered at Lat ${pA.lat}, Lon ${pA.lon}`, 'info');
      } else if (clickPoints.length === 0) {
        // Set point A
        const pA = { x: svgX, y: svgY, ...geo };
        setClickPoints([pA]);
        addLog('Analysis', `Volume Analysis: Point A registered at Lat ${pA.lat}, Lon ${pA.lon}`, 'info');
      } else if (clickPoints.length === 1) {
        // Set point B and calculate
        const pB = { x: svgX, y: svgY, ...geo };
        const pA = clickPoints[0];

        // Calculate distance and volume
        const dx = pB.x - pA.x;
        const dy = pB.y - pA.y;
        const distancePx = Math.sqrt(dx * dx + dy * dy);
        const distanceM = parseFloat((distancePx * 0.45).toFixed(2)); // scale factor

        // Calculate Cut/Fill (never zero!)
        const avgElev = (pA.elevation + pB.elevation) / 2;
        const elevDiff = Math.abs(pA.elevation - pB.elevation);

        // Dynamic formula for Cut and Fill
        const baseArea = distanceM * 8.5; // width * path length
        const cutVol = parseFloat((baseArea * (elevDiff * 0.4 + 1.2)).toFixed(2));
        const fillVol = parseFloat((baseArea * (avgElev * 0.05 + 0.5)).toFixed(2));

        setClickPoints([pA, pB]);
        setVolumeResult({
          distance: distanceM,
          cutVolume: cutVol,
          fillVolume: fillVol,
          netVolume: parseFloat((cutVol - fillVol).toFixed(2))
        });

        addLog('Analysis', `Volume Analysis: Point B registered at Lat ${pB.lat}, Lon ${pB.lon}`, 'info');
        addLog('Analysis', `Volume Calculation Complete. Cut: ${cutVol} m³, Fill: ${fillVol} m³`, 'success');
        showToast("Volume calculation completed!");
      }
    } else {
      // Building selection is now handled by LeafletMap click handlers
      // No SVG click detection needed
    }
  };

  const toggleVolumeTool = () => {
    const nextState = !volumeToolActive;
    setVolumeToolActive(nextState);
    setClickPoints([]);
    setVolumeResult(null);
    if (nextState) {
      addLog('System', "Interactive Volume Analysis Tool activated. Click two points on the map.", 'warning');
      showToast("Volume Tool Active: Click two points");
    } else {
      addLog('System', "Interactive Volume Analysis Tool deactivated.", 'system');
    }
  };

  const handleRefreshRegistry = () => {
    addLog('System', "Querying project registry proxy...", 'info');
    setTimeout(() => {
      addLog('System', "Registry connection established. Metadata synchronized.", 'success');
      showToast("Registry Synchronized Successfully");
    }, 600);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  if (!showMap) {
    return (
      <LandingPage
        showMap={showMap}
        setShowMap={setShowMap}
        isCategoryDrawerOpen={isCategoryDrawerOpen}
        setIsCategoryDrawerOpen={setIsCategoryDrawerOpen}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        profileMenuRef={profileMenuRef}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        t={t}
        handleSearchSubmit={handleSearchSubmit}
        handleUnifiedSearch={handleUnifiedSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categorySearchQuery={categorySearchQuery}
        setCategorySearchQuery={setCategorySearchQuery}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        selectedSubcategories={selectedSubcategories}
        setSelectedSubcategories={setSelectedSubcategories}
        showToast={showToast}
        toastMessage={toastMessage}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <div className="app-container">

      {/* HEADER SECTION (SHARED WITH HOME PAGE) */}
      <CommonHeader
        showMap={showMap}
        setShowMap={setShowMap}
        isCategoryDrawerOpen={isCategoryDrawerOpen}
        setIsCategoryDrawerOpen={setIsCategoryDrawerOpen}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        profileMenuRef={profileMenuRef}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        t={t}
        handleSearchSubmit={handleSearchSubmit}
        showToast={showToast}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveTab={setActiveTab}
      />

      {/* GLOBAL SVG CLIP PATH DEFINITIONS ALWAYS MOUNTED FOR VERCEL / WEBKIT COMPATIBILITY */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="panelCardRoundedNotchClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.030 Q 0,0 0.04,0 L 0.28,0 Q 0.30,0 0.305,0.003 L 0.33,0.013 Q 0.34,0.015 0.35,0.015 L 0.65,0.015 Q 0.66,0.015 0.67,0.013 L 0.695,0.003 Q 0.70,0 0.72,0 L 0.96,0 Q 1,0 1,0.030 L 1,0.970 Q 1,1 0.96,1 L 0.72,1 Q 0.70,1 0.695,0.997 L 0.67,0.987 Q 0.66,0.985 0.65,0.985 L 0.35,0.985 Q 0.34,0.985 0.33,0.987 L 0.305,0.997 Q 0.30,1 0.28,1 L 0.04,1 Q 0,1 0,0.970 Z" />
          </clipPath>
          <clipPath id="categoryDrawerTopBottomNotchClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.030 Q 0,0 0.04,0 L 0.28,0 Q 0.30,0 0.305,0.003 L 0.33,0.013 Q 0.34,0.015 0.35,0.015 L 0.65,0.015 Q 0.66,0.015 0.67,0.013 L 0.695,0.003 Q 0.70,0 0.72,0 L 0.96,0 Q 1,0 1,0.030 L 1,0.970 Q 1,1 0.96,1 L 0.72,1 Q 0.70,1 0.695,0.997 L 0.67,0.987 Q 0.66,0.985 0.65,0.985 L 0.35,0.985 Q 0.34,0.985 0.33,0.987 L 0.305,0.997 Q 0.30,1 0.28,1 L 0.04,1 Q 0,1 0,0.970 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="toast-notification">
          <Info size={16} style={{ color: 'var(--accent-cyan)' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN WORKSPACE */}
      <main className="main-content">

        {/* SIDEBAR PANEL (TOGGLABLE) */}
        {isSidebarOpen && (
          <aside className="sidebar">

            {/* TAB 0: SEARCH HISTORY (MATCHING CATEGORY PANEL GLASS STYLE & NOTCHED SHAPE) */}
            {activeTab === 'history' && (
              <div className="search-history-left-panel">
                {/* DEDICATED PULSATING WHITE INNER GLOW OVERLAY */}
                <div className="category-drawer-inner-glow" />

                {/* Static White SVG Border Stroke Overlay matching Categories Panel */}
                <div className="category-drawer-border-container">
                  <svg viewBox="0 0 1 1" preserveAspectRatio="none">
                    <path
                      d="M 0,0.030 Q 0,0 0.04,0 L 0.28,0 Q 0.30,0 0.305,0.003 L 0.33,0.013 Q 0.34,0.015 0.35,0.015 L 0.65,0.015 Q 0.66,0.015 0.67,0.013 L 0.695,0.003 Q 0.70,0 0.72,0 L 0.96,0 Q 1,0 1,0.030 L 1,0.970 Q 1,1 0.96,1 L 0.72,1 Q 0.70,1 0.695,0.997 L 0.67,0.987 Q 0.66,0.985 0.65,0.985 L 0.35,0.985 Q 0.34,0.985 0.33,0.987 L 0.305,0.997 Q 0.30,1 0.28,1 L 0.04,1 Q 0,1 0,0.970 Z"
                      className="map-ai-panel-border-stroke"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                {/* SECTION TITLE & SIDEBAR TOGGLE ICON */}
                <div className="search-history-title-row">
                  <h2 className="search-history-title">Search History</h2>
                  <button
                    className="search-history-toggle-btn"
                    onClick={() => setIsSidebarOpen(false)}
                    title="Toggle Side Panel"
                  >
                    <PanelLeft size={18} />
                  </button>
                </div>

                {/* SEARCH FILTER INPUT BAR */}
                <div className="search-history-filter-box">
                  <input
                    type="text"
                    className="search-history-filter-input"
                    placeholder="Search"
                    value={historyFilterQuery}
                    onChange={(e) => setHistoryFilterQuery(e.target.value)}
                  />
                  <Search size={16} className="search-history-filter-icon" />
                </div>

                {/* RECENT SEARCHES CARD CONTAINER - DIRECT HISTORY LIST */}
                <div className="search-history-card">
                  <div className="search-history-list">
                    {searchHistory
                      .filter(item => !historyFilterQuery || item.text.toLowerCase().includes(historyFilterQuery.toLowerCase()))
                      .map((item) => {
                        const isActive = activeHistoryId === item.id;
                        return (
                          <div
                            key={item.id}
                            className={`search-history-item ${isActive ? 'active-history-item' : ''}`}
                            onClick={() => {
                              setActiveHistoryId(item.id);
                              handleUnifiedSearch({ query: item.text });
                              setIsAISearchBarOpen(true);
                              setPanelHeight(200);
                            }}
                          >
                            <span className="search-history-item-text">{item.text}</span>
                            {isActive && (
                              <button
                                className="search-history-item-more"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <MoreVertical size={14} color="#64748B" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MY COLLECTIONS */}
            {activeTab === 'collections' && (
              <div className="collections-left-panel">
                {/* SECTION TITLE & SIDEBAR TOGGLE ICON */}
                <div className="collections-title-row">
                  <h2 className="collections-title">My Collections</h2>
                  <button
                    className="collections-toggle-btn"
                    onClick={() => setIsSidebarOpen(false)}
                    title="Toggle Side Panel"
                  >
                    <PanelLeft size={18} />
                  </button>
                </div>

                {/* SUB-TABS: SAVED QUERIES & FAVORITES */}
                <div className="collections-tab-switcher">
                  <button
                    className={`collections-tab-btn ${collectionsTab === 'queries' ? 'active' : ''}`}
                    onClick={() => setCollectionsTab('queries')}
                  >
                    <Bookmark size={14} />
                    <span>Saved Queries</span>
                    <span className="collections-count-badge">{savedQueries.length}</span>
                  </button>
                  <button
                    className={`collections-tab-btn ${collectionsTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setCollectionsTab('favorites')}
                  >
                    <Star size={14} />
                    <span>Favorites</span>
                    <span className="collections-count-badge">{favoritesList.length}</span>
                  </button>
                </div>

                {/* SEARCH FILTER INPUT BAR */}
                <div className="collections-filter-box">
                  <input
                    type="text"
                    className="collections-filter-input"
                    placeholder={collectionsTab === 'queries' ? "Search saved queries..." : "Search favorites..."}
                    value={collectionsFilterQuery}
                    onChange={(e) => setCollectionsFilterQuery(e.target.value)}
                  />
                  <Search size={16} className="collections-filter-icon" />
                </div>

                {/* TAB CONTENT: SAVED QUERIES LIST */}
                {collectionsTab === 'queries' && (
                  <div className="collections-card">
                    <div className="collections-list">
                      {savedQueries
                        .filter(item => !collectionsFilterQuery || item.title.toLowerCase().includes(collectionsFilterQuery.toLowerCase()) || item.category.toLowerCase().includes(collectionsFilterQuery.toLowerCase()))
                        .map((item) => (
                          <div
                            key={item.id}
                            className="collections-item"
                            onClick={() => {
                              handleUnifiedSearch({ query: item.title });
                              setPanelHeight(200);
                              setIsAISearchBarOpen(true);
                              showToast(`Running saved query: "${item.title}"`);
                            }}
                          >
                            <div className="collections-item-main">
                              <div className="collections-item-title">{item.title}</div>
                              <div className="collections-item-meta">
                                <span className="collections-tag">{item.category}</span>
                                <span className="collections-date">{item.date}</span>
                              </div>
                            </div>
                            <button
                              className="collections-item-action-btn"
                              title="Options"
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`Options for "${item.title}"`);
                              }}
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: FAVORITES LIST */}
                {collectionsTab === 'favorites' && (
                  <div className="collections-card">
                    <div className="collections-list">
                      {favoritesList
                        .filter(item => !collectionsFilterQuery || item.title.toLowerCase().includes(collectionsFilterQuery.toLowerCase()) || item.area.toLowerCase().includes(collectionsFilterQuery.toLowerCase()))
                        .map((item) => (
                          <div
                            key={item.id}
                            className="collections-item"
                            onClick={() => {
                              if (mapInstanceRef.current) {
                                mapInstanceRef.current.flyTo(item.coords, 14);
                              }
                              setSelectedLocation({
                                title: item.title,
                                subtitle: `${item.category} • ${item.area}`,
                                matchType: item.category,
                                distanceM: '350',
                                travelTime: '3 min walk',
                                coords: `${item.coords[0].toFixed(4)}° N, ${item.coords[1].toFixed(4)}° E`,
                                aiReason: `Favorited location saved in user collection.`
                              });
                              setPanelHeight(200);
                              setIsAISearchBarOpen(true);
                              showToast(`Navigated to ${item.title}`);
                            }}
                          >
                            <div className="collections-item-main">
                              <div className="collections-item-title">
                                <Star size={13} style={{ color: '#F59E0B', fill: '#F59E0B', marginRight: '6px', flexShrink: 0 }} />
                                {item.title}
                              </div>
                              <div className="collections-item-meta">
                                <span className="collections-tag">{item.category}</span>
                                <span className="collections-date">{item.area}</span>
                              </div>
                            </div>
                            <button
                              className="collections-item-action-btn"
                              title="Options"
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`Options for "${item.title}"`);
                              }}
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: CATEGORIES */}
            {activeTab === 'categories' && (
              <div className="categories-left-panel">
                {/* SECTION TITLE & SIDEBAR TOGGLE ICON */}
                <div className="categories-title-row">
                  <h2 className="categories-title">{t.categories || 'Categories'}</h2>
                  <button
                    className="categories-toggle-btn"
                    onClick={() => setIsSidebarOpen(false)}
                    title="Toggle Side Panel"
                  >
                    <PanelLeft size={18} />
                  </button>
                </div>

                {/* SEARCH FILTER INPUT BAR */}
                <div className="categories-filter-box">
                  <input
                    type="text"
                    className="categories-filter-input"
                    placeholder="Search categories..."
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                  />
                  <Search size={16} className="categories-filter-icon" />
                </div>

                {/* CATEGORIES CARD LIST */}
                <div className="categories-card">
                  <div className="categories-accordion-list">
                    {CATEGORY_TREE
                      .filter(cat =>
                        !categorySearchQuery ||
                        cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
                        cat.subcategories.some(sub => sub.toLowerCase().includes(categorySearchQuery.toLowerCase()))
                      )
                      .map(cat => {
                        const isExpanded = expandedCategory === cat.name;
                        return (
                          <div key={cat.id} className="categories-accordion-item">
                            <div
                              className={`categories-accordion-header ${isExpanded ? 'expanded' : ''}`}
                              onClick={() => setExpandedCategory(isExpanded ? null : cat.name)}
                            >
                              <div className="categories-header-title">
                                {isExpanded ? <ChevronDown size={14} color="#64748B" /> : <ChevronRight size={14} color="#64748B" />}
                                <span>{t.getCatName(cat.name)}</span>
                              </div>
                              <span className="categories-badge">{cat.subcategories.length}</span>
                            </div>

                            {isExpanded && (
                              <div className="categories-subcategories-list">
                                {cat.subcategories.map(subcat => (
                                  <div
                                    key={subcat}
                                    className={`categories-subcat-item ${selectedSubcategories[subcat] ? 'active' : ''}`}
                                    onClick={() => {
                                      const nextState = !selectedSubcategories[subcat];
                                      setSelectedSubcategories(prev => ({
                                        ...prev,
                                        [subcat]: nextState
                                      }));
                                      handleUnifiedSearch({ category: subcat });
                                      setPanelHeight(200);
                                      setIsAISearchBarOpen(true);
                                      showToast(`Filtered by ${t.getSubcatName(subcat)}`);
                                    }}
                                  >
                                    <div className="categories-subcat-text">
                                      {t.getSubcatName(subcat)}
                                    </div>
                                    {selectedSubcategories[subcat] && (
                                      <span className="categories-check-indicator">✓</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* PROJECT SELECTOR CARD (FOR OTHER TABS) */}
            {activeTab !== 'history' && activeTab !== 'collections' && activeTab !== 'categories' && (
              <div className="project-card">
                <span className="meta-label" style={{ marginBottom: '-4px' }}>Active WebScene Project</span>
                <select
                  className="project-select"
                  value={selectedProjectId}
                  onChange={handleProjectChange}
                >
                  {PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>

                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Region</span>
                    <span className="meta-value">{activeProject.activeRegion}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">BIM Layers</span>
                    <span className="meta-value">{activeProject.buildingsCount} active</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Elev. Min</span>
                    <span className="meta-value">{activeProject.minElevation}m</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Elev. Max</span>
                    <span className="meta-value">{activeProject.maxElevation}m</span>
                  </div>
                </div>
              </div>
            )}

            <div className="section-divider"></div>

            {/* TAB 1: LAYERS MANAGER */}
            {activeTab === 'layers' && (
              <div className="sidebar-section">
                <span className="section-title">
                  Operational Layers
                  <Layers size={14} style={{ color: 'var(--text-muted)' }} />
                </span>

                <div className="layer-list">
                  <div className={`layer-item ${layers.elevationSurface ? 'active' : ''}`}>
                    <div className="layer-info">
                      <Map size={14} className="layer-icon" />
                      <span>Elevation Surface (Contours)</span>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={layers.elevationSurface}
                        onChange={() => toggleLayer('elevationSurface')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className={`layer-item ${layers.buildings3D ? 'active' : ''}`}>
                    <div className="layer-info">
                      <Database size={14} className="layer-icon" />
                      <span>Esri 3D Buildings (Multipatch)</span>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={layers.buildings3D}
                        onChange={() => toggleLayer('buildings3D')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className={`layer-item ${layers.bimSublayers ? 'active' : ''}`}>
                    <div className="layer-info">
                      <Sliders size={14} className="layer-icon" />
                      <span>BIM Architectural Sublayers</span>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        disabled={!layers.buildings3D}
                        checked={layers.bimSublayers && layers.buildings3D}
                        onChange={() => toggleLayer('bimSublayers')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className={`layer-item ${layers.projectBoundary ? 'active' : ''}`}>
                    <div className="layer-info">
                      <Shield size={14} className="layer-icon" />
                      <span>Project Boundaries</span>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={layers.projectBoundary}
                        onChange={() => toggleLayer('projectBoundary')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className={`layer-item ${layers.heatmapOverlay ? 'active' : ''}`}>
                    <div className="layer-info">
                      <Eye size={14} className="layer-icon" />
                      <span>Terrain slope Heatmap</span>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={layers.heatmapOverlay}
                        onChange={() => toggleLayer('heatmapOverlay')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* BIM LEVEL SLICER */}
                <span className="section-title">BIM Building Floor Slicer</span>
                <p className="meta-label" style={{ padding: '0 16px', marginTop: '6px' }}>Filter visual rendering depth by active floor level</p>
                <div className="levels-grid" style={{ padding: '0 16px' }}>
                  <button
                    className={`level-btn ${selectedLevel === 'All' ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedLevel('All');
                      addLog('BIM', 'Slicer profile updated: Rendering all building levels.', 'system');
                    }}
                  >
                    All
                  </button>
                  {activeProject.levels.map(lvl => (
                    <button
                      key={lvl}
                      className={`level-btn ${selectedLevel === lvl ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLevel(lvl);
                        addLog('BIM', `Slicer profile updated: Isolating ${lvl} sublayers.`, 'warning');
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: ANALYSIS TOOLS */}
            {activeTab === 'analysis' && (
              <div className="sidebar-section">
                <span className="section-title">Volume Measurement Analysis</span>

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '140%' }}>
                    Compute cut and fill volumes between coordinates on the current elevation surface.
                  </p>

                  <button
                    className={`tab-btn ${volumeToolActive ? 'active' : ''}`}
                    onClick={toggleVolumeTool}
                    style={{
                      backgroundColor: volumeToolActive ? 'rgba(0, 242, 254, 0.15)' : 'var(--bg-primary)',
                      border: '1px solid ' + (volumeToolActive ? 'var(--accent-cyan)' : 'var(--border-color)'),
                      color: volumeToolActive ? 'var(--accent-cyan)' : 'var(--text-primary)',
                      padding: '12px',
                      borderRadius: '8px',
                      width: '100%',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}
                  >
                    <Ruler size={16} />
                    {volumeToolActive ? 'Deactivate Volume Tool' : 'Activate Volume Tool'}
                  </button>

                  {volumeToolActive && clickPoints.length < 2 && (
                    <div style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(249, 115, 22, 0.05)',
                      border: '1px dashed var(--accent-orange)',
                      fontSize: '0.75rem',
                      color: 'var(--accent-orange)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <span><strong>INSTRUCTIONS:</strong></span>
                      <span>1. Click anywhere on the map to set <strong>Point A</strong>.</span>
                      <span>2. Click a second location to set <strong>Point B</strong>.</span>
                      <span>Current points: {clickPoints.length} / 2</span>
                    </div>
                  )}

                  {volumeResult && (
                    <div className="glass-panel" style={{ padding: '14px', marginTop: '4px', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-cyan)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Calculation Results</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Range: 2D Projection</span>
                      </div>
                      <div className="hud-card-body" style={{ gap: '6px' }}>
                        <div className="volume-stat-row">
                          <span style={{ color: 'var(--text-secondary)' }}>Distance:</span>
                          <span style={{ color: 'var(--text-primary)' }}>{volumeResult.distance} m</span>
                        </div>
                        <div className="volume-stat-row">
                          <span style={{ color: 'var(--text-secondary)' }}>Cut Volume:</span>
                          <span className="volume-val-positive">{volumeResult.cutVolume.toLocaleString()} m³</span>
                        </div>
                        <div className="volume-stat-row">
                          <span style={{ color: 'var(--text-secondary)' }}>Fill Volume:</span>
                          <span className="volume-val-negative">{volumeResult.fillVolume.toLocaleString()} m³</span>
                        </div>
                        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '6px 0' }} />
                        <div className="volume-stat-row" style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                          <span>Net Balance:</span>
                          <span style={{ color: volumeResult.netVolume >= 0 ? 'var(--accent-cyan)' : 'var(--accent-orange)' }}>
                            {volumeResult.netVolume >= 0 ? '+' : ''}{volumeResult.netVolume.toLocaleString()} m³
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="section-divider"></div>

                {/* DYNAMIC ELEVATION PROFILE */}
                <span className="section-title">Terrain Elevation Profile</span>
                <div style={{ padding: '0 16px' }}>
                  <div className="elevation-profile-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      <span>Cross Section (W-E)</span>
                      <span style={{ color: 'var(--accent-cyan)' }}>Active</span>
                    </div>

                    {/* SVG graph dynamically plots elevation profile from min/max elevation */}
                    <svg className="elevation-graph-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
                      {(() => {
                        const { minElevation, maxElevation } = activeProject;
                        const range = maxElevation - minElevation || 1;
                        // Generate 8 synthetic profile points using a sine curve
                        const syntheticPts = [0, 15, 30, 45, 60, 75, 90, 100].map((x, i) => {
                          const t = i / 7;
                          const elevation = minElevation + range * (0.3 + 0.7 * Math.sin(Math.PI * t));
                          const y = 40 - ((elevation - minElevation) / range) * 32;
                          return `${x === 0 ? 'M 0 40 L 0' : 'L ' + x} ${y.toFixed(1)}`;
                        });
                        const d = syntheticPts.join(' ') + ' L 100 40 Z';
                        return <path className="elevation-graph-path" d={d} />;
                      })()}
                    </svg>

                    <div className="elevation-profile-values">
                      <span>{activeProject.minElevation}m</span>
                      <span>{((activeProject.minElevation + activeProject.maxElevation) / 2).toFixed(1)}m</span>
                      <span>{activeProject.maxElevation}m</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: REGISTRY & SYSTEM */}
            {activeTab === 'projects' && (
              <div className="sidebar-section" style={{ padding: '16px' }}>
                <span className="section-title" style={{ padding: 0, marginBottom: '12px' }}>Project Registry</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '140%' }}>
                    Manage remote data endpoints and database connections for ArcGIS Server portal.
                  </p>

                  <button
                    className="tab-btn"
                    onClick={handleRefreshRegistry}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '10px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <RefreshCw size={14} /> Synchronize Registry
                  </button>
                </div>

                <div className="section-divider"></div>

                {selectedBuilding ? (
                  <div className="glass-panel" style={{ padding: '14px', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                      {selectedBuilding.name}
                    </div>
                    <div className="hud-card-body" style={{ gap: '6px' }}>
                      <div className="volume-stat-row">
                        <span>BIM Tag:</span>
                        <span>{selectedBuilding.id.toUpperCase()}</span>
                      </div>
                      <div className="volume-stat-row">
                        <span>Floors:</span>
                        <span>{selectedBuilding.floors}</span>
                      </div>
                      <div className="volume-stat-row">
                        <span>Total Height:</span>
                        <span>{selectedBuilding.heightM} m</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Select an architectural building component in the scene view map to inspect BIM sublayer attributes.
                  </p>
                )}
              </div>
            )}
          </aside>
        )}

        {/* MAP VIEWPORT SECTION (MATCHING REFERENCE UI) */}
        <section className="map-viewport-container">

          {/* TOP-LEFT FLOATING CONTROLS: PANEL TOGGLE & ABU DHABI BADGE */}
          <div
            className="map-controls-top-left"
            style={{
              position: 'absolute',
              top: '76px',
              left: isSidebarOpen ? 'calc(15% + 36px)' : '20px',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {!isSidebarOpen && (
              <button
                className="map-glass-icon-btn"
                onClick={() => setIsSidebarOpen(true)}
                title="Toggle Side Panel"
              >
                <PanelLeft size={18} />
              </button>
            )}
            <button
              className="map-location-badge"
              onClick={() => {
                if (mapInstanceRef.current) mapInstanceRef.current.setView([24.4539, 54.3773], 12, { animate: true });
                showToast("Centered on Abu Dhabi");
              }}
            >
              <MapPin size={14} style={{ color: '#ef4444' }} />
              <span>Abu Dhabi</span>
            </button>
          </div>

          {/* LEFT FLOATING VERTICAL & HORIZONTAL TOOLBAR STRIP (L-SHAPED LAYOUT AT BOTTOM-LEFT) */}
          <div
            className="map-controls-left-strip map-controls-l-shape"
            style={{
              position: 'absolute',
              bottom: '24px',
              left: isSidebarOpen ? 'calc(15% + 36px)' : '20px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px',
              transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* VERTICAL ARM OF THE "L" (1. DRAW, 2. BASEMAP, 3. LEGENDS, 4 & 5. VERTICAL ZOOM CONTROL BELOW LEGEND) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                className={`map-glass-icon-btn ${activeLeftPopover === 'draw' ? 'active' : ''}`}
                title="Measurement & Draw"
                onClick={() => setActiveLeftPopover(prev => prev === 'draw' ? null : 'draw')}
              >
                <Edit size={18} />
              </button>
              <button
                className={`map-glass-icon-btn ${activeLeftPopover === 'basemap' ? 'active' : ''}`}
                title="Basemap Gallery"
                onClick={() => setActiveLeftPopover(prev => prev === 'basemap' ? null : 'basemap')}
              >
                <Grid size={18} />
              </button>
              <button
                className={`map-glass-icon-btn ${activeLeftPopover === 'legend' ? 'active' : ''}`}
                title="Legend & Analysis"
                onClick={() => setActiveLeftPopover(prev => prev === 'legend' ? null : 'legend')}
              >
                <List size={18} />
              </button>

              {/* VERTICAL ZOOM IN / ZOOM OUT SEGMENTED GROUP BELOW LEGEND */}
              <div
                className="map-zoom-segmented-group-vertical"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 8px rgba(0, 43, 91, 0.08)',
                  overflow: 'hidden'
                }}
              >
                <button
                  className="map-glass-icon-btn-segmented"
                  title="Zoom In"
                  onClick={() => {
                    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
                    showToast("Zoomed In");
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.12)',
                    cursor: 'pointer',
                    color: '#0F172A',
                    padding: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Plus size={18} strokeWidth={2.2} />
                </button>
                <button
                  className="map-glass-icon-btn-segmented"
                  title="Zoom Out"
                  onClick={() => {
                    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
                    showToast("Zoomed Out");
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#0F172A',
                    padding: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Minus size={18} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* HORIZONTAL BASE ARM OF THE "L" (COMPASS, MY LOCATION, HOME, COORDINATES, SCALE) */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
              <button
                className="map-glass-icon-btn"
                title="Compass / Orient North"
                onClick={() => showToast("Map Oriented North")}
              >
                <Compass size={18} />
              </button>
              <button
                className="map-glass-icon-btn"
                title="My Location"
                onClick={() => {
                  if (mapInstanceRef.current) mapInstanceRef.current.flyTo([24.4539, 54.3773], 15);
                  showToast("Centered to My Location (Abu Dhabi)");
                }}
              >
                <Navigation size={18} />
              </button>
              <button
                className="map-glass-icon-btn"
                title="Home View"
                onClick={() => {
                  if (mapInstanceRef.current) mapInstanceRef.current.flyTo([24.4539, 54.3773], 12);
                  showToast("Reset to Abu Dhabi Home View");
                }}
              >
                <Home size={18} />
              </button>
              <div
                className="map-glass-pill-btn"
                title="Coordinates"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 12px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.65)',
                  color: '#002B5B',
                  fontSize: '12px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0, 43, 91, 0.08)'
                }}
              >
                <Globe size={16} style={{ color: '#1D68F2' }} />
                <span>
                  {hoveredCoords ? `${hoveredCoords.lat}° N, ${hoveredCoords.lon}° E` : '24.4539° N, 54.3773° E'}
                </span>
              </div>
              <div
                className="map-glass-pill-btn"
                title="Scale"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 12px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.65)',
                  color: '#002B5B',
                  fontSize: '12px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0, 43, 91, 0.08)'
                }}
              >
                <Ruler size={16} style={{ color: '#1D68F2' }} />
                <span>1 : 50,000</span>
              </div>
            </div>
          </div>

          {/* FLOATING BASEMAP POPOVER CARD WITH 2 COLUMNS */}
          {activeLeftPopover === 'basemap' && (
            <div ref={leftPopoverRef} className="map-popover-card basemap-grid-popover" style={{ bottom: '70px', left: isSidebarOpen ? 'calc(15% + 82px)' : '62px' }}>
              <div className="popover-header">
                <h3>Basemap</h3>
              </div>

              <div className="basemap-grid-2col">
                <button
                  className={`basemap-card-2col ${activeBasemap === 'light' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveBasemap('light');
                    setActiveLeftPopover(null);
                    showToast("Basemap: Light Gray");
                  }}
                >
                  <img src={basemapLightGrayImg} alt="Light Gray" className="basemap-card-img" />
                  <span className="basemap-card-title">Light Gray</span>
                </button>

                <button
                  className={`basemap-card-2col ${activeBasemap === 'streets' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveBasemap('streets');
                    setActiveLeftPopover(null);
                    showToast("Basemap: Streets");
                  }}
                >
                  <img src={basemapStreetsImg} alt="Streets" className="basemap-card-img" />
                  <span className="basemap-card-title">Streets</span>
                </button>

                <button
                  className={`basemap-card-2col ${activeBasemap === 'satellite' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveBasemap('satellite');
                    setActiveLeftPopover(null);
                    showToast("Basemap: Satellite");
                  }}
                >
                  <img src={basemapSatelliteImg} alt="Satellite" className="basemap-card-img" />
                  <span className="basemap-card-title">Satellite</span>
                </button>
              </div>
            </div>
          )}

          {activeLeftPopover === 'draw' && (
            <div ref={leftPopoverRef} className="map-popover-card" style={{ bottom: '70px', left: isSidebarOpen ? 'calc(15% + 82px)' : '62px' }}>
              <div className="popover-grid">
                <button
                  className={`popover-tile ${activeDrawTool === 'circle' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDrawTool('circle');
                    setActiveLeftPopover(null);
                    toggleVolumeTool();
                  }}
                >
                  <Circle size={20} />
                  <span>Circle</span>
                </button>
                <button
                  className={`popover-tile ${activeDrawTool === 'rectangle' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDrawTool('rectangle');
                    setActiveLeftPopover(null);
                    toggleVolumeTool();
                  }}
                >
                  <Square size={20} />
                  <span>Rectangle</span>
                </button>
                <button
                  className={`popover-tile ${activeDrawTool === 'polygon' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDrawTool('polygon');
                    setActiveLeftPopover(null);
                    toggleVolumeTool();
                  }}
                >
                  <Pentagon size={20} />
                  <span>Polygon</span>
                </button>
                <button
                  className={`popover-tile ${activeDrawTool === 'click' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDrawTool('click');
                    setActiveLeftPopover(null);
                    toggleVolumeTool();
                  }}
                >
                  <MousePointer size={20} />
                  <span>Click</span>
                </button>
                <button
                  className={`popover-tile ${activeDrawTool === 'line' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDrawTool('line');
                    setActiveLeftPopover(null);
                    toggleVolumeTool();
                  }}
                >
                  <Minus size={20} style={{ transform: 'rotate(-45deg)' }} />
                  <span>Line</span>
                </button>
                <button
                  className={`popover-tile ${activeDrawTool === 'square' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDrawTool('square');
                    setActiveLeftPopover(null);
                    toggleVolumeTool();
                  }}
                >
                  <Square size={20} />
                  <span>Square</span>
                </button>
              </div>
            </div>
          )}

          {activeLeftPopover === 'legend' && (
            <div ref={leftPopoverRef} className="map-popover-card" style={{ bottom: '70px', left: isSidebarOpen ? 'calc(15% + 82px)' : '62px', width: '280px' }}>
              <div style={{ padding: '4px 2px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>Map Legend & Layers</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#475569' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#3B82F6' }}></span>
                    <span>Building Scene Footprints</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#475569' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10B981' }}></span>
                    <span>Active Sector Boundaries</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#475569' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#F59E0B' }}></span>
                    <span>Volumetric Anchors</span>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* FLOATING VOLUMETRIC CALCULATION HUD CARD (WHILE MEASURING) */}
          {volumeToolActive && (
            <div className="hud-panel hud-bottom-left" style={{ bottom: '100px', left: '16px', zIndex: 1000 }}>
              <div className="glass-panel volume-hud-card">
                <div className="hud-card-header">
                  <Ruler size={16} />
                  <span>Interactive Volumetric Analysis</span>
                </div>
                <div className="hud-card-body">
                  {clickPoints.map((pt, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderBottom: idx === 0 && clickPoints.length > 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: idx === 0 && clickPoints.length > 1 ? '6px' : '0' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Point {idx === 0 ? 'A' : 'B'}:</span>
                      <div className="volume-stat-row">
                        <span>Lat/Lon:</span>
                        <span>{pt.lat.toFixed(5)}°, {pt.lon.toFixed(5)}°</span>
                      </div>
                      <div className="volume-stat-row">
                        <span>Elevation:</span>
                        <span>{pt.elevation.toFixed(1)} m</span>
                      </div>
                    </div>
                  ))}
                  {clickPoints.length === 0 && (
                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Click on the map viewport to place measurement anchors.
                    </span>
                  )}
                  {clickPoints.length === 1 && (
                    <span style={{ color: 'var(--accent-orange)', fontStyle: 'italic' }}>
                      Place Point B to compute Cut/Fill volumes.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}



          {/* DYNAMIC LEAFLET MAP VIEWPORT */}
          <div
            className="map-canvas-container"
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <LeafletMap
              activeProject={activeProject}
              layers={layers}
              selectedLevel={selectedLevel}
              selectedBuilding={selectedBuilding}
              setSelectedBuilding={setSelectedBuilding}
              volumeToolActive={volumeToolActive}
              clickPoints={clickPoints}
              setClickPoints={setClickPoints}
              theme={theme}
              activeBasemap={activeBasemap}
              setHoveredCoords={setHoveredCoords}
              setIsHovered={setIsHovered}
              addLog={addLog}
              showToast={showToast}
              mapInstanceRef={mapInstanceRef}
              activeSearchResults={activeSearchResults}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>

          {/* FLOATING GEOVISION AI SPATIAL SEARCH PANEL (RIGHT ALIGNED) */}
          {(isAISearchBarOpen || isAiClosing) ? (
            <div
              className={`landing-search-card-wrapper map-ai-panel-wrapper ${isAiClosing ? 'mac-closing' : ''} ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}
              style={{
                position: 'fixed',
                top: '80px',
                bottom: '48px',
                right: '16px',
                width: '350px',
                maxWidth: '350px',
                height: 'calc(100vh - 130px)',
                maxHeight: 'calc(100vh - 130px)',
                zIndex: 1001,
                transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* DEDICATED PULSATING WHITE INNER GLOW OVERLAY MATCHING SEARCH HISTORY PANEL */}
              <div className="category-drawer-inner-glow" />

              {/* STATIC WHITE SVG BORDER STROKE OVERLAY MATCHING SEARCH HISTORY PANEL */}
              <div className="category-drawer-border-container">
                <svg viewBox="0 0 1 1" preserveAspectRatio="none">
                  <path
                    d="M 0,0.030 Q 0,0 0.04,0 L 0.28,0 Q 0.30,0 0.305,0.003 L 0.33,0.013 Q 0.34,0.015 0.35,0.015 L 0.65,0.015 Q 0.66,0.015 0.67,0.013 L 0.695,0.003 Q 0.70,0 0.72,0 L 0.96,0 Q 1,0 1,0.030 L 1,0.970 Q 1,1 0.96,1 L 0.72,1 Q 0.70,1 0.695,0.997 L 0.67,0.987 Q 0.66,0.985 0.65,0.985 L 0.35,0.985 Q 0.34,0.985 0.33,0.987 L 0.305,0.997 Q 0.30,1 0.28,1 L 0.04,1 Q 0,1 0,0.970 Z"
                    className="map-ai-panel-border-stroke"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <div
                className="map-ai-panel-container landing-search-card"
                style={{
                  height: '100%',
                  maxHeight: '100%',
                  overflow: 'hidden',
                  userSelect: 'auto',
                  width: '100%',
                  margin: 0,
                  marginBottom: 0,
                  clipPath: 'url(#categoryDrawerTopBottomNotchClip)',
                  WebkitClipPath: 'url(#categoryDrawerTopBottomNotchClip)'
                }}
              >
                {/* INDEPENDENT REDUCED OPACITY BACKGROUND IMAGE OVERLAY */}
                <div className="map-ai-panel-bg-img" />

                {/* MAIN 2-COLUMN GRID (CHAT STREAM LEFT, DETAILED INFORMATION RIGHT) */}
                <div className="map-ai-panel-main-grid" style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', maxWidth: '100%', minWidth: 0, height: '100%', gap: '16px', margin: 0, padding: 0, boxSizing: 'border-box' }}>
                  {/* LEFT COLUMN: CHAT STREAM & INPUT BAR */}
                  <div className="map-ai-panel-left-col" style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1, minWidth: 0, maxWidth: '100%', justifyContent: 'space-between', margin: 0, padding: 0, boxSizing: 'border-box' }}>
                    {/* PANEL HEADER (INSIDE LEFT COLUMN ONLY) WITH MINIMIZE BUTTON MATCHING SEARCH HISTORY */}
                    <div className="map-ai-panel-header" style={{
                      opacity: 1,
                      maxHeight: '60px',
                      overflow: 'visible',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: 0,
                      marginBottom: '10px',
                      boxSizing: 'border-box'
                    }}>
                      <div className="map-ai-panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h2 className="search-history-title">AI Spatial Search</h2>
                      </div>

                      {/* MINIMIZE / COLLAPSE BUTTON MATCHING SEARCH HISTORY PANEL */}
                      <button
                        className="search-history-toggle-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseAiPanel();
                        }}
                        title="Minimize AI Panel"
                        style={{
                          background: 'rgba(255, 255, 255, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.6)',
                          borderRadius: '8px',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#002B5B',
                          boxShadow: '0 2px 6px rgba(0, 43, 91, 0.08)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Minus size={18} />
                      </button>
                    </div>

                    {/* MIDDLE CHAT / CONVERSATION STREAM AREA */}
                    <div ref={chatMessagesContainerRef} className="map-ai-panel-body" style={{
                      opacity: 1,
                      flex: 1,
                      margin: '4px 0',
                      padding: '4px 0px',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: 0,
                      boxSizing: 'border-box'
                    }}>

                      <div className="map-ai-chat-stream" style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                        {chatMessages
                          .filter(msg => {
                            const isRedundantSpec = msg.text && msg.text.includes('Here are the detailed spatial specifications');
                            if (isRedundantSpec && !msg.structuredResults && (!msg.chips || msg.chips.length === 0)) {
                              return false;
                            }
                            return true;
                          })
                          .map((msg, idx) => (
                            <div key={idx} className="chat-bubble-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
                              <div className={`chat-bubble ${msg.sender}`}>
                                <div className="chat-bubble-content" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  {msg.isSearching ? (
                                    <div className="typing-indicator">
                                      <span className="typing-dot"></span>
                                      <span className="typing-dot"></span>
                                      <span className="typing-dot"></span>
                                    </div>
                                  ) : msg.text && !msg.text.includes('Here are the detailed spatial specifications') ? (
                                    <div>{msg.text}</div>
                                  ) : null}

                                  {/* Structured Results Card Header & Body */}
                                  {msg.structuredResults && (
                                    <div className="structured-results-card">
                                      {/* Header Accordion */}
                                      <div
                                        className="structured-results-header"
                                        onClick={() => {
                                          setChatMessages(prev => prev.map((m, i) => i === idx ? { ...m, isExpanded: !m.isExpanded } : m));
                                        }}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <div className="structured-results-title-group">
                                          <Sparkles size={15} className="structured-cat-icon" />
                                          <span className="structured-main-title">{msg.structuredResults.title}</span>
                                        </div>

                                        <button
                                          className="structured-expand-btn"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setChatMessages(prev => prev.map((m, i) => i === idx ? { ...m, isExpanded: !m.isExpanded } : m));
                                          }}
                                          title={msg.isExpanded ? "Collapse Results" : "Expand Results"}
                                        >
                                          {msg.isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                                        </button>
                                      </div>

                                      {/* Expanded Body: Subcategory Tabs & Scrollable Item List */}
                                      {msg.isExpanded && (
                                        <div className="structured-results-body">
                                          {msg.structuredResults.tabs && msg.structuredResults.tabs.length > 0 && (
                                            <div className="structured-tabs-bar">
                                              {msg.structuredResults.tabs.map(tab => (
                                                <button
                                                  key={tab.id}
                                                  className={`structured-tab-btn ${msg.structuredResults.activeTabId === tab.id ? 'active' : ''}`}
                                                  onClick={() => {
                                                    setChatMessages(prev => prev.map((m, i) => {
                                                      if (i === idx) {
                                                        return {
                                                          ...m,
                                                          structuredResults: { ...m.structuredResults, activeTabId: tab.id }
                                                        };
                                                      }
                                                      return m;
                                                    }));
                                                  }}
                                                >
                                                  {tab.name}
                                                </button>
                                              ))}
                                            </div>
                                          )}

                                          <div className="structured-items-list">
                                            {msg.structuredResults.items
                                              .filter(item => !msg.structuredResults.activeTabId || item.subcategory === msg.structuredResults.activeTabId)
                                              .map(item => (
                                                <div key={item.id} className="structured-item-wrapper" style={{ width: '100%', marginBottom: '4px' }}>
                                                  <div
                                                    className={`structured-item-card ${item.showDetails ? 'expanded-details' : ''} ${selectedLocation && selectedLocation.id === item.id ? 'active-selected' : ''}`}
                                                    style={{
                                                      display: 'flex',
                                                      flexDirection: 'column',
                                                      gap: item.showDetails ? '8px' : '2px',
                                                      padding: '4px 8px',
                                                      minHeight: item.showDetails ? 'auto' : '44px',
                                                      transition: 'all 0.2s ease'
                                                    }}
                                                  >
                                                    {/* Card Main Row */}
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                                                      <div className="structured-item-info" style={{ flex: 1 }}>
                                                        <div className="structured-item-title" style={{ fontWeight: 600, fontSize: '13px', color: '#002B5B' }}>{item.title}</div>
                                                        {item.arabicTitle && <div className="structured-item-arabic" style={{ fontSize: '11.5px', color: '#475569' }}>{item.arabicTitle}</div>}
                                                      </div>

                                                      <div className="structured-item-actions" style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                                        <button
                                                          className={`structured-action-icon ${item.isFavorite ? 'fav' : ''}`}
                                                          title="Favorite"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            setChatMessages(prev => prev.map((m, i) => {
                                                              if (i === idx) {
                                                                const newItems = m.structuredResults.items.map(it => it.id === item.id ? { ...it, isFavorite: !it.isFavorite } : it);
                                                                return { ...m, structuredResults: { ...m.structuredResults, items: newItems } };
                                                              }
                                                              return m;
                                                            }));
                                                            showToast(item.isFavorite ? "Removed from Favorites" : "Saved to Favorites");
                                                          }}
                                                        >
                                                          <Heart size={14} fill={item.isFavorite ? "#EF4444" : "none"} color={item.isFavorite ? "#EF4444" : "#64748B"} />
                                                        </button>

                                                        <button
                                                          className={`structured-action-icon ${item.showDetails ? 'active' : ''}`}
                                                          title="View Info"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            setChatMessages(prev => prev.map((m, i) => {
                                                              if (i === idx) {
                                                                const newItems = m.structuredResults.items.map(it => it.id === item.id ? { ...it, showDetails: !it.showDetails } : it);
                                                                return { ...m, structuredResults: { ...m.structuredResults, items: newItems } };
                                                              }
                                                              return m;
                                                            }));
                                                          }}
                                                        >
                                                          <Info size={14} color={item.showDetails ? "#1D68F2" : "#64748B"} />
                                                        </button>

                                                        <button
                                                          className="structured-action-icon"
                                                          title="Locate on Map"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedLocation({ ...item, locateTrigger: Date.now() });
                                                            showToast(`Located ${item.title} on Map`);
                                                          }}
                                                        >
                                                          <Search size={14} color="#64748B" />
                                                        </button>
                                                      </div>
                                                    </div>

                                                    {/* In-Card Details Expanded Section */}
                                                    {item.showDetails && (
                                                      <div className="structured-item-details-body" style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '6px',
                                                        marginTop: '4px',
                                                        paddingTop: '8px',
                                                        borderTop: '1px solid rgba(0, 43, 91, 0.12)',
                                                        fontSize: '11.5px',
                                                        color: '#1E293B'
                                                      }}>
                                                        {item.address && (
                                                          <div style={{ color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <MapPin size={13} color="#2563EB" />
                                                            <span>{item.address}</span>
                                                          </div>
                                                        )}
                                                        {item.subcategory && (
                                                          <div style={{ color: '#0284C7', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                                                            <span>🏷️ {item.subcategory}</span>
                                                          </div>
                                                        )}
                                                        {item.description && (
                                                          <div style={{ color: '#475569', lineHeight: '1.4', background: 'rgba(241, 245, 249, 0.65)', padding: '6px 8px', borderRadius: '6px' }}>
                                                            {item.description}
                                                          </div>
                                                        )}
                                                        <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                                                          <button
                                                            style={{
                                                              padding: '4px 10px',
                                                              borderRadius: '6px',
                                                              background: '#002B5B',
                                                              color: '#FFF',
                                                              border: 'none',
                                                              fontSize: '11px',
                                                              fontWeight: 600,
                                                              cursor: 'pointer',
                                                              display: 'flex',
                                                              alignItems: 'center',
                                                              gap: '4px'
                                                            }}
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              setSelectedLocation({ ...item, locateTrigger: Date.now() });
                                                              showToast(`Located ${item.title} on Map`);
                                                            }}
                                                          >
                                                            <Search size={12} />
                                                            Locate on Map
                                                          </button>
                                                        </div>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Radius Chips Below AI Bubble */}
                              {msg.chips && msg.chips.length > 0 && (
                                <div className="structured-radius-chips">
                                  {msg.chips.map((chip, cIdx) => (
                                    <button
                                      key={cIdx}
                                      className="structured-radius-chip-btn"
                                      onClick={() => handleUnifiedSearch({ query: chip.query })}
                                    >
                                      <span>{chip.label}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* BOTTOM SEARCH INPUT BAR WITH PLUS (+) ACTION MENU */}
                    <form
                      className="landing-search-container"
                      style={{
                        margin: '0 0 4px 0',
                        width: '100%',
                        maxWidth: '100%',
                        flex: '0 0 46px',
                        height: '46px',
                        minHeight: '46px',
                        maxHeight: '46px',
                        borderRadius: '12px',
                        position: 'relative',
                        padding: '0 6px 0 8px',
                        boxSizing: 'border-box'
                      }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (aiSearchQuery.trim()) {
                          handleUnifiedSearch({ query: aiSearchQuery });
                          setAiSearchQuery('');
                          setShowPlusMenu(false);
                        }
                      }}
                    >
                      {/* PLUS (+) ACTION BUTTON & POPUP MENU */}
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '0 2px 0 0' }}>
                        <button
                          type="button"
                          className="landing-search-plus-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPlusMenu(prev => !prev);
                          }}
                          title="Actions Menu (History, Quick Start, New Chat)"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: showPlusMenu ? '#002B5B' : 'rgba(0, 43, 91, 0.08)',
                            color: showPlusMenu ? '#FFFFFF' : '#002B5B',
                            border: '1px solid rgba(0, 43, 91, 0.18)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                            flexShrink: 0
                          }}
                        >
                          <Plus size={15} style={{ transform: showPlusMenu ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                        </button>

                        {/* POPUP MENU WHEN PLUS IS CLICKED */}
                        {showPlusMenu && (
                          <div
                            className="landing-search-plus-menu"
                            style={{
                              position: 'absolute',
                              bottom: '44px',
                              left: '0',
                              background: 'rgba(255, 255, 255, 0.96)',
                              backdropFilter: 'blur(24px) saturate(190%)',
                              WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                              border: '1px solid rgba(255, 255, 255, 0.8)',
                              borderRadius: '14px',
                              padding: '6px',
                              boxShadow: '0 14px 35px rgba(0, 43, 91, 0.22), 0 0 1px rgba(0, 0, 0, 0.1)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              zIndex: 1050,
                              minWidth: '175px'
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                background: 'transparent',
                                border: 'none',
                                color: '#002B5B',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                transition: 'background 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 43, 91, 0.06)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              onClick={() => {
                                setIsSidebarOpen(true);
                                setActiveTab('history');
                                setShowPlusMenu(false);
                                showToast("Search History Opened");
                              }}
                            >
                              <Clock size={16} color="#1d68f2" />
                              <span>Search History</span>
                            </button>

                            <button
                              type="button"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                background: 'transparent',
                                border: 'none',
                                color: '#002B5B',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                transition: 'background 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 43, 91, 0.06)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              onClick={() => {
                                handleUnifiedSearch({ query: 'hospitals & schools near me' });
                                setShowPlusMenu(false);
                              }}
                            >
                              <Search size={16} color="#1d68f2" />
                              <span>Quick Start</span>
                            </button>

                            <button
                              type="button"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                background: 'transparent',
                                border: 'none',
                                color: '#002B5B',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                transition: 'background 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 43, 91, 0.06)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              onClick={() => {
                                setAiSearchQuery('');
                                setSelectedLocation(null);
                                setActiveSearchResults([]);
                                setChatMessages([
                                  {
                                    sender: 'ai',
                                    text: 'Hello! I am your GeoVision AI Spatial Assistant. How can I help you explore locations, services, or geospatial data across Abu Dhabi today?'
                                  }
                                ]);
                                setShowPlusMenu(false);
                                showToast("Started New Chat Session");
                              }}
                            >
                              <MessageSquare size={16} color="#1d68f2" />
                              <span>New Chat</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="landing-search-separator" style={{ margin: '0 10px 0 6px', height: '20px' }} />
                      <input
                        type="text"
                        className="landing-search-input"
                        placeholder={t.searchPlaceholder || 'Ask Smart Map Anything About Places, Services, Or Locations...'}
                        value={aiSearchQuery}
                        onChange={(e) => setAiSearchQuery(e.target.value)}
                        onFocus={() => { if (panelHeight <= 100) setPanelHeight(200); }}
                        style={{ fontSize: '14px' }}
                        autoFocus
                      />
                      <div className="landing-search-btn-wrapper">
                        <button type="submit" className="landing-search-btn-pill" disabled={!aiSearchQuery.trim()}>
                          <span className="search-btn-text">{t.searchBtn || 'Search'}</span>
                          <Send size={15} className="search-btn-icon" style={{ transform: lang === 'ar' ? 'scaleX(-1)' : 'none' }} />
                        </button>
                      </div>
                    </form>
                  </div>


                </div>
              </div>
            </div>
          ) : aiState === 'bar' ? (
            /* STAGE 2: FLOATING BOTTOM-CENTER AI SEARCH BAR */
            <div
              className="map-bottom-ai-search-wrapper"
              style={{
                position: 'absolute',
                bottom: '24px',
                left: isSidebarOpen ? 'calc(50% + 140px)' : '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                width: '90%',
                maxWidth: '680px'
              }}
            >
              <form
                className="landing-search-container map-floating-search-bar"
                style={{
                  margin: 0,
                  width: '100%',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.65)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '14px',
                  cursor: 'pointer'
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (aiSearchQuery.trim()) {
                    handleUnifiedSearch({ query: aiSearchQuery });
                    setAiSearchQuery('');
                  } else {
                    setAiState('panel');
                    setPanelHeight(200);
                  }
                }}
                onClick={() => {
                  setAiState('panel');
                  setPanelHeight(200);
                }}
              >
                <div className="search-star-loader-wrapper">
                  <div className="search-star-loader"></div>
                  <FourPointStar className="landing-search-sparkle" size={16} />
                </div>
                <div className="landing-search-separator" />
                <input
                  type="text"
                  className="landing-search-input"
                  placeholder={t.searchPlaceholder || 'Ask Smart Map Anything About Places, Services, Or Locations...'}
                  value={aiSearchQuery}
                  onChange={(e) => setAiSearchQuery(e.target.value)}
                  onFocus={() => {
                    setAiState('panel');
                  }}
                />
                <div className="landing-search-btn-wrapper">
                  <button type="submit" className="landing-search-btn-pill" disabled={!aiSearchQuery.trim()}>
                    <span className="search-btn-text">{t.searchBtn || 'Search'}</span>
                    <Send size={15} className="search-btn-icon" style={{ transform: lang === 'ar' ? 'scaleX(-1)' : 'none' }} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* STAGE 1: INITIAL MAP VIEW WITH GEOVISION AI BUTTON AT BOTTOM RIGHT (MATCHING EXPLORE MAP VIEW BUTTON) */
            <div
              className="geovision-ai-btn-wrapper"
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '16px',
                zIndex: 1000,
                transition: 'right 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <button
                className="geovision-ai-btn"
                onClick={() => {
                  setAiState('panel');
                }}
              >
                <span>GeoVision AI</span>
                <Sparkles size={16} className="ai-sparkle-icon" />
              </button>
            </div>
          )}

          {/* BOTTOM-LEFT FLOATING COORDINATES PILL & SCALE BAR */}
        </section>
      </main>

      <Toast toastMessage={toastMessage} />

      {/* RIGHT SIDE CATEGORIES DRAWER */}
      <CategoryDrawer
        isCategoryDrawerOpen={isCategoryDrawerOpen}
        setIsCategoryDrawerOpen={setIsCategoryDrawerOpen}
        categorySearchQuery={categorySearchQuery}
        setCategorySearchQuery={setCategorySearchQuery}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        selectedSubcategories={selectedSubcategories}
        setSelectedSubcategories={setSelectedSubcategories}
        handleUnifiedSearch={handleUnifiedSearch}
        t={t}
      />
    </div>
  );
}

export default App;
