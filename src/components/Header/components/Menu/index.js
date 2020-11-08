import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './Styles.module.scss';

const Menu = () => (
  <ul className={classes.menu}>
    <li className={classes.menu__item}>
      <NavLink className={classes.menu__link} activeClassName={classes.menu__active} to="/projects">Projects</NavLink>
    </li>
    <li className={classes.menu__item}>
      <NavLink className={classes.menu__link} activeClassName={classes.menu__active} to="/about">About</NavLink>
    </li>
    <li className={classes.menu__item}>
      <NavLink className={classes.menu__link} activeClassName={classes.menu__active} to="/contact">Contact</NavLink>
    </li>
  </ul>
)

export default Menu;