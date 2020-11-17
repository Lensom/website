import React from 'react';
import classes from './Styles.module.scss';
import classNames from 'classnames';

const Main = () => {
  return (
    <div className={classes.main}>
      <div className={classes.main__wrapper}>
        <div className={classes.title__wrapper}>
          <h1 className={classes.title}>Web Dev & Design</h1>
        </div>
        <div className="subtitle__wrapper">
          <h2 className={classes.subtitle}>Hi, I'm Alexey Rybalko · Web Developer based in Ukraine</h2>
        </div>
      </div>
      <div className="photo">
        <div className={classNames([classes.ring, classes.ringOne])}>
          <img src="ring.png" alt="" />
        </div>
        <div className={classNames([classes.ring, classes.ringTwo])}>
          <img src="ring.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Main;