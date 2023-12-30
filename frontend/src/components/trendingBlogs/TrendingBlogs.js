import classes from "./TrendingBlogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BlogCard, Header, Loader } from "../../components";
import { Trending } from "../../assets";
import { useEffect } from "react";
import { trendingBlogs } from "../../store/reducer/blogSlice";
export const TrendingBlogs = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const { trending } = blogs;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(trendingBlogs());
  }, [dispatch]);

  return trending ? (
    <div className={`${classes["trending"]} wrapper`}>
      <Header imgsrc={Trending} content="Trending on Blogosphere" />
      <div className={`${classes["blogs-container"]}`}>
        {trending &&
          trending.map((blog, index) => (
            <BlogCard key={index} blog={blog} index={index} />
          ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};
