import React from 'react';
import classNames from 'classnames';
import Textarea from 'components/Textarea';
import classes from './Styles.module.scss';

const Form = () => (
  <form action="#" className={classes.form}>
    <div className={classNames([classes.inputWrapper, classes.line])}>
      <input type="text" placeholder="Your Name" className={classes.input} />
    </div>
    <div className={classNames([classes.textareaWrapper, classes.line])}>
      <Textarea 
        className={classes.textarea} 
        required
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

)
export default Form;