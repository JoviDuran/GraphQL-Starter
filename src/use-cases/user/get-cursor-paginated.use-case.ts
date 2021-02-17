import { IUserCursorPaginatedDTO, userRepository } from 'src/modules/user';

export async function getCursorPaginated(args: IUserCursorPaginatedDTO) {
  const { first, sortDirection, sortField, after, before } = args;

  const result = await userRepository.getCursorPaginated({ first, sortDirection, sortField, after, before });
  return { result };
}
