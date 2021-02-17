import { Maybe } from 'app-graphql-schema-types';
import { OrderByDirection } from 'objection';
import { UserSortField } from '../common/graphql/enums';

export interface IUserCursorPaginatedDTO {
  before?: Maybe<string>;
  after?: Maybe<string>;
  first: number;
  sortDirection: OrderByDirection;
  sortField: UserSortField;
}
