import { getMyProfile } from "./profileService";

export const profileQuery = (userId) => ({
  queryKey: ["profile", userId],
  queryFn: () => getMyProfile(userId),
});