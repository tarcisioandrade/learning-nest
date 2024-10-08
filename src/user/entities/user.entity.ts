import { Entity } from 'src/shared/entity';
import { UserValidator } from './validate';
import { EntityValidationError } from 'src/shared/entity-validate-errors';
import { EUserRole } from '../enum/EUserRole';

export interface UserProps {
  email: string;
  password: string;
  role: EUserRole;
}

export class User extends Entity<UserProps> {
  constructor(public props: UserProps) {
    super(props);
    this.validate(props);
  }

  validate(props: UserProps) {
    const validator = new UserValidator();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
