import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Cpu,
  HardDrive,
  Monitor,
  BatteryCharging,
  ShieldCheck,
  Gift,
  MessageCircle,
  ShoppingBag,
  Check,
  Zap,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    formatPrice,
    addToCart,
    getWhatsAppInquiryUrl,
    toggleWishlist,
    wishlist,
  } = useStore();

  const [selectedRamUpgrade, setSelectedRamUpgrade] = useState<'none' | '16gb' | '32gb'>('none');
  const [selectedSsdUpgrade, setSelectedSsdUpgrade] = useState<'none' | '1tb'>('none');

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const isWishlisted = wishlist.includes(product.id);

  let upgradeAdder = 0;
  let upgradeRamText = '';
  let upgradeSsdText = '';

  if (selectedRamUpgrade === '32gb') {
    upgradeAdder += 5500;
    upgradeRamText = 'Upgrade to 32GB RAM (+KES 5,500)';
  }
  if (selectedSsdUpgrade === '1tb') {
    upgradeAdder += 6500;
    upgradeSsdText = 'Upgrade to 1TB NVMe SSD (+KES 6,500)';
  }

  const finalPriceKes = product.priceKes + upgradeAdder;

  const handleAddToCart = () => {
    addToCart(product, 1, {
      ramUpgrade: upgradeRamText || undefined,
      ssdUpgrade: upgradeSsdText || undefined,
      priceAdderKes: upgradeAdder,
    });
    setSelectedProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#0B1B3D] border border-slate-800 text-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8">
        {/* Modal Close */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-900/80 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image & Badges */}
          <div className="bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded-xl border border-slate-800 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  {product.condition}
                </span>
                {product.badges.map((b, i) => (
                  <span
                    key={i}
                    className="bg-[#00E640] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Freebies Included Highlight */}
            {product.freebies && product.freebies.length > 0 && (
              <div className="mt-4 bg-[#00E640]/10 border border-[#00E640]/30 p-3 rounded-xl">
                <div className="flex items-center space-x-1.5 text-[#00E640] font-bold text-xs mb-1.5">
                  <Gift className="w-4 h-4" />
                  <span>Free Included Accessories:</span>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-300 font-medium">
                  {product.freebies.map((f, i) => (
                    <span key={i} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md flex items-center space-x-1">
                      <Check className="w-3 h-3 text-[#00E640]" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details & Specs Sheet */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-bold text-[#00E640] uppercase tracking-wider">{product.brand}</span>
                <span className="text-slate-400 font-mono">Stock: {product.stock} units at Shop A58</span>
              </div>
              <h2 className="text-xl font-extrabold text-white leading-tight mb-2">{product.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{product.description}</p>

              {/* Price Tag */}
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400 block">Total Price:</span>
                  <span className="text-2xl font-black text-[#00E640]">{formatPrice(finalPriceKes)}</span>
                </div>
                {upgradeAdder > 0 && (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-800">
                    Includes Upgrade (+{formatPrice(upgradeAdder)})
                  </span>
                )}
              </div>

              {/* Technical Spec Sheet Grid */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80 flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-[#00E640] shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[9px]">Processor</span>
                      <span className="font-semibold text-white truncate block">{product.specs.processor}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80 flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-[#00E640] shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[9px]">Memory (RAM)</span>
                      <span className="font-semibold text-white truncate block">{product.specs.ram}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80 flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-[#00E640] shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[9px]">Storage (SSD)</span>
                      <span className="font-semibold text-white truncate block">{product.specs.storage}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80 flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-[#00E640] shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[9px]">Display</span>
                      <span className="font-semibold text-white truncate block">{product.specs.display}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80 flex items-center space-x-2 col-span-2">
                    <BatteryCharging className="w-4 h-4 text-[#00E640] shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[9px]">Battery Health & Duration</span>
                      <span className="font-semibold text-white block">{product.specs.battery}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAM & SSD Upgrade Selector */}
              {product.category !== 'storage' && (
                <div className="mt-4 space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="font-bold text-slate-300 block text-[11px] mb-1">
                    ⚡ Instant Hardware Upgrades at Shop A58:
                  </span>
                  
                  {/* RAM Upgrade */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">RAM Upgrade:</span>
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        onClick={() => setSelectedRamUpgrade('none')}
                        className={`px-2 py-0.5 rounded border ${
                          selectedRamUpgrade === 'none'
                            ? 'border-[#00E640] bg-[#00E640]/20 text-[#00E640] font-bold'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRamUpgrade('32gb')}
                        className={`px-2 py-0.5 rounded border ${
                          selectedRamUpgrade === '32gb'
                            ? 'border-[#00E640] bg-[#00E640]/20 text-[#00E640] font-bold'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        32GB (+KES 5,500)
                      </button>
                    </div>
                  </div>

                  {/* SSD Upgrade */}
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400">SSD Storage Upgrade:</span>
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        onClick={() => setSelectedSsdUpgrade('none')}
                        className={`px-2 py-0.5 rounded border ${
                          selectedSsdUpgrade === 'none'
                            ? 'border-[#00E640] bg-[#00E640]/20 text-[#00E640] font-bold'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedSsdUpgrade('1tb')}
                        className={`px-2 py-0.5 rounded border ${
                          selectedSsdUpgrade === '1tb'
                            ? 'border-[#00E640] bg-[#00E640]/20 text-[#00E640] font-bold'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        1TB NVMe (+KES 6,500)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#00E640] text-slate-950 font-extrabold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-2 text-xs shadow-lg shadow-[#00E640]/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatPrice(finalPriceKes)})</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                  title="Save to Wishlist"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>

              <a
                href={getWhatsAppInquiryUrl(product.title, finalPriceKes, `${product.specs.processor}, ${product.specs.ram}, ${product.specs.storage}`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buy / Inquire via WhatsApp ({formatPrice(finalPriceKes)})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
