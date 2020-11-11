import React from 'react';
import classes from './Styles.module.scss';

const About = () => {
  return (
    <div className="wrapper">
      <div className="info">
        <h2 className={classes.title}>hi</h2>
        <div className="textWrapper">
          <p className="text">
            I’m Alexey. Currently, I am based in Ukraine, working as the Front-end developer at <a href="#">Halo lab</a>. (ссылка на фирму)
            I am a developer and creator of web & mobile solutions with a focus
            on user experience. If you're interested in the tools and software
            I use check out <a href="#">my uses page</a>. (Здесь ссылка на технологии)
          </p>    
          <p>
            In my spare time, I like to write code and experiment with new tech, play computer games
            and chat with friends. I’m always interested in new projects, so feel free to drop me a line.
          </p>
          <a href="#">Send a message</a> (ссылка на форму)
        </div>
      </div>
      <div className="image">
        <img src="#" alt=""/>
        Мое фото, мб анимированное на three.js
      </div>
    </div>
  )
}

export default About;