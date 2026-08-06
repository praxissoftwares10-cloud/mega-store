import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Laptop,
  CheckCircle2,
  Gift,
  Search,
  Filter,
  MessageCircle,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  ChevronRight,
  HelpCircle,
  Video,
  Instagram,
  Sparkles,
  MapPin,
  Flame,
  ArrowRight,
  Cpu,
  HardDrive,
  Check,
  RotateCcw,
} from 'lucide-react';
import { ProductCategory, ProductCondition } from '../../types';

export const StoreFront: React.FC = () => {
  const {
    products,
    storeInfo,
    socialFeed,
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
    addToCart,
    toggleWishlist,
    wishlist,
    setSelectedProductModal,
    getWhatsAppInquiryUrl,
    setIsGuideOpen,
  } = useStore();

  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    // Condition match
    if (selectedCondition !== 'all' && p.condition !== selectedCondition) return false;
    // Brand match
    if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
    // RAM match
    if (selectedRam !== 'all' && !p.specs.ram.toLowerCase().includes(selectedRam.toLowerCase())) return false;
    // SSD match
    if (selectedSsd !== 'all' && !p.specs.storage.toLowerCase().includes(selectedSsd.toLowerCase())) return false;
    // Price match
    if (p.priceKes > priceRangeMaxKes) return false;

    // Search query match across title, brand, model, specs, badges
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchModel = p.model.toLowerCase().includes(q);
      const matchCpu = p.specs.processor.toLowerCase().includes(q);
      const matchRam = p.specs.ram.toLowerCase().includes(q);
      const matchSsd = p.specs.storage.toLowerCase().includes(q);
      const matchBadges = p.badges.some((b) => b.toLowerCase().includes(q));
      return matchTitle || matchBrand || matchModel || matchCpu || matchRam || matchSsd || matchBadges;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedBrand('all');
    setSelectedRam('all');
    setSelectedSsd('all');
    setPriceRangeMaxKes(150000);
    setSearchQuery('');
  };

  const categoriesList: { id: ProductCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Laptops & Gear', icon: '💻' },
    { id: 'business', label: 'Business & Executive', icon: '💼' },
    { id: 'convertible', label: '360° Touchscreen PCs', icon: '🔄' },
    { id: 'macbook', label: 'MacBooks & Apple', icon: '🍏' },
    { id: 'storage', label: 'Storage & Upgrades', icon: '⚡' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-[#0B1B3D] border border-slate-800 shadow-2xl">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
          <img
            src="/src/assets/images/hero_banner_megastore_1785953300405.jpg"
            alt="Megastore Computers Showroom"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#00E640]/10 border border-[#00E640]/30 text-[#00E640] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nairobi's Premier Laptop & Tech Showroom</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            Your Trusted <span className="text-[#00E640]">Tech Partner</span> in Nairobi
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Specializing in high-performance <strong className="text-white">HP EliteBooks</strong>, <strong className="text-white">Lenovo ThinkPads</strong>, <strong className="text-white">Dell Latitudes</strong>, <strong className="text-white">Apple MacBooks</strong>, and 360° Convertible Touchscreen PCs. Tested & guaranteed with free accessories!
          </p>

          {/* Key Store Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium text-slate-200">
            <span className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-[#00E640]" />
              <span>Free Charger + Mouse + Laptop Bag</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4 text-[#00E640]" />
              <span>Old Nation House, Shop A58</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Sparkles className="w-4 h-4 text-[#00E640]" />
              <span>Instant WhatsApp Inquiry</span>
            </span>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(
                'Hi Megastore Computers, I am looking for a reliable laptop. Please send me your current stock list.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#00E640] text-slate-950 font-black rounded-xl hover:bg-emerald-400 transition-all flex items-center space-x-2 text-sm shadow-lg shadow-[#00E640]/20"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp ({storeInfo.phonePrimary})</span>
            </a>

            <button
              onClick={() => setIsGuideOpen(true)}
              className="px-5 py-3 bg-slate-900/90 border border-slate-700 text-white font-bold rounded-xl hover:border-[#00E640] transition-colors flex items-center space-x-2 text-sm"
            >
              <HelpCircle className="w-4 h-4 text-[#00E640]" />
              <span>HDD vs SSD Buyer's Guide</span>
            </button>
          </div>
        </div>
      </section>

      {/* Freebies Banner Promo Bar */}
      <section className="bg-gradient-to-r from-emerald-950 via-[#0B1B3D] to-slate-900 border border-[#00E640]/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-12 h-12 bg-[#00E640]/20 border border-[#00E640] rounded-2xl flex items-center justify-center text-[#00E640] shrink-0">
            <Gift className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#00E640] bg-[#00E640]/10 px-2 py-0.5 rounded">
              Standard Store Benefit
            </span>
            <h3 className="text-base font-black text-white mt-0.5">
              Free Accessories Included with Every Executive Laptop!
            </h3>
            <p className="text-xs text-slate-300">
              Includes Wireless Mouse + Original High-Speed Charger + Heavy-Duty Laptop Bag at no extra cost.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCategory('business');
            const el = document.getElementById('product-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-[#00E640] text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors shrink-0"
        >
          View Eligible Laptops
        </button>
      </section>

      {/* Product Catalog Section */}
      <section id="product-catalog" className="space-y-6">
        {/* Category Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#00E640] text-slate-950 shadow-md shadow-[#00E640]/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden px-3 py-1.5 bg-slate-900 border border-slate-700 text-xs font-bold text-white rounded-lg flex items-center space-x-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#00E640]" />
            <span>Filter Catalog</span>
          </button>
        </div>

        {/* Filters & Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters (Desktop & Mobile Dropdown) */}
          <aside
            className={`space-y-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl lg:block ${
              showFiltersMobile ? 'block' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-xs text-white uppercase tracking-wider flex items-center space-x-1.5">
                <Filter className="w-4 h-4 text-[#00E640]" />
                <span>Instant Spec Filter</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] text-slate-400 hover:text-[#00E640] flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Brand Filter */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-slate-400 block">Brand / Manufacturer</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
              >
                <option value="all">All Brands (HP, Lenovo, Dell, Apple)</option>
                <option value="HP">HP (EliteBook / Envy)</option>
                <option value="Lenovo">Lenovo (ThinkPad)</option>
                <option value="Dell">Dell (Latitude)</option>
                <option value="Apple">Apple (MacBook Air / Pro)</option>
                <option value="Samsung">Samsung (SSDs)</option>
                <option value="Crucial">Crucial (RAM)</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-slate-400 block">Device Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
              >
                <option value="all">All Conditions</option>
                <option value="Refurbished - Grade A">Refurbished - Grade A (Like New)</option>
                <option value="Certified Pre-Owned">Certified Pre-Owned (Apple)</option>
                <option value="Brand New">Brand New (Sealed)</option>
              </select>
            </div>

            {/* RAM Filter */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-slate-400 block">Memory (RAM)</label>
              <select
                value={selectedRam}
                onChange={(e) => setSelectedRam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
              >
                <option value="all">Any RAM Size</option>
                <option value="8GB">8GB RAM</option>
                <option value="16GB">16GB RAM</option>
                <option value="32GB">32GB RAM</option>
              </select>
            </div>

            {/* SSD Storage Filter */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-slate-400 block">Storage (SSD)</label>
              <select
                value={selectedSsd}
                onChange={(e) => setSelectedSsd(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
              >
                <option value="all">Any Storage Capacity</option>
                <option value="256GB">256GB SSD</option>
                <option value="512GB">512GB SSD</option>
                <option value="1TB">1TB SSD</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Max Price:</span>
                <span className="text-[#00E640]">{formatPrice(priceRangeMaxKes)}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={150000}
                step={5000}
                value={priceRangeMaxKes}
                onChange={(e) => setPriceRangeMaxKes(Number(e.target.value))}
                className="w-full accent-[#00E640] cursor-pointer"
              />
            </div>

            {/* Location & Pickup Info Card */}
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-2 mt-4">
              <div className="flex items-center space-x-1.5 text-[#00E640] font-bold">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Visit Our Shop Today</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Tom Mboya Street, Old Nation House (Opposite Fire Station), 1st Floor, Wing A, Shop A58, Nairobi.
              </p>
            </div>
          </aside>

          {/* Main Product Cards Grid */}
          <main className="lg:col-span-3 space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-4 py-2.5 rounded-xl">
              <span>
                Showing <strong className="text-white">{filteredProducts.length}</strong> available devices
              </span>
              {searchQuery && (
                <span>
                  Filtering by: "<strong className="text-[#00E640]">{searchQuery}</strong>"
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <Laptop className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Laptops Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  We couldn't find any devices matching your search criteria. Try clearing some filters or searching for another model.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#00E640] text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((p) => {
                  const isWishlisted = wishlist.includes(p.id);

                  return (
                    <div
                      key={p.id}
                      className="bg-[#0B1B3D] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#00E640]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00E640]/5 flex flex-col justify-between group relative"
                    >
                      {/* Product Image & Badges Overlay */}
                      <div className="relative bg-slate-950 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 max-w-[85%]">
                          <span className="bg-slate-950/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md border border-slate-700 shadow">
                            {p.condition}
                          </span>
                          {p.badges.slice(0, 2).map((badge, idx) => (
                            <span
                              key={idx}
                              className="bg-[#00E640] text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md shadow"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Wishlist Toggle Button */}
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-full border transition-colors ${
                            isWishlisted
                              ? 'bg-rose-500 text-white border-rose-400'
                              : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                          title="Save to wishlist"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      {/* Product Info Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span className="font-bold text-[#00E640] uppercase">{p.brand}</span>
                            <span className="text-emerald-400 font-semibold">{p.stock} in stock</span>
                          </div>

                          <h3
                            onClick={() => setSelectedProductModal(p)}
                            className="text-sm font-extrabold text-white group-hover:text-[#00E640] transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {p.title}
                          </h3>

                          {/* Quick Spec Tags */}
                          <div className="mt-2.5 space-y-1 text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                            <div className="flex items-center space-x-1.5 truncate">
                              <Cpu className="w-3.5 h-3.5 text-[#00E640] shrink-0" />
                              <span className="truncate">{p.specs.processor}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 truncate">
                              <HardDrive className="w-3.5 h-3.5 text-[#00E640] shrink-0" />
                              <span>
                                {p.specs.ram} | {p.specs.storage}
                              </span>
                            </div>
                          </div>

                          {/* Freebies included preview */}
                          {p.freebies && p.freebies.length > 0 && (
                            <div className="mt-2 text-[10px] text-[#00E640] font-semibold flex items-center space-x-1">
                              <Gift className="w-3 h-3" />
                              <span className="truncate">Includes Free Wireless Mouse + Charger + Bag</span>
                            </div>
                          )}
                        </div>

                        {/* Price & Action Buttons */}
                        <div className="pt-2 border-t border-slate-800/80 space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-slate-400">Store Price:</span>
                            <span className="text-lg font-black text-[#00E640]">{formatPrice(p.priceKes)}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <button
                              onClick={() => setSelectedProductModal(p)}
                              className="py-2 bg-slate-900 border border-slate-700 text-white font-bold rounded-xl hover:border-[#00E640] transition-colors text-[11px]"
                            >
                              Spec Sheet
                            </button>

                            <button
                              onClick={() => addToCart(p)}
                              className="py-2 bg-[#00E640] text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-1 text-[11px]"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>

                          <a
                            href={getWhatsAppInquiryUrl(
                              p.title,
                              p.priceKes,
                              `${p.specs.processor}, ${p.specs.ram}, ${p.specs.storage}`
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-2 bg-emerald-800/90 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1.5 text-[11px]"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>Instant WhatsApp Buy</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Social Feed Video Showcase Section */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold text-[#00E640] uppercase tracking-wider bg-[#00E640]/10 px-2 py-0.5 rounded">
              Social Media Showcase
            </span>
            <h3 className="text-lg font-extrabold text-white mt-1">
              Watch Laptop Unboxings & Specs on TikTok & Instagram
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <a
              href={`https://tiktok.com/${storeInfo.tiktokHandle}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white hover:text-[#00E640] font-bold flex items-center space-x-1"
            >
              <Video className="w-3.5 h-3.5 text-[#00E640]" />
              <span>TikTok {storeInfo.tiktokHandle}</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialFeed.map((post) => (
            <div
              key={post.id}
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group hover:border-[#00E640]/50 transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-2 left-2 bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800 flex items-center space-x-1">
                  {post.platform === 'tiktok' ? (
                    <Video className="w-3 h-3 text-[#00E640]" />
                  ) : (
                    <Instagram className="w-3 h-3 text-pink-400" />
                  )}
                  <span>{post.author}</span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-slate-300 font-semibold">
                  <span>👀 {post.views} Views</span>
                  <span>❤️ {post.likes} Likes</span>
                </div>
              </div>

              <div className="p-3 space-y-2">
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">{post.title}</h4>
                {post.productLinkTitle && (
                  <button
                    onClick={() => {
                      setSearchQuery(post.productLinkTitle || '');
                      const el = document.getElementById('product-catalog');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[11px] text-[#00E640] font-semibold hover:underline flex items-center space-x-1"
                  >
                    <span>View Model: {post.productLinkTitle}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
