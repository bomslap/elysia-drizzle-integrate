import Elysia from "elysia";
import openapi from "@elysiajs/openapi";
import itemsApi from "./features/items/items.api";

const api = new Elysia({ prefix: "/api" }).use(itemsApi);

const app = new Elysia().use(openapi()).use(api);

export default app;
