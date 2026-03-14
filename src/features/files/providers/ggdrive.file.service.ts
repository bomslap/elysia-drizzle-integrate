import { google } from "googleapis";
import { randomUUID } from "crypto";
import FileStorageProvider, {
  UploadFile,
  UploadFileResult,
  ViewFile,
} from "../files.provider";
import { fileToReadableStream } from "../files.util";

const ggauth = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

ggauth.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
})

const ggdrive = google.drive({
  version: "v3",
  auth: ggauth,
});

class GoogleDriveFileStorageService extends FileStorageProvider {
  constructor(private folderId: string) {
    super();
  }

  async upload(file: UploadFile): Promise<UploadFileResult> {
    const fileId = randomUUID();
    const stream = fileToReadableStream(file);

    const { data } = await ggdrive.files.create({
      requestBody: {
        name: fileId,
        parents: [this.folderId],
      },
      media: {
        body: stream,
        mimeType: file.type,
      },
    });

    const storageName = data.id!;

    return {
      fileId,
      storageName,
    };
  }

  async view(storageName: string): Promise<ViewFile> {
    const { data } = await ggdrive.files.get(
      {
        fileId: storageName,
        alt: "media",
      },
      {
        responseType: "stream",
      },
    );

    return data;
  }

  async edit(storageName: string, file: UploadFile): Promise<void> {
    const stream = fileToReadableStream(file);

    await ggdrive.files.update({
      fileId: storageName,
      media: {
        body: stream,
        mimeType: file.type,
      },
    });
  }

  async remove(storageName: string): Promise<void> {
    await ggdrive.files.delete({ fileId: storageName });
  }
}

export default GoogleDriveFileStorageService;
