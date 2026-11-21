import { requireAdmin } from "../auth/guards";

export async function adminLoader() {
  const { profile } = await requireAdmin();
  return { company: profile.company };
}