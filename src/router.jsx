import { createBrowserRouter } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ErrorPage from "./pages/ErrorPage";
import {
  homeLoader,
  loginLoader,
  loginAction,
  registerLoader,
  registerAction,
  logoutLoader,
  logoutAction,
} from "./features/auth/auth";
import { profileLoader, profileAction } from "./features/profile/profile";
import { adminLoader } from "./features/admin/admin";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login />, loader: loginLoader, action: loginAction },
          { path: "/register", element: <Register />, loader: registerLoader, action: registerAction },
        ],
      },
      { path: "/", element: <Home />, loader: homeLoader },
      { path: "/profile", element: <Profile />, loader: profileLoader, action: profileAction },
      { path: "/admin", element: <Admin />, loader: adminLoader },
      { path: "/logout", loader: logoutLoader, action: logoutAction },
    ],
  },
]);

export default router;