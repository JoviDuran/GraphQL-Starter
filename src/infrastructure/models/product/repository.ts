import { Product } from 'src/domain/entity';
import { ProductModel } from './product.model';

async function create(product: Partial<Product>) {
  return ProductModel.query().insertAndFetch(product);
}

export const productRepository = {
  create,
};
