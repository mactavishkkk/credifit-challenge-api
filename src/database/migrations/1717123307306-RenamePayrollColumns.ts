import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePayrollColumns1717123307306 implements MigrationInterface {
    name = 'RenamePayrollColumns1717123307306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`nextDue\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`numberInstallments\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`installmentValue\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`totalFinanced\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`status_details\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`next_due\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`number_installments\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`installment_value\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`total_financed\` decimal(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`total_financed\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`installment_value\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`number_installments\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`next_due\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`status_details\``);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`totalFinanced\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`installmentValue\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`numberInstallments\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`nextDue\` datetime NOT NULL`);
    }

}
