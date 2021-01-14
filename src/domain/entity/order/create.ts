import { GQL_PlaceOrderInput } from '@types/app-graphql-schema-types';
import { OrderModel, orderRepository } from 'src/infrastructure';

export function createOrder(order: GQL_PlaceOrderInput) {
  // call orderFactory
  // pass object to order repository
  //   return orderRepository.create(order);
}
