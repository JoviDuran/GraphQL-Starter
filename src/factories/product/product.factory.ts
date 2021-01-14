import { GQL_CreateProductInput, GQL_Product } from 'app-graphql-schema-types';
import { IProductCreate, Product } from 'src/domain';
import { IProductCreateModel, ProductModel } from 'src/infrastructure';

function toDomainCreate(productCreateGql: GQL_CreateProductInput) {
  const { name, price, stock } = productCreateGql;
  const product: IProductCreate = {
    name,
    price,
    stock,
  };

  return product;
}

function toDbModelCreate(productCreateDomain: IProductCreate) {
  const { name, price, stock } = productCreateDomain;
  const product: IProductCreateModel = {
    name,
    price,
    stock,
  };

  return product;
}

function toDomain(productModel: ProductModel) {
  const { id, name, price, stock } = productModel;
  const product: Product = {
    id,
    name,
    price,
    stock,
  };

  return product;
}

function toGql(productDomain: Product) {
  const { id, name, price, stock } = productDomain;
  const product: GQL_Product = {
    id,
    name,
    price,
    stock,
  };

  return product;
}

export const productFactory = {
  toDomainCreate,
  toDbModelCreate,
  toDomain,
  toGql,
};
