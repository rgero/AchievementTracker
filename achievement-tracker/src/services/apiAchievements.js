import { decryptField, encryptField } from "../utils/crypt";

import { ENTRIES_PER_PAGE } from "../utils/constants";
import supabase from "./supabase";

export const getAchievements = async ({sortBy, searchBy, page}) => {
  let query = supabase.from('achievements').select('*', {count: "exact"})

  if (searchBy)
  {
    query = query.ilike('name', `%${searchBy}%`)
  }
  
  if (sortBy)
  {
    query = query.order(sortBy.field, {ascending: sortBy.direction === "asc"})
  }

  if (page){
    const from = ENTRIES_PER_PAGE * (page-1);
    const to = from + ENTRIES_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const {data, error, count} = await query;
  if (error) {
    console.error(error);
    throw new Error("Achievements not found");
  } 
  
  const decryptedData = data.map((item) => ({
    ...item,
    name: item.name ? decryptField(item.name) : item.name,
    description: item.description ? decryptField(item.description) : item.description,
  }));

  return {data: decryptedData, count};
}

export const getStatsAchievements = async () => {
  let query = supabase.from('achievements').select('date,weight', {count: "exact"})
  const {data, error, count} = await query;
  if (error) {
    console.error(error);
    throw new Error("Achievements not found");
  }
  return {data, count};
}

export const getAchievement = async (id) => {
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
}

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

export const addOrEditAchievement = async (newAchievement, id) => {

  const encryptedData = {
    ...newAchievement,
    name: newAchievement.name ? encryptField(newAchievement.name) : undefined,
    description: newAchievement.description ? encryptField(newAchievement.description) : undefined,
  };

  let query = supabase.from('achievements');
  if (!id)
  {
      query = query.insert([encryptedData])
  } else {
      query = query.update([encryptedData]).eq('id', id).select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    if (id)
    {
      throw new Error("Achievement not add");
    } else {
      throw new Error("Achievement could not be updated");
    }

  }

  return data;
}