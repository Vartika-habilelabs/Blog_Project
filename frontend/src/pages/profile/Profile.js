import { ToggleBtn, Button, Blogs } from "../../components";
import classes from "./Profile.module.css";
import { useState } from "react";
export const Profile = () => {
  const [currentBlogs, setCurrentBlogs] = useState("Published");
  const handleCurrentStatus = (value) => {
    setCurrentBlogs(value);
  };
  return (
    <div className={`${classes["create-blog-container"]} wrapper`}>
      <div className={classes["blogs-nav"]}>
        <ToggleBtn handleCurrentStatus={handleCurrentStatus} />
        <Button className={classes["create-btn"]}>Create Blog</Button>
      </div>
      <Blogs heading={currentBlogs} />
    </div>
  );
};
