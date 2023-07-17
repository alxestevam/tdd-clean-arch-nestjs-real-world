import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configure(app: INestApplication) {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
}
