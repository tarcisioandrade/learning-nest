import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CreateBookDto } from './dto/create-dto';
import { BookService } from './book.service';
import { CacheService } from 'src/services/cache/cache-manager.service';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { setTimeout } from 'timers/promises';

@Controller('book')
@UseInterceptors(LoggingInterceptor)
export class BookController {
  constructor(
    private bookService: BookService,
    private _cache: CacheService,
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Get()
  async getAll() {
    const books = await this._cache.getOrCreateAsync(
      'books',
      async () => await this.bookService.getAll(),
    );

    await setTimeout(2000);
    return books;
  }
}
