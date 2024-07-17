import "reflect-metadata";
import { Service } from "typedi";
import { Usuario } from "../models/user.entity";
import { UsuarioRepository } from "../repositories/user.repository";
import { SearchUsuarioDto } from "../dtos/usuario/search-user.dto";
@Service()
export class UsuarioService {
  private userRepository: UsuarioRepository;
  // private isInitialized: Promise<void>;

  // constructor() {
  // this.isInitialized = this.init();
  // }

  // private async init() {
  //   this.AppDataSource = await getDataSource();
  //   this.repository = this.AppDataSource.getRepository(Usuario);
  // }

  async getUsers(request: SearchUsuarioDto) {
    // await this.isInitialized;
    return await this.userRepository.search(request);
  }

  async createUser(user: Usuario) {
    // await this.isInitialized;
    return await this.userRepository.save(user);
  }

  async getUserById(id: number) {
    // await this.isInitialized;
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number) {
    // await this.isInitialized;
    const user = await this.getUserById(id);
    await this.userRepository.update(id, { ...user });
    return this.getUserById(id);
  }

  async deleteUser(id: number) {
    // await this.isInitialized;
    const user = await this.getUserById(id);
    return await this.userRepository.delete(user);
  }
}
