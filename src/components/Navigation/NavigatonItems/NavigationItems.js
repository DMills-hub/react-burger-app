import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/">Burger Builder</NavigationItem>
       {props.authenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
       <NavigationItem link={props.authenticated ? '/logout' : '/auth'} >{props.authenticated ? 'Logout' : 'Authenticate'}</NavigationItem>
    </ul>
)

export default navigationItems;