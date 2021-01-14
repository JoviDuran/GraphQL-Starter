import { GQL_MutationResolvers } from 'app-graphql-schema-types';

export const placeOrderResolver: GQL_MutationResolvers['placeOrder'] = async (_, { input }, { domains }) => {
  const { createOrder } = domains;

  const order = await createOrder(input);

  return { success: true, order };
};