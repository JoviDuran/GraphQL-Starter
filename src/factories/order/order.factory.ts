import { GQL_Order, GQL_PlaceOrderInput } from 'app-graphql-schema-types';
import { IOrderCreate, Order } from 'src/domain';
import { IOrderCreateModel, OrderModel } from 'src/infrastructure/models/order';

function toDomainCreate(createOrderGql: GQL_PlaceOrderInput) {
  const { customerName, address, email, orderItems } = createOrderGql;
  const order: IOrderCreate = {
    customerName,
    address,
    email,
    orderItems,
  };
  return order;
}

function toDbModelCreate(orderCreateDomain: IOrderCreate) {
  const { email, customerName, address, orderItems } = orderCreateDomain;
  const order: IOrderCreateModel = {
    customerName,
    address,
    email,
    orderItems,
  };
  return order;
}

function toDomain(orderModel: OrderModel) {
  const { id, email, customerName, address, products } = orderModel;
  const order: Order = {
    id,
    customerName,
    address,
    email,
    orderItems: products.map((x) => {
      const orderItem = {
        product: x,
        unitPrice: x.price,
        quantity: x.quantity,
      };
      return orderItem;
    }),
  };

  return order;
}

function toGql(orderDomain: Order) {
  const { id, customerName, address, email, orderItems } = orderDomain;
  const order: GQL_Order = {
    id,
    customerName,
    address,
    email,
    orderItems,
  };

  return order;
}

export const orderFactory = {
  toDomainCreate,
  toDbModelCreate,
  toDomain,
  toGql,
};
