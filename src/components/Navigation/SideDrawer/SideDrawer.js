import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigatonItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedCLasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedCLasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <BackDrop clicked={props.closed} show={props.open} />
      <div className={attachedCLasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems authenticated={props.auth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
