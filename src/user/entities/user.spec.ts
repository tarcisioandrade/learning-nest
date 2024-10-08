import { EntityValidationError } from 'src/shared/entity-validate-errors';
import { EUserRole } from '../enum/EUserRole';
import { User, UserProps } from './user.entity';

describe('User Entity Test', () => {
  const newUser: UserProps = {
    email: 'example@gmail.com',
    password: '123456',
    role: EUserRole.ADMIN,
  };

  test('should create a user', () => {
    const { email, password, role } = newUser;
    const user = new User({ email, password, role }).toJSON();
    expect(user).toHaveProperty('id');
  });

  test('should throw error when try create a user with a email invalid', () => {
    newUser.email = 'example@gmail';
    const { email, password, role } = newUser;
    expect(() => new User({ email, password, role })).toThrow(
      EntityValidationError,
    );
  });
});
