import { CoverType } from '../enum/ECoverType';

export class CreateBookDto {
  title: string;
  image: string;
  isbn: string;
  coverType: CoverType;
}
