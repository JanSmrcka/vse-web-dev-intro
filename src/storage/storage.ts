/**
 * Class used for handling localStorage operations.
 * @author Adam Mrózek
 */
export class StorageManager<T> {
  private storage: Record<string, T> = {};
  private readonly storageKey: string = 'DEFAULT_STORAGE_KEY';
  
  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.loadStorage();
  }

  /**
   * Loads the current storage to localStorage.
   * @private
   */
  private loadStorage(): void {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.storage = JSON.parse(storedData);
    }
  }
  
  /**
   * Saves the current storage to localStorage.
   * @private
   */
  private saveStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
  }

  /**
   * Sets a value in the storage.
   * @param key
   * @param value
   */
  setItem(key: string, value: any): void {
    if (this.storage[key]) {
      throw new Error(`Key "${key}" already exists in storage.`);
    }
    
    this.storage[key] = value;
    this.saveStorage();
  }
  
  /**
   * Gets a value from the storage.
   * @param key
   * @returns The value associated with the key, or undefined if not found.
   */
  getItem(key: string): T | undefined {
    if (this.storage.hasOwnProperty(key)) {
      return this.storage[key];
    }
    
    throw new Error(`Key "${key}" does not exist in storage.`);
  }
}