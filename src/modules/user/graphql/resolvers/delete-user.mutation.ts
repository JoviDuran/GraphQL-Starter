import { GQL_MutationResolvers } from '@app/graphql-schema-types';
import { deleteUser } from 'src/use-cases/user/delete-user.use-case';

export const deleteUserResolver: GQL_MutationResolvers['deleteUser'] = async (_, { id }) => {
  const result = await deleteUser(id);

  return { isSuccessful: result.isSuccessful };
};
