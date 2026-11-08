import { Form, Link, useLoaderData } from "react-router";

export default function Home() {
  const { username, role } = useLoaderData();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-md">
        <h1 className="mb-1 text-2xl font-semibold text-gray-800">Welcome, {username}!</h1>
        <p className="mb-6 text-sm text-gray-500">Role: {role}</p>

        <div className="flex flex-col items-center gap-3">
          <Link to="/profile" className="font-medium text-blue-600 hover:underline">
            My profile
          </Link>

          {role === "Admin" && (
  <Link to="/admin" className="font-medium text-blue-600 hover:underline">
    Admin area
  </Link>
)}
          <Form method="post" action="/logout">
            <button
              type="submit"
              className="rounded-lg bg-gray-800 px-5 py-2 font-medium text-white transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Logout
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}