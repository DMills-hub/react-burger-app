import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import AxiosOrders from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../components/hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Post Code...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email...",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
        },
        validation: {},
        valid: true,
        value: "fastest",
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (e, id) => {
    console.log(id);
    const updatedFormEl = updateObject(this.state.orderForm[id], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state.orderForm[id].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [id]: updatedFormEl,
    });
    let formIsValid = true;
    for (let id in updatedOrderForm) {
      formIsValid = updatedOrderForm[id].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map((el) => {
          return (
            <Input
              invalid={!el.config.valid}
              changed={(e) => this.inputChangedHandler(e, el.id)}
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
            />
          );
        })}
        <Button
          disabled={!this.state.formIsValid}
          type="submit"
          btnType="Success"
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(ContactData, AxiosOrders)));
