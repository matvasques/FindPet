import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('contact', table => {
        table.increments('id').primary();
        table.string('name', 32).notNullable();
        table.string('email', 32).notNullable();
        table.string('phoneNumber', 32).notNullable();
    });
}

export async function down (knex: knex){
    return knex.schema.dropTable('contact');
}