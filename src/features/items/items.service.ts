import db from "@/libs/drizzle/db";
import { CreateItem, UpdateItem } from "./items.dto";
import itemsTable from "./items.entity";
import { and, eq, ne } from "drizzle-orm";

export class ItemsService {
  async create(data: CreateItem) {
    const result = db.insert(itemsTable).values(data).returning().get();
    return result;
  }

  async findAll() {
    return db
      .select()
      .from(itemsTable)
      .where(ne(itemsTable.isDeleted, true))
      .all();
  }

  async findOne(id: number) {
    return db
      .select()
      .from(itemsTable)
      .where(and(eq(itemsTable.id, id), ne(itemsTable.isDeleted, true)))
      .get();
  }

  async update(id: number, data: UpdateItem) {
    return db
      .update(itemsTable)
      .set(data)
      .where(and(eq(itemsTable.id, id), ne(itemsTable.isDeleted, true)))
      .returning()
      .get();
  }

  async remove(id: number) {
    return db
      .update(itemsTable)
      .set({ isDeleted: true })
      .where(and(eq(itemsTable.id, id), ne(itemsTable.isDeleted, true)))
      .returning()
      .get();
  }
}
