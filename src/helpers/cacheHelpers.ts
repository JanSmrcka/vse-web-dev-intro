
export const CacheEnum = {
  Todo: 'Todo',
}

/**
 * Generates a cache key from class constructors and primitive values.
 * For example: getCacheKey([Todo], 42, 'abc') => "Todo[]:42:abc"
 */
export function getCacheKey(...args: any[]): string {
  return args.join(':');
}
 