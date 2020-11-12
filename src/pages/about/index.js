import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './Styles.module.scss';
import photo from './images/photo.jpg';

const About = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <h2 className={classes.title}>hi</h2>
        <p className={classes.text}>
          I’m Alexey. Currently, I am based in Ukraine, working as the Front-end developer at <a href="https://www.halo-lab.com/" rel="noreferrer noopener" target="_blank"  className={classes.link}>Halo Lab</a>.
          I am a developer and creator of web & mobile solutions with a focus
          on user experience. If you're interested in the tools and software
          I use check out <NavLink className={classes.link} to="/technologies">my uses page</NavLink>.
        </p>    
        <p className={classes.text}>
          In my spare time, I like to write code and experiment with new tech, play computer games
          and chat with friends. I’m always interested in new projects, so feel free to drop me a line.
        </p>
        <NavLink className={classes.link} to="/contact">Send me a message</NavLink>
      </div>
      <div className={classes.image}>
        <img src={photo} alt="Alexey Rybalko"/>
      </div>
    </div>
  )
}

export default About;