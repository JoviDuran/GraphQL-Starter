import { GQL_MutationResolvers } from '@app/graphql-schema-types';
import { AuthenticationError } from 'apollo-server-core';
import { logger } from '@app/utils';
import { login } from 'src/use-cases/auth/login.use-case';
import { toGQL } from 'src/modules/user';

export const loginResolver: GQL_MutationResolvers['login'] = async (_, args, { req }) => {
  const { usernameOrEmail, password } = args.input;

  try {
    const userEntity = await login(usernameOrEmail, password);
    if (userEntity) {
      // Logout previous session
      if (req.isAuthenticated()) {
        req.logout();
      }
      // TODO: Read about passport js

      // Invoke PassportJS login method to set up session
      req.login(userEntity, (err) => {
        if (err) {
          logger.error(err.message);
        }
      });
    }

    return {
      user: toGQL(userEntity),
    };
  } catch (err) {
    throw new AuthenticationError(err.message);
  }
};
