import { Service } from "typedi";
import { PaginationDTO } from "../common/pagination/dtos/pagination.dto";
import { Usuario } from "../models/user.entity";
import "reflect-metadata";
import { FindManyOptions, FindOptions, Repository } from "typeorm";
import { getDataSource } from "../config/database/data-source";
import { PaginatedResponse } from "../common/pagination/interfaces/paginated-response";

@Service()
export class UserService {
  private AppDataSource;
  private repository: Repository<Usuario>;
  private isInitialized: Promise<void>;

  constructor() {
    this.isInitialized = this.init();
  }

  private async init() {
    this.AppDataSource = await getDataSource();
    this.repository = this.AppDataSource.getRepository(Usuario);
  }

  private getOrder(sortBy: string, sortOrder: "ASC" | "DESC"): any {
    return sortBy ? { [sortBy as keyof Usuario]: sortOrder } : undefined;
  }

  async search(
    paginationDto: PaginationDTO,
    where: FindManyOptions<Usuario>["where"] = {}
  ): Promise<PaginatedResponse<Usuario>> {
    await this.isInitialized;
    const { page, limit, sortBy, sortOrder } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.repository.findAndCount({
      where,
      skip,
      take: limit,
      order: this.getOrder(sortBy, sortOrder),
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
        sortBy,
        sortOrder,
      },
    };
  }

  async getUsers(paginationDto: PaginationDTO) {
    await this.isInitialized;
    return await this.search(paginationDto);
  }

  async createUser(user: Usuario) {
    await this.isInitialized;
    return await this.repository.save(user);
  }

  async getUserById(id: number) {
    await this.isInitialized;
    return await this.repository.findOne({ where: { id } });
  }

  async updateUser(id: number) {
    await this.isInitialized;
    const user = await this.getUserById(id);
    await this.repository.update(id, { ...user });
    return this.getUserById(id);
  }

  async deleteUser(id: number) {
    await this.isInitialized;
    const user = await this.getUserById(id);
    return await this.repository.delete(user);
  }
}
