import Knex from 'knex';

export async function seed(knex: Knex){
    
    await knex('contact').insert([
        {
            name: "Mateus", 
            email: "mateus@teste.com", 
            phoneNumber: "19 99999-8888"
        }
    ]);

    await knex('address').insert([
        {
            publicPlace: "Rua dos Testes",
            houseNumber: "01",
            complement: "",
            postalCode: "11111-111",
            neighborhood: "Vila dos Testes",
            city: "Campinas",
            uf: "SP",
            country: "Brasil"
        }
    ]);
    
    
    await knex('users').insert([
        {
            password: "1234"
        }
    ]);
}