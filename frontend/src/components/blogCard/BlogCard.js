import { useState } from "react";
import { Liked, Read, ThreeDots, Unliked, vk } from "../../assets";
import { Button } from "../button";
import { Image } from "../image";
import classes from "./blogCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userBlogs } from "../../store/reducer/blogSlice";
import { apiCalling } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
const showUpdatedData = (heading, dispatch) => {
  heading === "Published"
    ? dispatch(
        userBlogs({
          isPublished: true,
        })
      )
    : heading === "Unpublished"
    ? dispatch(
        userBlogs({
          isPublished: false,
        })
      )
    : dispatch(
        userBlogs({
          isDeleted: true,
        })
      );
};
export const BlogCard = (props) => {
  const { blog, action, heading } = props;
  const { createdAt, createdBy, content, title, isLiked, likes, readTime } =
    blog;
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = getFormattedDate(createdAt);
  const actionHandler = async (type) => {
    try {
      let payload = { id: blog._id };
      if (type === "Publish") {
        payload.isPublished = true;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Published successfully");
      } else if (type === "Delete") {
        payload.isDeleted = true;
        payload.isPublished = false;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Deleted successfully");
      } else if (type === "Unpublish") {
        payload.isPublished = false;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Unpublished successfully");
      } else if (type === "Restore") {
        payload.isDeleted = false;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Restored successfully");
      } else {
        navigate(`/edit/${blog._id}`);
      }
      showUpdatedData(heading, dispatch);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className={classes["blog-card"]}>
      <div
        className={classes["blog-img"]}
        style={{
          backgroundImage: `url(${blog.img ? blog.img : vk})`,
        }}
      >
        {/* <Image src={blog.img ? blog.img : vk} /> */}
      </div>
      <div className={classes["blog-content"]}>
        <div className={classes["title-read"]}>
          <h4 className={classes["title"]}>
            {title.length > 100 ? `${title.substring(0, 50)} ...` : title}
          </h4>
          <p className={classes.username}>~{createdBy.username}</p>
        </div>
        <p className={classes.content}>{content.substring(0, 350)} ...</p>
        <div className={classes.btnContainer}>
          <div className={classes.info}>
            <Image
              className={classes.liked}
              src={isLiked ? Liked : Unliked}
            ></Image>
            <p>
              {likes > 1000 ? (Math.abs(likes) / 1000).toFixed(1) + "k" : likes}
            </p>
            <Image className={classes.read} src={Read}></Image>
            <p>{readTime}min</p>
            {action && (
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className={classes["three-dots"]}
              >
                <Image src={ThreeDots} />
                {showDropdown && (
                  <div className={classes.dropdown}>
                    {action.map((val, index) => (
                      <p key={index} onClick={() => actionHandler(val)}>
                        {val}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Button className={classes["read-morebtn"]}>Read more</Button>
        </div>
      </div>
    </div>
  );
};
