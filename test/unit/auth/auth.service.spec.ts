import { AuthService } from "@/Auth/services/auth.service";
import { Logger, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/User/service/user.service";
import { jest } from "@jest/globals";
import { IUser } from "@/User/interfaces";
import { USER_DEFAULT_PASSWORD, UserFactory } from "../../dataset/user";
import { UserLoginDto } from "@/Auth/dto/userLogin.dto";
import { UserErrorMessages } from "@/Auth/error";

describe('Auth Service', function () {
  let sut: AuthService;
  const jwtService: JwtService = new JwtService({secret: process.env.JWT_SECRET});
  const logger: Logger = new Logger();
  const userService: UserService = new (UserService as jest.Mock<UserService>)();

  beforeAll(() => {
    sut = new AuthService(jwtService, logger, userService)
  })

  beforeEach(() => {
    jest.resetAllMocks();
  })

  describe('Login', () => {
    it('should login a user with the proper credentials', async () => {
      const user: IUser = UserFactory.build();
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(user);
      const loginPayload: UserLoginDto = {email: user.email, password: USER_DEFAULT_PASSWORD};
      const result = await sut.login(loginPayload);
      const {password, ...expectedUser} = user;
      expect(result).toEqual(expectedUser)
    });

    it('should throw an error when trying to login a user with incorrect credentials', async () => {
      const user: IUser = UserFactory.build();
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(user);
      const loginPayload: UserLoginDto = {email: user.email, password: 'invalidPassword'};
      try {
        await sut.login(loginPayload)
        fail('It should have thrown an error');
      } catch (error) {
        expect(error.message).toEqual(UserErrorMessages.INVALID_USERNAME_OR_PASSWORD);
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  })


});
