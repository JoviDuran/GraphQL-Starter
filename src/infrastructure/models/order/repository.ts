import { Order } from 'src/domain/entity';
import { OrderModel } from './order.model';

async function create(order: Partial<Order>) {
  return OrderModel.query().insertAndFetch(order);
}

export const orderRepository = {
  create,
};
