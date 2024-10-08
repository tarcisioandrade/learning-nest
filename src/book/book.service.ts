import { Injectable } from '@nestjs/common';
import { Book } from './entity/book';
import { CreateBookDto } from './dto/create-dto';
import { PrismaService } from 'src/db/prisma.service';
import { BookMapper } from './mapper/book.mapper';

@Injectable()
export class BookService {
  private _mapper = new BookMapper();

  constructor(private prisma: PrismaService) {}

  async create(body: CreateBookDto) {
    const { coverType, image, isbn, title } = body;
    const book = new Book({ coverType, image, isbn, title }).toJSON();
    await this.prisma.book.create({
      data: book,
    });
  }

  async getAll() {
    const data = await this.prisma.book.findMany();

    return data.map((book) => this._mapper.toResponse(book));
  }
}
