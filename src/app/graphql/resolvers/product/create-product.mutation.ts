import { GQL_MutationResolvers } from 'app-graphql-schema-types';
import { productFactory } from 'src/factories';

export const createProductResolver: GQL_MutationResolvers['createProduct'] = async (_, { input }, { domains }) => {
  const { createProduct } = domains;

  const product = await createProduct(productFactory.toDomainCreate(input));

  return { success: true, product: productFactory.toGql(product) };
};
