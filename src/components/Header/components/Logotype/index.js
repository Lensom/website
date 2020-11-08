import React from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import classes from './Styles.module.scss';

const Logotype = () => {

  const name = classNames([classes.logotype, classes.name]);

  return (
    <Link to="/">
      <span className={name}>Alexey</span>
      <span className={classes.logotype}>Rybalko</span>
    </Link>
  )
}

export default Logotype;

