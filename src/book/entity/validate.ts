import { IsString, IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { BookProps } from '../entity/book';
import { ClassValidatorFields } from 'src/shared/class-validator-fields';
import { CoverType } from '../enum/ECoverType';

export class BookRules {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsEnum(CoverType)
  coverType: CoverType;

  constructor(props: BookProps) {
    Object.assign(this, { ...props });
  }
}

export class BookValidator extends ClassValidatorFields<BookRules> {
  validate(data: BookRules): boolean {
    return super.validate(new BookRules(data ?? ({} as BookProps)));
  }
}
