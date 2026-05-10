import { randomUUID } from "crypto";
import { FilesProvider, UploadFile, UploadFileResult, ViewFile } from "../files.provider";

class LocalFileStorageService extends FilesProvider {

  constructor(private baseDir: string){
    super();
  }

  async upload(file: UploadFile): Promise<UploadFileResult> {
    const fileId = randomUUID();
    const ext = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "application/pdf": "pdf"
    };
    const fileExt = ext[file.type as keyof typeof ext] ?? "bin";
    const storageName = `${this.baseDir}/${fileId}.${fileExt}`;

    await Bun.write(storageName, file);
    return {
      fileId,
      storageName
    };
  }

  async view(storageName: string): Promise<ViewFile> {
    return Bun.file(storageName);
  }

  async edit(storageName: string, file: UploadFile): Promise<void> {
    await Bun.write(storageName, file);
  }

  async remove(storageName: string): Promise<void> {
    await Bun.file(storageName).delete();
  }
}

export default LocalFileStorageService;