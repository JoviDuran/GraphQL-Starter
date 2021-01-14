import { GQL_CreateProductInput } from 'app-graphql-schema-types';
import { ProductModel } from './product.model';

function create(product: GQL_CreateProductInput): Promise<ProductModel> {
  return ProductModel.query().insertAndFetch(product);
}

export const productRepository = {
  create,
};
