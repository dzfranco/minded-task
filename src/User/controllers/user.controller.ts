import { Controller, Get, Inject, Request, UseGuards, } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { USER_IDENTIFIERS } from "@/User/public/constants";
import { IUserService } from "@/User/public/interfaces";
import { JwtAuthGuard } from "@/Auth/guards/jwt-auth.guard";
import { UserEntity } from "@/User/public/entity/user.entity";


@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(@Inject(USER_IDENTIFIERS.UserService) private readonly userService: IUserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('zipcode-validation')
  public async validateZipCode(@Request() req) {
    return this.userService.validateZipCode(req.user.id, req.user.email);
  }

  /**
   * Logs out request
   * @param req
   */
  @UseGuards(JwtAuthGuard)
  @Get("")
  public async info(@Request() req) {
    const user: UserEntity = await this.userService.getById(req.user.id)
    const {password, ...cleanUser} = user;
    return cleanUser;
  }

}
