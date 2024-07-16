import "reflect-metadata";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  QueryParams,
  UseAfter,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { PaginationDTO } from "../common/pagination/dtos/pagination.dto";
import { LoggerMiddleware } from "../middlewares/logger-middleware";
import { MyMiddleware } from "../middlewares/some-middleware";
import { UserService } from "../services/user.service";

@Service()
@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  // - - - - - //

  @UseBefore(MyMiddleware)
  @UseAfter(LoggerMiddleware)
  @Get("/")
  async getUsers(@QueryParams() paginationDto: PaginationDTO) {
    return await this.userService.getUsers(paginationDto);
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
