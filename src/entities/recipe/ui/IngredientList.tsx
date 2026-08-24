import React from 'react';
import { View } from 'react-native';
import { Ingredient, Recipe } from '../model/types';
import IngredientListItem from './IngredientListItem';

interface IngredientListProps {
  recipe: Recipe;
}

export const IngredientList: React.FC<IngredientListProps> = ({ recipe }) => {
  return (
    <View className="rounded-md border border-divider overflow-hidden">
      {recipe.ingredients.map((ingredient: Ingredient, index: number) => {
        const isLast = index === recipe.ingredients.length - 1;
          return (
            <IngredientListItem 
              key={index}
              ingredient={ingredient}
              isLast={isLast}
                    />
                );
            })}    
      </View>
  );
};

export default IngredientList;