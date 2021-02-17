import { GQL_RegisterInput, GQL_UpdateUserInput, GQL_User } from 'app-graphql-schema-types';
import { UserModel } from 'src/db/models';
import { IRegisterDTO } from '../auth/register.dto';
import { IUserUpdateDTO } from './user.dto';
import { IUserEntity } from './user.entity';

//
export function toDTOCreate(registerUserGQL: GQL_RegisterInput): IRegisterDTO {
  const { firstName, middleName, lastName, email, password, username } = registerUserGQL;
  return {
    firstName,
    middleName,
    lastName,
    email,
    password,
    username,
  };
}

export function toDTOUpdate(updateUserGQL: GQL_UpdateUserInput): IUserUpdateDTO {
  const { id, firstName, middleName, lastName, username, email } = updateUserGQL;
  return { id, firstName, middleName, lastName, username, email };
}

export function toEntity(userModel: UserModel): IUserEntity {
  const { id, firstName, middleName, lastName, email, username, hash, salt, updatedAt, createdAt } = userModel;
  return {
    id,
    firstName,
    lastName,
    email,
    middleName,
    username,
    updatedAt,
    createdAt,
    hash,
    salt,
  };
}

export function toGQL(user: IUserEntity): GQL_User {
  const { id, firstName, middleName, lastName, email, username, permissions, updatedAt, createdAt } = user;
  return {
    id,
    firstName,
    middleName,
    lastName,
    email,
    username,
    permissions,
    updatedAt,
    createdAt,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fullName: null as any,
  };
}
export const userFactory = {
  toDTOCreate,
  toDTOUpdate,
  toEntity,
  toGQL,
};
