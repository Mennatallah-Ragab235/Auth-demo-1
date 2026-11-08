import { redirect } from "react-router";
import { registerSchema, loginSchema } from "./schema";
import { toFieldErrors } from "../../utils/formErrors";
import { signUp, signIn, signOut, getCurrentUser } from "./authService";

export function getUsername(email) {
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

async function readCredentials(request) {
  const formData = await request.formData();
  return {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}

export async function homeLoader() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");
  return { username: getUsername(user.email) };
}

export async function loginLoader() {
  return (await getCurrentUser()) ? redirect("/") : null;
}

export async function registerLoader() {
  return (await getCurrentUser()) ? redirect("/") : null;
}

export function logoutLoader() {
  return redirect("/");
}

export async function registerAction({ request }) {
  const parsed = registerSchema.safeParse(await readCredentials(request));
  if (!parsed.success) return { errors: toFieldErrors(parsed.error) };

  const { error } = await signUp(parsed.data.email, parsed.data.password);
  if (error) {
    const alreadyUsed = /already registered|already been registered/i.test(error.message);
    return {
      errors: alreadyUsed
        ? { email: "This email is already registered. Try logging in." }
        : { form: error.message },
    };
  }
  return redirect("/");
}

export async function loginAction({ request }) {
  const parsed = loginSchema.safeParse(await readCredentials(request));
  if (!parsed.success) return { errors: toFieldErrors(parsed.error) };

  const { error } = await signIn(parsed.data.email, parsed.data.password);
  if (error) return { errors: { form: "Incorrect email or password." } };
  return redirect("/");
}

export async function logoutAction() {
  await signOut();
  return redirect("/login");
}