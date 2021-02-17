export interface IUserEntity {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  hash: string;
  salt: string;
  permissions?: JSON;
}
