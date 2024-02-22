import { useEffect, useState } from "react";
import { vk } from "../../assets";
import { Image, Loader } from "../../components";
import { apiCalling, getFormattedDate } from "../../utils";
import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
export const UserProfile = () => {
  const [userDetail, setUserDetail] = useState();

  const {
    user: { _id },
  } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await apiCalling("get", `/user/${_id}`);
        setUserDetail(res);
        return;
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, []);
  return userDetail ? (
    <div className={`${classes["profile-container"]} wrapper`}>
      <div className={classes["side-bar"]}>
        <div className={classes["profile-image-container"]}>
          <Image className={classes["image"]} src={vk} />
        </div>
        <h2 className={classes["user-info"]}>{userDetail.username}</h2>
        <h2 className={classes["user-info"]}>{userDetail.email}</h2>
        <h2 className={classes["user-info"]}>
          {getFormattedDate(userDetail.dob)}
        </h2>
      </div>
      <div className={classes["profile-details"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            alignItems: "center ",
          }}
        >
          <hr></hr>
          <hr></hr>
        </div>
        <h2
          className={classes["user-info"]}
        >{`${userDetail.firstname} ${userDetail.lastname}`}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            alignItems: "center ",
          }}
        >
          <hr></hr>
          <hr></hr>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
