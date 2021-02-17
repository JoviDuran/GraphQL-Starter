import { userRepository } from 'src/modules/user';

export async function getByIds(ids: string[]) {
  const users = await userRepository.getByIds(ids);

  return { users };
}
