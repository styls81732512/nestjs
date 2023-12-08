import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { Policyholder } from './entities/policyholder.entity';

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
        superiorId,
        createdAt,
        1 AS depth
      FROM
        policyholder
      WHERE
        id = ?
      UNION ALL
      SELECT
        p.id,
        p.superiorId,
        p.createdAt,
        depth + 1
      FROM
        policyholder p
      INNER JOIN
        policyholder_cte cte ON p.superiorId = cte.id
    )
      SELECT
        cte.id,
        cte.superiorId,
        cte.createdAt,
        cte.depth,
        CASE
          WHEN (
            SELECT
              COUNT(*)
            FROM
              policyholder sub
            WHERE
              sub.superiorId = cte.id AND sub.createdAt < cte.createdAt
            ) = 0 THEN 'Left Tree' ELSE 'Right Tree'
          END AS tree_position
      FROM
        policyholder_cte cte
      ORDER BY
        cte.depth, cte.createdAt;
    `,
      [id],
    );

    return query;
  }
}
