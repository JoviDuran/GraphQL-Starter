import { GQL_MutationResolvers } from 'app-graphql-schema-types';
import { productMapper } from 'src/modules/shopping-cart/mapper';

export const createProductResolver: GQL_MutationResolvers['createProduct'] = async (_, { input }, { domains }) => {
  const { createProduct } = domains;

  const product = await createProduct(productMapper.toDomainCreate(input));

  return { success: true, product: productMapper.toGql(product) };
};
