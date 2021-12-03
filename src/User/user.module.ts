import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "@/User/model/user.model";
import { UserProviders } from "@/User/user.providers";
import { USER_IDENTIFIERS } from "@/User/public/constants";
import { UserController } from "@/User/controllers/user.controller";
import { FeatureRampsModule } from "@/Commons/featureRamp/featureRamps.module";
import { GeocodingModule } from "@/Geocoding/geocoding.module";

@Module({
  imports: [GeocodingModule, FeatureRampsModule, SequelizeModule.forFeature([User])],
  providers: [
    ...UserProviders,
  ],
  controllers: [UserController],
  exports: [USER_IDENTIFIERS.UserService]
})
export class UserModule {
}
