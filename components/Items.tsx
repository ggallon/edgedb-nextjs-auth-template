import { ItemView, type ItemType } from "./item";

interface ItemProps {
  items: ItemType[];
}

export function Items({ items }: ItemProps) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {items.map((item) => (
        <ItemView key={item.id} item={item} />
      ))}
    </ul>
  );
}
