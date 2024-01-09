import classes from "./Blogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BlogCard, Header, NotFound } from "../../components";
import { Published, Deleted, Unpublished } from "../../assets";
import { useEffect } from "react";
import { userBlogs } from "../../store/reducer/blogSlice";

export const Blogs = (props) => {
  const { heading } = props;
  const { blogs } = useSelector((state) => state.blogs);
  const { userBlog } = blogs;
  const dispatch = useDispatch();
  useEffect(() => {
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
  }, [dispatch, heading]);

  return (
    <div className={`${classes["trending"]} wrapper`}>
      <Header
        imgsrc={
          props.heading === "Published"
            ? `${Published}`
            : props.heading === "Unpublished"
            ? `${Unpublished}`
            : `${Deleted}`
        }
        content={props.heading}
      />

      <div className={`${classes["blogs-container"]}`}>
        {userBlog && userBlog.length ? (
          userBlog.map((blog, index) => (
            <BlogCard key={index} blog={blog} index={index} />
          ))
        ) : (
          <NotFound heading="Blogs"></NotFound>
        )}
      </div>
    </div>
  );
};
