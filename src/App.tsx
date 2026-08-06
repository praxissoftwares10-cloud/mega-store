import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StoreFront } from './components/store/StoreFront';
import { UserDashboard } from './components/user/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CartDrawer } from './components/store/CartDrawer';
import { WishlistDrawer } from './components/store/WishlistDrawer';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { HddVsSsdGuideModal } from './components/store/HddVsSsdGuideModal';

const MainAppContent: React.FC = () => {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#00E640] selection:text-slate-950">
      {/* Header & Navbar */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'store' && <StoreFront />}
        {activeTab === 'user' && <UserDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
      <HddVsSsdGuideModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
