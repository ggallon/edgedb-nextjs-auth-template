import type { Item } from "@/db/edgedb/types";
import { DeleteItemButton } from "./DeleteItem";

export type ItemType = Omit<Item, "created_by"> & {
  created_by: {
    name: string;
    email: string | null;
  };
};

interface ItemProps {
  item: ItemType;
}

export function ItemView({ item }: ItemProps) {
  return (
    <li className="flex gap-x-4 py-5">
      <div className="flex-auto">
        <div className="flex items-baseline justify-between gap-x-4">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </p>
          <p className="flex-none text-xs text-gray-600">
            <time dateTime={item.updated?.toLocaleDateString()}>
              {item.updated?.toLocaleDateString()}
            </time>
          </p>
        </div>
        <div>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
            Author: {item.created_by.email ?? "N/A"}
          </p>
          <DeleteItemButton itemId={item.id} />
        </div>
      </div>
    </li>
  );
}
