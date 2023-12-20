import classes from "./navbar.module.css";
export const Navbar = () => {
  return (
    <div className={classes["navbar-container"]}>
      <div className={classes["logo-container"]}>
        <h1 className={classes.heading}>Blogosphere</h1>
      </div>
    </div>
  );
};
