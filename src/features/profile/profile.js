import { redirect } from "react-router";
import { requireProfile } from "../auth/guards";
import { individualProfileSchema, companyProfileSchema } from "./schema";
import { toFieldErrors } from "../../utils/formErrors";
import { saveIndividualProfile, saveCompanyProfile } from "./profileService";
import { isProfileComplete } from "./completion";
import { queryClient } from "../../lib/queryClient";
import { profileQuery } from "./queries";

const toNumber = (value) =>
  value === null || String(value).trim() === "" ? NaN : Number(value);

export async function profileLoader() {
  const { user } = await requireProfile();
  return { userId: user.id };
}

export async function profileAction({ request }) {
  const { user, profile } = await requireProfile();
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "individual") {
    const parsed = individualProfileSchema.safeParse({
      fullName: String(formData.get("fullName") ?? ""),
      heightCm: toNumber(formData.get("heightCm")),
      weightKg: toNumber(formData.get("weightKg")),
    });
    if (!parsed.success) return { intent, errors: toFieldErrors(parsed.error) };

    const { error } = await saveIndividualProfile(user.id, parsed.data);
    if (error) return { intent, errors: { form: "Could not save. Please try again." } };
  } else if (intent === "company") {
    if (profile.role !== "Admin") throw new Response("Forbidden", { status: 403 });

    const parsed = companyProfileSchema.safeParse({
      companyName: String(formData.get("companyName") ?? ""),
      address: String(formData.get("address") ?? ""),
    });
    if (!parsed.success) return { intent, errors: toFieldErrors(parsed.error) };

    const { error } = await saveCompanyProfile(user.id, parsed.data);
    if (error) return { intent, errors: { form: "Could not save. Please try again." } };
  } else {
    throw new Response("Bad request", { status: 400 });
  }

  const updated = await queryClient.fetchQuery({ ...profileQuery(user.id), staleTime: 0 });
  if (!isProfileComplete(profile) && isProfileComplete(updated)) return redirect("/");

  return { intent, success: true };
}