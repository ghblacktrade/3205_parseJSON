import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: config.general.isDevmode ? false : undefined,
    }),
  );
  app.use(compression());
  await app.listen(5000);
}

bootstrap();
