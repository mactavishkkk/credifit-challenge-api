import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToPayRoll1717210358835 implements MigrationInterface {
    name = 'AddCreatedAtToPayRoll1717210358835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payroll_loan\` DROP COLUMN \`created_at\``);
    }

}
