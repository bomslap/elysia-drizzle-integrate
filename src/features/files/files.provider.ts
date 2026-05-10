import { BunFile } from "bun";
import { Readable } from "stream";

export type UploadFile = File | BunFile;

export type UploadFileResult = {
  fileId: string;
  storageName: string;
};

export type ViewFile = File | BunFile | Readable;

export abstract class FilesProvider {
  abstract upload(file: UploadFile): Promise<UploadFileResult>

  abstract view(storageName: string): Promise<ViewFile>

  abstract edit(storageName: string, file: UploadFile): Promise<void>

  abstract remove(storageName: string): Promise<void>
}