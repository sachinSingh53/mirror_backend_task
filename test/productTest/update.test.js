const request = require('supertest');
const app = require('../../app'); // Update with the path to your app file
const Product = require('../../models/product');

// Mock data for testing
const mockProductId = 'mockProductId';
const mockProductUpdateData = {
  name: 'Updated Test Product',
  description: 'An updated test product',
  // ... other fields
};

jest.mock('../../models/product', () => ({
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

describe('Product API Tests', () => {
  it('should update an existing product', async () => {
    // Mock the findById method to return a predefined product
    Product.findById.mockResolvedValueOnce({ _id: mockProductId, ...mockProductUpdateData });

    const response = await request(app)
      .put(`/products/${mockProductId}`)
      .send(mockProductUpdateData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'successfully updated the product');
    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProductId,
      mockProductUpdateData,
      { new: true, runValidators: true }
    );
  });

  it('should return a 404 status for updating a non-existing product', async () => {
    // Mock the findById method to return null (no product found)
    Product.findById.mockResolvedValueOnce(null);

    const response = await request(app)
      .put('/products/nonExistingProductId')
      .send(mockProductUpdateData);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'product not found');
    expect(Product.findById).toHaveBeenCalledWith('nonExistingProductId');
  });

  it('should handle errors during product update', async () => {
    // Mock the findById method to return a predefined product
    Product.findById.mockResolvedValueOnce({ _id: mockProductId });

    // Mock the findByIdAndUpdate method to throw an error
    const errorMessage = 'Mock error during product update';
    Product.findByIdAndUpdate.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app)
      .put(`/products/${mockProductId}`)
      .send(mockProductUpdateData);

    expect(response.status).toBe(404); // Since findByIdAndUpdate throws an error
    expect(response.body).toHaveProperty('error', errorMessage);
    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProductId,
      mockProductUpdateData,
      { new: true, runValidators: true }
    );
  });
});
