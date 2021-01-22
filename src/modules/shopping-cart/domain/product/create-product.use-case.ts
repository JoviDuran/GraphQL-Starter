import { productRepository } from 'src/infrastructure/models/product';
import { productMapper } from '../../mapper';
import { IProductCreate } from './product';

export async function createProduct(product: IProductCreate) {
  const createdProduct = await productRepository.create(productMapper.toDbModelCreate(product));

  return productMapper.toDomain(createdProduct);
}
