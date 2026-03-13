import { Elysia } from "elysia";
import { ItemsService } from "./items.service";
import { CreateItemDto, UpdateItemDto, ItemParamsIdDto } from "./items.dto";

const itemsService = new ItemsService();

const itemsApi = new Elysia({ prefix: "/items" })
  .post("/", async ({ body, status }) => {
    const item = await itemsService.create(body);
    return item ? status(201, item) : status(400);
  }, {
    body: CreateItemDto,
  })
  .get("/", () => itemsService.findAll())
  .get("/:id", async ({ params, status }) => { const item = await itemsService.findOne(params.id); return item ? status(200, item) : status(404) }, {
    params: ItemParamsIdDto,
  })
  .patch("/:id", ({ params, body }) => itemsService.update(params.id, body), {
    params: ItemParamsIdDto,
    body: UpdateItemDto,
  })
  .delete("/:id", ({ params }) => itemsService.remove(params.id), {
    params: ItemParamsIdDto,
  });

export default itemsApi;
