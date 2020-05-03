import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigatonItems/NavigationItems";
import Menu from "../Menu/Menu";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Menu click={props.open} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems authenticated={props.auth} />
    </nav>
  </header>
);

export default toolbar;
