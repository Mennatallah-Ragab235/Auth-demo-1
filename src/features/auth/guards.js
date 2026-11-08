import { redirect } from "react-router";
import { getCurrentUser, signOut } from "./authService";
import { getMyProfile } from "../profile/profileService";

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw redirect("/login");
  return user;
}

export async function requireProfile() {
  const user = await requireUser();
  const profile = await getMyProfile(user.id);
  if (!profile) {
    await signOut();
    throw redirect("/login");
  }
  return { user, profile };
}