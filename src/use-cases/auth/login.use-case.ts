import { userRepository } from 'src/modules/user/user.repository';
import { bcryptUtil } from 'src/utils';

export async function login(usernameOrEmail: string, password: string) {
  const user = await userRepository.getByUserNameOrEmail(usernameOrEmail);
  if (user) {
    const isValidPassword = await bcryptUtil.verify(password, user.hash, user.salt);

    if (isValidPassword) {
      return user;
    }
  }
  throw new Error('Invalid username/email or password');
}
