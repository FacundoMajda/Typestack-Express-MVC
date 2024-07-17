import { Service } from "typedi";
import { Repository, SelectQueryBuilder } from "typeorm";
import { PaginatedDto } from "../common/pagination/dtos/paginated.dto";
import { SearchUsuarioDto } from "../dtos/usuario/search-user.dto";
import { Usuario } from "../models/user.entity";

@Service()
export class UsuarioRepository extends Repository<Usuario> {
  // constructor(private dataSource: AppDataSource) {
  //   super(Usuario, dataSource.createEntityManager());
  // }

  async search(request: SearchUsuarioDto): Promise<PaginatedDto<Usuario>> {
    const queryBuilder: SelectQueryBuilder<Usuario> =
      this.createQueryBuilder("Usuario");

    if (request.id) {
      queryBuilder.andWhere("Usuario.id = :id", {
        id: request.id,
      });
    }
    queryBuilder.orderBy("Usuario.id", "DESC");

    const [list, count] = await queryBuilder
      .skip(request.getOffset())
      .take(request.getTake())
      .getManyAndCount();

    return new PaginatedDto<Usuario>(list, count);
  }
}
