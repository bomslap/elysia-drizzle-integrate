import { t } from "elysia";

const ItemDto = t.Object({
  id: t.Numeric(),
  name: t.String({
    minLength: 1
  }),
  description: t.Optional(t.String())
});

export const CreateItemDto = t.Omit(ItemDto, ["id"]);
export type CreateItem = typeof CreateItemDto.static;

export const UpdateItemDto = t.Partial(CreateItemDto);
export type UpdateItem = typeof UpdateItemDto.static;

export const ItemParamsIdDto = t.Pick(ItemDto, ["id"]);
export type ItemParamsId = typeof ItemParamsIdDto.static;