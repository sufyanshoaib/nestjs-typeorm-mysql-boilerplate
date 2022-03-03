import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * If Versioning Type is URI, the version number in uri after the context path needs to be set like `/v$versionNumber/` 
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /**
   * If Versioning Type is Header, the specified header needs to be set with the version value
   */
  /*app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Version-Info',
  });*/

  const config = new DocumentBuilder()
    .setTitle('Nestjs Boilerplate API')
    .setDescription("Auto generated API Documentation using Swagger")
    .setVersion("1.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/doc", app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
