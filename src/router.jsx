import { createBrowserRouter } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  homeLoader,
  loginLoader,
  loginAction,
  registerLoader,
  registerAction,
  logoutLoader,
  logoutAction,
} from "./features/auth/auth"; 
import Profile from "./pages/Profile";
import { profileLoader, profileAction } from "./features/profile/profile";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "/register",
        element: <Register />,
        loader: registerLoader,
        action: registerAction,
      },
    ],
  },

  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
  },

  {
    path: "/logout",
    loader: logoutLoader,
    action: logoutAction,
  },
  { path: "/profile", element: <Profile />, loader: profileLoader, action: profileAction },
]);
export default router;
