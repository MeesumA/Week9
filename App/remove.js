module.exports = async function removeProduct(collection) {
    try {
      // Example: remove product with id 1
      const result = await collection.deleteOne({ id: 1 });
      console.log(`${result.deletedCount} document(s) was/were deleted.`);
    } catch (err) {
      console.error('Error in removeProduct:', err);
    }
  };
  