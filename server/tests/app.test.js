const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
    // Task 5: Check health
    it('should return 200 and status ok', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });

    // Task 8: Check order creation
    it('should create a new order via POST /api/orders', async () => {
        const orderData = {
            customerName: 'Test User',
            address: '123 Test Street',
            petName: 'TestPet',
            totalAmount: 99.99
        };
        const res = await request(app)
            .post('/api/orders')
            .send(orderData);
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.customerName).toBe('Test User');
    });
});
