const BASE = "https://jsonplaceholder.typicode.com";
export const PAGE_SIZE = 10;

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res;
}

export async function fetchPosts(page) {
  const res = await getJSON(`${BASE}/posts?_page=${page}&_limit=${PAGE_SIZE}`);
  return {
    posts: await res.json(),
    total: Number(res.headers.get("x-total-count") ?? 0),
  };
}

export async function fetchPost(id) {
  return (await getJSON(`${BASE}/posts/${id}`)).json();
}

export async function fetchComments(id) {
  return (await getJSON(`${BASE}/posts/${id}/comments`)).json();
}

export async function createPost(data) {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: 1 }),
  });
  if (!res.ok) throw new Error("Could not create post");
  return res.json();
}