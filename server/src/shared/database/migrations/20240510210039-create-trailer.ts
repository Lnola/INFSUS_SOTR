import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'trailer';

export class CreateTrailer extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createTrailerTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('registration').notNullable().unique();
      table.string('production_year');
      table.integer('pallet_capacity').notNullable();
      table.decimal('length');
    });

    this.addSql(createTrailerTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
