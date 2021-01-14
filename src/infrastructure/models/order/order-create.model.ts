export interface IOrderCreateModel {
  customerName: string;
  address: string;
  email: string;
  orderItems: IOrderItemModel[];
}

interface IOrderItemModel {
  productId: string;
  quantity: number;
  unitPrice: number;
}
