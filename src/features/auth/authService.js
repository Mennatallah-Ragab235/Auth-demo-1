import { supabase } from "../../lib/supabase";
import { queryClient } from "../../lib/queryClient";

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error };
  if (!data.session) {
    return { error: { message: "Email confirmation is enabled. Disable it in Supabase while developing." } };
  }
  return { user: data.user };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error };
  return { user: data.user };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  queryClient.clear(); 
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}