export class MockIDB {
  // Constructor initializes the database with the name, store name, and basic properties
  constructor(dbName, storeName) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.data = [];
    this.autoIncrementId = 1;
  }

  // Initialize the mock database, returns the instance
  async initDB() {
    return Promise.resolve(this);
  }

  // Private method to find an item by its ID
  _findIndexById(id) {
    return this.data.findIndex((item) => item.id === id);
  }

  // Add a new item to the database and return the auto-generated ID
  async addItem(newItem) {
    return new Promise((resolve, reject) => {
      try {
        const item = { ...newItem, id: this.autoIncrementId++ };
        this.data.push(item);
        resolve(item.id);
      } catch (error) {
        reject(new Error("Failed to add item: " + error.message));
      }
    });
  }

  // Get all items from the database
  async getAllItems() {
    return this.data;
  }

  // Edit an existing item by ID
  async editItem(updatedItem) {
    return new Promise((resolve, reject) => {
      try {
        if (!updatedItem.id) throw new Error("The updated item must include an 'id' field.");
        this.data[index] = updatedItem;
        resolve(updatedItem);
      } catch (error) {
        reject(new Error("Failed to update item: " + error.message));
      }
    });
  }

  // Delete an item from the database by its ID
  async deleteItem(id) {
    return new Promise((resolve, reject) => {
      try {
        const index = this._findIndexById(id);
        if (index === -1) throw new Error(`Item with ID ${id} not found.`); 
        this.data.splice(index, 1);
        resolve(`Item with ID ${id} deleted`);
      } catch (error) {
        reject(new Error("Failed to delete item: " + error.message));
      }
    });
  }

  // Load demo data into the database
  async loadDemoData(items) {
    return new Promise((resolve, reject) => {
      try {
        if (!Array.isArray(items)) throw new Error("Input must be an array of items.");
        items.forEach((item) => this.addItem(item));
        resolve(`Demo data loaded successfully.`);
      } catch (error) {
        reject(new Error("Failed to load demo data: " + error.message));
      }
    });
  }

  // Close the database, resetting the data and ID counter
  closeDB() {
    this.data = [];
    this.autoIncrementId = 1;
  }
}
