import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('password', 64).notNullable();
        table.integer('adressID').unsigned().notNullable().references('id').inTable('address').onUpdate('CASCADE').onDelete('CASCADE').index();
        table.integer('contactID').unsigned().notNullable().references('id').inTable('contact').onUpdate('CASCADE').onDelete('CASCADE').index();
    
    });
}

export async function down (knex: knex){
    return knex.schema.dropTable('users');
}