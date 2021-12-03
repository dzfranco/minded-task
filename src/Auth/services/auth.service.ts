import { UserCredentialsDto } from "@/Auth/dto/userCredentials.dto";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { AuthUser } from "../interfaces/authUser.interface";
import { IUserService } from "@/User/public/interfaces";
import { UserEntity } from "@/User/public/entity/user.entity";
import { UserLoginDto } from "@/Auth/dto/userLogin.dto";
import { UserErrorMessages } from "@/Auth/error";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
    private readonly userService: IUserService
  ) {
  }

  /**
   * Validates a user by comparing a hash vs a password
   * @param {string} plainPass - The password as given by the user
   * @param {string} hashedPass - The hashed password as stored in the DB
   * @return {Promise<void>}
   * @throws {NotFoundException}
   */
  private async validateHash(plainPass: string, hashedPass: string): Promise<void> {
    const isValid: boolean = await bcrypt.compare(plainPass, hashedPass);
    if (!isValid) {
      throw new NotFoundException(UserErrorMessages.INVALID_USERNAME_OR_PASSWORD);
    }
  }

  async validateEmail(email: string) {
    return true;
  }


  async validateCredentials(
    userCredentialsDto: UserCredentialsDto
  ): Promise<AuthUser | void> {
    // TODO: missing implementation
  }

  async verifyPassResetToken(...args): Promise<boolean> {
    // TODO: missing implementation
    return false;
  }

  async invalidateResetToken(token: string) {
    // TODO: missing implementation
  }

  /**
   * @description Logs the user and returns the information
   * @param {UserLoginDto} payload - Information as given by the user, by no means should
   * it be considered valid
   * @returns {Promise<UserCredentialsDto>}
   */
  async login(payload: UserLoginDto): Promise<UserCredentialsDto> {
    const user: UserEntity = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.INVALID_USERNAME_OR_PASSWORD)
    }
    await this.validateHash(payload.password, user.password);
    const {password, ...cleanUser} = user
    return cleanUser
  }


  async signUp(userDto: UserCredentialsDto) {
    // TODO: missing implementation
  }

  /**
   * Creates Reset Pass token
   * Valid for 12 hours
   * @param email
   * @param userId
   */
  async createResetToken(email: string, userId: string) {
    // TODO: missing implementation
  }

  /**
   * Resets password
   */
  async resetPassword(email: string, password: string) {
    // TODO: missing implementation
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Signs JWT token
   */
  private async signJwtToken(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
