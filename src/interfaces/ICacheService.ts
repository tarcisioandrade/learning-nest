export interface ICacheService {
  getOrCreateAsync<T>(
    key: string,
    factory: () => Promise<T>,
    time?: number,
  ): Promise<T>;
  // invalidateAsync(key: string): Promise<void>;
}
