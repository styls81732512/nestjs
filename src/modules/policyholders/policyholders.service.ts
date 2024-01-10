import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService, ValidationException } from 'src/core';
import { Policyholder } from './entities/policyholder.entity';
import { BinaryPolicyholderModel } from './models/binary-policyholder.model';
import { TreePositionEnum } from './enums/tree-position.enum';
import { FindPolicyholderRo } from './dto/response-object/fine-policyholder.ro';

@Injectable()
export class PolicyholdersService extends BaseService<Policyholder> {
  constructor(
    @InjectRepository(Policyholder)
    private readonly policyholderRepository: Repository<Policyholder>,
  ) {
    super(policyholderRepository);
  }

  async getPolicyholderRelation(id: number) {
    const query = await this.policyholderRepository.query(
      `
      WITH RECURSIVE policyholder_cte AS (
        SELECT
          id,
          name,
          superiorId,
          createdAt,
          1 AS depth,
          cast(1 as CHAR(1024)) AS tree_side
        FROM
          policyholder
        WHERE
          id = ?
        UNION ALL
        SELECT
          p.id,
          p.name,
          p.superiorId,
          p.createdAt,
          cte.depth + 1,
          CASE
              WHEN cte.depth = 1 THEN
                  CASE WHEN (
                        SELECT COUNT(1)
                        FROM policyholder sub
                        WHERE sub.superiorId = cte.id AND sub.createdAt < p.createdAt
                      ) = 0 THEN '2'
                      ELSE '3'
                  END
              ELSE cte.tree_side
          END AS tree_side
        FROM
          policyholder p
        INNER JOIN
          policyholder_cte cte ON p.superiorId = cte.id
    )
    SELECT
      cte.id AS code,
      cte.name AS name,
      cte.superiorId AS introducer_code,
      cte.createdAt AS registration_date,
      cte.tree_side AS tree_side,
      cte.depth AS depth
    FROM
      policyholder_cte cte
    WHERE
      cte.depth < 5
    ORDER BY
      cte.depth, cte.createdAt;
      `,
      [id],
    );

    if (!query.length) {
      throw new ValidationException({
        code: '400',
        message: '找不到相對應的保戶',
      });
    }

    const mainTree = {} as BinaryPolicyholderModel;
    const leftTree = [] as BinaryPolicyholderModel[];
    const rightTree = [] as BinaryPolicyholderModel[];

    (query as BinaryPolicyholderModel[]).map((model) => {
      switch (+model.tree_side) {
        case TreePositionEnum.MAIN:
          mainTree.code = model.code;
          mainTree.name = model.name;
          mainTree.introducer_code = model.introducer_code;
          mainTree.depth = model.depth;
          mainTree.tree_side = model.tree_side;
          mainTree.registration_date = model.registration_date;
          break;
        case TreePositionEnum.LEFT_TREE:
          leftTree.push(model);
          break;
        case TreePositionEnum.RIGHT_TREE:
          rightTree.push(model);
          break;
      }
    });

    return new FindPolicyholderRo(mainTree, leftTree, rightTree);
  }
}
