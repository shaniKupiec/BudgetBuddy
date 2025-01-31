export class idb {
  constructor(dbName, storeName) {
    this.dbName = dbName; // The name of the IndexedDB database
    this.storeName = storeName; // The name of the object store inside the database
    this.db = null; // This will store the database connection
  }

  // Static method to create and open the database with a default store name "costs"
  static async openCostsDB(dbName, version = 1) {
    const instance = new idb(dbName, "costs"); // Create a new instance with "costs" as store name
    await instance.initDB(version); // Initialize the database
    return instance; // Return the instance with the open database
  }

  // Initialize the database
  async initDB(version = 1) {
    try {
      return await new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, version); // Open or create the database

        // This event triggers if a new database is created or a version upgrade happens
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          // Create the object store if it doesn't already exist
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
          }
        };

        // If the database opens successfully, store the instance
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };

        // Handle any errors during the database opening process
        request.onerror = (event) => {
          reject(new Error(`Failed to initialize the database: ${event.target.error}`));
        };
      });
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  // Helper function to get the object store in a specific mode (readonly or readwrite)
  _getStore(mode) {
    if (!this.db) throw new Error("Database is not initialized");
    const transaction = this.db.transaction(this.storeName, mode); // Create a transaction
    return transaction.objectStore(this.storeName); // Return the object store
  }

  // Add a new item to the database
  async addCost(costItem) { // costItem is without ID
    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readwrite"); // Open store in readwrite mode
        const request = store.add(costItem); // Try adding the item

        request.onsuccess = () => resolve(request.result); // Resolve with the new item
        request.onerror = (event) => reject(new Error(`Failed to add cost: ${event.target.error}`));
      });
    } catch (error) {
      console.error("Error adding cost:", error);
      throw error;
    }
  }

  // Retrieve all items from the database
  async getAllItems() {
    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readonly"); // Open store in readonly mode
        const request = store.getAll(); // Fetch all records

        request.onsuccess = () => resolve(request.result); // Resolve with all data
        request.onerror = (event) => reject(new Error(`Failed to get all items: ${event.target.error}`));
      });
    } catch (error) {
      console.error("Error fetching all items:", error);
      throw error;
    }
  }

  // Update an existing item in the database
  async editItem(updatedItem) {
    if (!updatedItem.id) {
      throw new Error("The updated item must include an 'id' field.");
    }

    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readwrite"); // Open store in readwrite mode
        const request = store.put(updatedItem); // Try updating the item

        request.onsuccess = () => resolve(updatedItem); // Resolve with updated data
        request.onerror = (event) => reject(new Error(`Failed to update item: ${event.target.error}`));
      });
    } catch (error) {
      console.error("Error editing item:", error);
      throw error;
    }
  }

  // Delete an item by ID
  async deleteItem(id) {
    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readwrite"); // Open store in readwrite mode
        const request = store.delete(id); // Try deleting the item

        request.onsuccess = () => resolve(`Item with ID ${id} deleted`);
        request.onerror = (event) => reject(new Error(`Failed to delete item with ID ${id}: ${event.target.error}`));
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }

  // Load multiple demo data items into the database
  async loadDemoData(items) {
    if (!Array.isArray(items)) {
      throw new Error("Input must be an array of items.");
    }

    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readwrite"); // Open store in readwrite mode

        // Process each demo item and insert it
        const promises = items.map((item) => {
          return new Promise((res, rej) => {
            const request = store.add(item);
            request.onsuccess = () => res(request.result);
            request.onerror = (event) => rej(new Error(`Failed to add demo item: ${event.target.error}`));
          });
        });

        Promise.all(promises).then(resolve).catch(reject);
      });
    } catch (error) {
      console.error("Error loading demo data:", error);
      throw error;
    }
  }

  // Close the database connection
  closeDB() {
    if (this.db) {
      this.db.close(); // Close the database connection
      this.db = null; // Reset the database instance
    } else {
      console.warn("No database connection to close.");
    }
  }
}
