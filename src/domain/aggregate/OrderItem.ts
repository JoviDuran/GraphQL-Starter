import { Product } from '../entity';

export class OrderItem {
  product!: Product;
  quantity!: number;
  unitPrice!: number;
}
