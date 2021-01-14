import { productRepository } from '@app/infrastructure';
import { GQL_CreateProductInput } from 'app-graphql-schema-types';

export function createProduct(product: GQL_CreateProductInput) {
  return productRepository.create(product);
}
