import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) => {
          return error.constraints[Object.keys(error.constraints)[0]];
        });;
        return new BadRequestException({
          error_code: 'INVALID_DATA',
          error_description: errorMessages.join(', '),
        });
      },
      stopAtFirstError: false,
    }),
  );
  await app.listen(8080);
}
bootstrap();
