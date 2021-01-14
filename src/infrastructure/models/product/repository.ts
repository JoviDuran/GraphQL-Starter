import { IProductCreateModel } from './product-create.model';
import { ProductModel } from './product.model';

function create(product: IProductCreateModel) {
  return ProductModel.query().insertAndFetch(product);
}

export const productRepository = {
  create,
};
