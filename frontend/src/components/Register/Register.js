import classes from "./Register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveUsertodb } from "../../store/reducer/userSlice";

export const Register = ({ route }) => {
  const dispatch = useDispatch();
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const validations = (label, maxLength) => {
    return {
      ...register(label, {
        required: `Required`,
        maxLength: {
          value: maxLength,
          message: "Length exceeds 15 char",
        },
      }),
    };
  };
  const whenSubmitted = (data) => {
    console.log(data);
    dispatch(saveUsertodb(data));
  };
  return (
    <div className={`${classes["login-container"]} wrapper`}>
      <div className={`${classes["logo-container"]}`}>
        <h1 className={`${classes["heading"]}`}>Blogosphere</h1>
        <p className={`${classes["tagline"]}`}>
          <i>like atmosphere like Blogosphere</i>
        </p>
      </div>
      <div className={`${classes["form-container"]}`}>
        <h1 className={`${classes["login-heading"]}`}>
          {route === "signup" ? "Signup" : "Login"}
        </h1>
        <form
          onSubmit={handleSubmit(whenSubmitted)}
          className={classes["form-data"]}
        >
          {route === "signup" && (
            <>
              <div className={`${classes["name-container"]}`}>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="text"
                    placeholder="firstname"
                    id="firstname"
                    {...validations("firstname", 15)}
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
                    {...validations("lastname", 15)}
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
                    {...validations("username", 15)}
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
                    {...register("dob", {
                      required: "Required",
                    })}
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
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
              })}
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
              {...validations("password", 20)}
            ></input>
            {!!errors.password && (
              <p className={classes["error-message"]}>
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={`${classes["login-button"]}`}>Submit</button>

          {route === "signup" ? (
            <p className={`${classes["question"]}`}>
              Already have an account ?
            </p>
          ) : (
            <p className={`${classes["question"]}`}>Don't have an account ?</p>
          )}
        </form>
      </div>
    </div>
  );
};
