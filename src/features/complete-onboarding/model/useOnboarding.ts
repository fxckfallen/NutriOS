import { useState } from "react"
import { OnboardingAnswers } from "./types";
import { ONBOARDING_STEPS } from "./steps";

export const useOnboarding = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});

    const step = ONBOARDING_STEPS[stepIndex];

    const next = () => setStepIndex((i) => Math.min(i + 1, ONBOARDING_STEPS.length - 1));
    const back = () => setStepIndex((i) => Math.max(i - 1, 0));

    const updateAnswers = (patch: Partial<OnboardingAnswers>) => {
        setAnswers((prev) => ({...prev, ...patch}));
    }

    const total = ONBOARDING_STEPS.length

    return {step, answers, updateAnswers, next, back, stepIndex, total};
}