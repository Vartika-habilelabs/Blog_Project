import { createBrowserRouter } from "react-router-dom";
import { HomePage, Register } from "../pages";
import Layout from "../components/layout";
import { Profile } from "../pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Register isLogin />,
      },
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
export default router;
