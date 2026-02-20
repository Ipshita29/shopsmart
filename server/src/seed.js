const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding pet products...');

  // 1. Clear existing products (optional, but good for a fresh start)
  await prisma.product.deleteMany({});

  // 2. Add sample pet products
  const products = [
    {
      name: 'Premium Dog Food',
      description: 'High-protein grain-free formula for adult dogs.',
      price: 45.99,
      stock: 50,
    },
    {
      name: 'Luxury Cat Bed',
      description: 'Ultra-soft plush bed for ultimate cat comfort.',
      price: 29.99,
      stock: 20,
    },
    {
      name: 'Interactive Feather Wand',
      description: 'Fun toy to keep your kitten active and happy.',
      price: 12.50,
      stock: 100,
    },
    {
      name: 'Automatic Pet Water Fountain',
      description: 'Fresh filtered water for your pets 24/7.',
      price: 34.99,
      stock: 15,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
