import { createBrowserRouter } from "react-router-dom";
import { HomePage, Register } from "../pages";
import Layout from "../components/layout";

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
    ],
  },
]);
export default router;
