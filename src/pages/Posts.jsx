import { Link, useSearchParams } from "react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { postsQuery } from "../features/posts/queries";
import { PAGE_SIZE } from "../features/posts/postsApi";
import { FormAlert } from "../components/FormField";

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isFetching, isError, error } = useQuery({
    ...postsQuery(page),
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Posts</h1>
          <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">
            ← Home
          </Link>
        </div>

        {isError && <FormAlert>{error.message}</FormAlert>}

        <ul className={`space-y-3 ${isFetching ? "opacity-60" : ""}`}>
          {data?.posts.map((post) => (
            <li key={post.id} className="rounded-xl bg-white p-4 shadow-sm">
<Link to={`/posts/${post.id}`} className="font-medium text-gray-800 hover:text-blue-600">
  {post.title}
</Link>

              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{post.body}</p>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <button
            disabled={page <= 1}
            onClick={() => setSearchParams({ page: String(page - 1) })}
            className="rounded-lg bg-gray-800 px-4 py-2 text-white disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setSearchParams({ page: String(page + 1) })}
            className="rounded-lg bg-gray-800 px-4 py-2 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}