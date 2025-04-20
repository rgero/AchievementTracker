import { decryptField, encryptField } from "../utils/crypt";

import { Achievement } from "../interfaces/Achievement";
import supabase from "./supabase";

export const getAchievements = async () => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Achievements not found");
  }

  return data.map((item) => ({
    ...item,
    name: item.name ? decryptField(item.name) : item.name,
    description: item.description ? decryptField(item.description) : item.description,
  }));
};

export const getStatsAchievements = async () => {
  let query = supabase.from('achievements').select('date,weight', {count: "exact"})
  const {data, error, count} = await query;
  if (error) {
    console.error(error);
    throw new Error("Achievements not found");
  }
  return {data, count};
}

export const getAchievement = async (id: number) => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Achievement not found");
  }

  return {
    ...data,
    name: data.name ? decryptField(data.name) : data.name,
    description: data.description ? decryptField(data.description) : data.description,
  };
};

export const deleteAchievement = async (id) => 
{
  const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id)

  if (error)
  {
      console.error(error);
      throw new Error("Achievement cannot be deleted");
  }
}

export const deleteMultipleAchievements = async (ids: Set<number>) => {
  const { error } = await supabase
    .from("achievements")
    .delete()
    .in("id", Array.from(ids));

  if (error) {
    console.error(error);
    throw new Error("Achievements could not be deleted");
  }
}

export const updateAchievement = async (id: number, updatedData: Partial<Achievement>) => {
  const encryptedData = {
    ...updatedData,
    name: updatedData.name ? encryptField(updatedData.name) : undefined,
    description: updatedData.description ? encryptField(updatedData.description) : undefined,
  };

  const { data, error } = await supabase
    .from("achievements")
    .update([encryptedData])
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Achievement could not be updated");
  }
  return data;
};

export const addAchievement = async (newAchievement: Achievement) => {
  const encryptedAchievement = {
    ...newAchievement,
    name: encryptField(newAchievement.name),
    description: encryptField(newAchievement.description),
  };

  const { data, error } = await supabase
    .from("achievements")
    .insert([encryptedAchievement])
    .select()
    .single();

  if (error) {
    throw new Error("Achievement was not added");
  }
  return data;
};

export const addAchievements = async (newAchievements: Achievement[]) => {
  const encryptedAchievements = newAchievements.map((achievement) => ({
    ...achievement,
    name: encryptField(achievement.name),
    description: encryptField(achievement.description),
  }));

  const { data, error } = await supabase
    .from("achievements")
    .insert(encryptedAchievements);

  if (error) {
    console.log(error);
    throw new Error("Achievements were not added");
  }
  return data;
}