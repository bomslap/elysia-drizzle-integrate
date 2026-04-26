import Elysia, { t } from "elysia";
import GoogleDriveFileStorageService from "./providers/ggdrive.file.service";

const service = new GoogleDriveFileStorageService(
  process.env.GGDRIVE_FOLDERID!,
);

const filesApi = new Elysia({ prefix: "/files" })
  .post(
    "/",
    async ({ body: { image } }) => {
      const file = await service.upload(image);
      return file;
    },
    {
      body: t.Object({ image: t.File() }),
    },
  )
  .get("/:storageName", ({ params: { storageName } }) =>
    service.view(storageName),
  );

export default filesApi;
