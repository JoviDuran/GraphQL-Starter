import { createDataLoader } from '@app/utils';
import { getByIds } from 'src/use-cases/user/get-by-ids.use-case';

// TODO: Use use case instead of service???
export const userByIdLoader = () => {
  return createDataLoader(async (ids: string[]) => {
    const { users } = await getByIds(ids);

    return ids.map((id) => users.find((row) => row.id === id) || null);
  });
};
