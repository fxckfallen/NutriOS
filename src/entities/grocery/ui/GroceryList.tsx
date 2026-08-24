import React from 'react';
import { Text, View } from 'react-native';
import { GroceryItem } from '../model/types';
import { divideByCategory } from '../lib/divideByCategory';
import { GroceryListItem } from './GroceryListItem';

interface GroceryListProps {
  items: GroceryItem[];
  onCheck: (id: string, checked: boolean) => void;
}

export const GroceryList: React.FC<GroceryListProps> = ({ items, onCheck }) => {
  const grouped = divideByCategory(items);

  return (
    <View className="flex flex-col gap-lg w-full">
      {Object.entries(grouped).map(([category, categoryItems]) => (
        <View key={category} className="flex flex-col gap-sm">
          <Text className="text-titl font-semibold text-foreground capitalize">
            {category}
          </Text>
          <View className="flex flex-col gap-sm">
            {categoryItems.map((item) => (
              <GroceryListItem
                key={item.name}
                item={item}
                onCheck={(checked) => onCheck(item.name, checked)}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default GroceryList;