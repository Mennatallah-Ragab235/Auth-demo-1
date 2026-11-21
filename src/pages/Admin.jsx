import { Link, useLoaderData } from "react-router";

export default function Admin() {
  const { company } = useLoaderData();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">Admin area</h1>
        <p className="text-gray-700">{company.company_name}</p>
        <p className="mb-6 text-sm text-gray-500">{company.address}</p>
        <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}