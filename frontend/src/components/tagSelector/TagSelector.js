import { useEffect, useState } from "react";
import classes from "./TagSelector.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import { allTags } from "../../store/reducer/tagSlice";
export const TagSelector = (props) => {
  const dispatch = useDispatch();
  const { handleCloseTagSelector } = props;
  const { tags } = useSelector((state) => state.tags);
  const [searched, setSearched] = useState();
  const [tagsArray, setTagsArray] = useState([]);
  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);
  return (
    <div className={classes["overlay-tag"]}>
      <div className={classes["tag-selector-container"]}>
        <input
          className={classes["tag-input"]}
          value={searched}
          placeholder="search here"
          onChange={(e) => setSearched(e.target.value)}
        />
        {tags.length && (
          <div className={classes["all-tags"]}>
            {tags.map((tag) => (
              <label key={tag._id} className="checkbox">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setTagsArray((prev) =>
                      e.target.checked
                        ? prev.filter((tag) => tag != tag._id)
                        : [...prev, tag._id]
                    )
                  }
                ></input>
                {tag.tag}
              </label>
            ))}
          </div>
        )}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <Button onClick={() => handleCloseTagSelector()}>Cancel</Button>
          <Button onClick={() => handleCloseTagSelector()}>Save</Button>
        </div>
      </div>
    </div>
  );
};
