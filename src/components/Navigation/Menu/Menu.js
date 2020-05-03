import React from "react";
import MenuLine from "./MenuLine/MenuLine";
import classes from "./Menu.module.css";

const menu = (props) => (
  <div onClick={props.click} className={classes.Menu}>
    <MenuLine />
    <MenuLine />
    <MenuLine />
  </div>
);

export default menu;
