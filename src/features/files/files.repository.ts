import db from "@/libs/drizzle/db";
import { eq } from "drizzle-orm";
import filesTable from "./files.entity";

export type CreateFileStorage = {
  fileId: string;
  storageName: string;
};

export class FilesRepository {
  async create(data: CreateFileStorage) {
    return db.insert(filesTable).values(data).returning().get();
  }

  async findByFileId(fileId: string) {
    return db.select().from(filesTable).where(eq(filesTable.fileId, fileId)).get();
  }

  async removeByFileId(fileId: string) {
    return db.delete(filesTable).where(eq(filesTable.fileId, fileId)).returning().get();
  }
}
