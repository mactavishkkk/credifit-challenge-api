import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1716995325403 implements MigrationInterface {
    name = 'InitialMigrations1716995325403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cnpj\` varchar(255) NOT NULL, \`company_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_b55d9c6e6adfa3c6de735c5a2e\` (\`cnpj\`), UNIQUE INDEX \`IDX_b0fc567cf51b1cf717a9e8046a\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`worker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`salary\` decimal(10,2) NOT NULL, \`company_id\` int NULL, UNIQUE INDEX \`IDX_7f3baea527c25757183ea02e88\` (\`cpf\`), UNIQUE INDEX \`IDX_13679fa10b68bb29e4303ca1c9\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD CONSTRAINT \`FK_919cd08322395c219bf3f6fd7d2\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`worker\` DROP FOREIGN KEY \`FK_919cd08322395c219bf3f6fd7d2\``);
        await queryRunner.query(`DROP INDEX \`IDX_13679fa10b68bb29e4303ca1c9\` ON \`worker\``);
        await queryRunner.query(`DROP INDEX \`IDX_7f3baea527c25757183ea02e88\` ON \`worker\``);
        await queryRunner.query(`DROP TABLE \`worker\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0fc567cf51b1cf717a9e8046a\` ON \`company\``);
        await queryRunner.query(`DROP INDEX \`IDX_b55d9c6e6adfa3c6de735c5a2e\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
