import Elysia from "elysia";
import openapi from "@elysiajs/openapi";
import itemsApi from "./features/items/items.api";
import { auth } from "./features/better-auth/auth.config";

const api = new Elysia({ prefix: "/api" }).use(itemsApi).mount(auth.handler);

const app = new Elysia().use(openapi()).use(api);

export default app;
