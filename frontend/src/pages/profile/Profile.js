import { useNavigate } from "react-router-dom";
import { ToggleBtn, Button, Blogs } from "../../components";
import classes from "./Profile.module.css";
import { useState } from "react";
export const Profile = () => {
  const navigate = useNavigate();
  const [currentBlogs, setCurrentBlogs] = useState("Published");
  const handleCurrentStatus = (value) => {
    setCurrentBlogs(value);
  };
  return (
    <div className={`${classes["create-blog-container"]} wrapper`}>
      <div className={classes["blogs-nav"]}>
        <ToggleBtn handleCurrentStatus={handleCurrentStatus} />
        <Button
          onClick={() => navigate("/create")}
          className={classes["create-btn"]}
        >
          Create Blog
        </Button>
      </div>
      <Blogs heading={currentBlogs} />
    </div>
  );
};
