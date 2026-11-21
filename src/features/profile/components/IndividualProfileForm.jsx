import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useSubmit } from "react-router";
import { individualProfileSchema } from "../schema";
import FormField, { FormAlert } from "../../../components/FormField";

export default function IndividualProfileForm({ defaultValues, result }) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const saving =
    navigation.state === "submitting" && navigation.formData?.get("intent") === "individual";

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm({ resolver: zodResolver(individualProfileSchema), defaultValues });

  const server = result?.intent === "individual" ? result : null;
  const serverErrors = server?.errors ?? {};

  const onSubmit = (values) => submit({ intent: "individual", ...values }, { method: "post" });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Personal information</h2>
      {serverErrors.form && <FormAlert>{serverErrors.form}</FormAlert>}
      {server?.success && <FormAlert tone="success">Saved.</FormAlert>}

      <FormField
        id="fullName"
        label="Full name"
        autoComplete="name"
        registration={register("fullName")}
        error={clientErrors.fullName?.message ?? serverErrors.fullName}
      />
      <FormField
        id="heightCm"
        label="Height (cm)"
        type="number"
        step="any"
        registration={register("heightCm", { valueAsNumber: true })}
        error={clientErrors.heightCm?.message ?? serverErrors.heightCm}
      />
      <FormField
        id="weightKg"
        label="Weight (kg)"
        type="number"
        step="any"
        registration={register("weightKg", { valueAsNumber: true })}
        error={clientErrors.weightKg?.message ?? serverErrors.weightKg}
      />

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save personal information"}
      </button>
    </form>
  );
}