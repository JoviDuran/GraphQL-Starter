import { userByIdLoader } from '../modules/user/graphql/data-loaders';

export const initLoaders = () => {
  const loaders = {
    userById: userByIdLoader(),
  };

  return loaders;
};
