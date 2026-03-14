import { randomUUID } from "crypto";
import FileStorageProvider, { UploadFile, UploadFileResult, ViewFile } from "../files.provider";

class LocalFileStorageService extends FileStorageProvider {

  constructor(private baseDir: string){
    super();
  }

  async upload(file: UploadFile): Promise<UploadFileResult> {
    const fileId = randomUUID();
    const ext = 'jpg';
    const storageName = `${this.baseDir}/${fileId}.${ext}`;

    await Bun.write(storageName, file);
    return {
      fileId,
      storageName
    };
  }

  async view(storageName: string): Promise<ViewFile> {
    return Bun.file(storageName);
  }

  async edit(storageName: string, file: File): Promise<void> {
    await Bun.write(storageName, file);
  }

  async remove(storageName: string): Promise<void> {
    await Bun.file(storageName).delete();
  }
}

export default LocalFileStorageService;