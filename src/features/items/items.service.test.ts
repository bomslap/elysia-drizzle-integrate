import { describe, it, expect, beforeEach } from "bun:test";
import { ItemsService } from "./items.service";
import db from "@/libs/drizzle/db";
import itemsTable from "./items.entity";

const service = new ItemsService();

beforeEach(() => {
  db.delete(itemsTable).run();
});

describe("ItemsService CRUD", () => {
  it("create item", async () => {
    const item = await service.create({
      name: "Item A",
      description: "test"
    });

    expect(item.id).toBeDefined();
    expect(item.name).toBe("Item A");
  });

  it("findAll items", async () => {
    await service.create({ name: "Item1" });
    await service.create({ name: "Item2" });

    const list = await service.findAll();

    expect(list.length).toBe(2);
  });

  it("findOne item", async () => {
    const created = await service.create({
      name: "Item A"
    });

    const item = await service.findOne(created.id);

    expect(item?.id).toBe(created.id);
    expect(item?.name).toBe("Item A");
  });

  it("update item", async () => {
    const created = await service.create({
      name: "Old Name"
    });

    const updated = await service.update(created.id, {
      name: "New Name"
    });

    expect(updated.name).toBe("New Name");
  });

  it("delete item", async () => {
    const created = await service.create({
      name: "Delete Me"
    });

    await service.remove(created.id);

    const item = await service.findOne(created.id);

    expect(item).toBeUndefined();
  });
});