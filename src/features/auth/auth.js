import { redirect } from "react-router";
import { registerSchema, loginSchema } from "./schema";
import { toFieldErrors } from "../../utils/formErrors";

const USERS_KEY = "demo_users";
const SESSION_KEY = "demo_session";


function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getUsers() {
  return readJSON(USERS_KEY, []);
}

export function getCurrentUser() {
  return readJSON(SESSION_KEY, null);
}

function saveSession(email) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
}


export function getUsername(email) {
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function registerUser(email, password) {
  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    return { errors: { email: "This email is already registered. Try logging in." } };
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, { email, password }]));
  saveSession(email);
  return {};
}

export function loginUser(email, password) {
  const user = getUsers().find((u) => u.email === email && u.password === password);
  if (!user) return { errors: { form: "Incorrect email or password." } };

  saveSession(email);
  return {};
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY); // users stay saved
}


async function readCredentials(request) {
  const formData = await request.formData();
  return {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}


export function homeLoader() {
  const user = getCurrentUser();
  if (!user) return redirect("/login");
  return { username: getUsername(user.email) };
}

export function loginLoader() {
  return getCurrentUser() ? redirect("/") : null;
}

export function registerLoader() {
  return getCurrentUser() ? redirect("/") : null;
}

export function logoutLoader() {
  return redirect("/");
}


export async function registerAction({ request }) {
  const parsed = registerSchema.safeParse(await readCredentials(request));
  if (!parsed.success) return { errors: toFieldErrors(parsed.error) };

  const result = registerUser(parsed.data.email, parsed.data.password);
  return result.errors ? result : redirect("/");
}

export async function loginAction({ request }) {
  const parsed = loginSchema.safeParse(await readCredentials(request));
  if (!parsed.success) return { errors: toFieldErrors(parsed.error) };

  const result = loginUser(parsed.data.email, parsed.data.password);
  return result.errors ? result : redirect("/");
}

export function logoutAction() {
  logoutUser();
  return redirect("/login");
}
