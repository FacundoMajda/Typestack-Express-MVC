import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/models/base-entity";

@Entity("usuario")
export class Usuario extends BaseEntity {
  @Column()
  name: string;
  @Column()
  password: string;
}
