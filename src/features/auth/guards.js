import { redirect } from "react-router";
import { getCurrentUser, signOut } from "./authService";
import { queryClient } from "../../lib/queryClient";
import { profileQuery } from "../profile/queries";
import { isProfileComplete } from "../profile/completion";

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw redirect("/login");
  return user;
}

export async function requireProfile() {
  const user = await requireUser();
  const profile = await queryClient.fetchQuery({ ...profileQuery(user.id), staleTime: 0 });
  if (!profile) {
    await signOut(); 
    throw redirect("/login");
  }
  return { user, profile };
}

export async function requireCompleteProfile() {
  const ctx = await requireProfile();
  if (!isProfileComplete(ctx.profile)) throw redirect("/profile");
  return ctx;
}

export async function requireAdmin() {
  const ctx = await requireCompleteProfile();
  if (ctx.profile.role !== "Admin") throw redirect("/");
  return ctx;
}