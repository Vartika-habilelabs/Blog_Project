import classes from "./button.module.css";
export const Button = (props) => {
  return (
    <button
      className={`${props.className} ${classes["button"]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
