import { orderFactory } from 'src/factories/order';
import { orderRepository } from 'src/infrastructure/models/order';
import { IOrderCreate } from './order';

export async function createOrder(order: IOrderCreate) {
  const createdOrder = await orderRepository.create(orderFactory.toDbModelCreate(order));

  return orderFactory.toDomain(createdOrder);
}
