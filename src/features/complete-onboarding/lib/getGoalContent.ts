import { Dumbbell, Flame, Heart, PiggyBank, Sparkles, LucideIcon } from 'lucide-react-native';
import { OnboardingAnswers } from '../model/types'; // Проверь правильность пути до типов

interface GoalContent {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const getGoalContent = (goal: OnboardingAnswers['goal']): GoalContent => {
  switch (goal) {
    case 'lose-weight':
      return {
        icon: Flame,
        title: 'Great choice.',
        description: "We'll build your plan around Lose Weight — calorie-conscious recipes, matched to your budget every week.",
      };
    case 'build-muscle':
      return {
        icon: Dumbbell,
        title: 'Great choice.',
        description: "We'll build your plan around Build Muscle — recipes rich in protein, matched to your budget every week.",
      };
    case 'maintain':
      return {
        icon: Heart,
        title: 'Great choice.',
        description: "We'll build your plan around Maintaining Health — balanced and nutritious recipes, matched to your budget every week.",
      };
    case 'save-money':
      return {
        icon: PiggyBank,
        title: 'Smart choice.',
        description: "We'll build your plan around Saving Money — cost-effective, delicious recipes, matched to your budget every week.",
      };
    case 'other':
    default:
      return {
        icon: Sparkles,
        title: 'Awesome.',
        description: "We'll build a personalized plan just for you — tailored recipes, matched to your budget every week.",
      };
  }
};