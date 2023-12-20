import { createBrowserRouter } from "react-router-dom";
import { Register } from "../components";
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
    ],
  },
]);
export default router;
