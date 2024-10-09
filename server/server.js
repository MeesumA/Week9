const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mydb';
const collectionName = 'products';

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

// 1. Route to get all products (GET /products)
app.get('/products', async (req, res) => {
  try {
    const collection = await connectToDB();
    const products = await collection.find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 2. Route to add a new product (POST /products)
app.post('/products', async (req, res) => {
  const { id, name, description, price, units } = req.body;

  try {
    const collection = await connectToDB();
    
    // Check if a product with the same id already exists
    const existingProduct = await collection.findOne({ id: id });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this ID already exists.' });
    }

    const newProduct = { id, name, description, price, units };
    await collection.insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// 3. Route to delete a product (DELETE /products/:id)
app.delete('/products/:id', async (req, res) => {
  try {
    const collection = await connectToDB();
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// 4. Route to update a product (PUT /products/:id)
app.put('/products/:id', async (req, res) => {
  const { name, description, price, units } = req.body;

  try {
    const collection = await connectToDB();
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, description, price, units } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await collection.findOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
