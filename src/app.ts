import Elysia from "elysia";
import openapi from "@elysiajs/openapi";
import itemsApi from "./features/items/items.api";
import ejs from "ejs";

const api = new Elysia({ prefix: "/api" }).use(itemsApi).get("/:name", ({ params }) => ejs.renderFile("./src/features/mails/templates/template1.ejs", params));

const app = new Elysia().use(openapi()).use(api);

export default app;
