import classes from "./TrendingBlogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BlogCard, Header, Loader } from "../../components";
import { Trending } from "../../assets";
import { useEffect } from "react";
import { trendingBlogs } from "../../store/reducer/blogSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
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
      <Carousel>
        {trending &&
          trending.map((blog, index) => (
            <div className={classes.blogs} key={index}>
              <h1 className={classes.number}>
                {index < 9 ? `0${index + 1}` : `${index + 1}`}
              </h1>
              <BlogCard blog={blog} index={index} />
            </div>
          ))}
      </Carousel>
    </div>
  ) : (
    <Loader />
  );
};
