import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDrivers1732637807025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public.drivers ("name",description,vehicle,review_rating,review_comment,min_distance,rate_per_km, created_at, updated_at) VALUES
	 ('Homer Simpson','Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).','Plymouth Valiant 1973 rosa e enferrujado',2,'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',1000,250, NOW(), NOW()),
	 ('Dominic Toretto','Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.','Dodge Charger R/T 1970 modificado',4,'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',5000,500, NOW(), NOW()),
	 ('James Bond','Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.','Aston Martin DB5 clássico',5,'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',10000,1000, NOW(), NOW());
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.drivers`)
    }

}
