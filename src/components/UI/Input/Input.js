import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      );
      break;
    case "select":
      inputEl = (
        <select onChange={props.changed} className={inputClasses.join(" ")} value={props.value} >
          {props.elementConfig.options.map((op) => {
            return <option key={op.value} value={op.value}>{op.display}</option>;
          })}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
    </div>
  );
};
export default input;
