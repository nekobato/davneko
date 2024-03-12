import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
const betterSqlite = new Database('davneko.db');
const db = drizzle(betterSqlite);
migrate(db, { migrationsFolder: 'drizzle' });
betterSqlite.close();
