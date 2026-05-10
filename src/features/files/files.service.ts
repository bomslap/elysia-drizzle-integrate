import { FilesProvider, UploadFile } from "./files.provider";
import { FilesRepository } from "./files.repository";

export class FilesService {
  constructor(
    private provider: FilesProvider,
    private repository = new FilesRepository(),
  ) {}

  async upload(file: UploadFile) {
    const uploadResult = await this.provider.upload(file);
    await this.repository.create(uploadResult);
    return uploadResult;
  }

  async viewByFileId(fileId: string) {
    const file = await this.repository.findByFileId(fileId);
    if (!file) return undefined;
    return this.provider.view(file.storageName);
  }

  async editByFileId(fileId: string, file: UploadFile) {
    const target = await this.repository.findByFileId(fileId);
    if (!target) return undefined;

    await this.provider.edit(target.storageName, file);
    return target;
  }

  async removeByFileId(fileId: string) {
    const target = await this.repository.findByFileId(fileId);
    if (!target) return undefined;

    await this.provider.remove(target.storageName);
    await this.repository.removeByFileId(fileId);
    return target;
  }
}
