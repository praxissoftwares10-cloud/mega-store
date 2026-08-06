export type ProductCategory = 'business' | 'convertible' | 'macbook' | 'storage' | 'accessories';

export type ProductCondition = 'Brand New' | 'Refurbished - Grade A' | 'Certified Pre-Owned';

export interface ProductSpecs {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  battery: string;
  graphics?: string;
  os?: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: ProductCategory;
  priceKes: number;
  priceUsd: number;
  specs: ProductSpecs;
  condition: ProductCondition;
  stock: number;
  image: string;
  badges: string[];
  freebies: string[];
  description: string;
  isFeatured?: boolean;
  inStock: boolean;
}

export interface CartUpgradeOption {
  ramUpgrade?: string;
  ssdUpgrade?: string;
  priceAdderKes: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUpgrade?: CartUpgradeOption;
}

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Ready for Pick-up at Old Nation House'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  priceKes: number;
  quantity: number;
  specsSummary: string;
  upgradeText?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  city: string;
  items: OrderItem[];
  totalKes: number;
  totalUsd: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: 'M-Pesa Express' | 'Pay on Pickup' | 'Credit / Debit Card';
  paymentStatus: 'Paid' | 'Pending' | 'Pay on Delivery/Pickup';
  trackingStep: number; // 1: Order Placed, 2: Processing, 3: Packed / Ready, 4: Out for Delivery / In Shop, 5: Completed
  notes?: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  locationAddress: string;
  building: string;
  shopNumber: string;
  cityCountry: string;
  tiktokHandle: string;
  instagramHandle: string;
  operatingHours: string;
  currentPromoBanner: string;
  hddVsSsdGuide: string;
}

export type Currency = 'KES' | 'USD';

export interface SocialFeedPost {
  id: string;
  platform: 'tiktok' | 'instagram';
  title: string;
  author: string;
  views: string;
  likes: string;
  videoUrl?: string;
  thumbnail: string;
  productLinkTitle?: string;
}
