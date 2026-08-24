export const calculateWeightDiff = (currentWeight: number, previousWeight: number): number => {
    const diff = currentWeight - previousWeight;

    return Math.round(diff * 10) / 10;
} 