import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('breed', table => {
        table.increments('id').primary();
        table.string('name', 32).notNullable();
        table.string('category', 32).notNullable();
        table.integer('categoryId').notNullable().references('id').inTable('category').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

export async function down (knex: knex){
    return knex.schema.dropTable('breed');
}