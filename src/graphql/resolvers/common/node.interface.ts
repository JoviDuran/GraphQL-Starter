import { ApolloError } from 'apollo-server-core';

export const NodeInterface = {
  // tslint:disable-next-line: no-any function-name
  __resolveType(obj: any, ctx: any, info: any): string {
    return obj?.__typename ?? 'Node';
  },
};
