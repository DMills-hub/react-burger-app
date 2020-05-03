import React, { Component, Fragment } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = null;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> :  null;
      summary = (
        <Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinue={this.checkoutContinueHandler}
            ingredients={this.props.ings}
          />
          <Route
            component={ContactData}
            path={this.props.match.path + "/contact-data"}
          />
        </Fragment>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(mapStateToProps)(Checkout);
