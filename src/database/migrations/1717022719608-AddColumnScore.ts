import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnScore1717022719608 implements MigrationInterface {
    name = 'AddColumnScore1717022719608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`worker\` DROP FOREIGN KEY \`FK_919cd08322395c219bf3f6fd7d2\``);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD \`score\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD CONSTRAINT \`FK_b2db43210c62dff902db3658363\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`worker\` DROP FOREIGN KEY \`FK_b2db43210c62dff902db3658363\``);
        await queryRunner.query(`ALTER TABLE \`worker\` DROP COLUMN \`score\``);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD CONSTRAINT \`FK_919cd08322395c219bf3f6fd7d2\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
