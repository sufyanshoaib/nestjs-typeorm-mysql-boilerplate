import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserEntity31645522955301 implements MigrationInterface {
    name = 'UpdateUserEntity31645522955301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isActive\` \`is_active\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_active\` \`isActive\` tinyint NOT NULL`);
    }

}
