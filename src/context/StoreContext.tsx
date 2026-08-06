import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, StoreInfo, CartItem, Currency, ProductCategory, ProductCondition, SocialFeedPost } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_STORE_INFO, INITIAL_SOCIAL_FEED } from '../data/mockData';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  storeInfo: StoreInfo;
  socialFeed: SocialFeedPost[];
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  activeTab: 'store' | 'user' | 'admin';
  setActiveTab: (tab: 'store' | 'user' | 'admin') => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  kesToUsdRate: number;
  formatPrice: (priceKes: number) => string;
  
  // Search & Filter State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  selectedCondition: ProductCondition | 'all';
  setSelectedCondition: (cond: ProductCondition | 'all') => void;
  selectedBrand: string;
  setSelectedBrand: (b: string) => void;
  selectedRam: string;
  setSelectedRam: (r: string) => void;
  selectedSsd: string;
  setSelectedSsd: (s: string) => void;
  priceRangeMaxKes: number;
  setPriceRangeMaxKes: (max: number) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isGuideOpen: boolean;
  setIsGuideOpen: (open: boolean) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (p: Product | null) => void;

  // Actions
  addToCart: (product: Product, quantity?: number, upgrade?: { ramUpgrade?: string; ssdUpgrade?: string; priceAdderKes: number }) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  
  // Order Actions
  placeOrder: (orderData: Partial<Order>) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingStep?: number) => Promise<void>;
  
  // Admin Actions
  addProduct: (product: Omit<Product, 'id' | 'inStock'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateStoreInfo: (info: Partial<StoreInfo>) => Promise<void>;

  // WhatsApp helper
  getWhatsAppInquiryUrl: (productTitle: string, priceKes: number, specsSummary?: string) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const KES_TO_USD_RATE = 130;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(INITIAL_STORE_INFO);
  const [socialFeed, setSocialFeed] = useState<SocialFeedPost[]>(INITIAL_SOCIAL_FEED);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('megastore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('megastore_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  const [activeTab, setActiveTab] = useState<'store' | 'user' | 'admin'>('store');
  const [currency, setCurrency] = useState<Currency>('KES');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<ProductCondition | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedRam, setSelectedRam] = useState('all');
  const [selectedSsd, setSelectedSsd] = useState('all');
  const [priceRangeMaxKes, setPriceRangeMaxKes] = useState(150000);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  // Fetch initial data from server if available
  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, ordRes, infoRes, feedRes] = await Promise.all([
          fetch('/api/products').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/orders').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/store-info').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/social-feed').then((r) => (r.ok ? r.json() : null)),
        ]);

        if (prodRes) setProducts(prodRes);
        if (ordRes) setOrders(ordRes);
        if (infoRes) setStoreInfo(infoRes);
        if (feedRes) setSocialFeed(feedRes);
      } catch (err) {
        console.warn('Using local fallback data:', err);
      }
    }
    fetchData();
  }, []);

  // Save cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('megastore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('megastore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const formatPrice = (priceKes: number) => {
    if (currency === 'USD') {
      const usd = Math.round(priceKes / KES_TO_USD_RATE);
      return `$${usd.toLocaleString()}`;
    }
    return `KES ${priceKes.toLocaleString()}`;
  };

  const getWhatsAppInquiryUrl = (productTitle: string, priceKes: number, specsSummary?: string) => {
    const text = `Hi Megastore Computers, I am interested in ordering:
*${productTitle}*
Price: KES ${priceKes.toLocaleString()}
${specsSummary ? `Specs: ${specsSummary}\n` : ''}Is this item currently available at Shop A58, Old Nation House?`;
    return `https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    upgrade?: { ramUpgrade?: string; ssdUpgrade?: string; priceAdderKes: number }
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (upgrade) updated[existingIndex].selectedUpgrade = upgrade;
        return updated;
      }
      return [...prev, { product, quantity, selectedUpgrade: upgrade }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const placeOrder = async (orderData: Partial<Order>): Promise<Order | null> => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        const createdOrder: Order = await res.json();
        setOrders((prev) => [createdOrder, ...prev]);
        clearCart();
        // Refresh products stock
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
          setProducts(await prodRes.json());
        }
        return createdOrder;
      }
    } catch (err) {
      console.error('Error placing order:', err);
    }
    // Fallback local placement
    const fallbackOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName || 'Valued Customer',
      customerPhone: orderData.customerPhone || 'N/A',
      customerEmail: orderData.customerEmail || '',
      deliveryMethod: orderData.deliveryMethod || 'pickup',
      deliveryAddress: orderData.deliveryAddress || '',
      city: orderData.city || 'Nairobi',
      items: orderData.items || [],
      totalKes: orderData.totalKes || 0,
      totalUsd: Math.round((orderData.totalKes || 0) / KES_TO_USD_RATE),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      paymentMethod: orderData.paymentMethod || 'M-Pesa Express',
      paymentStatus: 'Paid',
      trackingStep: 1,
      notes: orderData.notes || '',
    };
    setOrders((prev) => [fallbackOrder, ...prev]);
    clearCart();
    return fallbackOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status'], trackingStep?: number) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, trackingStep }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
        return;
      }
    } catch (err) {
      console.error('Error updating order:', err);
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, trackingStep: trackingStep || o.trackingStep } : o))
    );
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'inStock'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        const newP = await res.json();
        setProducts((prev) => [newP, ...prev]);
        return;
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
    const fallbackP: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      inStock: productData.stock > 0,
    };
    setProducts((prev) => [fallbackP, ...prev]);
  };

  const updateProduct = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
        return;
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return;
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStoreInfo = async (info: Partial<StoreInfo>) => {
    try {
      const res = await fetch('/api/store-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setStoreInfo(await res.json());
        return;
      }
    } catch (err) {
      console.error('Error updating store info:', err);
    }
    setStoreInfo((prev) => ({ ...prev, ...info }));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        storeInfo,
        socialFeed,
        cart,
        wishlist,
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        kesToUsdRate: KES_TO_USD_RATE,
        formatPrice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        selectedBrand,
        setSelectedBrand,
        selectedRam,
        setSelectedRam,
        selectedSsd,
        setSelectedSsd,
        priceRangeMaxKes,
        setPriceRangeMaxKes,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isGuideOpen,
        setIsGuideOpen,
        selectedProductModal,
        setSelectedProductModal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStoreInfo,
        getWhatsAppInquiryUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
};
