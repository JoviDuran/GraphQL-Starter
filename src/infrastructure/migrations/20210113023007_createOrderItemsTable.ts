import * as Knex from 'knex';

const TABLE_NAME = 'order_items';

// tslint:disable-next-line: no-any
export async function up(knex: Knex): Promise<any> {
  const tableExists = await knex.schema.hasTable(TABLE_NAME);

  if (!tableExists) {
    await knex.schema.createTable(TABLE_NAME, (t) => {
      t.uuid('productId').notNullable();
      t.uuid('orderId').notNullable();
      t.bigInteger('quantity').notNullable();
      t.float('unitPrice').notNullable();

      t.foreign('productId').references('products.id');
      t.foreign('orderId').references('orders.id');

      t.unique(['productId', 'orderId']);
    });
  }
}

// tslint:disable-next-line: no-any
export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
