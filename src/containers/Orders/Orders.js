import React, { Component } from "react";
import AxiosOrders from "../../axios-orders";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={order.id}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  };
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, AxiosOrders));
