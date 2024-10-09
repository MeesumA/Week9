const { MongoClient } = require('mongodb');

// MongoDB connection URL and client
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database and collection names
const dbName = 'mydb';
const collectionName = 'products';

// Connect to MongoDB and set up the collection
async function connectToDB() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB!');

    // Select the database and drop the collection if it exists
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop the collection to avoid duplication of data
    await db.collection(collectionName).drop().catch(err => {
      if (err.code === 26) {
        console.log("Collection doesn't exist, creating a new one.");
      } else {
        throw err;
      }
    });

    console.log(`Dropped collection: ${collectionName} (if existed)`);

    return collection; // Return the collection object to perform operations
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

// Import and run operations from the other JS files
async function performOperations() {
  try {
    const collection = await connectToDB();

    // Import and execute operations from other files
    await require('./add')(collection);     // Add products
    await require('./read')(collection);    // Read products
    await require('./update')(collection);  // Update products
    await require('./remove')(collection);  // Remove products

  } catch (err) {
    console.error('Error during operations:', err);
  } finally {
    await client.close(); // Close the MongoDB connection
  }
}

// Execute the operations
performOperations();
