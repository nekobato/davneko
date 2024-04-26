import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from 'src/db/schema';
import { eq, sql } from 'drizzle-orm';
import { QueueStatus } from './queue.dto';

@Injectable()
export class QueueRepository {
  constructor(@Inject() private db: BetterSQLite3Database<typeof schema>) {}

  async findQueueByUserId(userId: string, status: QueueStatus) {
    return this.db.query.queue.findMany({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.userId, userId),
          operators.eq(fields.status, status),
        );
      },
    });
  }

  async findPlayedByUserId(userId: string) {
    return this.db.query.queue.findMany({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.userId, userId),
          operators.eq(fields.status, 'played'),
        );
      },
    });
  }

  async create(createQueueDto: {
    id: string;
    audioId: string;
    userId: string;
    orderInQueue: number;
  }) {
    return this.db.insert(schema.queue).values(createQueueDto).returning();
  }

  async findAllByUserId(userId: string) {
    return this.db.query.queue.findMany({
      where(fields, operators) {
        return operators.eq(fields.userId, userId);
      },
    });
  }

  async updateQueueStatus(id: string, status: 'upcoming' | 'played') {
    return this.db
      .update(schema.queue)
      .set({
        status,
      })
      .where(eq(schema.queue.id, id))
      .returning();
  }

  async findQueueById(id: string) {
    return this.db.query.queue.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id);
      },
    });
  }

  async deleteQueue(id: string) {
    return this.db.delete(schema.queue).where(eq(schema.queue.id, id));
  }

  async updatePlayedAt(id: string) {
    return this.db
      .update(schema.queue)
      .set({
        playedAt: new Date().toISOString(),
      })
      .where(eq(schema.queue.id, id))
      .returning();
  }

  async reOrderQueueToEarlier(
    userId: string,
    queueId: string,
    newOrder: number,
  ) {
    return this.db.transaction(() => {
      this.db
        .update(schema.queue)
        .set({
          orderInQueue: newOrder,
        })
        .where(eq(schema.queue.userId, userId))
        .execute();
      this.db
        .update(schema.queue)
        .set({
          orderInQueue: sql`order_in_queue + 1`,
        })
        .where(
          sql`order_in_queue >= ${newOrder} AND user_id = ${userId} AND id != ${queueId}`,
        )
        .execute();
    });
  }

  async reOrderQueueToLater(userId: string, queueId: string, newOrder: number) {
    return this.db.transaction(() => {
      this.db
        .update(schema.queue)
        .set({
          orderInQueue: newOrder,
        })
        .where(eq(schema.queue.userId, userId))
        .execute();
      this.db
        .update(schema.queue)
        .set({
          orderInQueue: sql`order_in_queue - 1`,
        })
        .where(
          sql`order_in_queue <= ${newOrder} AND user_id = ${userId} AND id != ${queueId}`,
        )
        .execute();
    });
  }
}
