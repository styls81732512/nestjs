import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Policyholder{
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '保戶編號',
  })
  id: number;

  @ManyToOne(() => Policyholder, {
    createForeignKeyConstraints: false,
  })
  superior: Policyholder;

  @Column({
    type: 'int',
    comment: '上級ID',
    nullable: true,
  })
  superiorId: number;

  @Column({
    type:'varchar',
    comment:'保戶姓名'
  })
  name:string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}