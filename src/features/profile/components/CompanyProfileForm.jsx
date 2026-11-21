import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useSubmit } from "react-router";
import { companyProfileSchema } from "../schema";
import FormField, { FormAlert } from "../../../components/FormField";

export default function CompanyProfileForm({ defaultValues, result }) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const saving =
    navigation.state === "submitting" && navigation.formData?.get("intent") === "company";

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm({ resolver: zodResolver(companyProfileSchema), defaultValues });

  const server = result?.intent === "company" ? result : null;
  const serverErrors = server?.errors ?? {};

  const onSubmit = (values) => submit({ intent: "company", ...values }, { method: "post" });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Company information</h2>
      {serverErrors.form && <FormAlert>{serverErrors.form}</FormAlert>}
      {server?.success && <FormAlert tone="success">Saved.</FormAlert>}

      <FormField
        id="companyName"
        label="Company name"
        registration={register("companyName")}
        error={clientErrors.companyName?.message ?? serverErrors.companyName}
      />
      <FormField
        id="address"
        label="Address"
        autoComplete="street-address"
        registration={register("address")}
        error={clientErrors.address?.message ?? serverErrors.address}
      />

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save company information"}
      </button>
    </form>
  );
}