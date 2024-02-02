const request = require('supertest');
const app = require('../../app'); 
const Product = require('../../models/product');

// Mock data for testing
const mockProductId = 'mockProductId';

jest.mock('../../models/product', () => ({
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe('Product API Tests', () => {
  it('should delete an existing product', async () => {
    // Mock the findById method to return a predefined product
    Product.findById.mockResolvedValueOnce({ _id: mockProductId });

    const response = await request(app).delete(`/products/${mockProductId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'successfully deleted the product');
    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
  });

  it('should return a 404 status for deleting a non-existing product', async () => {
    // Mock the findById method to return null (no product found)
    Product.findById.mockResolvedValueOnce(null);
  
    const response = await request(app).delete('/products/nonExistingProductId');
  
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'product not found');
    expect(Product.findById).toHaveBeenCalledWith('nonExistingProductId');
  
    
  });

  it('should handle errors during product deletion', async () => {
    // Mock the findById method to return a predefined product
    Product.findById.mockResolvedValueOnce({ _id: mockProductId });

    // Mock the findByIdAndDelete method to throw an error
    const errorMessage = 'Mock error during product deletion';
    Product.findByIdAndDelete.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app).delete(`/products/${mockProductId}`);

    expect(response.status).toBe(404); // Since findByIdAndDelete throws an error
    expect(response.body).toHaveProperty('error', errorMessage);
    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
  });
});
