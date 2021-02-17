import { GQL_QueryResolvers, GQL_UserConnection, GQL_UserEdge } from '@app/graphql-schema-types';
import { UserSortField, SortDirection } from '@app/core/enums';
import { getCursorPaginated } from 'src/use-cases/user/get-cursor-paginated.use-case';
import { userFactory } from '../../user.factory';

export const usersResolver: GQL_QueryResolvers['users'] = async (root, args) => {
  const { result } = await getCursorPaginated({
    before: args.before,
    after: args.after,
    first: args.first,
    sortDirection: args.sortBy?.direction ?? SortDirection.ASC,
    sortField: args.sortBy?.field ?? UserSortField.CREATED_AT,
  });

  const userConnection: GQL_UserConnection = {
    edges: result.results.map<GQL_UserEdge>((x) => ({
      cursor: x.cursor,
      node: userFactory.toGQL(x.data),
    })),
    nodes: result.results.map((x) => userFactory.toGQL(x.data)),
    pageInfo: result.pageInfo,
    totalCount: result.totalCount,
  };

  return userConnection;
};
