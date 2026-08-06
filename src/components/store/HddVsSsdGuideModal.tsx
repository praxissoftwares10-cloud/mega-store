import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, HardDrive, Zap, CheckCircle2, ShieldAlert, Clock, ArrowRight } from 'lucide-react';

export const HddVsSsdGuideModal: React.FC = () => {
  const { isGuideOpen, setIsGuideOpen, storeInfo, setSelectedCategory, setActiveTab } = useStore();

  if (!isGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#0B1B3D] border border-slate-800 text-white rounded-2xl w-full max-w-2xl p-6 relative my-8 shadow-2xl">
        <button
          onClick={() => setIsGuideOpen(false)}
          className="absolute top-4 right-4 p-2 bg-slate-900 border border-slate-700 rounded-full text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-[#00E640]/10 border border-[#00E640]/30 rounded-xl flex items-center justify-center text-[#00E640]">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">HDD vs SSD Buyer's Guide</h2>
            <p className="text-xs text-[#00E640] font-semibold">
              Why an SSD is essential for your laptop performance
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6 bg-slate-900 p-3 rounded-xl border border-slate-800">
          At Megastore Computers, all our laptops come equipped or upgraded with high-speed SSD storage. Here is why upgrading from a traditional Mechanical HDD to an NVMe/SATA SSD will make your laptop up to 8x faster!
        </p>

        {/* Side-by-Side Comparison Table */}
        <div className="grid grid-cols-2 gap-3 text-xs mb-6">
          {/* HDD Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-bold border-b border-slate-800 pb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Traditional HDD</span>
            </div>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>Boot Time: 45–90 seconds</span>
              </li>
              <li>• Read Speed: ~100 MB/s (Slow)</li>
              <li>• Mechanical spinning disks prone to failure when bumped</li>
              <li>• Consumes 3x more battery power</li>
              <li>• Loud clicking and humming noises</li>
            </ul>
          </div>

          {/* SSD Box */}
          <div className="bg-slate-900 p-4 rounded-xl border border-[#00E640]/40 space-y-3 shadow-lg shadow-[#00E640]/10">
            <div className="flex items-center space-x-2 text-[#00E640] font-bold border-b border-slate-800 pb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>High-Speed SSD (NVMe / SATA)</span>
            </div>
            <ul className="space-y-2 text-[11px] text-slate-200">
              <li className="flex items-center space-x-1.5 text-[#00E640] font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Boot Time: 6–10 seconds!</span>
              </li>
              <li>• Read Speed: 550 MB/s to 3,500 MB/s (Blazing)</li>
              <li>• 100% Solid State with zero moving parts</li>
              <li>• Saves battery power for longer runtime</li>
              <li>• Silent, shock-resistant operation</li>
            </ul>
          </div>
        </div>

        {/* Free Fitting Banner */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 p-4 rounded-xl text-xs space-y-2 mb-6">
          <h4 className="font-bold text-white flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-[#00E640]" />
            <span>Free Installation & Windows Migration at Shop A58!</span>
          </h4>
          <p className="text-slate-300">
            Bring your laptop to Megastore Computers at Old Nation House (1st Floor, Wing A, Shop A58) and our technicians will clone your data and install a brand new Samsung or Crucial SSD in under 20 minutes.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              setIsGuideOpen(false);
              setActiveTab('store');
              setSelectedCategory('storage');
            }}
            className="w-full py-3 bg-[#00E640] text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-2 text-xs"
          >
            <span>Browse SSD & RAM Upgrades</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
