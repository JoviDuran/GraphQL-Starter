export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface IProductCreate {
  name: string;
  price: number;
  stock: number;
}
