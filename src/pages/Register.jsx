import { Form, Link, useActionData, useNavigation, useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../features/auth/schema";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });

  const serverErrors = actionData?.errors ?? {};
  const errors = {
    email: clientErrors.email?.message ?? serverErrors.email,
    password: clientErrors.password?.message ?? serverErrors.password,
  };

  const onSubmit = (values) => {
    submit(values, { method: "post" });
  };

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
        Create an account
      </h1>

      <Form method="post" noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...register("password")}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </Form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </>
  );
}