export interface OnboardingAnswers {
  goal: 'lose-weight' | 'build-muscle' | 'maintain' | 'save-money' | 'other';
  goalOther?: string; // только если goal === 'other'
  name: string;
  sex: 'male' | 'female';
  age: number;
  height: number; // cm
  weight: number; // kg
  lifestyle: 'sedentary' | 'moderate' | 'active';
  budget: number;
  currency: 'RUB' |  'USD' | 'EUR' ;
}

export interface NutritionGoal {
  calories: number;
  proteins: number; //g
  fats: number; //g
  carbs: number; //g
}