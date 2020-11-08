import React from 'react';
import Logotype from './components/Logotype';
import Menu from './components/Menu';
import classes from './Styles.module.scss';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.header__wrapper}>
        <Logotype />
        <Menu />
      </div>
    </div>
  )
}

export default Header;