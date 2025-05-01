const weightValues: Record<string, string> = {
  "1": "Low",
  "2": "Medium",
  "3": "High",
};

export const convertWeight = (weight: string): string => {
  return weightValues[weight] ?? "Unknown";
};
