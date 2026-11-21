import { z } from "zod";

export function toFieldErrors(error) {
  const { fieldErrors } = z.flattenError(error);
  const result = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    const first = messages?.[0];
    if (first) result[field] = first;
  }
  return result;
}