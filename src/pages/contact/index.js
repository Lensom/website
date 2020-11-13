import React from 'react';
import Divider from 'components/Divider'
import classes from './Styles.module.scss';

const Contact = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <h1 className={classes.title}>Contact Form</h1>
        <Divider />

        <form action="#">
          <div className={classes.inputWrapper}>
            <input type="text" placeholder="Your Name" className={classes.input} />
          </div>
          <div className={classes.textareaWrapper}>
            <textarea 
              className={classes.textarea} 
              required="" 
              autoComplete="off" 
              maxLength="4096"
              placeholder="Your message"
            />
          </div>

          <div className={classes.btnWrapper}>
            <button type="submit" className={classes.btn}>Send Message</button>
            <a href="Alexey_Rybalko_CV.docx" download className={classes.resume}>Download CV</a>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Contact;