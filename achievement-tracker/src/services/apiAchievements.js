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

export const addAchievement = async (newAchievement) => {
  const { error } = await supabase.from('achievements').insert([newAchievement])

  if (error) {
    console.error(error);
    throw new Error("Achievement not added");
  }
}
