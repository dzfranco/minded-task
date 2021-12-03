import * as dotenv from 'dotenv';

dotenv.config();
import { AppModule } from "@/app.module";
import { setupApplication } from "@/app.setup";
import { config } from "@/Config/environment";
import { swaggerOptions } from "@/Config/swagger";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  setupApplication(app);

  // Disable swagger ui for the production and testing environments
  if (config.isDev || config.isStaging) {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(process.env.APP_PORT);
}

bootstrap();
