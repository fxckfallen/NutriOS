import { GroceryItem } from '../model/types';

export const divideByCategory = (items: GroceryItem[]) => {
  const grouped: Record<string, GroceryItem[]> = {};

  for (const item of items) {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  }

  return grouped; // { proteins: [...], vegetables: [...] }
};