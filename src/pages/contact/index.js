import React from 'react';
import Divider from 'components/Divider';
import classes from './Styles.module.scss';
import Form from './components/Form';

const Contact = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <h1 className={classes.title}>Contact Form</h1>
        <Divider />
        <Form />
      </div>
    </div>
  )
}

export default Contact;