import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const filesTable = sqliteTable("files", {
  fileId: text("file_id").primaryKey(),
  storageName: text("storage_name").notNull(),
});

export default filesTable;
