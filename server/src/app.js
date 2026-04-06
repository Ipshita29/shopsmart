const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// --- TASKS START ---

// 1. GET all products (Read) - Task 4
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 2. POST a new order (Create) - Task 8
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, address, petName, totalAmount } = req.body;
    
    // Create the order in the database
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        address,
        petName,
        totalAmount,
      },
    });
    
    console.log(`✅ Order received from ${customerName} for ${petName}`);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to process your order' });
  }
});

// --- TASKS END ---

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('ShopSmart Backend Service');
});

module.exports = app;
