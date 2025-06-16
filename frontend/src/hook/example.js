import supabase from "@/utils/supabase";
export const fetchUsers = async () => {
  const { data, error } = await supabase.from("example").select("*");
  console.log(data);
  // you can filter, paginate, etc.

  if (error) console.error(error);
  else console.log("Fetched:", data);
  return data;
};
