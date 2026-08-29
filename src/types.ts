export type ActiveTab =
  | 'home'
  | 'destinations'
  | 'visa-services'
  | 'packages'
  | 'destination-detail'
  | 'about'
  | 'contact'
  | 'plan';

export interface VisaService {
  id: string;
  title: string;
  subtitle: string;
  feature: string;
  accent: 'blue' | 'rose' | 'green' | 'red' | 'amber' | 'yellow';
  icon: 'landmark' | 'globe' | 'plane';
}

export interface ThailandPackage {
  id: string;
  title: string;
  duration: string;
  priceFrom: number;
  inclusions: string[];
  imageUrl: string;
}

export interface GlobalPackage {
  id: string;
  title: string;
  meta: string;
  priceFrom: number;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface RoadmapStop {
  day: string;
  title: string;
  desc: string;
  image: string;
}

export interface DestinationPackage {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  description: string;
  originalPrice: number;
  price: number;
  nights: number;
  days: number;
  bestTime: string;
  currency: string;
  visa: string;
  heroImage: string;
  roadmap: RoadmapStop[];
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  region: 'Europe' | 'Asia Pacific' | 'Americas' | 'Africa' | 'Middle East';
  description: string;
  fullStory: string;
  imageUrl: string;
  heroBgUrl?: string;
  coordinates?: string;
  highlights: string[];
  bestTimeToVisit: string;
  avgCost: string;
  tag?: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  price: number;
  featured?: boolean;
  isNew?: boolean;
  category: 'Mountains & Lakes' | 'Coastal Escapes' | 'Cultural Immersions' | 'Wilderness Expeditions';
  priceTier: 'Premium ($$$)' | 'Luxury ($$$$)';
  imageUrl: string;
  overview: string;
  itinerary: { day: number; title: string; desc: string }[];
  inclusions: string[];
  groupSize: string;
  difficulty: string;
}

export interface VisaRequirement {
  id: string;
  country: string;
  region: 'Asia Pacific' | 'Europe (Schengen)' | 'North America' | 'South America' | 'Africa' | 'Middle East';
  badgeType: 'Visa Free' | 'ETA Required' | 'eVisa' | 'eVisa Starting 2025' | 'Visa Required';
  badgeColor: 'primary' | 'tertiary' | 'error' | 'secondary';
  passportType: string;
  maxStay: string;
  requirementSummary: string;
  fullRequirements: string[];
  processingTime: string;
  fee: string;
  documentsNeeded: string[];
  imageUrl: string;
  statusNotes?: string;
}

export interface InquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  destination: string;
  message: string;
}

export interface CustomPlanFormData {
  firstName: string;
  lastName: string;
  email: string;
  destination: string;
  travelers: string;
  date: string;
  message: string;
  travelStyle?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'error';
}
