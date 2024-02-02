import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTags } from "../../store/reducer/tagSlice";
import classes from "./allTags.module.css";
import { Button } from "../button";
const TitleCase = (s) => {
  return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
};
export const AllTags = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tags);
  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);
  return tags ? (
    <>
      <h2>Discover more of what matters to you</h2>
      <div>
        {tags.map((tag) => (
          <Button className={classes["tag-btn"]}>{TitleCase(tag.tag)}</Button>
        ))}
      </div>
    </>
  ) : null;
};
