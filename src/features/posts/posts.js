import { requireCompleteProfile } from "../auth/guards";
import { queryClient } from "../../lib/queryClient";
import { postsQuery, postQuery } from "./queries";

export function getPage(request) {
  const page = Number(new URL(request.url).searchParams.get("page"));
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export async function postsLoader({ request }) {
  await requireCompleteProfile();
  await queryClient.ensureQueryData(postsQuery(getPage(request)));
  return null;
}

export async function postLoader({ params }) {
  await requireCompleteProfile();
  await queryClient.ensureQueryData(postQuery(params.postId));
  return { postId: params.postId };
}