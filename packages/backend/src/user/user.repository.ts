import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { schema } from 'src/db/schema';
import { CreateUserDto, UserDto } from './user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(@Inject() private db: BetterSQLite3Database<typeof schema>) {}

  async getUserByName(username: UserDto['username']) {
    return this.db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.username, username);
      },
    });
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.db
      .insert(schema.user)
      .values(user)
      .returning();

    return createdUser;
  }

  async getUserById(id: UserDto['id']) {
    return this.db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id);
      },
    });
  }

  async getUsers() {
    return this.db.query.user.findMany();
  }

  async updateUser(id: string, user: CreateUserDto) {
    return this.db
      .update(schema.user)
      .set(user)
      .where(eq(schema.user.id, id))
      .returning();
  }

  async deleteUser(id: string) {
    return this.db
      .delete(schema.user)
      .where(eq(schema.user.id, id))
      .returning();
  }
}
