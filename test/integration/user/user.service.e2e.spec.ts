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
import {
  MINDED_USER_ETERNAL_TOKEN,
  UserFactory,
  EXTERNAL_USER_ETERNAL_TOKEN
} from "../../dataset/user";
import passport from "passport";
import { GeocodingModule } from "@/Geocoding/geocoding.module";

describe("User Service", () => {
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

  describe('GET /', () => {
    it("should give the user info", async () => {
      const userToInsert: IUser = UserFactory.build();
      await userRepo.create(userToInsert);
      const result = await request(app.getHttpServer())
        .get('/user')
        .set(`Authorization`, `Bearer ${MINDED_USER_ETERNAL_TOKEN}`)
      expect(result.status).toEqual(HttpStatus.OK);
      const {password, ...cleanUser} = userToInsert;
      expect(result.body).toEqual(cleanUser)
    });
  });

  describe('GET /zipcode-validation', () => {
    it("should not allow users with a non Minded email to use the feature flag", async () => {
      const userToInsert: IUser = UserFactory.build();
      await userRepo.create(userToInsert);
      const result = await request(app.getHttpServer())
        .get('/user/zipcode-validation')
        .set(`Authorization`, `Bearer ${EXTERNAL_USER_ETERNAL_TOKEN}`)
      expect(result.status).toEqual(HttpStatus.NOT_FOUND);
    });

    it("should allow users with Minded emails to use the feature flag", async () => {
      const userToInsert: IUser = UserFactory.build();
      await userRepo.create(userToInsert);
      const result = await request(app.getHttpServer())
        .get('/user/zipcode-validation')
        .set(`Authorization`, `Bearer ${MINDED_USER_ETERNAL_TOKEN}`)
      expect(result.status).toEqual(HttpStatus.OK);
    });

    it("should return false for zip codes outside NY", async () => {
      const userToInsert: IUser = UserFactory.build({zipCode: '77379'});
      await userRepo.create(userToInsert);
      const result = await request(app.getHttpServer())
        .get('/user/zipcode-validation')
        .set(`Authorization`, `Bearer ${MINDED_USER_ETERNAL_TOKEN}`)
      expect(result.status).toEqual(HttpStatus.OK);
      expect(result.body.zipCodeValid).toEqual(false);
    });

    it("should return true for zip codes inside NY", async () => {
      const userToInsert: IUser = UserFactory.build({zipCode: '10001'});
      await userRepo.create(userToInsert);
      const result = await request(app.getHttpServer())
        .get('/user/zipcode-validation')
        .set(`Authorization`, `Bearer ${MINDED_USER_ETERNAL_TOKEN}`)
      expect(result.status).toEqual(HttpStatus.OK);
      expect(result.body.zipCodeValid).toEqual(true);
    });
  })

});
