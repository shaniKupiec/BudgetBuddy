export class IDB {
  constructor(dbName, storeName) {
    this.dbName = dbName; // Name of the database
    this.storeName = storeName; // Name of the object store
    this.db = null; // Database instance
  }

  // Initialize the database
  async initDB(version = 1) {
    try {
      return await new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, version);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          // Create the object store if it doesn't exist
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          this.db = event.target.result; // Save the database instance
          resolve(this.db);
        };

        request.onerror = (event) => {
          reject(new Error(`Failed to initialize the database: ${event.target.error}`));
        };
      });
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  // Get the object store in the specified mode
  _getStore(mode) {
    if (!this.db) throw new Error("Database is not initialized");
    const transaction = this.db.transaction(this.storeName, mode);
    return transaction.objectStore(this.storeName);
  }

  // Add a new item to the store
  async addItem(newItem) {
    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readwrite");
        const request = store.add(newItem);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(new Error(`Failed to add item: ${event.target.error}`));
      });
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  }

  // Retrieve all items from the store
  async getAllItems() {
    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readonly");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(new Error(`Failed to get all items: ${event.target.error}`));
      });
    } catch (error) {
      console.error("Error fetching all items:", error);
      throw error;
    }
  }

  // Update an existing item in the store
  async editItem(updatedItem) {
    if (!updatedItem.id) {
      throw new Error("The updated item must include an 'id' field.");
    }

    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readwrite");
        const request = store.put(updatedItem);

        request.onsuccess = () => resolve(updatedItem);
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
        const store = this._getStore("readwrite");
        const request = store.delete(id);

        request.onsuccess = () => resolve(`Item with ID ${id} deleted`);
        request.onerror = (event) => reject(new Error(`Failed to delete item with ID ${id}: ${event.target.error}`));
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }

  // Load demo data into the store
  async loadDemoData(items) {
    if (!Array.isArray(items)) {
      throw new Error("Input must be an array of items.");
    }

    try {
      return await new Promise((resolve, reject) => {
        const store = this._getStore("readwrite");

        // Add each demo item to the store
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
      this.db.close();
      this.db = null;
    } else {
      console.warn("No database connection to close.");
    }
  }
}
