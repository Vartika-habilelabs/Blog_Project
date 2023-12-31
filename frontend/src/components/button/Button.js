import classes from "./button.module.css";
export const Button = (props) => {
  return (
    <button
      className={`${props.className} ${classes["button"]} ${
        props.color === "secondary" ? classes.btn : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
