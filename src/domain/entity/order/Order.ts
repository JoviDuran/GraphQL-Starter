import { OrderItem } from '../../aggregate/OrderItem';

export class Order {
  id!: string;
  orderItems!: [OrderItem];
  customerName!: string;
  date!: Date;
  address!: string;
  email!: string;
}
