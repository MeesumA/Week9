module.exports = async function addProducts(collection) {
    try {
      // Sample products to insert
      const products = [
        { id: 1, name: 'Laptop', description: 'A powerful laptop', price: 999.99, units: 50 },
        { id: 2, name: 'Smartphone', description: 'A high-end smartphone', price: 599.99, units: 150 },
        { id: 3, name: 'Tablet', description: 'A lightweight tablet', price: 399.99, units: 80 },
      ];
  
      // Insert products into the collection
      const result = await collection.insertMany(products);
      console.log(`${result.insertedCount} products inserted.`);
    } catch (err) {
      console.error('Error in addProducts:', err);
    }
  };
  