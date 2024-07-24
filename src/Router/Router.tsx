import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthUser from "../Components/auth/auth.page";
import HomePage from "../Pages/home/home.page";
import LoginPage from "../Pages/login/login.page";
import LogOutUser from "../Components/auth/logout.page";
import NavBar from "../Components/nav-bar/navbar";

export const router = createBrowserRouter([
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
