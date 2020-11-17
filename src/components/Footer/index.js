import React from 'react';
import SocialNetworks from 'components/SocialNetworks';
import classes from './Styles.module.scss';

import themeImg from './images/theme.svg';

const Footer = () => (
  <div className={classes.footer}>
    <div className={classes.footer__wrapper}>
      <SocialNetworks />
      <span className={classes.theme}>
        <img src={themeImg} alt="Change theme color"/>
      </span>
    </div>
  </div>
)

export default Footer;
