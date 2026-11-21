export function isProfileComplete(profile) {
  if (!profile?.individual) return false;
  if (profile.role === "Admin") return Boolean(profile.company);
  return true;
}