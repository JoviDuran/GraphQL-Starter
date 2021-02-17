import { GQL_UserResolvers } from '@app/graphql-schema-types';
import { getFullName } from 'src/use-cases/user/get-full-name.use-case';

export const fullNameResolver: GQL_UserResolvers['fullName'] = async (parent) => {
  // TODO: Not sure about the implementation. Do we need to create a DTO?
  let name: string | undefined;
  const user = parent;
  const { firstName, middleName, lastName } = user;

  if (firstName && middleName && lastName) {
    name = getFullName(firstName, middleName, lastName);
  }

  return name;
};
