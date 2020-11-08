import React from 'react';
import SocialNetworks from 'components/SocialNetworks';
import classes from './Styles.module.scss';

const Footer = () => (
  <div className={classes.footer}>
    <div className={classes.footer__wrapper}>
      <SocialNetworks />
      <span className={classes.game}>Mini game</span>
    </div>
  </div>
)

export default Footer;
