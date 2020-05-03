import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import {  } from 'react-router-dom';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>£{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => {
      return (
        <BuildControl
          disabled={props.disabled[ctrl.type]}
          removed={() => props.ingredientRemoved(ctrl.type)}
          added={() => props.ingredientAdded(ctrl.type)}
          label={ctrl.label}
          key={ctrl.label}
        />
      );
    })}
    <button onClick={props.ordered} disabled={!props.purchaseable} className={classes.OrderButton}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
);

export default buildControls;
