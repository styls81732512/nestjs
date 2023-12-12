import dayjs from 'dayjs';
import { Policyholder } from 'src/modules/policyholders/entities/policyholder.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePolicyholder1702003697633 implements MigrationInterface {
  name = 'CreatePolicyholder1702003697633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`policyholder\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '保戶編號', \`superiorId\` int NULL COMMENT '上級ID', \`name\` varchar(255) NOT NULL COMMENT '保戶姓名', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    const testData = [
      {
        id: 1,
        superiorId: null,
        name: '保戶1',
        createdAt: dayjs().add(1, 's').toDate(),
      },
      {
        id: 2,
        superiorId: 1,
        name: '保戶2',
        createdAt: dayjs().add(1, 's').toDate(),
      },
      {
        id: 3,
        superiorId: 1,
        name: '保戶3',
        createdAt: dayjs().add(2, 's').toDate(),
      },
      {
        id: 4,
        superiorId: 2,
        name: '保戶4',
        createdAt: dayjs().add(3, 's').toDate(),
      },
      {
        id: 5,
        superiorId: 2,
        name: '保戶5',
        createdAt: dayjs().add(4, 's').toDate(),
      },
      {
        id: 6,
        superiorId: 3,
        name: '保戶6',
        createdAt: dayjs().add(5, 's').toDate(),
      },
      {
        id: 7,
        superiorId: 3,
        name: '保戶7',
        createdAt: dayjs().add(6, 's').toDate(),
      },
      {
        id: 8,
        superiorId: 4,
        name: '保戶8',
        createdAt: dayjs().add(7, 's').toDate(),
      },
      {
        id: 9,
        superiorId: 4,
        name: '保戶9',
        createdAt: dayjs().add(8, 's').toDate(),
      },
      {
        id: 10,
        superiorId: 5,
        name: '保戶10',
        createdAt: dayjs().add(9, 's').toDate(),
      },
      {
        id: 11,
        superiorId: 5,
        name: '保戶11',
        createdAt: dayjs().add(10, 's').toDate(),
      },
      {
        id: 12,
        superiorId: 6,
        name: '保戶12',
        createdAt: dayjs().add(11, 's').toDate(),
      },
      {
        id: 13,
        superiorId: 6,
        name: '保戶13',
        createdAt: dayjs().add(12, 's').toDate(),
      },
      {
        id: 14,
        superiorId: 7,
        name: '保戶14',
        createdAt: dayjs().add(13, 's').toDate(),
      },
      {
        id: 15,
        superiorId: 7,
        name: '保戶15',
        createdAt: dayjs().add(14, 's').toDate(),
      },
      {
        id: 16,
        superiorId: 8,
        name: '保戶16',
        createdAt: dayjs().add(15, 's').toDate(),
      },
      {
        id: 17,
        superiorId: 8,
        name: '保戶17',
        createdAt: dayjs().add(16, 's').toDate(),
      },
      {
        id: 18,
        superiorId: 9,
        name: '保戶18',
        createdAt: dayjs().add(17, 's').toDate(),
      },
      {
        id: 19,
        superiorId: 9,
        name: '保戶19',
        createdAt: dayjs().add(18, 's').toDate(),
      },
      {
        id: 20,
        superiorId: 10,
        name: '保戶20',
        createdAt: dayjs().add(19, 's').toDate(),
      },
    ];

    await queryRunner.manager.getRepository(Policyholder).insert(testData);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`policyholders\``);
  }
}
