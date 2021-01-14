import { OrderItem } from './orderItem';

export interface Order {
  id: string;
  customerName: string;
  orderItems: OrderItem[];
  address: string;
  email: string;
}

export interface IOrderCreate {
  customerName: string;
  orderItems: IOrderItem[];
  address: string;
  email: string;
}

interface IOrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}
