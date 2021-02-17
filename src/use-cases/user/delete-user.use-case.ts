import { userRepository } from 'src/modules/user';

export async function deleteUser(id: string) {
  const isSuccessful = await userRepository.deleteUser(id);

  return { isSuccessful };
}
