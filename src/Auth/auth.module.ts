import { jwtConstants } from "@/Auth/config/constants";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { FeatureRampsModule } from "@/Commons/featureRamp/featureRamps.module";
import { config } from "@/config/environment";
import { Logger, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { SessionSerializer } from "./services/session.serializer";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "@/User/user.module";

@Module({
  imports: [
    Logger,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: config.passport.sessionExpire},
    }),
    FeatureRampsModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    JwtStrategy,
    AuthService,
    LocalStrategy,
    SessionSerializer,
  ],
  exports: [AuthService],
})
export class AuthModule {
}
