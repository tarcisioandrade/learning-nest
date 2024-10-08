import { Book } from '@prisma/client';
import { IMapper } from 'src/interfaces/IMapper';

export class BookMapper implements IMapper<Book> {
  toResponse(props: Book) {
    return {
      ...props,
    };
  }
}
