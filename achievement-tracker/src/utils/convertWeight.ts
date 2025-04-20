const weightValues: Record<number, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
};

export const convertWeight = (weight: number): string => {
  return weightValues[weight] ?? "Unknown";
};
