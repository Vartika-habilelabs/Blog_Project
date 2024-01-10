import { useState } from "react";
import { ThreeDots, vk } from "../../assets";
import { Button } from "../button";
import { Image } from "../image";
import classes from "./blogCard.module.css";
import { useDispatch } from "react-redux";
import { saveBlogsToDb } from "../../store/reducer/blogSlice";
function getFormattedDate(dateString) {
  const inputDate = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
export const BlogCard = (props) => {
  const { blog, action } = props;
  const { createdAt, createdBy, content } = blog;
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const date = getFormattedDate(createdAt);
  const handleClick = (type) => {
    if (type === "publish") {
    } else if (type === "Delete") {
    }
  };
  return (
    <div className={classes["blog-card"]}>
      <div className={classes["blog-img"]}>
        <Image src={blog.img ? blog.img : vk} />
      </div>
      <div className={classes.user}>
        <div className={classes["created-at"]}>{date}</div>
        <div>~{createdBy.username}</div>
      </div>
      <div className={classes.content}>{content.substring(0, 100)} ...</div>
      <div className={classes.btnContainer}>
        {action && (
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className={classes["three-dots"]}
          >
            <Image src={ThreeDots} />
            {showDropdown && (
              <div className={classes.dropdown}>
                <p onClick={() => handleClick("publish")}>Publish</p>
                <p onClick={() => handleClick("delete")}>Delete</p>
                <p onClick={() => handleClick("edit")}>Edit</p>
              </div>
            )}
          </div>
        )}
        <Button className={classes["read-morebtn"]}>Read more</Button>
      </div>
    </div>
  );
};
