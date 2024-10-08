import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ICacheService } from 'src/interfaces/ICacheService';

@Injectable()
export class CacheService implements ICacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getOrCreateAsync<T>(
    key: string,
    factory: () => Promise<T>,
    time?: number,
  ): Promise<T> {
    const cacheData = await this.cacheManager.get(key);

    if (cacheData) {
      return cacheData as T;
    }

    const dataToCache = await factory();
    await this.cacheManager.set(key, dataToCache, time);
    return dataToCache;
  }
}
