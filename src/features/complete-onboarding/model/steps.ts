export type OnboardingStep =
  | 'goal'
  | 'goal-confirmation'
  | 'profile'   // имя, пол, возраст
  | 'body'      // рост, вес
  | 'lifestyle'
  | 'budget'
  | 'building-plan'
  | 'plan-ready';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'goal', 'goal-confirmation', 'profile', 'body',
  'lifestyle', 'budget', 'building-plan', 'plan-ready',
];  