import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const port = process.env.PORT || 3005;
  app.enableCors() // CONNECT TO API
  await app.listen(
    port,
    () => console.info(`Server started at http://localhost:${port}`));
}
bootstrap();
