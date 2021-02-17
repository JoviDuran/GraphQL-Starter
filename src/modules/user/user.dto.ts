export interface IUserDTO {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName?: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  permissions?: JSON;
}

export interface IUserUpdateDTO {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  username: string;
}
