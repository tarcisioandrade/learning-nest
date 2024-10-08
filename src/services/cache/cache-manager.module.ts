import { Module } from '@nestjs/common';
import { CacheService } from './cache-manager.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000, // 1minute
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CustomCacheModule {}
