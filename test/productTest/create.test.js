// product.test.js
const request = require('supertest');
const Product = require('../../models/product');
const app = require('../../app'); // Update with the path to your app file

describe('Product API Tests', () => {
    // Mock data for testing
    const mockProduct = {
        _id: '65bc8fc9958633c81a6eae89',
        name: 'moto gb',
        description: 'smartPhone',
        // ... other fields
    };
  
    jest.mock('../../models/product', () => ({
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
    }));

  

  it('should create a new product', async () => {
    const product = {
      name:"test1",
      description:"very nice",
      price:300
    };

    const response = await request(app)
      .post('/products')
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'successfully created new product');
  });
  
});
