import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postsQuery } from "../features/posts/queries";
import { createPost, PAGE_SIZE } from "../features/posts/postsApi";
import { newPostSchema } from "../features/posts/schema";
import FormField, { FormAlert } from "../components/FormField";

const LOCAL_POSTS_KEY = ["localPosts"];

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const queryClient = useQueryClient();
  const [added, setAdded] = useState(false);

  const { data, isFetching, isError, error } = useQuery({
    ...postsQuery(page),
    placeholderData: keepPreviousData,
  });

  // البوستات اللي أضافها المستخدم (الـ API وهمي ومبيحفظهاش)
  const { data: localPosts } = useQuery({
    queryKey: LOCAL_POSTS_KEY,
    queryFn: () => [],
    initialData: [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPostSchema),
    defaultValues: { title: "", body: "" },
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(LOCAL_POSTS_KEY, (old = []) => [
        { ...newPost, id: `local-${Date.now()}`, local: true },
        ...old,
      ]);
      reset();
      setAdded(true);
      setSearchParams({ page: "1" });
    },
  });

  const posts = page === 1 ? [...localPosts, ...(data?.posts ?? [])] : data?.posts ?? [];
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

        <form
          noValidate
          onSubmit={handleSubmit((values) => {
            setAdded(false);
            mutation.mutate(values);
          })}
          className="space-y-3 rounded-xl bg-white p-6 shadow-md"
        >
          <h2 className="font-semibold text-gray-800">New post</h2>
          {mutation.isError && <FormAlert>{mutation.error.message}</FormAlert>}
          {added && (
            <FormAlert tone="success">Added (demo API: not saved on the server).</FormAlert>
          )}
          <FormField
            id="title"
            label="Title"
            registration={register("title")}
            error={errors.title?.message}
          />
          <FormField
            id="body"
            label="Body"
            registration={register("body")}
            error={errors.body?.message}
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {mutation.isPending ? "Adding..." : "Add post"}
          </button>
        </form>

        {isError && <FormAlert>{error.message}</FormAlert>}

        <ul className={`space-y-3 ${isFetching ? "opacity-60" : ""}`}>
          {posts.map((post) => (
            <li key={post.id} className="rounded-xl bg-white p-4 shadow-sm">
              {post.local ? (
                <p className="font-medium text-gray-800">
                  {post.title}{" "}
                  <span className="ml-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    New
                  </span>
                </p>
              ) : (
                <Link
                  to={`/posts/${post.id}`}
                  className="font-medium text-gray-800 hover:text-blue-600"
                >
                  {post.title}
                </Link>
              )}
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