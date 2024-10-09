module.exports = async function readProducts(collection) {
    try {
      // Find and display all products
      const products = await collection.find().toArray();
      console.log('Products:', products);
    } catch (err) {
      console.error('Error in readProducts:', err);
    }
  };
  