import { IOrderCreateModel } from './order-create.model';
import { OrderModel } from './order.model';

async function create(order: IOrderCreateModel) {
  return OrderModel.query().insertAndFetch(order);
}

export const orderRepository = {
  create,
};
