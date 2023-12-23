import { LogoutBtn } from "../../assets";
import classes from "./logout.module.css";
export const Logout = (props) => {
  return (
    <div>
      <button className={classes["img-button"]} onClick={props.onClick}>
        <div className={classes["img-container"]}>
          {/* <img src={LogoutBtn} alt="" /> */}
          Logout
        </div>
      </button>
    </div>
  );
};
