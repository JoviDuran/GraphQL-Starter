import { Product } from '../entity';

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
}
