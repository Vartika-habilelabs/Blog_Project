import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../store/reducer/blogSlice";
import { BlogCard } from "../blogCard";
import classes from "./allBlogs.module.css";
import { AllTags } from "../allTags";
export const AllBlogs = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const { blogs } = useSelector((state) => state.blogs);
  const { allBlogs } = blogs;

  useEffect(() => {
    dispatch(
      getAllBlogs({
        isPublished: true,
        isDeleted: false,
        pageIndex,
        pageSize: 10,
        allBlogs: true,
      })
    );
  }, [dispatch, pageIndex]);
  return allBlogs ? (
    <div className={`${classes["parent-container"]} wrapper`}>
      <div className={classes.allblogs}>
        {allBlogs.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
        <div className={classes["handle-btns"]}>
          {pageIndex > 1 && (
            <button onClick={() => setPageIndex((prev) => prev - 1)}>
              Previous
            </button>
          )}
          <button onClick={() => setPageIndex((prev) => prev + 1)}>Next</button>
        </div>
      </div>
      <AllTags />
    </div>
  ) : null;
};
