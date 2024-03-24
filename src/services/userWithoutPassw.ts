import { User } from 'src/user/entities/user.entity';

export const userWithoutPassword = (user: User) => {
  const userClone = Object.assign({}, user);
  delete userClone.password;
  return userClone;
};
