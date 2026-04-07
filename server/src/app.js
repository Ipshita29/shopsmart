const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. Categories
app.get('/api/categories', async (_req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// 2. Products (with Category Filter)
app.get('/api/products', async (req, res) => {
  try {
    const { categoryId } = req.query;
    const query = categoryId ? { where: { categoryId: parseInt(categoryId) } } : {};
    const products = await prisma.product.findMany({
      ...query,
      include: { category: true },
    });
    res.json(products);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 3. Vets (Emergency Services)
app.get('/api/vets', async (_req, res) => {
  try {
    const vets = await prisma.vet.findMany({
      orderBy: { distance: 'asc' },
    });
    res.json(vets);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch vet services' });
  }
});

// 4. Services (Grooming, Walking, etc.)
app.get('/api/services', async (_req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// 5. Orders
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, address, petName, totalAmount } = req.body;
    const newOrder = await prisma.order.create({
      data: { customerName, address, petName, totalAmount },
    });
    res.status(201).json(newOrder);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to process order' });
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PetKit Now API' });
});

module.exports = app;
