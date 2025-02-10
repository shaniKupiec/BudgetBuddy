class idb {
  // Constructor: Sets up the database with name, store name, and some basic data storage
  constructor(dbName, storeName) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.data = []; // This will store the items
    this.autoIncrementId = 1; // This keeps track of item IDs
  }

  // Open the database (static method so it can be accessed globally)
  static async openCostsDB(dbName, version = 1) {
    if (!window.mockIDB) {
      window.mockIDB = new idb(dbName, "costs"); // Store the instance globally
    }
    return window.mockIDB;
  }

  // Find an item's index in the data array by its ID
  _findIndexById(id) {
    return this.data.findIndex((item) => item.id === id);
  }

  // Add a new item to the database
  async addCost(newItem) {
    return new Promise((resolve, reject) => {
      try {
        const item = { ...newItem, id: this.autoIncrementId++ }; // Add unique ID
        this.data.push(item); // Save it to the array
        resolve(item.id); // Return the new item's ID
      } catch (error) {
        reject(new Error("Failed to add cost: " + error.message));
      }
    });
  }

  // Get all stored items
  async getAllItems() {
    return this.data;
  }

  // Edit an existing item
  async editItem(updatedItem) {
    return new Promise((resolve, reject) => {
      try {
        if (!updatedItem.id) throw new Error("The updated item must include an 'id' field.");
        // find the index and make sure the item exist
        const index = this._findIndexById(updatedItem.id);
        if (index === -1) throw new Error(`Item with ID ${updatedItem.id} not found.`);
        this.data[index] = updatedItem; // Update the item in the array
        resolve(updatedItem);
      } catch (error) {
        reject(new Error("Failed to update item: " + error.message));
      }
    });
  }

  // Delete an item from the database
  async deleteItem(id) {
    return new Promise((resolve, reject) => {
      try {
        // find the index and make sure the item exist
        const index = this._findIndexById(id);
        if (index === -1) throw new Error(`Item with ID ${id} not found.`);
        this.data.splice(index, 1); // Remove it from the array
        resolve(`Item with ID ${id} deleted`);
      } catch (error) {
        reject(new Error("Failed to delete item: " + error.message));
      }
    });
  }

  // Load multiple items at once
  async loadDemoData(items) {
    return new Promise((resolve, reject) => {
      try {
        if (!Array.isArray(items)) throw new Error("Input must be an array of items.");
        items.forEach((item) => this.addCost(item)); // Add each item
        resolve(`Demo data loaded successfully.`);
      } catch (error) {
        reject(new Error("Failed to load demo data: " + error.message));
      }
    });
  }

  // Close the database (reset all data)
  closeDB() {
    this.data = []; // Clear all stored items
    this.autoIncrementId = 1; // Reset ID counter
    window.mockIDB = null; // Remove the global instance
  }
}
