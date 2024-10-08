import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserProps } from './user.entity';
import { ClassValidatorFields } from 'src/shared/class-validator-fields';
import { EUserRole } from '../enum/EUserRole';

export class UserRules {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(EUserRole)
  role: EUserRole;

  constructor(props: UserProps) {
    Object.assign(this, { ...props });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserRules): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)));
  }
}
