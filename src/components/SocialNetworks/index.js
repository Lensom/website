import React from 'react';
import classes from './Styles.module.scss';

const SocialNetworks = () => (
  <ul className={classes.menu}>
    <li className={classes.item}>
      <a href="https://www.linkedin.com/in/alexey-rybalko-20351714a/" target="_blank" rel="noreferrer" className={classes.link}>Linkedin</a>
    </li>
    <li className={classes.item}>
      <a href="https://www.instagram.com/magurawork/" target="_blank" rel="noreferrer" className={classes.link}>Instagram</a>
    </li>
    <li className={classes.item}>
    <a href="https://github.com/" target="_blank" rel="noreferrer" className={classes.link}>Github</a>
    </li>
  </ul>
)

export default SocialNetworks;
