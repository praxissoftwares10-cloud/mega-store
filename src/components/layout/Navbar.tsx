import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Phone,
  MapPin,
  Clock,
  Laptop,
  UserCheck,
  ShieldCheck,
  Settings,
  X,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    storeInfo,
    cart,
    wishlist,
    activeTab,
    setActiveTab,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsGuideOpen,
    selectedCategory,
    setSelectedCategory,
  } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1B3D] text-white shadow-xl border-b border-slate-800">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#00E640] via-emerald-400 to-[#00E640] text-slate-950 px-4 py-1.5 text-xs md:text-sm font-semibold flex items-center justify-between shadow-inner">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-slate-950 text-[#00E640] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
            Promo
          </span>
          <span className="truncate">{storeInfo.currentPromoBanner}</span>
        </div>
        <div className="hidden lg:flex items-center space-x-4 text-xs font-bold text-slate-900 shrink-0">
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Mon-Sat: 8am-7pm</span>
          </span>
          <span>|</span>
          <a
            href={`https://wa.me/${storeInfo.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center space-x-1 text-slate-950"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp: {storeInfo.phonePrimary}</span>
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab('store');
              setSelectedCategory('all');
            }}
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            {/* Custom Stylized M Logo */}
            <div className="relative w-11 h-11 bg-gradient-to-br from-slate-900 to-[#0B1B3D] border-2 border-[#00E640] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-[#00E640] font-black text-2xl tracking-tighter">M</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00E640] rounded-full flex items-center justify-center">
                <span className="text-[9px] font-extrabold text-slate-950">▲</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-[#00E640] transition-colors">
                  MEGASTORE
                </h1>
                <span className="text-xs font-bold text-[#00E640] bg-[#00E640]/10 border border-[#00E640]/30 px-1.5 py-0.5 rounded">
                  COMPUTERS
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide flex items-center space-x-1">
                <span>{storeInfo.tagline}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Nairobi, Kenya</span>
              </p>
            </div>
          </button>

          {/* Mobile Cart & Wishlist Triggers */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-[#00E640] text-slate-950 font-bold flex items-center space-x-1"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="bg-slate-950 text-[#00E640] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="w-full md:max-w-md relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search EliteBook, ThinkPad, MacBook, 16GB RAM, 1TB SSD..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'store') setActiveTab('store');
              }}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00E640] focus:ring-1 focus:ring-[#00E640] transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls & Navigation Switcher */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1 text-xs font-bold">
            <button
              onClick={() => setCurrency('KES')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currency === 'KES'
                  ? 'bg-[#00E640] text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              KES
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currency === 'USD'
                  ? 'bg-[#00E640] text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5 text-rose-400" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B1B3D]">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E640] to-emerald-400 text-slate-950 font-bold hover:shadow-lg hover:shadow-[#00E640]/20 transition-all text-sm"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="bg-slate-950 text-[#00E640] text-xs font-black px-2 py-0.5 rounded-full">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Portal Tabs Bar & Quick Categories */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm font-medium">
          {/* Main Portal View Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'store'
                  ? 'bg-[#0B1B3D] text-[#00E640] border border-[#00E640]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </button>
            <button
              onClick={() => setActiveTab('user')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'user'
                  ? 'bg-[#0B1B3D] text-[#00E640] border border-[#00E640]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#0B1B3D] text-[#00E640] border border-[#00E640]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Quick Shortcuts & Location Pill */}
          <div className="hidden lg:flex items-center space-x-4 text-xs text-slate-300">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center space-x-1 text-[#00E640] hover:underline font-semibold bg-[#00E640]/10 border border-[#00E640]/20 px-2.5 py-1 rounded-lg"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>HDD vs SSD Guide</span>
            </button>
            <div className="flex items-center space-x-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#00E640]" />
              <span>Old Nation House, Shop A58</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>0700556350</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
