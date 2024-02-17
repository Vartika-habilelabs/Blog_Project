import { vk } from "../../assets";
import { Image } from "../../components";
import { getFormattedDate } from "../../utils";
import classes from "./UserProfile.module.css";
export const UserProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);
  const { firstname, lastname, email, dob, username } = user;
  return (
    <div className={`${classes["profile-container"]} wrapper`}>
      <div className={classes["profile-image"]}>
        <Image src={vk}></Image>
      </div>
      <div className={classes["profile-details"]}>
        <h1>{username}</h1>
        <h2>{`${firstname} ${lastname}`}</h2>
        <h2>{email}</h2>
        <h2>{getFormattedDate(dob)}</h2>
      </div>
    </div>
  );
};
