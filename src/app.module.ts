import { dbConfig } from "@/Config/db";
import { config } from "@/Config/environment";
import { loggerConfig } from "@/Config/logger";
import { HealthModule } from "@/health/health.module";
import { Module, NestModule } from "@nestjs/common";
import { RedisModule } from "nestjs-redis";
import { UserModule } from '@/User/user.module';
import { AuthModule } from "@/Auth/auth.module";

const appImports = [
  dbConfig,
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
  AuthModule,
  UserModule
];

@Module({
  imports: appImports,
})
export class AppModule implements NestModule {
  configure(): void {
    // Configuration
  }
}
