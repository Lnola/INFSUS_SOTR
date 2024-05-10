import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'company';

export class CreateCompany extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createCompanyTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('oib', 11).notNullable().unique().checkLength('=', 11);
      table.string('name').notNullable();
    });

    this.addSql(createCompanyTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
