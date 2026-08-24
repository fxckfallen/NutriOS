export interface Meal {
    name: string;
    type: 'Breakfast' | 'Dinner' | 'Lunch' | 'Snack';
    kcal: number;
    fats: number;
    proteins: number;
    carbs: number;
}