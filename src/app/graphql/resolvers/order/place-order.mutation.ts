import { GQL_MutationResolvers } from 'app-graphql-schema-types';
import { orderFactory } from 'src/factories/order';

export const placeOrderResolver: GQL_MutationResolvers['placeOrder'] = async (_, { input }, { domains }) => {
  const { createOrder } = domains;

  const order = await createOrder(orderFactory.toDomainCreate(input));

  return { success: true, order: orderFactory.toGql(order) };
};
