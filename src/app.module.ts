import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';
import { PrismaModule } from './db/prisma.module';
import { CustomCacheModule } from './services/cache/cache-manager.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    BookModule,
    UserModule,
    PrismaModule,
    CustomCacheModule,
    AuthModule,
  ],
})
export class AppModule {}
