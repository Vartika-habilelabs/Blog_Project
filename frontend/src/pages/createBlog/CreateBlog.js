import classes from "./CreateBlog.module.css";
import { Button } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "./validation";
import { useDispatch } from "react-redux";
import { saveBlogsToDb } from "../../store/reducer/blogSlice";

export const CreateBlog = () => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: yupResolver(blogSchema),
    mode: "all",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const toDeleteBlog = (data) => {
    console.log(data);
  };
  const toPublishBlog = (data) => {
    const { content, title } = data;
    const blogEntry = {
      title,
      content,
      _id: JSON.parse(sessionStorage.getItem("user"))._id,
    };
    dispatch(saveBlogsToDb(blogEntry));
  };
  return (
    <form className={`${classes["form-container"]} wrapper`}>
      <input
        className={classes["input-container"]}
        type="text"
        id="title"
        {...register("title")}
        placeholder="Title"
      ></input>
      {!!errors.title && (
        <p className={classes["error-message"]}>{errors.title.message}</p>
      )}
      <textarea
        id="content"
        type="text"
        {...register("content")}
        className={`${classes["input-container"]} ${classes.textarea}`}
        placeholder="Content"
      ></textarea>
      {!!errors.content && (
        <p className={classes["error-message"]}>{errors.content.message}</p>
      )}
      <div className={classes["button-container"]}>
        <Button className={classes.button}>Save</Button>
        <Button
          onClick={handleSubmit(toPublishBlog)}
          className={classes.button}
        >
          Publish
        </Button>
        <Button onClick={handleSubmit(toDeleteBlog)} className={classes.button}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
