import { GQL_MutationResolvers } from '@app/graphql-schema-types';
import { ValidationError } from 'apollo-server-core';
import { userFactory } from 'src/modules/user/user.factory';
import { register } from 'src/use-cases/auth/register.use-case';

export const registerResolver: GQL_MutationResolvers['register'] = async (_, { input }) => {
  const registerUserDTO = userFactory.toDTOCreate(input);

  try {
    const { user } = await register(registerUserDTO);
    // Entity toGQL
    return { success: !!user };
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
