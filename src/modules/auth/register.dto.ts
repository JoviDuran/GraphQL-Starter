import { Maybe } from 'app-graphql-schema-types';

export interface IRegisterDTO {
  firstName: string;
  middleName: Maybe<string | null>;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
