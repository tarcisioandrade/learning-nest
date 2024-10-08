import { Entity } from 'src/shared/entity';
import { BookValidator } from './validate';
import { EntityValidationError } from 'src/shared/entity-validate-errors';
import { CoverType } from '../enum/ECoverType';

export interface BookProps {
  title: string;
  image: string;
  isbn: string;
  coverType: CoverType;
}

export class Book extends Entity<BookProps> {
  constructor(
    public props: BookProps,
    id?: string,
  ) {
    super(props, id);
    this.validate(props);
  }

  validate(props: BookProps) {
    const validator = new BookValidator();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
