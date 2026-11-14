import { fetchPosts, fetchPost, fetchComments } from "./postsApi";

export const postsQuery = (page) => ({
  queryKey: ["posts", { page }],
  queryFn: () => fetchPosts(page),
});

export const postQuery = (id) => ({
  queryKey: ["post", id],
  queryFn: () => fetchPost(id),
});

export const commentsQuery = (id) => ({
  queryKey: ["post", id, "comments"],
  queryFn: () => fetchComments(id),
});