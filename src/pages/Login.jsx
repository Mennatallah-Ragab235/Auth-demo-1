
import {
  Form,
  Link,
  useActionData,
  useNavigation,
} from "react-router";

import type { AuthResult } from "../features/auth/auth";

export default function Login() {
  const actionData = useActionData() as AuthResult | undefined;
  const navigation = useNavigation();

  const errors = actionData?.errors ?? {};
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
        Login
      </h1>

      {errors.form && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errors.form}
        </p>
      )}

      <Form method="post" noValidate className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </Form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </>
  );
}
