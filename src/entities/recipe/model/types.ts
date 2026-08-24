export interface Ingredient {
    name: string;
    kcal: number;
    amount: number;
    unit: string;
}

export interface RecipeStep {
    index: number;
    body: string;
}

export interface Recipe {
    ingredients: Ingredient[];
    steps: RecipeStep[];
}

