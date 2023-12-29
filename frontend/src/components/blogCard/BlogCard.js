import { vk } from "../../assets";
import { Button } from "../button";
import { Image } from "../image";
import classes from "./blogCard.module.css";

const DateWithoutTime = (date) => {
  console.log(date);
  const tillTime = date.indexOf("T");
  return date.substring(0, tillTime).split("-");
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const BlogCard = (props) => {
  console.log(props.blog);
  const { blog, index } = props;
  const { createdAt, createdBy, content } = blog;
  const date = DateWithoutTime(createdAt);
  const month = monthNames[Number(date[1] - 1)];

  return (
    <div className={classes["numbered-card"]}>
      <h1 className={classes.number}>
        {index < 10 ? `0${index + 1}` : `${index + 1}`}
      </h1>
      <div className={classes["blog-card"]}>
        <div className={classes["blog-img"]}>
          <Image src={blog.img ? blog.img : vk} />
        </div>
        <div className={classes.user}>
          <div className={classes["created-at"]}>
            {month} {date[2]}, {date[0]}
          </div>
          <div>~{createdBy}</div>
        </div>
        <div>{content.substring(0, 100)} ...</div>
        <Button className={classes["read-morebtn"]}>Read more</Button>
      </div>
    </div>
  );
};
