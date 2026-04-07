const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning existing data...');
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.vet.deleteMany({});
  await prisma.service.deleteMany({});

  console.log('🌱 Seeding ShopSmart (PetKit Now) data...');

  // 1. Categories
  const foodCat = await prisma.category.create({
    data: { name: 'Food', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400' },
  });
  const toysCat = await prisma.category.create({
    data: { name: 'Toys', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400' },
  });
  const hygieneCat = await prisma.category.create({
    data: { name: 'Hygiene', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400' },
  });
  const medCat = await prisma.category.create({
    data: { name: 'Medicine', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400' },
  });

  // 2. Products
  const products = [
    {
      name: 'Premium Dog Kibble',
      description: 'Grain-free, high protein chicken formula.',
      price: 45.99,
      stock: 50,
      categoryId: foodCat.id,
    },
    {
      name: 'Salmon Cat Treats',
      description: 'Freeze-dried wild salmon bites.',
      price: 12.50,
      stock: 100,
      categoryId: foodCat.id,
    },
    {
      name: 'Tough Chew Rope Toy',
      description: 'Durable cotton rope for heavy chewers.',
      price: 15.99,
      stock: 30,
      categoryId: toysCat.id,
    },
    {
      name: 'Laser Pointer Pro',
      description: 'Rechargeable LED laser for endless cat fun.',
      price: 19.99,
      stock: 25,
      categoryId: toysCat.id,
    },
    {
      name: 'Organic Pet Shampoo',
      description: 'Oatmeal and Aloe Vera for sensitive skin.',
      price: 24.50,
      stock: 40,
      categoryId: hygieneCat.id,
    },
    {
      name: 'Flea & Tick Prevention',
      description: 'Monthly topical treatment for large dogs.',
      price: 59.99,
      stock: 20,
      categoryId: medCat.id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  // 3. Vets
  const vets = [
    {
      name: 'Paws & Claws 24/7 Hospital',
      specialty: 'Emergency & Surgery',
      location: '123 Pet Lane, Riverside',
      phone: '+1-555-0101',
      distance: '1.2 km',
      isOpen: true,
    },
    {
      name: 'Happy Tails Clinic',
      specialty: 'General Wellness',
      location: '456 Furry Way, Downtown',
      phone: '+1-555-0202',
      distance: '3.5 km',
      isOpen: true,
    },
    {
      name: 'The Cat Doctor',
      specialty: 'Feline Specialist',
      location: '789 Meow St, Hillside',
      phone: '+1-555-0303',
      distance: '5.0 km',
      isOpen: false,
    },
  ];

  for (const vet of vets) {
    await prisma.vet.create({ data: vet });
  }

  // 4. Services
  const services = [
    {
      name: 'Full Home Grooming',
      description: 'Bath, haircut, nail trimming at your doorstep.',
      price: 80.0,
      icon: '✂️',
    },
    {
      name: 'Professional Training',
      description: 'Behavioral correction and basic obedience.',
      price: 120.0,
      icon: '🐕',
    },
    {
      name: 'Vaccination Camp',
      description: 'Core vaccines for puppies and kittens.',
      price: 45.0,
      icon: '💉',
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
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
