import { Maybe } from 'graphql/jsutils/Maybe';
import { Model } from 'objection';
import { BaseModel } from './common/base-model';
import { OrderModel } from './order.model';
import * as yup from 'yup';

export class ProductModel extends BaseModel {
  static tableName = 'product';

  static relationMappings = {
    order: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Order.model`,
      join: {
        from: 'products.id',
        through: {
          from: 'order_items.productId',
          to: 'order_items.orderId',
        },
        to: 'orders.id',
      },
    },
  };

  static yupSchema = {
    name: yup.string().required(),

    price: yup.number().required(),

    stock: yup.number().required(),
  };

  id!: string;
  name!: string;
  price!: number;
  stock!: number;
  createdAt!: Date;
  updatedAt!: Date;

  order: Maybe<OrderModel[]>;
}
