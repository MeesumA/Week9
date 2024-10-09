module.exports = async function updateProduct(collection) {
    try {
      // Example: update product with id 2
      const filter = { id: 2 };
      const updateDoc = {
        $set: {
          price: 649.99,
          units: 120,
        },
      };
  
      const result = await collection.updateOne(filter, updateDoc);
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s).`);
    } catch (err) {
      console.error('Error in updateProduct:', err);
    }
  };
  