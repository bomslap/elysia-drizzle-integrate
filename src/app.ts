import Elysia from "elysia";
import openapi from "@elysiajs/openapi";
import itemsApi from "./features/items/items.api";
import filesApi from "./features/files/files.api";

const api = new Elysia({ prefix: "/api" }).use(itemsApi).use(filesApi);

const app = new Elysia().use(openapi()).use(api);

export default app;
