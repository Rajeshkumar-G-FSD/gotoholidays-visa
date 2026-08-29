import {
  Destination,
  TravelPackage,
  VisaRequirement,
  VisaService,
  ThailandPackage,
  GlobalPackage,
  Testimonial,
} from '../types';

const U = (id: string, w = 900, h = 650) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=75&auto=format`;

export const THAILAND_PACKAGES: ThailandPackage[] = [
  {
    id: 'bangkok-pattaya',
    title: 'Bangkok + Pattaya',
    duration: '4N/5D',
    priceFrom: 22999,
    inclusions: ['Coral Island Tour', 'Alcazar Show', 'Hotel + Breakfast', 'Airport Transfers'],
    imageUrl: U('photo-1613672803979-a6edfc5a179b'),
  },
  {
    id: 'phuket-krabi',
    title: 'Phuket + Krabi',
    duration: '5N/6D',
    priceFrom: 34999,
    inclusions: ['Phi Phi Island Tour', '4 Star Hotel', 'Speed Boat Experience', 'Honeymoon Friendly'],
    imageUrl: U('photo-1552465011-b4e21bf6e79a'),
  },
  {
    id: 'honeymoon-special',
    title: 'Honeymoon Special',
    duration: '4N/5D',
    priceFrom: 42999,
    inclusions: ['Romantic Dinner Cruise', 'Beach Resort Stay', 'Couple Activities', 'Private Island Tours'],
    imageUrl: U('photo-1520250497591-112f2f40a3f4'),
  },
];

export const GLOBAL_PACKAGES: GlobalPackage[] = [
  { id: 'maldives', title: 'Maldives', meta: '4N/5D • Hotel + Flight', priceFrom: 45000, imageUrl: U('photo-1514282401047-d79a71a590e8') },
  { id: 'bali', title: 'Bali', meta: '5N/6D • Private Villa', priceFrom: 38000, imageUrl: U('photo-1537996194471-e657df975ab4') },
  { id: 'thailand', title: 'Thailand', meta: '4N/5D • Free Visa', priceFrom: 28000, imageUrl: U('photo-1552465011-b4e21bf6e79a') },
  { id: 'europe', title: 'Europe', meta: '9N/10D • Guided Tour', priceFrom: 145000, imageUrl: U('photo-1467269204594-9661b134dd2b') },
  { id: 'dubai', title: 'Dubai', meta: '4N/5D • Expo + Desert', priceFrom: 42000, imageUrl: U('photo-1512453979798-5ea266f8880c') },
  { id: 'kashmir', title: 'Kashmir', meta: '5N/6D • Houseboat', priceFrom: 25000, imageUrl: U('photo-1595815771614-ade9d652a65d') },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Seamless process for my parents US visa. The team were incredibly helpful with the interview prep. Highly recommended!',
    name: 'Rahul Sharma',
    role: 'USA Visitor Visa',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 't2',
    quote:
      'Booking our honeymoon to Maldives through GOTO Holidays was the best decision. Everything was pre-planned to perfection.',
    name: 'Priya Patel',
    role: 'Europe (Schengen)',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 't3',
    quote:
      'Excellent service and transparency regarding the Thailand packages. The hotel selection was premium yet affordable.',
    name: 'David Wilson',
    role: 'Thailand Family Trip',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

export const VISA_SERVICES: VisaService[] = [
  {
    id: 'usa',
    title: 'USA Visa',
    subtitle: 'Business & Tourist (B1/B2)',
    feature: '10 Years Validity',
    accent: 'blue',
    icon: 'landmark',
  },
  {
    id: 'uk',
    title: 'UK Visa',
    subtitle: 'Standard Visitor Visa',
    feature: '6 Months to 10 Years',
    accent: 'rose',
    icon: 'globe',
  },
  {
    id: 'schengen',
    title: 'Schengen Visa',
    subtitle: 'Europe Multi-Entry',
    feature: '27 Countries Access',
    accent: 'green',
    icon: 'globe',
  },
  {
    id: 'canada',
    title: 'Canada Visa',
    subtitle: 'Visitor & Student Visa',
    feature: 'Fast Processing',
    accent: 'red',
    icon: 'landmark',
  },
  {
    id: 'singapore',
    title: 'Singapore Visa',
    subtitle: 'E-Visa Facility',
    feature: '2-3 Working Days',
    accent: 'amber',
    icon: 'globe',
  },
  {
    id: 'dubai',
    title: 'Dubai Visa',
    subtitle: '30/60 Days Tourist',
    feature: 'Quick Approval',
    accent: 'yellow',
    icon: 'globe',
  },
];

export const HERO_BACKGROUND = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA75hZd7X02bM4KOp_SLzAyOWiJWgn4BpHXx7wmTrNK2scH6oNlF3cGgt4tNgyJxVXidkIbpbFfJMCO-g8RC2Xt4vR3tmwo4GlbVrI1nSwJ2kpE6rWx1_b_nFoL8e872V98KDJk5J6lp_JE1Lrxeo_uE2imAujhSay2yDPX9j5WxPvJsQszQez3jumUWNF2R28iub3hdR7_FHdl-gF-y8etrMkoOKvBtRR8vmtmOvVmBfNjC5X3LKPoVq0MEM69MDNqEg';

export const DESTINATIONS: Destination[] = [
  {
    id: 'camoe-island',
    name: 'Camoe Island',
    location: 'Zakynthos',
    country: 'Greece',
    region: 'Europe',
    description: 'A secluded private islet connected by a wooden bridge across crystal turquoise waters.',
    fullStory: 'Camoe Island in Zakynthos, Greece, offers a dreamlike escape. Famous for its iconic wooden footbridge leading over turquoise waters to a tranquil pine-covered cliff, it stands as one of the Ionian Sea’s best-kept secrets.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZTMKGrYCBXZbI_SFib4zmqoSRSKhnQHW8W4Ki5QGflwKWz5v5f4Z081XDv8_jYpFIhtj_apSC1Q2I6XlbcQJj8c7Kjz8D1EbKVrX3DNpKC52r96ty1Z_of6B17zhlXu4TWjyOb-FHn8xxSKbhd9u3kKQxpYc-mt2K3MSFlMbi0okfeKXuu4UE2pOa7RoUaD4Daa0CRmYeppTtSSd_hHAy1UO42MIzI64o6Jyxfk2Ef_-8OLPZYzwX',
    heroBgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZTMKGrYCBXZbI_SFib4zmqoSRSKhnQHW8W4Ki5QGflwKWz5v5f4Z081XDv8_jYpFIhtj_apSC1Q2I6XlbcQJj8c7Kjz8D1EbKVrX3DNpKC52r96ty1Z_of6B17zhlXu4TWjyOb-FHn8xxSKbhd9u3kKQxpYc-mt2K3MSFlMbi0okfeKXuu4UE2pOa7RoUaD4Daa0CRmYeppTtSSd_hHAy1UO42MIzI64o6Jyxfk2Ef_-8OLPZYzwX',
    highlights: ['Iconic wooden footbridge', 'Crystal-clear swimming bays', 'Spectacular sunset views'],
    bestTimeToVisit: 'May – October',
    avgCost: '$3,100 / person',
    tag: 'Island Haven'
  },
  {
    id: 'koh-phi-phi',
    name: 'Koh Phi Phi Don',
    location: 'Islands',
    country: 'Thailand',
    region: 'Asia Pacific',
    description: 'Dramatic limestone karsts rising majestically above emerald tropical waters.',
    fullStory: 'Koh Phi Phi Don is the jewel of the Andaman Sea. Surrounded by lush jungle cliffs, secluded sandy coves, and vibrant coral reefs, it provides the ultimate balance between thrilling island hopping and serene beach relaxation.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeiPmy8H4pJttfzMWlt767SjDAb7nydhdgDdktAZrZDn5gZ_IZpeueaE05H4tm4E61kPWkryziBeZbLsXS5eQvPsVMnZObHyO2VJrP1zklOa28P7yo5STx_AEAgRxioJ6LxSfRaIHoJkEEVXoKKhLl2Mrmrih-HNrqJT7Y3TsYBBA-48j5PkU2yGO014kHeqCggpMNjV5LDFLq8PSo5eBbjReh29MUrMLpWpumzkbEkjtVAEzPkPor',
    heroBgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHJHojGJ_dUfWhR6a3OJnTXpo9dyImAoQhjH1WkFfmfpvuTzUkTmPMeS4VUKQudDaNeY81TS0v8lyQFMNL9umYkOFg3t0pFHrSnsbt7odmjj8WGv1CBn8waQtiqbZzhv0oKfEU96WJw2t2L__2sqeNTH9v0SX2zCLkJ1teMMbDVBjlZXP-XY_iAZy_-hrAyktTom28ZSqymgQAn14UEQ5S8JDZTVZlWP9_J-9mlBsmXfqXWL12EwAy',
    highlights: ['Private longtail boat excursions', 'Snorkeling in Maya Bay & Shark Point', 'Cliffside sunset viewpoints'],
    bestTimeToVisit: 'November – April',
    avgCost: '$2,400 / person',
    tag: 'Tropical Escapade'
  },
  {
    id: 'lago-di-braies',
    name: 'Lago di Braies',
    location: 'South Tyrol',
    country: 'Italy',
    region: 'Europe',
    description: 'The iconic alpine lake framed by jagged Dolomite peaks and historic wooden boathouses.',
    fullStory: 'Nestled in the heart of the Italian Dolomites, Lago di Braies (Pragser Wildsee) is renowned for its shimmering emerald-green waters, solitary rustic wooden boathouse, and breathtaking alpine amphitheater. Early mornings offer mist rolling over the glass-still water.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDesx9sPzdTd4X9YHD8Lr_M-KBk9c5HSG0kT8Opu1ASjC04H_w01qAGyGQZ9D3m3MiY7yOC4qNfyCCiPymIxf6zV3Zcl3nocEYEKPy3mQDpi_9_V75p1qcNwoI3jzbl3QfVxllEGJE7KiT7jACfftz564Sy6G16JITVybi8WF4EmhZnA_xNHuaQYIxydSKgi-zDk1ij6QpyPqgONwwLpHCJgO-F-yq-MAUxxO2iLKCVt_AYBKHd3OuX',
    heroBgUrl: HERO_BACKGROUND,
    highlights: ['Vintage rowboat rentals', 'Lakeside trail hikes', 'Luxury alpine spa lodges'],
    bestTimeToVisit: 'June – October',
    avgCost: '$4,200 / person',
    tag: 'Alpine Sanctuary'
  },
  {
    id: 'cinque-terre',
    name: 'Cinque Terre',
    location: 'Vernazza',
    country: 'Italy',
    region: 'Europe',
    description: 'Pastel-hued cliffside villages perched above the azure Mediterranean coastline.',
    fullStory: 'Cinque Terre is a UNESCO World Heritage site consisting of five centuries-old coastal villages along the Italian Riviera. Vernazza, with its historic fortified tower and vibrant harbor cafes, captures the epitome of Italian coastal charm.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd1Adtrs0l9R7y5gSPy7BV5FJ8wvJa9JaSROOa2Y5u05UkDkF1E3vYF3NfspNnRwhKsFBzENyfTuVPwJKjcNq7lXyDlSuFBPedCicTz7CVP63DQQNt4OTycd2HfEWeEkppv-Bj23wxuFzQWTsluaxzAqbHVPJkyjIB63ha1vAg2lwtXEx06Armq92j6u1YZmELfbGktlC08mHkrInW-eQ9K_GjIwGlRtc1B3aibLwZbEuyyVdwyKER',
    heroBgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHDpOczhpo-KfHsMCwBOhvclWHqsy-_-L1oAPWWmc7hHVmzVuO8jFuC0to_7OZh7fnVrOGNGI5pfGKNpDVt5KdW6sCpijWzJOZXjTSaXaiwruBNEVUh-9rzJNqcfl7dRMHEMXeKfu8boLC8JbP-lToi1h8cn0xxpMZHfZeyBI4v8eaNkGOKJLlqa6NcYLzTh971RUX7uW45-UAxQ36k5_TM1f4FqbT-w-juJzinIKiD9gpDOq00bKY',
    highlights: ['Sentiero Azzurro coastal hike', 'Sciacchetrà wine tasting', 'Private sunset yacht charter'],
    bestTimeToVisit: 'April – October',
    avgCost: '$2,800 / person',
    tag: 'Coastal Heritage'
  },
  {
    id: 'grand-canal',
    name: 'Grand Canal',
    location: 'Venice',
    country: 'Italy',
    region: 'Europe',
    description: 'Historic Venetian palaces, silent canals, and timeless gondola journeys at twilight.',
    fullStory: 'Venice’s Grand Canal weaves through centuries of Venetian Gothic and Renaissance architecture. Navigating its tranquil waters at dusk reveals glowing palazzos, historic stone bridges, and the unmatched romance of the floating city.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3Eh0cSs7Z74yuXzjmpeLHObswt_lY7VGJ8D28GjFBLQT_0-AIV2_NrHsuLs4VoThrLZHYPn2c29EOAuH66wKRTJn_xrdJTpgi9-yYdtTSAgTnVCvVvY1pZpHMuDxOWb8_d2VyI1npN1nlRXHEt2hZcB9udwbmdVT5ib46J3aPWtJPq2XCxHS1sBkl38ufdEYGs6r3jXgfBYt6E9iJuiOP9BCOcVvIsz1hK33nVdyx_J8DTp-f11Uu',
    heroBgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3Eh0cSs7Z74yuXzjmpeLHObswt_lY7VGJ8D28GjFBLQT_0-AIV2_NrHsuLs4VoThrLZHYPn2c29EOAuH66wKRTJn_xrdJTpgi9-yYdtTSAgTnVCvVvY1pZpHMuDxOWb8_d2VyI1npN1nlRXHEt2hZcB9udwbmdVT5ib46J3aPWtJPq2XCxHS1sBkl38ufdEYGs6r3jXgfBYt6E9iJuiOP9BCOcVvIsz1hK33nVdyx_J8DTp-f11Uu',
    highlights: ['Private wooden water taxi tours', 'After-hours Saint Mark’s Basilica access', 'Murano glass artisan workshops'],
    bestTimeToVisit: 'September – November',
    avgCost: '$3,800 / person',
    tag: 'Timeless Romance'
  }
];

// Signature spotlight destinations shown in the Home hero rotating gallery.
const HERO_IMG = '?w=480&h=480&fit=crop&q=80&auto=format';
const HERO_BG = '?w=2000&h=1300&fit=crop&q=80&auto=format';

export const HERO_DESTINATIONS: Destination[] = [
  {
    id: 'maldives',
    name: 'Maldives',
    location: 'North Malé Atoll',
    country: 'Maldives',
    region: 'Asia Pacific',
    description: 'Overwater villas suspended above impossibly clear turquoise lagoons.',
    fullStory:
      'The Maldives is a scattering of 1,000+ coral islands ringed by house reefs and powder-soft sandbanks. Days drift between glass-floor overwater suites, dawn dolphin cruises, and candlelit dinners on private sandbars under the Indian Ocean sky.',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8' + HERO_BG,
    highlights: ['Private overwater pool villas', 'Snorkelling with manta rays', 'Sandbank sunset dining'],
    bestTimeToVisit: 'November – April',
    avgCost: '$3,600 / person',
    tag: 'Overwater Serenity',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    location: 'Downtown & Desert',
    country: 'UAE',
    region: 'Middle East',
    description: 'A futuristic skyline rising from golden desert dunes.',
    fullStory:
      'Dubai fuses record-breaking architecture with old-world Arabian charm. Ascend the Burj Khalifa at dusk, drift over the dunes in a hot-air balloon, dine in the desert, then wander the gold and spice souks of Deira.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' + HERO_BG,
    highlights: ['Burj Khalifa observation deck', 'Red-dune desert safari', 'Marina yacht brunch'],
    bestTimeToVisit: 'November – March',
    avgCost: '$2,900 / person',
    tag: 'City of Gold',
  },
  {
    id: 'thailand',
    name: 'Krabi & Phi Phi',
    location: 'Andaman Coast',
    country: 'Thailand',
    region: 'Asia Pacific',
    description: 'Longtail boats, limestone karsts, and warm emerald water.',
    fullStory:
      'Thailand’s Andaman coast is a maze of jade sea and jungle-topped cliffs. Island-hop by longtail from Railay to Phi Phi, kayak hidden lagoons, and end each day with fire shows and pad thai on the sand.',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a' + HERO_BG,
    highlights: ['Maya Bay & Pileh Lagoon cruise', 'Railay rock climbing', 'Night markets in Krabi Town'],
    bestTimeToVisit: 'November – April',
    avgCost: '$1,900 / person',
    tag: 'Andaman Bliss',
  },
  {
    id: 'malaysia',
    name: 'Kuala Lumpur',
    location: 'City Centre',
    country: 'Malaysia',
    region: 'Asia Pacific',
    description: 'The glittering Petronas Twin Towers over a lush skyline.',
    fullStory:
      'Kuala Lumpur is Southeast Asia at full volume — the Petronas Towers, Batu Caves’ rainbow steps, hawker-stall feasts in Jalan Alor, and rooftop infinity pools facing the city lights.',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07' + HERO_BG,
    highlights: ['Petronas Towers skybridge', 'Batu Caves day trip', 'Jalan Alor street food'],
    bestTimeToVisit: 'May – July, December',
    avgCost: '$1,700 / person',
    tag: 'Twin Towers Skyline',
  },
  {
    id: 'andaman',
    name: 'Havelock Island',
    location: 'Andaman Islands',
    country: 'India',
    region: 'Asia Pacific',
    description: 'Radhanagar Beach — white sand curving into a calm blue bay.',
    fullStory:
      'The Andaman Islands feel gloriously remote: Radhanagar’s Blue-Flag sand, elephant swims at dawn, and some of Asia’s best beginner scuba on untouched reefs off Havelock and Neil Island.',
    imageUrl: 'https://images.unsplash.com/photo-1599325601183-042bed55081c' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1599325601183-042bed55081c' + HERO_BG,
    highlights: ['Radhanagar Beach sunsets', 'Discover-scuba at Elephant Beach', 'Bioluminescence night kayak'],
    bestTimeToVisit: 'October – May',
    avgCost: '$1,500 / person',
    tag: 'Radhanagar Shores',
  },
  {
    id: 'singapore',
    name: 'Marina Bay',
    location: 'Downtown Core',
    country: 'Singapore',
    region: 'Asia Pacific',
    description: 'Marina Bay Sands, Gardens by the Bay, and a spotless skyline.',
    fullStory:
      'Singapore packs a continent of food and design into one island. Watch the Supertree light show, hawker-hop from Michelin chicken rice to chilli crab, and swim the SkyPark infinity edge above the bay.',
    imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd' + HERO_BG,
    highlights: ['Gardens by the Bay light show', 'SkyPark infinity pool', 'Hawker-centre food crawl'],
    bestTimeToVisit: 'February – April',
    avgCost: '$2,200 / person',
    tag: 'Garden Metropolis',
  },
  {
    id: 'lakshadweep',
    name: 'Agatti Island',
    location: 'Lakshadweep Archipelago',
    country: 'India',
    region: 'Asia Pacific',
    description: 'A slender coral islet wrapped in a glowing turquoise lagoon.',
    fullStory:
      'Lakshadweep is India’s best-kept secret — 36 coral atolls with strict visitor limits. Agatti and Bangaram offer lagoon kayaking, reef snorkelling straight off the beach, and nights with nothing but stars.',
    imageUrl: 'https://images.unsplash.com/photo-1572431447238-425af66a273b' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1572431447238-425af66a273b' + HERO_BG,
    highlights: ['Lagoon kayaking & glass-bottom boats', 'Reef snorkelling off the sand', 'Permit-only exclusivity'],
    bestTimeToVisit: 'October – March',
    avgCost: '$1,800 / person',
    tag: 'Coral Lagoon',
  },
  {
    id: 'srilanka',
    name: 'Sigiriya',
    location: 'Cultural Triangle',
    country: 'Sri Lanka',
    region: 'Asia Pacific',
    description: 'The ancient Lion Rock fortress rising from emerald jungle.',
    fullStory:
      'Sri Lanka layers 2,000 years of history over one small island. Climb Sigiriya at sunrise, ride the misty hill-country train to Ella, safari for leopards in Yala, then unwind on the southern beaches of Mirissa.',
    imageUrl: 'https://images.unsplash.com/photo-1612862862126-865765df2ded' + HERO_IMG,
    heroBgUrl: 'https://images.unsplash.com/photo-1612862862126-865765df2ded' + HERO_BG,
    highlights: ['Sunrise climb up Lion Rock', 'Kandy–Ella hill-country train', 'Yala leopard safari'],
    bestTimeToVisit: 'December – March',
    avgCost: '$1,600 / person',
    tag: 'Ancient Rock Kingdom',
  },
];

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'alpine-serenity-retreat',
    title: 'The Alpine Serenity Retreat',
    subtitle: 'A breathtaking immersion into the pristine peaks and crystal-clear lakes of the Italian Dolomites.',
    location: 'Dolomites, Italy',
    duration: '7 Days',
    price: 4200,
    featured: true,
    isNew: false,
    category: 'Mountains & Lakes',
    priceTier: 'Luxury ($$$$)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfmLemQmvu3scLYbTF7fTO0JXhBnNE1DTQ8mz9MMz5OMpiFnEXrVy82dfGSP2R2CVP8TfaAD90TxBWgJBJDPlBSw7LkuY0e5BGMc-xyPcGMVz-TiBXSgGb4Y_xzue8rIn-tpL3UnWZRsshm8QNJrXQLQaWhAOM3yLbu_ea1iM2mgdpiLW0bc2Hbp5ogWhUBGcrGlOwpI4hTvKhKduho7SQHacNPfb9TghnGZRggG7C6PVZPQtQFq6I',
    overview: 'Escape to the breathtaking majesty of the Dolomites. Experience sunrise over Tre Cime di Lavaredo, private rowboat excursions across Lago di Braies, and Michelin-starred alpine gastronomy paired with world-class wellness spa stays.',
    itinerary: [
      { day: 1, title: 'Arrival in Bolzano & Val Gardena', desc: 'Private helicopter transfer to your five-star mountain chalet with panoramic mountain views and welcome dinner.' },
      { day: 2, title: 'Lago di Braies Dawn Experience', desc: 'Exclusive sunrise access to the private wooden boathouse followed by a gourmet lakeside brunch.' },
      { day: 3, title: 'Tre Cime di Lavaredo High Route', desc: 'Guided alpine trek along secluded scenic ridges with professional photography assistance.' },
      { day: 4, title: 'Alpine Wellness & Herbology', desc: 'Holistic mountain herb spa rituals and thermal infinity pool relaxation facing the Sella massif.' },
      { day: 5, title: 'Cortina d’Ampezzo & Wine Cellars', desc: 'Explore historic boutiques and enjoy a private sommelier-led Alto Adige wine tasting.' },
      { day: 6, title: 'Alpe di Siusi Pasture Picnic', desc: 'Horse-drawn carriage across Europe’s largest high alpine meadow with artisan cheese tasting.' },
      { day: 7, title: 'Farewell Alpine Breakfast', desc: 'Scenic mountain pass descent and private luxury transfer to Venice/Innsbruck.' }
    ],
    inclusions: [
      '6 nights in luxury mountain suites',
      'Daily curated breakfast & 4 gourmet dinners',
      'Private mountain guide & gear',
      'All local transfers & scenic pass permits',
      '24/7 dedicated concierge'
    ],
    groupSize: 'Max 8 travelers',
    difficulty: 'Moderate'
  },
  {
    id: 'coastal-escapade',
    title: 'Coastal Escapade',
    subtitle: 'Dramatic cliffside villages, vintage yacht cruising, and timeless Mediterranean warmth.',
    location: 'Cinque Terre • 5 Days',
    duration: '5 Days',
    price: 2800,
    featured: false,
    isNew: false,
    category: 'Coastal Escapes',
    priceTier: 'Premium ($$$)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHDpOczhpo-KfHsMCwBOhvclWHqsy-_-L1oAPWWmc7hHVmzVuO8jFuC0to_7OZh7fnVrOGNGI5pfGKNpDVt5KdW6sCpijWzJOZXjTSaXaiwruBNEVUh-9rzJNqcfl7dRMHEMXeKfu8boLC8JbP-lToi1h8cn0xxpMZHfZeyBI4v8eaNkGOKJLlqa6NcYLzTh971RUX7uW45-UAxQ36k5_TM1f4FqbT-w-juJzinIKiD9gpDOq00bKY',
    overview: 'Discover the UNESCO-listed wonders of the Italian Riviera. Savor fresh seafood in Vernazza, hike ancient cliff paths between lemon groves, and sail the Ligurian Sea at golden hour.',
    itinerary: [
      { day: 1, title: 'Welcome to Portovenere', desc: 'Check into your seaside boutique villa overlooking the Gulf of Poets.' },
      { day: 2, title: 'Cinque Terre Private Sailing', desc: 'Charter a classic Riva boat along the five villages with secluded swimming stops.' },
      { day: 3, title: 'Terraced Vineyards & Pesto Masterclass', desc: 'Walk ancient stone terraces and learn culinary secrets from a local culinary master.' },
      { day: 4, title: 'Vernazza & Monterosso Walk', desc: 'Guided morning hike along the Sentiero Azzurro followed by seaside dining.' },
      { day: 5, title: 'Sunset Aperitivo & Departure', desc: 'Final morning espresso in Manarola and seamless private transfer.' }
    ],
    inclusions: [
      '4 nights in luxury sea-view boutique hotel',
      'Private Riva motorboat charter',
      'All park entrance fees & train passes',
      'Wine & culinary tastings'
    ],
    groupSize: 'Max 6 travelers',
    difficulty: 'Easy to Moderate'
  },
  {
    id: 'island-hopping',
    title: 'Island Hopping',
    subtitle: 'Emerald lagoons, limestone monoliths, and secluded luxury hideaways.',
    location: 'Thai Islands • 10 Days',
    duration: '10 Days',
    price: 3450,
    featured: false,
    isNew: true,
    category: 'Coastal Escapes',
    priceTier: 'Premium ($$$)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHJHojGJ_dUfWhR6a3OJnTXpo9dyImAoQhjH1WkFfmfpvuTzUkTmPMeS4VUKQudDaNeY81TS0v8lyQFMNL9umYkOFg3t0pFHrSnsbt7odmjj8WGv1CBn8waQtiqbZzhv0oKfEU96WJw2t2L__2sqeNTH9v0SX2zCLkJ1teMMbDVBjlZXP-XY_iAZy_-hrAyktTom28ZSqymgQAn14UEQ5S8JDZTVZlWP9_J-9mlBsmXfqXWL12EwAy',
    overview: 'An unforgettable voyage through Thailand’s pristine Andaman Sea and Gulf islands. Experience traditional wooden longtail boats, secluded luxury pool villas, bioluminescent night kayak expeditions, and authentic culinary encounters.',
    itinerary: [
      { day: 1, title: 'Arrival in Phuket & Koh Yao Noi', desc: 'Speedboat transfer to an ultra-private eco-luxury resort with Phang Nga Bay views.' },
      { day: 2, title: 'Phang Nga Bay Limestone Sanctuary', desc: 'Silent kayak exploration through sea caves and hidden tidal lagoons.' },
      { day: 3, title: 'Koh Phi Phi Don Private Coves', desc: 'Sunrise cruise avoiding crowds, snorkeling with marine biologists.' },
      { day: 4, title: 'Bioluminescent Night Plankton', desc: 'Night paddle in glowing waters under the starry Andaman sky.' },
      { day: 5, title: 'Bamboo Island Coral Reefs', desc: 'Relax on powder-white sands with private chef beachfront dining.' },
      { day: 6, title: 'Transfer to Krabi Rainforest Edge', desc: 'Hot springs relaxation and luxury jungle retreat accommodation.' },
      { day: 7, title: 'Railay Beach Rock Formations', desc: 'Explore hidden viewpoint climbs and sunset beachfront dinner.' },
      { day: 8, title: 'Thai Herbal Wellness Day', desc: 'Traditional Thai wellness treatments and herbal steam sanctuaries.' },
      { day: 9, title: 'Island Farewell Feast', desc: 'Sunset cruise and five-course royal Thai banquet.' },
      { day: 10, title: 'Departure', desc: 'VIP airport escort and international departure.' }
    ],
    inclusions: [
      '9 nights in beachfront pool villas',
      'Private chartered boats and speedboats',
      'Daily breakfast & select gourmet banquets',
      'All marine park fees & snorkeling gear'
    ],
    groupSize: 'Max 10 travelers',
    difficulty: 'Easy'
  },
  {
    id: 'kyoto-zen-trail',
    title: 'Kyoto Zen & Ancient Trails',
    subtitle: 'Bamboo groves, historic tea ceremonies, and secluded ryokan hot springs.',
    location: 'Kyoto & Hakone, Japan',
    duration: '8 Days',
    price: 4950,
    featured: false,
    isNew: false,
    category: 'Cultural Immersions',
    priceTier: 'Luxury ($$$$)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8jXvd7ff7UXoU-YaZ5u-2mf9h7zlbnKdUu3IE13s5b1vljQZbOaPG9Xm3W8rvCCzB4Ajb2m1ykml_3D0dljICjgkIo1JdUUF7PwHFAJQ11Y-C0rrOEcSA9_ZgHV9wdtfll8TxNhP_Ia4W5O5aikAWLtLL0CGc9SqNPQMPNlqS5mEz9n_s8rh6OmtkGIBxHkJ2oqZskVVYnxJULN8JUehKk5hrYlCs-Pw46Zvzi4MXz3JenEv8KlGp',
    overview: 'Step into a world of timeless harmony. Journey through Kyoto’s ancient moss gardens, partake in private tea ceremonies with 15th-generation masters, and soak in mineral-rich onsen waters overlooking Mount Fuji.',
    itinerary: [
      { day: 1, title: 'Arrival in Kyoto', desc: 'Check into your historic machiya townhouse with zen rock garden.' },
      { day: 2, title: 'Arashiyama Bamboo & Secret Temples', desc: 'Early morning private walk through bamboo groves and mossy mountain temples.' },
      { day: 3, title: 'Tea Master Ceremony & Kaiseki', desc: 'Private audience with a Urasenke tea master and 10-course Kaiseki dinner.' },
      { day: 4, title: 'Nara Ancient Deer Sanctuary', desc: 'Explore Kasuga Taisha shrine and cedar forest pathways.' },
      { day: 5, title: 'Shinkansen to Hakone Onsen', desc: 'First-class bullet train to a luxury ryokan with private open-air hot spring.' },
      { day: 6, title: 'Mount Fuji Vista & Lake Ashi', desc: 'Panoramic lake cruise and Hakone Open Air Museum exploration.' },
      { day: 7, title: 'Tokyo Art & Culinary Twilight', desc: 'Modern culinary experiences and contemporary art galleries.' },
      { day: 8, title: 'Departure', desc: 'Private transfer to Tokyo Haneda/Narita.' }
    ],
    inclusions: [
      '7 nights in authentic luxury Ryokan & Machiya',
      'All Shinkansen bullet train first-class tickets',
      'Daily Kaiseki breakfasts and gourmet dinners',
      'English-speaking master cultural guide'
    ],
    groupSize: 'Max 6 travelers',
    difficulty: 'Easy'
  }
];

export const VISA_DATA: VisaRequirement[] = [
  {
    id: 'japan',
    country: 'Japan',
    region: 'Asia Pacific',
    badgeType: 'Visa Free',
    badgeColor: 'primary',
    passportType: 'U.S., EU, UK, Canada, Australia',
    maxStay: 'Max 90 Days',
    requirementSummary: 'U.S. citizens can visit Japan for up to 90 days for tourism without a visa. A valid passport is required with at least 6 months validity.',
    fullRequirements: [
      'Valid passport with at least 6 months remaining validity',
      'Return or onward flight ticket confirmation',
      'Proof of sufficient funds for duration of stay',
      'Completed Visit Japan Web online registration (recommended for fast quarantine & customs processing)'
    ],
    processingTime: 'Instant on arrival',
    fee: 'Free ($0 USD)',
    documentsNeeded: ['Passport', 'Return Flight', 'Hotel Booking', 'Visit Japan Web QR'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8jXvd7ff7UXoU-YaZ5u-2mf9h7zlbnKdUu3IE13s5b1vljQZbOaPG9Xm3W8rvCCzB4Ajb2m1ykml_3D0dljICjgkIo1JdUUF7PwHFAJQ11Y-C0rrOEcSA9_ZgHV9wdtfll8TxNhP_Ia4W5O5aikAWLtLL0CGc9SqNPQMPNlqS5mEz9n_s8rh6OmtkGIBxHkJ2oqZskVVYnxJULN8JUehKk5hrYlCs-Pw46Zvzi4MXz3JenEv8KlGp'
  },
  {
    id: 'australia',
    country: 'Australia',
    region: 'Asia Pacific',
    badgeType: 'ETA Required',
    badgeColor: 'tertiary',
    passportType: 'U.S., Canada, UK, EU',
    maxStay: 'Up to 90 days per visit (12-month validity)',
    requirementSummary: 'An Electronic Travel Authority (ETA subclass 601) is required for tourism or business visits up to 90 days. Must be applied via official mobile app.',
    fullRequirements: [
      'Valid passport with biometric chip',
      'Australia ETA Mobile App application submission',
      'Good character declaration (no criminal convictions > 12 mos)',
      'Proof of onward travel and funds'
    ],
    processingTime: 'Usually within 24 hours',
    fee: '$20 AUD (App processing fee)',
    documentsNeeded: ['Biometric Passport', 'Selfie Face Scan via App', 'Credit Card', 'Email Address'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpyIQemAD-PekM-JBctISAU2EO6MWHCl_SJCcruGZ_LbxpPwuJ99clhkNfoqQcmsH088PcjArzJ5l24Atd5Z_TKWDkbl3IukR9s4iUzCXiaTAay8NveAM9T78v9GzaTj86-Q-4pkpRirDCDOJdHQZKxdCN1a7ZfT0Gd97NVvmYPwcgGskIbP2KDgeLFAtmddvhov4WQTqI6nfiJ62RnAy2U2-NhobNLyfKwZZoLLI42od4IziRPWAq'
  },
  {
    id: 'brazil',
    country: 'Brazil',
    region: 'South America',
    badgeType: 'eVisa Starting 2025',
    badgeColor: 'error',
    passportType: 'U.S., Canada, Australia',
    maxStay: 'Up to 90 days per year',
    requirementSummary: 'Starting April 10, 2025, citizens of the U.S., Canada, and Australia will require an electronic visa (eVisa) prior to boarding flights to Brazil.',
    fullRequirements: [
      'Valid passport with 2 blank pages',
      'Official eVisa portal application with uploaded photo and passport scan',
      'Printed or electronic confirmation before flight check-in',
      'Proof of return flight and hotel reservation'
    ],
    processingTime: '5 – 10 business days',
    fee: '$80.90 USD',
    documentsNeeded: ['Passport Scan', 'Passport Photo', 'Flight Reservation', 'Bank Statement'],
    statusNotes: 'Upcoming Change: Please ensure your visa is approved at least 14 days before your departure date.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiU-FC9-uqQYXJ2DFya2BDFoE0PkaXIZsljFlSZRnFNoZ00SneVaYLmoqdsXXI2MydNGDJDj1e-uc_4kyTYe3OjcGqFarnxzRo-MPSLaJjXddXzlr7y3_hF7XDc5yI3IRSxQsFEFJcRb_tIO11hy5rbFwF52SqHVeaInQWoROMSzYmcJI9PuT3EbsTdWqEu2U4J9djFcYu0p-5F4kNmr3_1A9AbuJBVQybRT_21ftwbLc3S6-Pr4hZ'
  },
  {
    id: 'italy-schengen',
    country: 'Italy (Schengen Zone)',
    region: 'Europe (Schengen)',
    badgeType: 'Visa Free',
    badgeColor: 'primary',
    passportType: 'U.S., Canada, UK, Australia',
    maxStay: '90 days within any 180-day period',
    requirementSummary: 'Visa-free for tourism. ETIAS authorization system is slated to launch in 2025/2026 for pre-travel clearance.',
    fullRequirements: [
      'Passport valid for at least 3 months beyond intended departure date from Schengen',
      'Proof of travel health insurance with min €30,000 coverage',
      'Proof of accommodation and return travel',
      'Sufficient financial means (€50-€100 per day)'
    ],
    processingTime: 'Instant on arrival (ETIAS ~ minutes when launched)',
    fee: 'Free ($0 USD)',
    documentsNeeded: ['Passport', 'Travel Insurance', 'Hotel Vouchers', 'Return Ticket'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDesx9sPzdTd4X9YHD8Lr_M-KBk9c5HSG0kT8Opu1ASjC04H_w01qAGyGQZ9D3m3MiY7yOC4qNfyCCiPymIxf6zV3Zcl3nocEYEKPy3mQDpi_9_V75p1qcNwoI3jzbl3QfVxllEGJE7KiT7jACfftz564Sy6G16JITVybi8WF4EmhZnA_xNHuaQYIxydSKgi-zDk1ij6QpyPqgONwwLpHCJgO-F-yq-MAUxxO2iLKCVt_AYBKHd3OuX'
  },
  {
    id: 'thailand',
    country: 'Thailand',
    region: 'Asia Pacific',
    badgeType: 'Visa Free',
    badgeColor: 'primary',
    passportType: 'U.S., EU, UK, Canada, Australia',
    maxStay: 'Up to 60 days (extendable by 30 days locally)',
    requirementSummary: 'Eligible passport holders receive 60-day visa exemption on arrival for tourism and leisure.',
    fullRequirements: [
      'Passport with at least 6 months validity remaining',
      'Confirmed return ticket leaving Thailand within 60 days',
      'Proof of funds (at least 20,000 THB or approx $600 USD per person)'
    ],
    processingTime: 'Instant at border control',
    fee: 'Free ($0 USD)',
    documentsNeeded: ['Passport', 'Return Flight Ticket', 'Arrival Card / Digital Form'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeiPmy8H4pJttfzMWlt767SjDAb7nydhdgDdktAZrZDn5gZ_IZpeueaE05H4tm4E61kPWkryziBeZbLsXS5eQvPsVMnZObHyO2VJrP1zklOa28P7yo5STx_AEAgRxioJ6LxSfRaIHoJkEEVXoKKhLl2Mrmrih-HNrqJT7Y3TsYBBA-48j5PkU2yGO014kHeqCggpMNjV5LDFLq8PSo5eBbjReh29MUrMLpWpumzkbEkjtVAEzPkPor'
  }
];

export const OFFICE_LOCATIONS = [
  {
    city: 'New York, USA',
    address: '123 Explorer Way, Suite 400\nNew York, NY 10001',
    badge: 'HQ',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBroVGskdq7ZG5q5XjwhxLsGx7KBjwF6f8eR2gzIWjDmOl84PDYnIGSE7QXKZ6Vb1cs8Z--PjunaDMkQ2Q1RcKQvKns7jmDEcKOgnIWIrZqLCYudahMgt2_kpnvNkGtZQSnfI0yejK7SwnTRwoHoKk56iHgx12U5GXEYT0P6ldTdVA1Dknxn_2x7Cynuf4kBcLmNQ3a_KtXJ0Nal3FI08ebIrxF1Xjt3OHWmU_MjB2VBR_ZJSwpRan5'
  },
  {
    city: 'London, UK',
    address: '45 Wanderlust Lane\nLondon, W1D 3QU',
    badge: 'Regional',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpbRdWpdwP9jDhiYznIXKmT2VRtlV-Fmi490pfoRg2Swy7PD8jNiffAB4roC0YSNHosZZWwGVAa_9y52IwSothsOVZt4j5HZYI4tDD-M-JJ4fHZuAZ-Gyz_EenTeJodlQwNAWw-EJaliB8ViirZ4Sgvz2YLTaaYBo31gO_gaAitOD4gLM4Z1Hr7C_Aan1IMdOH7AW938SwybiuPoJChQ4heMTtdQ9oy8Z1AbmEFRePTKW2shzhsjXN'
  }
];
