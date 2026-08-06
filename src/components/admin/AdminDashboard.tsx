import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Settings,
  TrendingUp,
  Package,
  ShoppingCart,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Printer,
  Phone,
  MessageCircle,
  Megaphone,
  Save,
  Laptop,
  Check,
  X,
  FileText,
} from 'lucide-react';
import { Product, Order, ProductCategory, ProductCondition } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    storeInfo,
    formatPrice,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStoreInfo,
  } = useStore();

  const [adminTab, setAdminTab] = useState<'analytics' | 'products' | 'orders' | 'content'>('analytics');
  
  // Analytics state
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  // Product CRUD Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Content Manager State
  const [promoBannerInput, setPromoBannerInput] = useState(storeInfo.currentPromoBanner);
  const [hoursInput, setHoursInput] = useState(storeInfo.operatingHours);

  // Fetch Analytics from server endpoint
  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          setAnalyticsData(await res.json());
        }
      } catch (err) {
        console.warn('Analytics API error:', err);
      }
    }
    loadAnalytics();
  }, [orders, products]);

  const totalRevenueKes = orders.reduce((sum, o) => sum + o.totalKes, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing');
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const handleOpenNewProductModal = () => {
    setEditingProduct({
      title: '',
      brand: 'HP',
      model: '',
      category: 'business',
      priceKes: 45000,
      priceUsd: 346,
      specs: {
        processor: 'Intel Core i5 11th Gen',
        ram: '16GB DDR4',
        storage: '512GB NVMe SSD',
        display: '14.0" FHD IPS',
        battery: 'Up to 8 Hours',
        graphics: 'Intel Iris Xe',
        os: 'Windows 11 Pro',
      },
      condition: 'Refurbished - Grade A',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      badges: ['Free Mouse Included', 'Hot Deal'],
      freebies: ['Free Wireless Mouse', 'Fast Charger', 'Laptop Bag'],
      description: 'High performance business laptop tested at Megastore Computers.',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title) return;

    if (editingProduct.id) {
      await updateProduct(editingProduct as Product);
    } else {
      await addProduct(editingProduct as Omit<Product, 'id' | 'inStock'>);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveContent = async () => {
    await updateStoreInfo({
      currentPromoBanner: promoBannerInput,
      operatingHours: hoursInput,
    });
    alert('Store announcement banner and operating hours updated!');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-[#0B1B3D] via-slate-900 to-[#0B1B3D] border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#00E640]/10 border border-[#00E640]/30 flex items-center justify-center text-[#00E640]">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Megastore Store Admin</h1>
            <p className="text-xs text-slate-400">
              Inventory CRUD, Sales Analytics & Order Pipeline Management
            </p>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-bold w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex-1 md:flex-none whitespace-nowrap ${
              adminTab === 'analytics' ? 'bg-[#00E640] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Analytics & Sales
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex-1 md:flex-none whitespace-nowrap ${
              adminTab === 'products' ? 'bg-[#00E640] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex-1 md:flex-none whitespace-nowrap ${
              adminTab === 'orders' ? 'bg-[#00E640] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Orders ({pendingOrders.length} Pending)
          </button>
          <button
            onClick={() => setAdminTab('content')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex-1 md:flex-none whitespace-nowrap ${
              adminTab === 'content' ? 'bg-[#00E640] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Banner & Content
          </button>
        </div>
      </div>

      {/* Analytics Tab */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Gross Sales</span>
                <TrendingUp className="w-4 h-4 text-[#00E640]" />
              </div>
              <div className="text-2xl font-black text-white">{formatPrice(totalRevenueKes)}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">From {orders.length} completed orders</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Pending Orders</span>
                <ShoppingCart className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white">{pendingOrders.length}</div>
              <span className="text-[10px] text-amber-400 font-semibold">Requires Shop Pickup / Shipping</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Low Stock Inventory</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-white">{lowStockProducts.length}</div>
              <span className="text-[10px] text-rose-400 font-semibold">Under 5 units at Shop A58</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Store Items</span>
                <Package className="w-4 h-4 text-[#00E640]" />
              </div>
              <div className="text-2xl font-black text-white">{products.length} Models</div>
              <span className="text-[10px] text-slate-400 font-semibold">EliteBook, ThinkPad, MacBook</span>
            </div>
          </div>

          {/* Top Selling Laptop Models & Low Stock Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Models Chart / Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
                🔥 Top Selling Laptop Models
              </h3>
              <div className="space-y-3">
                {analyticsData?.topModels ? (
                  analyticsData.topModels.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="font-bold text-white truncate max-w-[70%]">{item.name}</span>
                      <span className="bg-[#00E640]/20 text-[#00E640] font-black px-2.5 py-0.5 rounded-full border border-[#00E640]/30">
                        {item.count} Sold
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400 py-4 text-center">Loading sales analytics...</div>
                )}
              </div>
            </div>

            {/* Low Stock Inventory Alert Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>⚠️ Low Stock Alert (Shop A58)</span>
                <span className="text-xs font-normal text-rose-400">Stock ≤ 5</span>
              </h3>
              <div className="space-y-2">
                {lowStockProducts.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">All laptop models are sufficiently stocked.</p>
                ) : (
                  lowStockProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <div>
                        <span className="font-bold text-white block">{p.title}</span>
                        <span className="text-slate-400 text-[10px]">{p.specs.processor}</span>
                      </div>
                      <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded font-extrabold">
                        {p.stock} left
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Management (CRUD) Tab */}
      {adminTab === 'products' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
            <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Laptop className="w-5 h-5 text-[#00E640]" />
              <span>Product Inventory Catalog ({products.length})</span>
            </h2>
            <button
              onClick={handleOpenNewProductModal}
              className="px-4 py-2 bg-[#00E640] text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors flex items-center space-x-1.5 shadow-lg shadow-[#00E640]/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Laptop / Gear</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-950">
                  <th className="p-3">Device Details</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (KES)</th>
                  <th className="p-3">Stock at A58</th>
                  <th className="p-3">Badges</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-12 h-12 object-cover rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-white block">{p.title}</span>
                          <span className="text-[10px] text-slate-400">
                            {p.specs.processor} | {p.specs.ram} | {p.specs.storage}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-slate-300 uppercase text-[10px]">{p.category}</td>
                    <td className="p-3 font-bold text-[#00E640]">{formatPrice(p.priceKes)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          p.stock <= 5
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {p.badges.map((b, idx) => (
                          <span key={idx} className="bg-slate-950 border border-slate-800 text-[#00E640] px-1.5 py-0.5 rounded text-[9px] font-bold">
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${p.title}?`)) deleteProduct(p.id);
                          }}
                          className="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Management Pipeline Tab */}
      {adminTab === 'orders' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-[#00E640]" />
            <span>Customer Orders Pipeline ({orders.length})</span>
          </h2>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2 text-xs">
                  <div>
                    <span className="font-mono text-[#00E640] font-black text-sm">{order.orderNumber}</span>
                    <span className="text-slate-400 ml-2">
                      Customer: <strong className="text-white">{order.customerName}</strong> ({order.customerPhone})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Order['status'];
                        let step = 1;
                        if (newStatus === 'Processing') step = 2;
                        if (newStatus === 'Ready for Pick-up at Old Nation House') step = 3;
                        if (newStatus === 'Shipped') step = 4;
                        if (newStatus === 'Delivered') step = 5;
                        updateOrderStatus(order.id, newStatus, step);
                      }}
                      className="bg-slate-900 border border-slate-700 text-[#00E640] font-bold rounded-lg px-2 py-1 text-xs focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Ready for Pick-up at Old Nation House">Ready for Pick-up at Shop A58</option>
                      <option value="Shipped">Shipped / Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <a
                      href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(
                        order.customerName
                      )},%20update%20regarding%20your%20Order%20${order.orderNumber}%20at%20Megastore%20Computers.`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 text-xs font-bold flex items-center space-x-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  {order.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        • {i.title} (x{i.quantity})
                      </span>
                      <span className="font-bold text-white">{formatPrice(i.priceKes * i.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <span>
                    Fulfillment: <strong className="text-white">{order.deliveryMethod === 'pickup' ? 'Shop Pickup' : `Express: ${order.deliveryAddress}`}</strong>
                  </span>
                  <span className="font-black text-[#00E640] text-sm">Total: {formatPrice(order.totalKes)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Banner & Content Manager Tab */}
      {adminTab === 'content' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-4">
          <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-[#00E640]" />
            <span>Store Announcement Banner & Hours</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Top Announcement Banner Text</label>
              <input
                type="text"
                value={promoBannerInput}
                onChange={(e) => setPromoBannerInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00E640]"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Operating Hours</label>
              <input
                type="text"
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00E640]"
              />
            </div>

            <button
              onClick={handleSaveContent}
              className="px-5 py-2.5 bg-[#00E640] text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Announcements</span>
            </button>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#0B1B3D] border border-slate-800 text-white rounded-2xl w-full max-w-2xl p-6 relative my-8 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingProduct.id ? 'Edit Laptop / Device' : 'Add New Device to Catalog'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category *</label>
                  <select
                    value={editingProduct.category || 'business'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="business">Business & Executive</option>
                    <option value="convertible">360° Touchscreen</option>
                    <option value="macbook">MacBook & Apple</option>
                    <option value="storage">Storage & Upgrades</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Price (KES) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.priceKes || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        priceKes: Number(e.target.value),
                        priceUsd: Math.round(Number(e.target.value) / 130),
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Stock Level *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2 border-t border-slate-800 pt-2">
                <span className="font-bold text-slate-300 block">Spec Sheet Details:</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Processor (e.g. Core i5 11th Gen)"
                    value={editingProduct.specs?.processor || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        specs: { ...editingProduct.specs!, processor: e.target.value },
                      })
                    }
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                  <input
                    placeholder="RAM (e.g. 16GB DDR4)"
                    value={editingProduct.specs?.ram || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        specs: { ...editingProduct.specs!, ram: e.target.value },
                      })
                    }
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                  <input
                    placeholder="Storage (e.g. 512GB NVMe SSD)"
                    value={editingProduct.specs?.storage || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        specs: { ...editingProduct.specs!, storage: e.target.value },
                      })
                    }
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                  <input
                    placeholder="Display (e.g. 14.0 FHD IPS)"
                    value={editingProduct.specs?.display || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        specs: { ...editingProduct.specs!, display: e.target.value },
                      })
                    }
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#00E640] text-slate-950 font-bold rounded-xl">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
