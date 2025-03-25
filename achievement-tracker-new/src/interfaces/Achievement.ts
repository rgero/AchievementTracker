export interface Achievement {
  id?: number;
  owner_id: string;
  name: string;
  description?: string;
  weight: number;
  date: Date|string;
}