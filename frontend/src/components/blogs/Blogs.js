import classes from "./Blogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BlogCard, Header, Loader, NotFound } from "../../components";
import { Published, Deleted } from "../../assets";
import { useEffect } from "react";
import { userBlogs } from "../../store/reducer/blogSlice";

export const Blogs = (props) => {
  const { blogs } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.user);
  const { userBlog } = blogs;
  console.log(userBlog);
  const dispatch = useDispatch();
  useEffect(() => {
    props.heading === "Published"
      ? dispatch(
          userBlogs({
            userId: user._id,
            isPublished: true,
          })
        )
      : dispatch(
          userBlogs({
            userId: user._id,
            isDeleted: true,
          })
        );
  }, [dispatch, user, props]);

  return (
    <div className={`${classes["trending"]} wrapper`}>
      <Header
        imgsrc={props.heading === "Published" ? `${Published}` : `${Deleted}`}
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
