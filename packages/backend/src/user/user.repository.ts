import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { schema } from 'src/db/schema';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.dto';
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

  async createUser(user: CreateUserDto) {
    const result = await this.db
      .insert(schema.user)
      .values(user)
      .onConflictDoNothing()
      .returning();

    if (!result) {
      throw new Error('User not found');
    }

    return result[0];
  }

  async updateUser(user: UpdateUserDto) {
    const result = this.db
      .update(schema.user)
      .set({
        username: user.username,
        password: user.password,
      })
      .where(eq(schema.user.id, user.id))
      .returning();

    if (!result) {
      throw new Error('User not found');
    }
    return result[0];
  }

  async deleteUser(id: string) {
    const result = this.db
      .delete(schema.user)
      .where(eq(schema.user.id, id))
      .returning();

    if (!result) {
      throw new Error('User not found');
    }
    return result[0];
  }
}
