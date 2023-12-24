import classes from "./Register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveUsertodb, login } from "../../store/reducer/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signupSchema } from "./validation";
import { useNavigate } from "react-router-dom";
import { Loader } from "../loader";
import { useEffect } from "react";
import { Button } from "../button";

export const Register = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const loading=true;
  const { loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const form = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
    mode: "all",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const whenSubmitted = async (data) => {
    dispatch(isLogin ? login(data) : saveUsertodb(data));
  };
  return loading ? (
    <Loader />
  ) : (
    <div className={`${classes["login-container"]} wrapper`}>
      <div className={`${classes["logo-container"]}`}>
        <h1 className={`${classes["heading"]}`}>Blogosphere</h1>
        <p className={`${classes["tagline"]}`}>
          <i>like atmosphere like Blogosphere</i>
        </p>
      </div>
      <div className={`${classes["form-container"]}`}>
        <h1 className={`${classes["login-heading"]}`}>
          {!isLogin ? "Signup" : "Login"}
        </h1>
        <form
          onSubmit={handleSubmit(whenSubmitted)}
          className={classes["form-data"]}
        >
          {!isLogin && (
            <>
              <div className={`${classes["name-container"]}`}>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="text"
                    placeholder="firstname"
                    id="firstname"
                    {...register("firstname")}
                  ></input>
                  {!!errors.firstname && (
                    <p className={classes["error-message"]}>
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="text"
                    placeholder="lastname"
                    id="lastname"
                    {...register("lastname")}
                  ></input>
                  {!!errors.lastname && (
                    <p className={classes["error-message"]}>
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>
              <div className={`${classes["name-container"]}`}>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="text"
                    placeholder="username"
                    id="username"
                    {...register("username")}
                  ></input>
                  {!!errors.username && (
                    <p className={classes["error-message"]}>
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="date"
                    data-date-format="MM DD YYYY"
                    placeholder="Date of birth"
                    {...register("dob")}
                  ></input>
                  {!!errors.dob && (
                    <p className={classes["error-message"]}>
                      {errors.dob.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          <div className={classes["input-group"]}>
            <input
              className={`${classes["input-container"]}`}
              type="email"
              placeholder="email"
              {...register("email")}
            ></input>
            {!!errors.email && (
              <p className={classes["error-message"]}>{errors.email.message}</p>
            )}
          </div>
          <div className={classes["input-group"]}>
            <input
              className={`${classes["input-container"]}`}
              type="password"
              placeholder="password"
              {...register("password")}
            ></input>
            {!!errors.password && (
              <p className={classes["error-message"]}>
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className={`${classes["login-button"]}`}>Submit</Button>

          {!isLogin ? (
            <p
              onClick={() => navigate("/login")}
              className={`${classes["question"]}`}
            >
              Already have an account ?
            </p>
          ) : (
            <p
              onClick={() => navigate("/signup")}
              className={`${classes["question"]}`}
            >
              Don't have an account ?
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
