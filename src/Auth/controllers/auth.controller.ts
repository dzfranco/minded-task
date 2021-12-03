import { UserLoginDto } from "@/Auth/dto/userLogin.dto";
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  NotFoundException,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateResetPassDto } from "../dto/createPassResetToken.dto";
import { ResetPassDto } from "../dto/resetPass.dto";
import { UserCredentialsDto } from "../dto/userCredentials.dto";
import { LoginGuard } from "../guards/login.guard";
import { ResetPassTokenGuard } from "../guards/reset-pass-token.guard";
import { AuthService } from "../services/auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint behind a guard that is synchronized with a passport local
   * strategy.
   *
   * Exposes a request.user object that can be logged in
   *
   * @param userCredentialsDto
   * @param request
   */
  @UseGuards(LoginGuard)
  @Post("login")
  public async login(@Body() userCredentialsDto: UserLoginDto, @Req() request) {
    return this.authService.login(request.user);
  }

  @ApiHeader({
    name: "user-agent",
    required: true,
    allowEmptyValue: false,
    schema: {
      type: "string",
      default: "X-Minded User Agent",
    },
  })
  @Post("sign-up")
  public async signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
    @Headers("user-agent") userAgent?: string
  ) {
    return await this.authService.signUp(userCredentialsDto);
  }

  /**
   * Logs out request
   * @param req
   */
  @Get("logout")
  public async logout(@Request() req) {
    return req.logout();
  }

  /**
   * Verifies User Reset Pass Token
   * @param query
   */
  @ApiQuery({
    name: "tokenString",
    description: "Password reset token",
    required: true,
    type: String,
  })
  @ApiQuery({
    name: "email",
    description: "email associated with Token",
    required: true,
    type: String,
  })
  @UseGuards(ResetPassTokenGuard)
  @Get("verify-reset-token")
  public async verifyPassResetToken(@Query() query) {
    const validToken = await this.authService.verifyPassResetToken(
      query.tokenString,
      query.email
    );

    if (validToken) {
      return { validToken: true };
    }

    throw new ForbiddenException();
  }

  /**
   * Initiates User pass reset request
   * Post
   *
   * Creates resetToken and assigns it to a user
   *
   */
  @Post("reset-pass-token")
  public async createPassResetToken(
    @Body() createResetPassDto: CreateResetPassDto
  ) {
    try {
      const user = await this.authService.validateEmail(
        createResetPassDto.email
      );

      if (!user) {
        throw new NotFoundException();
      }

      const token = await this.authService.createResetToken(
        createResetPassDto.email,
        "USER_ID"
      );

      return {
        tokenCreated: true,
      };
    } catch {
      throw new NotFoundException();
    }
  }

  /**
   * Updates a user password
   *
   * Verifies that the token is valid
   * Resets a password
   * Invalidates the token used for the operation
   *
   * @param resetPassDto
   */
  @Patch("reset-password")
  public async resetPassword(@Body() resetPassDto: ResetPassDto) {
    const validToken = await this.authService.verifyPassResetToken(
      resetPassDto.tokenString,
      resetPassDto.email
    );

    if (validToken) {
      await this.authService.resetPassword(
        resetPassDto.email,
        resetPassDto.password
      );

      await this.authService.invalidateResetToken(resetPassDto.tokenString);

      return {
        updated: true,
      };
    }
    throw new ForbiddenException();
  }
}
