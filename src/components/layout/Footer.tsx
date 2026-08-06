import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Truck, Headphones, Award, Video, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const { storeInfo, setActiveTab, setSelectedCategory, setIsGuideOpen } = useStore();

  return (
    <footer className="bg-[#0B1B3D] text-slate-300 border-t border-slate-800">
      {/* Trust Badges Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-[#00E640]/10 border border-[#00E640]/30 flex items-center justify-center text-[#00E640]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Genuine Tested Laptops</h4>
              <p className="text-xs text-slate-400">100% Quality Inspected Units</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-[#00E640]/10 border border-[#00E640]/30 flex items-center justify-center text-[#00E640]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Pickup or Delivery</h4>
              <p className="text-xs text-slate-400">Old Nation House or Express Delivery</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-[#00E640]/10 border border-[#00E640]/30 flex items-center justify-center text-[#00E640]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Accessories</h4>
              <p className="text-xs text-slate-400">Mouse + Bag + Fast Charger Included</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-[#00E640]/10 border border-[#00E640]/30 flex items-center justify-center text-[#00E640]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant Support</h4>
              <p className="text-xs text-slate-400">WhatsApp & Phone Available Daily</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand & Mission */}
        <div>
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-900 to-[#0B1B3D] border border-[#00E640] rounded-xl flex items-center justify-center text-[#00E640] font-black text-xl">
              M
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              MEGASTORE <span className="text-[#00E640]">COMPUTERS</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Nairobi's most trusted dealer in high-performance executive laptops, MacBooks, 360° touchscreen PCs, and high-speed SSD/RAM upgrades. Visit our store at Old Nation House today!
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-medium">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{storeInfo.operatingHours}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Specialized Categories
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <button
                onClick={() => {
                  setActiveTab('store');
                  setSelectedCategory('business');
                }}
                className="hover:text-[#00E640] transition-colors"
              >
                Executive Laptops (HP EliteBook, ThinkPad, Dell Latitude)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('store');
                  setSelectedCategory('convertible');
                }}
                className="hover:text-[#00E640] transition-colors"
              >
                Convertible / 360° Touchscreen PCs
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('store');
                  setSelectedCategory('macbook');
                }}
                className="hover:text-[#00E640] transition-colors"
              >
                MacBooks & Apple Ecosystem (Air/Pro)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('store');
                  setSelectedCategory('storage');
                }}
                className="hover:text-[#00E640] transition-colors"
              >
                Storage & Upgrades (SSDs & RAM)
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsGuideOpen(true)}
                className="text-[#00E640] font-semibold hover:underline"
              >
                💡 HDD vs SSD Buying Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Physical Store Location */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Store Location
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-[#00E640] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Physical Store Address:</span>
                <span>{storeInfo.locationAddress}</span>
                <span className="block text-slate-400 mt-0.5">{storeInfo.building}, {storeInfo.shopNumber}</span>
              </div>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-[#00E640] shrink-0" />
              <div>
                <span className="font-semibold text-white">Call / WhatsApp: </span>
                <a href={`tel:${storeInfo.phonePrimary}`} className="text-[#00E640] hover:underline">
                  {storeInfo.phonePrimary}
                </a>{' '}
                / {storeInfo.phoneSecondary}
              </div>
            </li>
          </ul>
        </div>

        {/* Social Links & Payment */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Social Showcase
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            Watch our daily laptop unboxing videos and tech tips on TikTok & Instagram!
          </p>
          <div className="flex items-center space-x-3 mb-5">
            <a
              href={`https://tiktok.com/${storeInfo.tiktokHandle}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-white hover:border-[#00E640] transition-colors"
            >
              <Video className="w-4 h-4 text-[#00E640]" />
              <span>TikTok {storeInfo.tiktokHandle}</span>
            </a>
            <a
              href={`https://instagram.com/${storeInfo.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-white hover:border-[#00E640] transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Instagram</span>
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Accepted Payment Methods
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-200">
              <span className="px-2 py-1 bg-emerald-600/30 border border-emerald-500/40 rounded text-emerald-400">
                🟢 M-PESA Express
              </span>
              <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">
                🏪 Pay on Store Pickup
              </span>
              <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">
                💳 Visa / Mastercard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-slate-950 py-4 border-t border-slate-800 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Megastore Computers. All Rights Reserved.</span>
          <span className="text-slate-400">Tom Mboya Street, Old Nation House, Shop A58, Nairobi</span>
        </div>
      </div>
    </footer>
  );
};
