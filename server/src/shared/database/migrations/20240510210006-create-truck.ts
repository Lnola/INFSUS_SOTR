import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'truck';

export class CreateTruck extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createTruckTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('registration').notNullable().unique();
      table.string('production_year');
      table.decimal('tank_capacity').notNullable();
      table.integer('horsepower');
    });

    this.addSql(createTruckTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
