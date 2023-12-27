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