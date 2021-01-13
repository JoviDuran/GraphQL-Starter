import { Model } from 'objection';
import { BaseModel } from '../common/base-model';
import { OrderModel } from '../order/order.model';
import * as yup from 'yup';

export class ProductModel extends BaseModel {
  static tableName = 'product';

  static relationMappings = {
    order: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Order.model`,
      join: {
        from: 'product.id',
        through: {
          from: 'orderItem.productId',
          to: 'orderItem.orderId',
        },
        to: 'order.id',
      },
    },
  };

  static yupSchema = {
    name: yup.string().required(),

    price: yup.number().required(),

    stocks: yup.number().required(),
  };

  id!: string;
  name!: string;
  price!: number;
  stock!: number;
  createdAt!: Date;
  updatedAt!: Date;

  order!: OrderModel[];
}
