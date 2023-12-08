import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePolicyholder1702003697633 implements MigrationInterface {
  name = 'CreatePolicyholder1702003697633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`policyholder\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '保戶編號', \`superiorId\` int NULL COMMENT '上級ID', \`name\` varchar(255) NOT NULL COMMENT '保戶姓名', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`policyholders\``);
  }
}
