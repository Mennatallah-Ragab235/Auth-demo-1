import { Form, useActionData, useLoaderData } from "react-router";
import IndividualProfileForm from "../features/profile/components/IndividualProfileForm";
import CompanyProfileForm from "../features/profile/components/CompanyProfileForm";

export default function Profile() {
  const { profile } = useLoaderData();
  const result = useActionData();
  const isAdmin = profile.role === "Admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">My profile</h1>
          <p className="text-sm text-gray-500">
            {profile.email} · {profile.role}
          </p>
        </div>

        <IndividualProfileForm
          result={result}
          defaultValues={{
            fullName: profile.individual?.full_name ?? "",
            heightCm: profile.individual?.height_cm ?? "",
            weightKg: profile.individual?.weight_kg ?? "",
          }}
        />

        {isAdmin && (
          <CompanyProfileForm
            result={result}
            defaultValues={{
              companyName: profile.company?.company_name ?? "",
              address: profile.company?.address ?? "",
            }}
          />
        )}

        <Form method="post" action="/logout">
          <button
            type="submit"
            className="rounded-lg bg-gray-800 px-5 py-2 font-medium text-white hover:bg-gray-900"
          >
            Logout
          </button>
        </Form>
      </div>
    </div>
  );
}