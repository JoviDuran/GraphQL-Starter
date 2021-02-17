import { GQL_MutationResolvers } from '@app/graphql-schema-types';
import { updateUser } from 'src/use-cases/user/update-user.use-case';
import { userFactory } from '../../user.factory';

export const updateUserResolver: GQL_MutationResolvers['updateUser'] = async (_, { input }) => {
  const userForm = userFactory.toDTOUpdate(input);
  const { user } = await updateUser(userForm);
  const userGQL = userFactory.toGQL(user);
  return { isSuccessful: true, user: userGQL };
};
