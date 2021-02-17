import { IUserUpdateDTO, userRepository } from 'src/modules/user';

export async function updateUser(input: IUserUpdateDTO) {
  const { id, firstName, middleName, lastName, username, email } = input;

  const user = await userRepository.update({ id, firstName, middleName, lastName, username, email });

  return { user };
}
