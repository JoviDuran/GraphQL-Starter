import { GQL_PlaceOrderInput } from 'app-graphql-schema-types';
import { OrderModel } from './order.model';

async function create(order: GQL_PlaceOrderInput) {
  return OrderModel.query().insertAndFetch(order);
}

export const orderRepository = {
  create,
};
