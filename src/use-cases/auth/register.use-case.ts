import { userRepository } from 'src/modules/user/user.repository';
import { bcryptUtil } from 'src/utils';
import { UsernameAlreadyTakenError } from '@app/error-handler/errors/UsernameAlreadyTakenError';
import { EmailAlreadyTakenError } from '@app/error-handler/errors/EmailAlreadyTakenError';
import { UserModel } from 'src/db/models';
import { Maybe } from 'app-graphql-schema-types';

// TODO: Just add the interface IDTO here. Use case always uses its needed IDTO.
export interface IRegisterDTO {
  firstName: string;
  middleName: Maybe<string | null>;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export async function register(input: IRegisterDTO) {
  // TODO: Validate DTO
  const { firstName, middleName, lastName, email, password, username } = input;

  const salt = await bcryptUtil.generateSalt();
  const hash = await bcryptUtil.generateHash(password, salt);

  const existingUsername = userRepository.getByUserName(username);

  if (existingUsername) {
    throw new UsernameAlreadyTakenError();
  }

  const existingEmail = userRepository.getByEmail(email);
  if (existingEmail) {
    throw new EmailAlreadyTakenError();
  }

  const form: UserModel = new UserModel();
  form.set({
    firstName,
    middleName,
    lastName,
    username,
    email,
    hash,
    salt,
  });

  const user = await userRepository.create(form);
  return { user };
}

// TODO: Might add validate DTO function here to avoid using yup-schema-validation
