import { orderRepository } from 'src/infrastructure/models/order';
import { orderMapper } from '../../mapper';
import { IOrderCreate } from './order';

export async function createOrder(order: IOrderCreate) {
  const orderCreateModel = orderMapper.toDbModelCreate(order);
  const createdOrder = await orderRepository.create(orderCreateModel);
  // emit event that order is created, deduct Product stock

  const orderEntity = orderMapper.toDomain(createdOrder);

  return orderEntity;
}
