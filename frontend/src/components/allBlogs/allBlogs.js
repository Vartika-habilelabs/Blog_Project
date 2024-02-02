import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../store/reducer/blogSlice";

export const AllBlogs = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const { blogs } = useSelector((state) => state.blogs);
  const { allBlogs } = blogs;
  console.log(allBlogs, "allblogs");
  const dispatch = useDispatch();

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
  }, []);
  return <h1>hi</h1>;
};
