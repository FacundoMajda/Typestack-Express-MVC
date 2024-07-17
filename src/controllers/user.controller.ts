import "reflect-metadata";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  QueryParams
} from "routing-controllers";
import { Service } from "typedi";
import { SearchUsuarioDto } from "../dtos/usuario/search-user.dto";
import { UsuarioService } from "../services/user.service";

@Service()
@Controller("/users")
export class UserController {
  constructor(private userService: UsuarioService) {}

  // - - - - - //

  @Get("/")
  async getUsers(@QueryParams() request: SearchUsuarioDto) {
    return await this.userService.getUsers(request);
  }

  // - - - - - //

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    return await this.userService.getUserById(id);
  }

  @Post("/")
  async post(@Body() user: any) {
    return await this.userService.createUser(user);
  }

  @Patch("/:id")
  async put(@Param("id") id: number, @Body() user: any) {
    return await this.userService.updateUser(id);
  }

  @Delete("/:id")
  async remove(@Param("id") id: number) {
    return await this.userService.deleteUser(id);
  }
}
