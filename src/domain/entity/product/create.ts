import { productFactory } from 'src/factories';
import { productRepository } from 'src/infrastructure/models/product';
import { IProductCreate } from './product';

export async function createProduct(product: IProductCreate) {
  const createdProduct = await productRepository.create(productFactory.toDbModelCreate(product));

  return productFactory.toDomain(createdProduct);
}
