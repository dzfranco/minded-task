import { UserModule } from "@/User/user.module";
import request from 'supertest';

process.env.SENDGRID_API_KEY = "SG.mymockKey";
process.env.SENDGRID_FROM_ADDRESS = "mock@email.com";

import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "@/Auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "@/User/model/user.model";
import { Repository, Sequelize } from "sequelize-typescript";
import { IUser } from "@/User/interfaces";
import { USER_DEFAULT_PASSWORD, UserFactory } from "../../dataset/user";
import passport from "passport";
import { GeocodingModule } from "@/Geocoding/geocoding.module";

describe("Auth Service", () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let sequelize: Sequelize;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        SequelizeModule.forRoot({
          dialect: 'mysql',
          database: 'minded_local',
          username: 'root',
          password: 'root',
          autoLoadModels: true,
          synchronize: true,
          models: [User],
        }),
        UserModule,
        GeocodingModule,
      ]
    }).compile();
    app = testingModule.createNestApplication();
    app.use(passport.initialize())
    app.use(passport.session());
    sequelize = testingModule.get<Sequelize>(Sequelize);
    userRepo = sequelize.getRepository<User>(User);
    await app.init();
  });

  beforeEach(async () => {
    await userRepo.destroy({where: {}, force: true})
  });

  it("should login", async () => {
    const userToInsert: IUser = UserFactory.build();
    await userRepo.create(userToInsert);
    const result = await request(app.getHttpServer())
      .post('/auth/login')
      .send({email: userToInsert.email, password: USER_DEFAULT_PASSWORD});
    expect(result.status).toEqual(HttpStatus.OK);
    expect(result.body).toMatchObject({access_token: expect.any(String)})
  });

  it("should not login with a wrong password", async () => {
    const userToInsert: IUser = UserFactory.build();
    await userRepo.create(userToInsert);
    const result = await request(app.getHttpServer())
      .post('/auth/login')
      .send({email: userToInsert.email, password: 'invalidPassword'});
    expect(result.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  // it("should fail to sign up... weak password", async () => {
  //   let fails;
  //   try {
  //     await authService.signUp({
  //       email: "test@gmail.com",
  //       password: "test",
  //       dob: "1990-01-01",
  //       zipCode: "10001",
  //     });
  //     fails = false;
  //   } catch {
  //     fails = true;
  //   }
  //
  //   expect(fails).toEqual(true);
  // });

  // it("should fail to sign up ... IP Address exists", async () => {
  //   let fails;
  //   try {
  //     await authService.verifyIpAddress("oldIp");
  //     await authService.signUp({
  //       email: "test@gmail.com",
  //       password: "Superpassw0rd!",
  //       dob: "1990-01-01",
  //       zipCode: "10001",
  //     });
  //     fails = false;
  //   } catch {
  //     fails = true;
  //   }
  //   expect(fails).toEqual(true);
  // });

  // it("should sign up ... IP Address is new", async () => {
  //   let fails;
  //   try {
  //     await authService.verifyIpAddress("newIp");
  //     await authService.signUp({
  //       email: "test@gmail.com",
  //       password: "Superpassw0rd!",
  //       dob: "1990-01-01",
  //       zipCode: "10001",
  //     });
  //     fails = false;
  //   } catch (err) {
  //     fails = true;
  //   }
  //   expect(fails).toEqual(false);
  // });

  // it("should sign up", async () => {
  //   const response = await authService.signUp({
  //     email: "test@gmail.com",
  //     password: "Superpassw0rd!",
  //     dob: "1990-01-01",
  //     zipCode: "10001",
  //   });
  //   expect(response).toEqual({...mockUser});
  // });
});
