import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    getWhatsAppInquiryUrl,
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#0B1B3D] text-white h-full flex flex-col shadow-2xl border-l border-slate-800">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h2 className="font-bold text-lg text-white">Saved Devices & Gear</h2>
            <span className="text-xs font-semibold bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/30">
              {savedProducts.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {savedProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Click the heart icon on any laptop, MacBook, or RAM upgrade to save it for quick reference or WhatsApp inquiry.
            </p>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="px-5 py-2.5 bg-[#00E640] text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors"
            >
              Explore Laptops
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {savedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex gap-3 relative group"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-20 h-20 object-cover rounded-lg bg-slate-950 shrink-0 border border-slate-800"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {p.specs.processor} | {p.specs.ram} | {p.specs.storage}
                    </p>
                    <span className="text-xs font-bold text-[#00E640] block mt-1">
                      {formatPrice(p.priceKes)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => {
                        addToCart(p);
                        setIsWishlistOpen(false);
                      }}
                      className="flex-1 py-1.5 bg-[#00E640] text-slate-950 font-bold rounded-lg text-[11px] hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <a
                      href={getWhatsAppInquiryUrl(p.title, p.priceKes, `${p.specs.processor}, ${p.specs.ram}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-emerald-800/80 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      title="Quick WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
