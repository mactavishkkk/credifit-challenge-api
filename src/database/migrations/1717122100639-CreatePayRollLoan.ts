import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePayRollLoan1717122100639 implements MigrationInterface {
    name = 'CreatePayRollLoan1717122100639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`loan_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payroll_loan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nextDue\` datetime NOT NULL, \`numberInstallments\` int NOT NULL, \`installmentValue\` decimal(10,2) NOT NULL, \`totalFinanced\` decimal(10,2) NOT NULL, \`company_id\` int NULL, \`worker_id\` int NULL, \`status_id\` int NULL, UNIQUE INDEX \`REL_ba0d95b6b1418cfdf9037bab17\` (\`status_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD CONSTRAINT \`FK_48504d6c6797c61fe8460060351\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD CONSTRAINT \`FK_e2cb336efac4eb85e44ba704e6e\` FOREIGN KEY (\`worker_id\`) REFERENCES \`worker\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD CONSTRAINT \`FK_ba0d95b6b1418cfdf9037bab17c\` FOREIGN KEY (\`status_id\`) REFERENCES \`loan_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP FOREIGN KEY \`FK_ba0d95b6b1418cfdf9037bab17c\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP FOREIGN KEY \`FK_e2cb336efac4eb85e44ba704e6e\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP FOREIGN KEY \`FK_48504d6c6797c61fe8460060351\``);
        await queryRunner.query(`DROP INDEX \`REL_ba0d95b6b1418cfdf9037bab17\` ON \`payroll_loan\``);
        await queryRunner.query(`DROP TABLE \`payroll_loan\``);
        await queryRunner.query(`DROP TABLE \`loan_status\``);
    }

}
