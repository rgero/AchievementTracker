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
  return data;
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

  let query = supabase.from('achievements');
  if (!id)
  {
      query = query.insert([newAchievement])
  } else {
      query = query.update([newAchievement]).eq('id', id).select();
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