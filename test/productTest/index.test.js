const request = require('supertest');
const Product = require('../../models/product');
const app = require('../../app');

describe('Product API Tests', () => {
    it('should get all products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('products');
      });
});