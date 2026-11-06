import { redirect } from "react-router";

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

function validateCredentials(email, password) {
  const errors = {};

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Please enter your password.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function registerUser(email, password) {
  const errors = validateCredentials(email, password);
  if (Object.keys(errors).length > 0) return { errors };

  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    return { errors: { email: "This email is already registered. Try logging in." } };
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, { email, password }]));
  saveSession(email);
  return {};
}

export function loginUser(email, password) {
  const errors = {};
  if (!email) errors.email = "Please enter your email.";
  if (!password) errors.password = "Please enter your password.";
  if (Object.keys(errors).length > 0) return { errors };

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
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
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
  const { email, password } = await readCredentials(request);
  const result = registerUser(email, password);
  return result.errors ? result : redirect("/");
}

export async function loginAction({ request }) {
  const { email, password } = await readCredentials(request);
  const result = loginUser(email, password);
  return result.errors ? result : redirect("/");
}

export function logoutAction() {
  logoutUser();
  return redirect("/login");
}
