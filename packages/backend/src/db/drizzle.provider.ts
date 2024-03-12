import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sqlite3 from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

@Injectable()
export class DrizzleProvider implements OnModuleInit {
  db: BetterSQLite3Database;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const sqlite_db_name =
      'davneko_' + this.configService.get<string>('app.env') + '.db';

    const newDb = new sqlite3(
      sqlite_db_name,
      sqlite3.OPEN_READWRITE,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
      },
    );
    this.db = drizzle(newDb);

    migrate(this.db, { migrationsFolder: './src/db/migrations' });
  }
}
