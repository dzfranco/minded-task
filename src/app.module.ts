import { config } from "@/Config/environment";
import { loggerConfig } from "@/Config/logger";
import { HealthModule } from "@/health/health.module";
import { Module, NestModule } from "@nestjs/common";
import { RedisModule } from "nestjs-redis";
import { UserModule } from '@/User/user.module';
import { AuthModule } from "@/Auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "@/User/model/user.model";
import { GeocodingModule } from './Geocoding/geocoding.module';

const appImports = [
  AuthModule,
  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'minded_local',
    autoLoadModels: true,
    synchronize: true,
  }),
  loggerConfig,
  HealthModule,
  RedisModule.forRootAsync({
    useFactory: () => ({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
      keepAlive: config.redis.ttl,
    }),
  }),
  UserModule,
  GeocodingModule,
];

@Module({
  imports: appImports,
})
export class AppModule implements NestModule {
  configure(): void {
    // Configuration
  }
}
