import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_STORE_INFO, INITIAL_SOCIAL_FEED } from './src/data/mockData';
import { Product, Order, StoreInfo, SocialFeedPost } from './src/types';

const DATA_FILE = path.join(process.cwd(), 'data_store.json');

interface LocalStore {
  products: Product[];
  orders: Order[];
  storeInfo: StoreInfo;
  socialFeed: SocialFeedPost[];
}

// Load or initialize persistent data
function loadStore(): LocalStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error loading data_store.json:', err);
  }
  const initialData: LocalStore = {
    products: INITIAL_PRODUCTS,
    orders: INITIAL_ORDERS,
    storeInfo: INITIAL_STORE_INFO,
    socialFeed: INITIAL_SOCIAL_FEED,
  };
  saveStore(initialData);
  return initialData;
}

function saveStore(data: LocalStore) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving data_store.json:', err);
  }
}

let store = loadStore();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', store: store.storeInfo.name });
  });

  // Store Info
  app.get('/api/store-info', (_req, res) => {
    res.json(store.storeInfo);
  });

  app.put('/api/store-info', (req, res) => {
    store.storeInfo = { ...store.storeInfo, ...req.body };
    saveStore(store);
    res.json(store.storeInfo);
  });

  // Products CRUD
  app.get('/api/products', (_req, res) => {
    res.json(store.products);
  });

  app.get('/api/products/:id', (req, res) => {
    const p = store.products.find((prod) => prod.id === req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  });

  app.post('/api/products', (req, res) => {
    const newProduct: Product = {
      ...req.body,
      id: `prod-${Date.now()}`,
      inStock: req.body.stock > 0,
    };
    store.products.unshift(newProduct);
    saveStore(store);
    res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', (req, res) => {
    const idx = store.products.findIndex((p) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    const updated = {
      ...store.products[idx],
      ...req.body,
      inStock: (req.body.stock !== undefined ? req.body.stock : store.products[idx].stock) > 0,
    };
    store.products[idx] = updated;
    saveStore(store);
    res.json(updated);
  });

  app.delete('/api/products/:id', (req, res) => {
    store.products = store.products.filter((p) => p.id !== req.params.id);
    saveStore(store);
    res.json({ success: true, id: req.params.id });
  });

  // Orders API
  app.get('/api/orders', (_req, res) => {
    res.json(store.orders);
  });

  app.post('/api/orders', (req, res) => {
    const orderNum = `MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: req.body.customerName || 'Valued Customer',
      customerPhone: req.body.customerPhone || 'N/A',
      customerEmail: req.body.customerEmail || '',
      deliveryMethod: req.body.deliveryMethod || 'pickup',
      deliveryAddress: req.body.deliveryAddress || '',
      city: req.body.city || 'Nairobi',
      items: req.body.items || [],
      totalKes: req.body.totalKes || 0,
      totalUsd: req.body.totalUsd || 0,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      paymentMethod: req.body.paymentMethod || 'M-Pesa Express',
      paymentStatus: req.body.paymentMethod === 'M-Pesa Express' ? 'Paid' : 'Pending',
      trackingStep: 1,
      notes: req.body.notes || '',
    };

    // Deduct stock
    newOrder.items.forEach((item) => {
      const p = store.products.find((prod) => prod.id === item.productId);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
        p.inStock = p.stock > 0;
      }
    });

    store.orders.unshift(newOrder);
    saveStore(store);
    res.status(201).json(newOrder);
  });

  app.put('/api/orders/:id/status', (req, res) => {
    const order = store.orders.find((o) => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const { status, trackingStep } = req.body;
    if (status) order.status = status;
    if (trackingStep !== undefined) order.trackingStep = trackingStep;

    saveStore(store);
    res.json(order);
  });

  // Social Feed
  app.get('/api/social-feed', (_req, res) => {
    res.json(store.socialFeed);
  });

  // Analytics endpoint for Admin
  app.get('/api/analytics', (_req, res) => {
    const totalRevenueKes = store.orders.reduce((sum, o) => sum + o.totalKes, 0);
    const totalOrdersCount = store.orders.length;
    const pendingOrdersCount = store.orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;
    const lowStockProducts = store.products.filter((p) => p.stock <= 5);

    // Sales by model
    const modelSales: Record<string, number> = {};
    store.orders.forEach((o) => {
      o.items.forEach((item) => {
        modelSales[item.title] = (modelSales[item.title] || 0) + item.quantity;
      });
    });

    const topModels = Object.entries(modelSales)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    res.json({
      totalRevenueKes,
      totalOrdersCount,
      pendingOrdersCount,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      topModels,
    });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Megastore Computers server active at http://localhost:${PORT}`);
  });
}

startServer();
