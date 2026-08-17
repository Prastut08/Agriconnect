export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'customer' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Farmer extends User {
  role: 'farmer';
  farmName: string;
  location: string;
  farmSize: number;
  crops: string[];
  experience: number;
  rating: number;
  totalSales: number;
  verified: boolean;
  bio?: string;
}

export interface Customer extends User {
  role: 'customer';
  location: string;
  preferences: string[];
  totalOrders: number;
  savedAmount: number;
}

export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  location: string;
  size: number;
  soilType: string;
  irrigationType: string;
  establishedYear: number;
}

export interface Field {
  id: string;
  farmId: string;
  name: string;
  area: number;
  soilType: string;
  currentCrop?: string;
  lastHarvest?: string;
  status: 'active' | 'fallow' | 'preparing';
}

export interface Crop {
  id: string;
  farmerId: string;
  name: string;
  fieldId: string;
  fieldName: string;
  area: number;
  plantedDate: string;
  expectedHarvestDate: string;
  growthStage: 'sowing' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest-ready';
  healthScore: number;
  expectedYield: number;
  expectedRevenue: number;
  image?: string;
  waterRequirement: string;
  fertilizerSchedule: string[];
  diseaseProbability: number;
  yieldRisk: number;
  status: 'growing' | 'harvested' | 'failed';
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  availableQuantity: number;
  availableDate: string;
  harvestDate: string;
  location: string;
  distance: number;
  farmingMethod: 'organic' | 'traditional' | 'hydroponic';
  freshness: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  status: 'active' | 'sold-out' | 'pending';
}

export interface Order {
  id: string;
  customerId: string;
  farmerId: string;
  customerName: string;
  farmerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'new' | 'accepted' | 'preparing' | 'ready' | 'out-for-delivery' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  deliveryAddress: string;
  pickupDate?: string;
  deliveryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

export interface Expense {
  id: string;
  farmerId: string;
  category: 'seeds' | 'fertilizers' | 'pesticides' | 'labour' | 'equipment' | 'irrigation' | 'transportation' | 'other';
  amount: number;
  description: string;
  date: string;
  cropId?: string;
}

export interface Income {
  id: string;
  farmerId: string;
  source: string;
  amount: number;
  date: string;
  cropId?: string;
  orderId?: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  currentPrice: number;
  unit: string;
  predictedPrice: number;
  recommendation: 'SELL NOW' | 'WAIT' | 'COMPARE';
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  mandiName: string;
  updatedAt: string;
}

export interface Weather {
  id: string;
  date: string;
  day: string;
  temperature: { min: number; max: number };
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  condition: string;
  icon: string;
  alert?: string;
}

export interface DiseaseAlert {
  id: string;
  crop: string;
  disease: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  region: string;
  recommendation: string;
  detectedAt: string;
  imageUrl?: string;
}

export interface AIRecommendation {
  id: string;
  type: string;
  title: string;
  recommendation: string;
  why: string;
  expectedImpact: string;
  confidence: number;
  sources: string[];
  createdAt: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  benefit: string;
  eligibility: string;
  documents: string[];
  deadline: string;
  applicationProcess: string[];
  category: string;
  amount?: string;
  link?: string;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  frequency: string;
  price: number;
  farmerId: string;
  farmerName: string;
  items: string[];
  nextDelivery: string;
  rating: number;
  subscribers: number;
  status: 'active' | 'paused';
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success' | 'warning';
  read: boolean;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  farmerId: string;
  farmerName: string;
  title: string;
  content: string;
  category: 'discussion' | 'question' | 'equipment-sharing' | 'labour' | 'bulk-buying' | 'announcement';
  likes: number;
  comments: number;
  timestamp: string;
  aiAnswer?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  unit: string;
  price: number;
  image?: string;
}
