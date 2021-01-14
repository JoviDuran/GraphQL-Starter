export interface OrderCreate {
  orderItems: OrderItem[];
  customerName: string;
  address: string;
  email: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
}
