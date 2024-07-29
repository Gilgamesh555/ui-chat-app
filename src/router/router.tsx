import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthUser from "../components/auth/auth.page";
import HomePage from "../pages/home/home.page";
import LoginPage from "../pages/login/login.page";
import LogOutUser from "../components/auth/logout.page";
import NavBar from "../components/nav-bar/navbar";

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <AuthUser>
        <HomePage />
      </AuthUser>
    ),
  },
  {
    path: "/home",
    element: (
      <AuthUser>
        <HomePage />
      </AuthUser>
    ),
    children: [
      {
        path: "bar",
        element: <NavBar />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LogOutUser>
        <LoginPage />
      </LogOutUser>
    ),
  },
]);

export default function RouterAppProvider() {
  return <RouterProvider router={router} />;
}
