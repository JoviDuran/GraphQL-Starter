import { productRepository } from '@app/infrastructure';
import { Product } from './Product';

export async function createProduct(user: Partial<Product>) {
  return productRepository.create(user);
}
