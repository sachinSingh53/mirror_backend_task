const request = require('supertest');
const Product = require('../../models/product');
const app = require('../../app');


describe('Product API Tests', () => {
    it('should search for products', async () => {
        const searchTerm = 'test1';
      
        const response = await request(app)
          .get('/products/search')
          .send({ searchTerm }); // Sending the search term in the request body
      
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('products');
      });
});