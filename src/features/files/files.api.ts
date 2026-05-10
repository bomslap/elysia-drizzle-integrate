import Elysia, { t } from "elysia";
import GoogleDriveFileStorageService from "./providers/ggdrive.file.service";
// import LocalFileStorageService from "./providers/local.file.service";
import { FilesService } from "./files.service";

const provider = new GoogleDriveFileStorageService(
  process.env.GGDRIVE_FOLDERID!,
);
const service = new FilesService(provider);

const filesApi = new Elysia({ prefix: "/files" })
  .post(
    "/",
    async ({ body: { image }, status }) => {
      const file = await service.upload(image);
      return file ? status(201, file) : status(400);
    },
    {
      body: t.Object({ image: t.File() }),
    },
  )
  .get("/:fileId", async ({ params: { fileId }, status }) => {
    const file = await service.viewByFileId(fileId);
    return file ? status(200, file) : status(404);
  }, {
    params: t.Object({
      fileId: t.String(),
    }),
  });

export default filesApi;
