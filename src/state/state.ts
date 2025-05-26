/**
 * Class used for handling localStorage operations.
 * @author Adam Mrózek
 */
export class StateManager<T> implements Iterable<T>{
  private storage: Record<string, T> = {};
  private readonly storageKey: string = 'DEFAULT_STORAGE_KEY';
  
  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.loadState();
  }


  /**
   * Iterates over the values in the storage.
   * Allows the usage of for loops.
   * There could be some drawbacks with this approach - it forces the storage to be an array-like structure.
   */
  [Symbol.iterator](): Iterator<T> {
    const values = Object.values(this.storage);
    let index = 0;
    return {
      next(): IteratorResult<T> {
        if (index < values.length) {
          return { value: values[index++], done: false };
        } else {
          return { value: undefined as any, done: true };
        }
      }
    };
  }
  
  /**
   * Loads the current storage to localStorage.
   * @private
   */
  private loadState(): void {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.storage = JSON.parse(storedData);
    }
  }
  
  /**
   * Saves the current storage to localStorage.
   * @private
   */
  private saveState(): void {
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
    this.saveState();
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