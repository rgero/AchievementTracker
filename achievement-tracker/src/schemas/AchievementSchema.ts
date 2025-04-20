import { endOfDay } from 'date-fns';
import { z } from 'zod';

export const AchievementSchema = z.object({
  id: z.number().optional(),
  owner_id: z.string().optional(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
  date: z.date().refine((date) => date <= endOfDay(Date()), {
    message: "Date cannot be in the future",
  }),
  weight: z.string().refine((val) => {
    const validWeights = ["low", "medium", "high"];
    return validWeights.includes(val);
  })
}).strict();
