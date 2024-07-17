import "reflect-metadata";
import { Service } from "typedi";
import { SearchUsuarioDto } from "../dtos/usuario/search-user.dto";
import { Usuario } from "../models/user.entity";
import { UsuarioRepository } from "../repositories/user.repository";
@Service()
export class UsuarioService {
  constructor(private userRepository: UsuarioRepository) {}

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
