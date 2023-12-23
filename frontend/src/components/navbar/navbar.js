import { useDispatch, useSelector } from "react-redux";
import classes from "./navbar.module.css";
import { Logout } from "../logout";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../store/reducer/userSlice";
export const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };
  return (
    <div className={classes["navbar-container"]}>
      <div className={classes["logo-container"]}>
        <h1 className={classes.heading}>Blogosphere</h1>
      </div>
      {user && (
        <div className={classes["logout-container"]}>
          <Logout onClick={handleLogout} />
          <p className={classes["user-icon"]}>
            {user.firstname.charAt(0).toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};
