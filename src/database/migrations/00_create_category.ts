import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('category', table => {
        table.increments('id').primary();
        table.string('categoryName', 32).notNullable();
    });
}

export async function down (knex: knex){
    return knex.schema.dropTable('category');
}