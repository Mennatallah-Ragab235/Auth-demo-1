import { supabase } from "../../lib/supabase";

export async function getMyProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, role, individual:individual_profiles(*), company:company_profiles(*)")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data; 
}

export function saveIndividualProfile(userId, { fullName, heightCm, weightKg }) {
  return supabase.from("individual_profiles").upsert(
    {
      user_id: userId,
      full_name: fullName,
      height_cm: heightCm,
      weight_kg: weightKg,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}

export function saveCompanyProfile(userId, { companyName, address }) {
  return supabase.from("company_profiles").upsert(
    {
      user_id: userId,
      company_name: companyName,
      address,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}