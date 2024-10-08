import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from 'src/db/prisma.module';
import { CustomCacheModule } from 'src/services/cache/cache-manager.module';

@Module({
  imports: [PrismaModule, CustomCacheModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
