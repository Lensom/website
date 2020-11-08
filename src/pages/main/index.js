import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import classes from './Styles.module.scss';

const Main = () => {
  return (
    <>
      <Header />
        <div className={classes.main}>
          <div className={classes.main__wrapper}>
            <div className={classes.title__wrapper}>
              <h1 className={classes.title}>Web Dev & Design</h1>
            </div>
            <div className="subtitle__wrapper">
              <h2 className={classes.subtitle}>Hi, I'm Alexey Rybalko · Web Developer based in Ukraine</h2>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default Main;