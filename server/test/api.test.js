const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');  // Import the running server instance
const { expect } = chai;

chai.use(chaiHttp);

describe('Products API Integration Tests', () => {
  let productId;  // Store the MongoDB _id here for further tests

  // Test for GET /products (List all products)
  it('should list all products (GET /products)', (done) => {
    chai.request(server)
      .get('/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test for POST /products (Add a new product)
  it('should add a new product (POST /products)', (done) => {
    const newProduct = { id: 30, name: 'Monitor', description: '24 inch monitor', price: 199.99, units: 50 };
    chai.request(server)
      .post('/products')
      .send(newProduct)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name', 'Monitor');
        productId = res.body._id;  // Save product _id for further tests
        done();
      });
  });

  // Test for GET /products/:id (Fetch a single product by ID)
  it('should fetch a single product by ID (GET /products/:id)', (done) => {
    chai.request(server)
      .get(`/products/${productId}`)  // Use the MongoDB ObjectId
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name', 'Monitor');
        done();
      });
  });

  // Test for PUT /products/:id (Update an existing product)
  it('should update a product (PUT /products/:id)', (done) => {
    chai.request(server)
      .put(`/products/${productId}`)
      .send({ name: 'Monitor Updated', price: 220 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Product updated successfully');
        done();
      });
  });

  // Test for DELETE /products/:id (Delete a product)
  it('should delete a product (DELETE /products/:id)', (done) => {
    chai.request(server)
      .delete(`/products/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Product deleted successfully');
        done();
      });
  });
});
