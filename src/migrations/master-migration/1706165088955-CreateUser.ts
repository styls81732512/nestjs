import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1706165088955 implements MigrationInterface {
  name = 'CreateUser1706165088955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(12) NULL, \`password\` varchar(255) NULL, \`name\` varchar(20) NOT NULL, \`token\` text NULL, \`enabled\` tinyint NOT NULL COMMENT '狀態' DEFAULT 1, \`lastLoginAt\` datetime NOT NULL COMMENT '上次登入時間' DEFAULT CURRENT_TIMESTAMP, \`createdAt\` datetime NOT NULL COMMENT '註冊時間' DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL COMMENT '更新時間' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` datetime(6) NULL COMMENT '刪除時間', INDEX \`idx_username\` (\`username\`), INDEX \`idx_createdAt\` (\`createdAt\`), INDEX \`idx_updatedAt\` (\`updatedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`idx_updatedAt\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`idx_createdAt\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`idx_username\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
