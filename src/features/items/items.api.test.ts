import { describe, it, expect, beforeEach } from "bun:test";
import app from "@/app";
import db from "@/libs/drizzle/db";
import itemsTable from "./items.entity";

beforeEach(() => {
  db.delete(itemsTable).run();
});

describe("Items API CRUD", () => {

  it("POST /items", async () => {
    const res = await app.handle(
      new Request("http://localhost/api/items", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: "Item API"
        })
      })
    );

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.name).toBe("Item API");
  });

  it("GET /items", async () => {
    await app.handle(
      new Request("http://localhost/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Item1" })
      })
    );
    await app.handle(
      new Request("http://localhost/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Item2" })
      })
    );

    const res = await app.handle(
      new Request("http://localhost/api/items")
    );

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.length).toBe(2);
  });

  it("GET /items/:id", async () => {
    const create = await app.handle(
      new Request("http://localhost/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Item1" })
      })
    );

    const created = await create.json();

    const res = await app.handle(
      new Request(`http://localhost/api/items/${created.id}`)
    );

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.id).toBe(created.id);
  });

  it("PATCH /items/:id", async () => {
    const create = await app.handle(
      new Request("http://localhost/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Old" })
      })
    );

    const created = await create.json();

    const res = await app.handle(
      new Request(`http://localhost/api/items/${created.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "New"
        })
      })
    );

    const body = await res.json();

    expect(body.name).toBe("New");
  });

  it("DELETE /items/:id", async () => {
    const create = await app.handle(
      new Request("http://localhost/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Delete Me" })
      })
    );

    const created = await create.json();

    const res = await app.handle(
      new Request(`http://localhost/api/items/${created.id}`, {
        method: "DELETE"
      })
    );

    expect(res.status).toBe(200);

    const check = await app.handle(
      new Request(`http://localhost/api/items/${created.id}`)
    );
    
    expect(check.status).toBe(404);
  });

});