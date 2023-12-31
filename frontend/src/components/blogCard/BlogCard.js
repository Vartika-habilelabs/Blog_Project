import { vk } from "../../assets";
import { Button } from "../button";
import { Image } from "../image";
import classes from "./blogCard.module.css";
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
  const { blog } = props;
  const { createdAt, createdBy, content } = blog;
  const date = getFormattedDate(createdAt); 

  return (
    <div className={classes["blog-card"]}>
      <div className={classes["blog-img"]}>
        <Image src={blog.img ? blog.img : vk} />
      </div>
      <div className={classes.user}>
        <div className={classes["created-at"]}>
          {date}
        </div>
        <div>~{createdBy}</div>
      </div>
      <div className={classes.content}>{content.substring(0, 100)} ...</div>
      <Button className={classes["read-morebtn"]}>Read more</Button>
    </div>
  );
};
