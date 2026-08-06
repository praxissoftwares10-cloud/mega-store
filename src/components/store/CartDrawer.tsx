import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Store,
  Truck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { Order } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
    placeOrder,
    setActiveTab,
    storeInfo,
  } = useStore();

  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'M-Pesa Express' | 'Pay on Pickup'>('M-Pesa Express');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  if (!isCartOpen) return null;

  const subtotalKes = cart.reduce((sum, item) => {
    const upgradeCost = item.selectedUpgrade?.priceAdderKes || 0;
    return sum + (item.product.priceKes + upgradeCost) * item.quantity;
  }, 0);

  const deliveryFeeKes = deliveryMethod === 'delivery' ? 500 : 0;
  const totalKes = subtotalKes + deliveryFeeKes;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName || !customerPhone) {
      alert('Please fill in your name and phone number to complete the order.');
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      title: item.product.title,
      priceKes: item.product.priceKes + (item.selectedUpgrade?.priceAdderKes || 0),
      quantity: item.quantity,
      specsSummary: `${item.product.specs.processor} | ${item.product.specs.ram} | ${item.product.specs.storage}`,
      upgradeText: item.selectedUpgrade
        ? `${item.selectedUpgrade.ramUpgrade || ''} ${item.selectedUpgrade.ssdUpgrade || ''}`.trim()
        : undefined,
    }));

    const newOrder = await placeOrder({
      customerName,
      customerPhone,
      customerEmail,
      deliveryMethod,
      deliveryAddress,
      city: 'Nairobi',
      items: orderItems,
      totalKes,
      paymentMethod,
    });

    setIsSubmitting(false);

    if (newOrder) {
      setOrderSuccess(newOrder);
    }
  };

  const generateWhatsAppCheckout = () => {
    const itemsList = cart
      .map(
        (i) =>
          `• ${i.product.title} (x${i.quantity}) - KES ${(
            (i.product.priceKes + (i.selectedUpgrade?.priceAdderKes || 0)) *
            i.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const message = `Hi Megastore Computers, I would like to order:
${itemsList}

*Subtotal:* KES ${subtotalKes.toLocaleString()}
*Delivery Option:* ${
      deliveryMethod === 'pickup' ? 'Store Pickup at Old Nation House Shop A58' : `Express Delivery to ${deliveryAddress || 'Nairobi'}`
    }
*Customer Name:* ${customerName || 'Valued Customer'}
*Phone:* ${customerPhone || 'N/A'}

Is this ready for instant processing?`;

    window.open(`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#0B1B3D] text-white h-full flex flex-col shadow-2xl border-l border-slate-800">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#00E640]" />
            <h2 className="font-bold text-lg text-white">Your Tech Cart</h2>
            <span className="text-xs font-semibold bg-[#00E640]/20 text-[#00E640] px-2 py-0.5 rounded-full border border-[#00E640]/30">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
            </span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderSuccess(null);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {orderSuccess ? (
          <div className="p-6 text-center flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-[#00E640]/20 border-2 border-[#00E640] rounded-full flex items-center justify-center text-[#00E640]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Order Confirmed!</h3>
            <p className="text-sm text-slate-300">
              Order Number: <span className="font-mono text-[#00E640] font-bold">{orderSuccess.orderNumber}</span>
            </p>
            <p className="text-xs text-slate-400 max-w-sm">
              Thank you, <span className="text-white font-semibold">{orderSuccess.customerName}</span>. Your order has been recorded in our system. You can view real-time tracking in the Customer Portal.
            </p>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left w-full space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Amount:</span>
                <span className="font-bold text-[#00E640]">{formatPrice(orderSuccess.totalKes)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Fulfillment:</span>
                <span className="font-semibold text-white">
                  {orderSuccess.deliveryMethod === 'pickup' ? 'Store Pickup (Shop A58)' : 'Express Delivery'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">{orderSuccess.status}</span>
              </div>
            </div>

            <div className="w-full space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setOrderSuccess(null);
                  setActiveTab('user');
                }}
                className="w-full py-3 bg-[#00E640] text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Track Order in Customer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={generateWhatsAppCheckout}
                className="w-full py-2.5 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2 text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Shop Attendant via WhatsApp</span>
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Browse our business laptops, touchscreen PCs, and MacBooks to add items to your cart.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-5 py-2.5 bg-[#00E640] text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex gap-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg bg-slate-950 shrink-0 border border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-white truncate">{item.product.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {item.product.specs.processor} | {item.product.specs.ram}
                      </p>
                      {item.selectedUpgrade && (
                        <span className="inline-block mt-1 text-[10px] bg-[#00E640]/10 text-[#00E640] border border-[#00E640]/20 px-1.5 py-0.5 rounded font-semibold">
                          Upgrade: {item.selectedUpgrade.ramUpgrade || item.selectedUpgrade.ssdUpgrade} (+
                          {formatPrice(item.selectedUpgrade.priceAdderKes)})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-[#00E640]">
                        {formatPrice(
                          (item.product.priceKes + (item.selectedUpgrade?.priceAdderKes || 0)) *
                            item.quantity
                        )}
                      </span>
                      <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-white text-slate-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-white text-slate-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 mt-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00E640]" />
                <span>Customer Checkout Details</span>
              </h3>

              {/* Delivery Method Selector */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center space-y-1 transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#00E640] bg-[#00E640]/10 text-[#00E640] font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Store Pick-up</span>
                  <span className="text-[9px] text-slate-400 font-normal">Old Nation House A58</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center space-y-1 transition-all ${
                    deliveryMethod === 'delivery'
                      ? 'border-[#00E640] bg-[#00E640]/10 text-[#00E640] font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Express Delivery</span>
                  <span className="text-[9px] text-slate-400 font-normal">Nairobi (+KES 500)</span>
                </button>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brian Odhiambo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0712345678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
                    />
                  </div>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Delivery Address in Nairobi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Building, Street, Office / Floor"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00E640]"
                  >
                    <option value="M-Pesa Express">🟢 M-Pesa Express Prompt</option>
                    <option value="Pay on Pickup">🏪 Pay on Pickup at Shop A58</option>
                  </select>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="border-t border-slate-800 pt-3 space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotalKes)}</span>
                </div>
                {deliveryMethod === 'delivery' && (
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Fee:</span>
                    <span>{formatPrice(500)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-white pt-1">
                  <span>Total Payable:</span>
                  <span className="text-[#00E640]">{formatPrice(totalKes)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#00E640] text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-2 text-xs shadow-lg shadow-[#00E640]/20"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Place Order ({formatPrice(totalKes)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={generateWhatsAppCheckout}
                  className="w-full py-2.5 bg-emerald-800/80 border border-emerald-500/30 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quick WhatsApp Order Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
