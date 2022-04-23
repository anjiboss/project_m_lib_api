import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// interface ConditionOptions {
//   limit: number | undefined;
//   page: number | undefined;
// }

@Entity()
export class Menu {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  altName: string;

  @Column()
  country: string;

  // get(conditions: ConditionOptions) {
  //   return AppDataSource.manager.getRepository(Menu).findAndCount({
  //     take: conditions.limit,
  //     skip: conditions.limit
  //       ? conditions.limit * (conditions.page || 1)
  //       : undefined,
  //   });
  // }
}
