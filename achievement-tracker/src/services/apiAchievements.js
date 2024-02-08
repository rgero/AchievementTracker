import supabase from "./supabase";

export const getAchievements = async () => {
  let { data, error, count } = await supabase
    .from('achievements')
    .select('*')

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