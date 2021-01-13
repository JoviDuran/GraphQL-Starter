import { GQL_MutationResolvers } from 'app-graphql-schema-types';

export const createProductResolver: GQL_MutationResolvers['createProduct'] = async (_, { input }, { domains }) => {
  const { createProduct } = domains;

  const product = await createProduct(input);

  return { success: true, product };
};
