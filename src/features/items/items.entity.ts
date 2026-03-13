import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const itemsTable = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  isDeleted: integer("is_deleted", { mode: "boolean" }).default(false)
});

export default itemsTable;
