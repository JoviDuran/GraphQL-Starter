import { productRepository } from '@app/infrastructure';
import { productFactory } from 'src/factories';
import { IProductCreate } from './product';

export async function createProduct(product: IProductCreate) {
  const createdProduct = await productRepository.create(productFactory.toDbModelCreate(product));

  return productFactory.toDomain(createdProduct);
}
