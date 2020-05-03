import React, { Fragment, Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';

class Layout extends Component {
  state ={
    showSideDrawer: false
  }

  sideDrawerClosedHandle = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  toolbarOpenHandle = () => {
    this.setState({
      showSideDrawer: true
    })
  }


  render() {
    return (
      <Fragment>
        <Toolbar auth={this.props.isAuth} open={this.toolbarOpenHandle}/>
        <SideDrawer auth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandle}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
