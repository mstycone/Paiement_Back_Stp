import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    //intercepte les données entrant dans le controller/Req HTTP
    new ValidationPipe({
      forbidNonWhitelisted: true, //Rejette violemment les requêtes avec des données interdites + 400 Error
      whitelist: true, //Filtre les données pour ne garder que ce qui est prévu
      transform: true, //Convertit les types de données
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Application failed to start', err);
  process.exit(1);
});

/* Transforme: true*/
/*
Protocole HTTP converti tout sous forme string tranforme permet la conversion selon ce qui est 
attendu dans le code par exemple id: number sera converti en number lorsque que la requête sera
intercepté
*/
