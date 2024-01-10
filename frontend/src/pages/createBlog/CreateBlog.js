import classes from "./CreateBlog.module.css";
import { Button } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "./validation";
import { useDispatch } from "react-redux";
import { saveBlogsToDb } from "../../store/reducer/blogSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: yupResolver(blogSchema),
    mode: "all",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const onSubmit = (data) => {
    const { content, title } = data;
    const blogEntry = {
      title,
      content,
      isPublished: checked,
      isDeleted: false,
    };
    dispatch(
      saveBlogsToDb({ blogEntry, onSuccess: () => navigate("/profile") })
    );
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${classes["form-container"]} wrapper`}
      >
        <div className={classes["form-content"]}>
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
          <label className={classes.checkbox}>
            <input
              type="checkbox"
              onChange={() => setChecked((prev) => !prev)}
            ></input>
            Publish
          </label>
          <div className={classes["button-container"]}>
            <Button type="submit" className={classes.button}>
              Save
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
