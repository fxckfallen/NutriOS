import { BackButton, ProgressBar } from '@/shared/ui';
import { getPercentage } from '@/shared/lib';
import { Text, View } from 'react-native';

import { useOnboarding } from '../model/useOnboarding';

import GoalStep from './GoalStep';
import GoalConfirmStep from './GoalConfirmStep';
import ProfileStep from './ProfileStep';
import BodyStep from './BodyStep';
import LifestyleStep from './LifestyleStep';
import BudgetStep from './BudgetStep';
import BuildingPlanStep from './BuildingPlanStep';
import PlanReadyStep from './PlanReadyStep';

export const OnboardingFlow = () => {
  const {
    step,
    answers,
    updateAnswers,
    next,
    back,
    stepIndex,
    total,
  } = useOnboarding();

  const showHeader =
    step !== 'building-plan' &&
    step !== 'plan-ready';

  return (
    <View className="flex-1 gap-xl">
      {showHeader && (
        <View className="flex-row h-fit w-full gap-sm items-center">
          <BackButton onClick={back} />

          <View className="flex-1">
            <ProgressBar
              value={getPercentage(total - 1, stepIndex + 1)}
            />
          </View>
        </View>
      )}

      <View className="flex-1">
        {(() => {
          switch (step) {
            case 'goal':
              return (
                <GoalStep
                  currentIndex={stepIndex}
                  total={total}
                  onNext={(goal, goalOther) => {
                    updateAnswers({ goal, goalOther });
                    next();
                  }}
                  onBack={back}
                />
              );

            case 'goal-confirmation':
              return (
                <GoalConfirmStep
                    goal={answers.goal ?? 'other'}
                    onNext={next}
                />
              );

            case 'profile':
                return (
                    <ProfileStep
                        onNext={(name, sex, age) => {
                            updateAnswers({ name, sex, age });
                            next();
                        }}
                    />
                )
            case 'body':
              return (
                <BodyStep
                  onNext={(height, weight) => {
                    updateAnswers({ height, weight });
                    next();
                  }}
                />
              );
            case 'lifestyle':
              return (
                <LifestyleStep
                  onNext={(lifestyle) => {
                    updateAnswers({ lifestyle });
                    next();
                  }}
                />
  );        case 'budget':
              return (
                <BudgetStep
                  onNext={(budget, currency) => {
                    updateAnswers({ budget, currency });
                    next();
                  }}
                />
              );
            case 'building-plan':
              return (
                <BuildingPlanStep
                  onNext={next}
                />
              );
            case 'plan-ready':
              return <PlanReadyStep/>;

            default:
              return <Text>{step}</Text>;
          }
        })()}
      </View>
    </View>
  );
};