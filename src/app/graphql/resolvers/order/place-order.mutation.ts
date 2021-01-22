import { GQL_MutationResolvers } from 'app-graphql-schema-types';
import { orderMapper } from 'src/modules/shopping-cart/mapper';

export const placeOrderResolver: GQL_MutationResolvers['placeOrder'] = async (_, { input }, { domains }) => {
  const { createOrder } = domains;

  const orderForm = orderMapper.toDomainCreate(input);
  const orderEntity = await createOrder(orderForm);

  const orderGql = orderMapper.toGql(orderEntity);

  return { success: true, order: orderGql };
};
