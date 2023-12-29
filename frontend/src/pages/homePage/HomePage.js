import { useSelector } from "react-redux";
import { BlogCard, Header } from "../../components";
import classes from "./HomePage.module.css";
import { Trending } from "../../assets";

export const HomePage = () => {
  const { blogs } = useSelector((state) => state.blogs);
  return (
    <div className={`${classes["trending"]} wrapper`}>
      <Header imgsrc={Trending} content="Trending on Blogosphere" />
      <div className={`${classes["blogs-container"]}`}>
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} index={index} />
        ))}
      </div>
    </div>
  );
};
