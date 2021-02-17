import { Maybe } from 'app-graphql-schema-types';
import { UserSortField } from '@app/core/enums';
import { OrderByDirection } from 'objection';
import { UserModel } from 'src/db/models';
import { IUserEntity } from './user.entity';
import { userFactory } from './user.factory';
import { ICursorPaginationResult, ICursorResult } from '@app/core/interfaces';

async function getById(id: string): Promise<IUserEntity> {
  const user = await UserModel.query().findById(id);
  const userEntity = userFactory.toEntity(user);
  return userEntity;
}

async function getByIds(ids: string[]): Promise<IUserEntity[]> {
  const users = await UserModel.query().findByIds(ids);
  const userEntities = users.map((x) => userFactory.toEntity(x));
  return userEntities;
}

async function getByUserNameOrEmail(usernameOrEmail: string) {
  const user = await UserModel.query().where('username', usernameOrEmail).orWhere('email', usernameOrEmail).first();

  const userEntity = userFactory.toEntity(user);
  return userEntity;
}

async function getByUserName(userName: string) {
  const user = await UserModel.query().where('username', userName).first();
  const userEntity = userFactory.toEntity(user);
  return userEntity;
}

async function getByEmail(email: string) {
  const user = await UserModel.query().where('email', email).first();
  const userEntity = userFactory.toEntity(user);
  return userEntity;
}

interface IUserCreateArgs {
  firstName: string;
  middleName: string | null;
  lastName: string;
  username: string;
  email: string;
  hash: string;
  salt: string;
}

async function create(input: IUserCreateArgs) {
  const { firstName, middleName, lastName, username, email, hash, salt } = input;
  const user = await UserModel.query().insertAndFetch({
    firstName,
    middleName,
    lastName,
    email,
    username,
    hash,
    salt,
  });
  const userEntity = userFactory.toEntity(user);
  return userEntity;
}

export interface IUpdateUserArgs {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  username: string;
  email: string;
}

// TODO: Add return type in signature
async function update(input: IUpdateUserArgs) {
  const { id, firstName, middleName, lastName, username, email } = input;
  const user = await UserModel.query().findById(id);

  if (user) {
    await user.$query().patchAndFetch({
      firstName,
      middleName,
      lastName,
      username,
      email,
    });
    const userEntity = userFactory.toEntity(user);
    return userEntity;
  } else {
    // TODO: Boils down to internal server error. Find better way handle this.
    throw new Error('User does not exist');
  }
}

async function deleteUser(id: string) {
  const user = await UserModel.query().findById(id);

  if (user) {
    const affectedRows = await user.$query().delete();

    return affectedRows > 0;
  }

  return false;
}

interface IUserCursorPaginatedArgs {
  before?: Maybe<string>;
  after?: Maybe<string>;
  first: number;
  sortDirection: OrderByDirection;
  sortField: UserSortField;
}

function createCursorResultEntity(args: ICursorResult<UserModel>) {
  const { data, cursor } = args;
  const userEntity = userFactory.toEntity(data);
  const cursorResult: ICursorResult<IUserEntity> = {
    data: userEntity,
    cursor,
  };
  return cursorResult;
}

function createCursorPaginatedEntity(args: ICursorPaginationResult<UserModel>) {
  const { results, pageInfo, totalCount, remaining } = args;
  const cursorResults = results.map((x) => createCursorResultEntity(x));
  const cursorPaginationResultEntity: ICursorPaginationResult<IUserEntity> = {
    results: cursorResults,
    pageInfo,
    totalCount,
    remaining,
  };

  return cursorPaginationResultEntity;
}

async function getCursorPaginated(args: IUserCursorPaginatedArgs): Promise<ICursorPaginationResult<IUserEntity>> {
  const { before, after, first, sortDirection, sortField } = args;

  const query = UserModel.query().orderBy(sortField, sortDirection).limit(first);

  if (before) {
    const cursorPaginatedResult = await query.previousCursorPage(before);
    const result = createCursorPaginatedEntity(cursorPaginatedResult);
    return result;
  }
  const result = await query.nextCursorPage(after);
  return result;
}

export const userRepository = {
  getById,
  getByIds,
  getCursorPaginated,
  getByUserName,
  getByEmail,
  getByUserNameOrEmail,
  create,
  update,
  deleteUser,
  createCursorPaginatedEntity,
  createCursorResultEntity,
};
