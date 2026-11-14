import { Link, useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { postQuery, commentsQuery } from "../features/posts/queries";

export default function PostDetails() {
  const { postId } = useLoaderData();
  const { data: post } = useQuery(postQuery(postId));
  const comments = useQuery(commentsQuery(postId));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link to="/posts" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to posts
        </Link>

        <article className="rounded-xl bg-white p-6 shadow-md">
          <h1 className="mb-2 text-xl font-semibold text-gray-800">{post.title}</h1>
          <p className="text-gray-600">{post.body}</p>
        </article>

        <section className="space-y-3">
          <h2 className="font-semibold text-gray-800">Comments</h2>
          {comments.isPending && <p className="text-gray-500">Loading comments...</p>}
          {comments.isError && <p className="text-red-600">{comments.error.message}</p>}
          {comments.data?.map((c) => (
            <div key={c.id} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-800">{c.name}</p>
              <p className="text-xs text-gray-400">{c.email}</p>
              <p className="mt-1 text-sm text-gray-600">{c.body}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}