import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  PackageCheck,
  Truck,
  MapPin,
  Clock,
  Download,
  Phone,
  User,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  MessageCircle,
  RotateCw,
} from 'lucide-react';
import { Order } from '../../types';

export const UserDashboard: React.FC = () => {
  const { orders, storeInfo, formatPrice, addToCart, products, setActiveTab, getWhatsAppInquiryUrl } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'orders' | 'profile'>('overview');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Customer profile state
  const [customerProfile, setCustomerProfile] = useState({
    name: 'Brian Odhiambo',
    phone: '+254 712 345 678',
    email: 'brian.odhiambo@gmail.com',
    address: 'Tom Mboya St / Upper Hill, Commercial Bank Building 4th Floor',
    preferredFulfillment: 'pickup',
  });

  const activeOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pastOrders = orders.filter((o) => o.status === 'Delivered' || o.status === 'Cancelled');

  const trackingStepsList = [
    'Order Placed',
    'Processing in Shop',
    'Ready for Pick-up / Packed',
    'Out for Express Delivery',
    'Order Completed',
  ];

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B1B3D] via-slate-900 to-[#0B1B3D] border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#00E640]/10 border border-[#00E640]/30 flex items-center justify-center text-[#00E640] font-black text-xl">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Customer Portal</h1>
            <p className="text-xs text-slate-400">
              Welcome back, <strong className="text-white">{customerProfile.name}</strong> • Track your order fulfillment at Old Nation House
            </p>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-bold w-full md:w-auto">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex-1 md:flex-none ${
              activeSubTab === 'overview'
                ? 'bg-[#00E640] text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex-1 md:flex-none ${
              activeSubTab === 'orders'
                ? 'bg-[#00E640] text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex-1 md:flex-none ${
              activeSubTab === 'profile'
                ? 'bg-[#00E640] text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Profile & Settings
          </button>
        </div>
      </div>

      {/* Overview Sub-Tab */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Active Orders Tracker Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Truck className="w-5 h-5 text-[#00E640]" />
                <span>Active Delivery & Store Pickup Tracking</span>
              </h2>
              <span className="text-xs text-slate-400">
                {activeOrders.length} Order{activeOrders.length === 1 ? '' : 's'} in Progress
              </span>
            </div>

            {activeOrders.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-white">No Pending Orders</h3>
                <p className="text-xs text-slate-400">
                  All your orders are completed or ready for pick-up at Shop A58, Old Nation House.
                </p>
                <button
                  onClick={() => setActiveTab('store')}
                  className="mt-2 px-4 py-2 bg-[#00E640] text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors"
                >
                  Order a Laptop
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {activeOrders.map((order) => (
                  <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 text-xs">
                      <div>
                        <span className="font-mono text-[#00E640] font-black text-sm">{order.orderNumber}</span>
                        <span className="text-slate-400 ml-2">
                          • {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full font-bold text-[11px]">
                          {order.status}
                        </span>
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="px-2.5 py-1 bg-slate-900 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-[11px] font-semibold flex items-center space-x-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white">{item.title}</span>
                            <span className="text-slate-400 text-[11px] block">{item.specsSummary}</span>
                            {item.upgradeText && (
                              <span className="text-[10px] text-[#00E640] font-semibold">{item.upgradeText}</span>
                            )}
                          </div>
                          <span className="font-bold text-white">{formatPrice(item.priceKes * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Step-by-Step Progress Pipeline */}
                    <div className="pt-3 border-t border-slate-800">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                        Fulfillment Progress Status:
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px]">
                        {trackingStepsList.map((stepLabel, idx) => {
                          const stepNum = idx + 1;
                          const isDone = order.trackingStep >= stepNum;
                          const isCurrent = order.trackingStep === stepNum;

                          return (
                            <div
                              key={idx}
                              className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                                isCurrent
                                  ? 'bg-[#00E640]/20 border-[#00E640] text-[#00E640] font-black shadow-lg shadow-[#00E640]/10'
                                  : isDone
                                  ? 'bg-slate-900 border-emerald-500/40 text-emerald-400 font-bold'
                                  : 'bg-slate-900/50 border-slate-800 text-slate-600'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                                  isDone ? 'bg-[#00E640] text-slate-950' : 'bg-slate-800 text-slate-500'
                                }`}
                              >
                                {isDone ? '✓' : stepNum}
                              </div>
                              <span>{stepLabel}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delivery / Store pickup instructions */}
                    <div className="bg-slate-900 p-3 rounded-lg text-xs flex items-center justify-between text-slate-300">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[#00E640]" />
                        <span>
                          {order.deliveryMethod === 'pickup'
                            ? 'Fulfillment Location: Old Nation House, 1st Floor, Wing A, Shop A58'
                            : `Express Delivery Address: ${order.deliveryAddress || 'Nairobi'}`}
                        </span>
                      </div>
                      <a
                        href={`https://wa.me/${storeInfo.whatsappNumber}?text=Hi%20Megastore%20Computers,%20inquiring%20about%20Order%20${order.orderNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00E640] font-bold hover:underline shrink-0"
                      >
                        Inquire via WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Saved Delivery Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#00E640]" />
                <span>Primary Pickup / Delivery Location</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {customerProfile.address}
              </p>
              <div className="text-[11px] text-slate-400 pt-1">
                Phone: <strong className="text-white">{customerProfile.phone}</strong>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#00E640]" />
                <span>Megastore Warranty & Free Accessories</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All laptops purchased include a 6-Month Megastore Shop Warranty plus free charger, wireless mouse, and protective bag.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* My Orders Sub-Tab */}
      {activeSubTab === 'orders' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <PackageCheck className="w-5 h-5 text-[#00E640]" />
            <span>Complete Order History</span>
          </h2>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2 text-xs">
                  <div>
                    <span className="font-mono text-[#00E640] font-black text-sm">{order.orderNumber}</span>
                    <span className="text-slate-400 ml-2">
                      • {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-slate-900 text-[#00E640] border border-slate-800 rounded-full font-bold text-[10px]">
                      {order.status}
                    </span>
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#00E640]" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <div>
                        <span className="font-bold text-white">{item.title}</span> (x{item.quantity})
                        <span className="text-slate-400 block text-[11px]">{item.specsSummary}</span>
                      </div>
                      <span className="font-bold text-white">{formatPrice(item.priceKes * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">
                    Payment: <strong className="text-white">{order.paymentMethod}</strong> ({order.paymentStatus})
                  </span>
                  <span className="text-sm font-black text-[#00E640]">
                    Total: {formatPrice(order.totalKes)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile & Settings Sub-Tab */}
      {activeSubTab === 'profile' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-4">
          <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <User className="w-5 h-5 text-[#00E640]" />
            <span>Manage Customer Profile</span>
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Profile preferences updated successfully.');
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={customerProfile.name}
                onChange={(e) => setCustomerProfile({ ...customerProfile, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00E640]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  value={customerProfile.phone}
                  onChange={(e) => setCustomerProfile({ ...customerProfile, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00E640]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={customerProfile.email}
                  onChange={(e) => setCustomerProfile({ ...customerProfile, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00E640]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Default Nairobi Delivery Address</label>
              <textarea
                rows={2}
                value={customerProfile.address}
                onChange={(e) => setCustomerProfile({ ...customerProfile, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00E640]"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#00E640] text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Official Tax Invoice Modal / Printable Sheet */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl p-8 relative my-8 shadow-2xl space-y-6 print:p-0 print:shadow-none">
            {/* Action Bar for Modal */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 print:hidden">
              <span className="font-bold text-xs uppercase text-slate-500">Official Store Tax Invoice</span>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrintInvoice}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5 text-[#00E640]" />
                  <span>Print Invoice</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Official Invoice Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
              <div>
                <h2 className="text-2xl font-black text-[#0B1B3D]">MEGASTORE COMPUTERS</h2>
                <p className="text-xs text-slate-600 font-semibold">{storeInfo.tagline}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {storeInfo.locationAddress}<br />
                  {storeInfo.building}, {storeInfo.shopNumber}, {storeInfo.cityCountry}<br />
                  Phone/WhatsApp: {storeInfo.phonePrimary} / {storeInfo.phoneSecondary}
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">
                  TAX INVOICE
                </span>
                <p className="text-xs font-mono font-bold text-slate-900">
                  INVOICE #: {selectedInvoiceOrder.orderNumber}
                </p>
                <p className="text-[11px] text-slate-500">
                  Date: {new Date(selectedInvoiceOrder.createdAt).toLocaleDateString('en-GB')}
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Billed To:</span>
                <span className="font-bold text-slate-900 block">{selectedInvoiceOrder.customerName}</span>
                <span className="text-slate-600 block">{selectedInvoiceOrder.customerPhone}</span>
                <span className="text-slate-600 block">{selectedInvoiceOrder.customerEmail}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Fulfillment Details:</span>
                <span className="font-semibold text-slate-900 block capitalize">
                  {selectedInvoiceOrder.deliveryMethod === 'pickup'
                    ? 'Store Pickup at Shop A58, Old Nation House'
                    : `Express Delivery: ${selectedInvoiceOrder.deliveryAddress}`}
                </span>
                <span className="text-emerald-700 font-bold block mt-1">
                  Payment: {selectedInvoiceOrder.paymentMethod} ({selectedInvoiceOrder.paymentStatus})
                </span>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-700 uppercase text-[10px]">
                  <th className="py-2">Item Description & Spec Sheet</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price (KES)</th>
                  <th className="py-2 text-right">Subtotal (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {selectedInvoiceOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 pr-2">
                      <span className="font-bold text-slate-900 block">{item.title}</span>
                      <span className="text-[11px] text-slate-500 block">{item.specsSummary}</span>
                      {item.upgradeText && (
                        <span className="text-[10px] text-emerald-600 font-semibold block">{item.upgradeText}</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center font-bold text-slate-800">{item.quantity}</td>
                    <td className="py-2.5 text-right font-mono text-slate-800">
                      KES {item.priceKes.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-900">
                      KES {(item.priceKes * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Summary */}
            <div className="flex justify-between items-center border-t-2 border-slate-900 pt-3">
              <div className="text-[10px] text-slate-500 max-w-xs">
                * All devices inspected and covered under Megastore Computers standard warranty terms.
              </div>
              <div className="text-right space-y-1">
                <div className="text-xs text-slate-600">Total Amount Payable:</div>
                <div className="text-xl font-black text-[#0B1B3D] font-mono">
                  KES {selectedInvoiceOrder.totalKes.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Stamp & Signature Footer */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
              <div>
                <p className="font-bold text-slate-800">Megastore Computers Official Stamp & Signature</p>
                <p>Tom Mboya Street, Old Nation House, Shop A58, Nairobi</p>
              </div>
              <div className="text-right font-mono">
                Generated via Megastore Web Portal
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
