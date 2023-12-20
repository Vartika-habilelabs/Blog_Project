import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../navbar";

const Layout = () => {
  const router = useLocation();
  const { pathname } = router;

  return (
    <>
      {!(pathname === "/signup" || pathname === "/login") && <Navbar />}
      <Outlet />
    </>
  );
};
export default Layout;
