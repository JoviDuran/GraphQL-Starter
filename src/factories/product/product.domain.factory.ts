import { GQL_CreateProductInput } from 'app-graphql-schema-types';
import { Product } from 'src/domain';

export function createProductDomain(productGql: GQL_CreateProductInput): Partial<Product> {
  const { name, price, stock } = productGql;
  const product: Partial<Product> = {
    name,
    price,
    stock,
  };

  return product;
}
