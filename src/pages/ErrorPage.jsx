import { Link, isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "Something went wrong";
  let message = "Please try again.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you are looking for does not exist.";
    } else if (error.status === 403) {
      title = "Access denied";
      message = "You do not have permission to do that.";
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-md">
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="mb-6 text-gray-600">{message}</p>
        <Link to="/" className="font-medium text-blue-600 hover:underline">
          Go home
        </Link>
      </div>
    </div>
  );
}
