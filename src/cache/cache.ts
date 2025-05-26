export interface CachedValue<T> {
  expires: number;
  data: T;
  callback?: () => Promise<T>; // Async support.. feels like a good idea?
}

/**
 * To be honest this class does nothing at all since its frontend.
 * Its just cool looking class.
 * I suppose it would be useful if there would be a feature to quickly load some data.. like a dialog box by Todo Id or something.
 */
export class CacheManager {
  private storage: Record<string, CachedValue<any>> = {};

  public async set(key: string, value: any, callback?: () => Promise<any>): Promise<void> {
    const cacheValue: CachedValue<any> = {
      expires: Date.now() + 2 * 60 * 1000,
      data: value,
      callback,
    };
    
    this.storage[key] = cacheValue;
  }

  public async get(key: string, callback?: () => Promise<any>): Promise<any | null> {
    const cachedValue = this.storage[key];
    const isValid = cachedValue && Date.now() < cachedValue.expires;

    if (isValid) {
      console.log(`[${Date.now()}] Cache hit for key: ${key}`);
      return cachedValue.data;
    }

    delete this.storage[key];

    if (callback) {
      console.log(`[${Date.now()}] Cache miss for key: ${key}. Executing callback to fetch new value.`);
      const newValue = await callback();
      await this.set(key, newValue, callback);
      return JSON.parse(newValue);
    }
    
    return null;
  }

  public clear(): void {
    this.storage = {};
  }
  
  public invalidate(key: string): void {
    delete this.storage[key];
  }
}
