import { userRepository } from 'src/modules/user';

export async function getById(id: string) {
  const user = await userRepository.getById(id);

  return { user };
}
