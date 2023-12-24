import { useDispatch, useSelector } from "react-redux";
import classes from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../store/reducer/userSlice";
import { useState } from "react";
import { HamburgerBtn } from "../../assets";
import { Image } from "../image";
import { Button } from "../button";
export const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [showBtn, setShowBtn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };
  const handleHamburgerHandler = () => {
    setShowBtn((prev) => !prev);
  };
  const handleCloseHandler = () => {
    setShowBtn((prev) => !prev);
  };
  return (
    <nav className={classes["navbar-container"]}>
      <div className={classes["logo-container"]}>
        <h1 className={classes.heading}>Blogosphere</h1>
      </div>
      {user && (
        <>
          <div className={classes["logout-container"]}>
            <Button className={classes["logout-button"]} onClick={handleLogout}>
              Logout
            </Button>
            <p className={classes["user-icon"]}>
              {user.firstname.charAt(0).toUpperCase()}
            </p>
          </div>
          {showBtn ? (
            <button
              onClick={handleHamburgerHandler}
              className={classes["hamburger-btn"]}
            >
              <Image src={HamburgerBtn} />
            </button>
          ) : (
            <div onClick={handleCloseHandler} className={classes.overlay}>
              <div className={classes.hamburger}>
                <Button
                  className={classes["logout-button"]}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <p className={classes["user-icon"]}>
                  {user.firstname.charAt(0).toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
};
