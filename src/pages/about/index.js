import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './Styles.module.scss';
import photo from './images/photo.jpg';

import gsap from "gsap";


const About = () => {

  // const body = document.querySelector('body')

	// let cx = window.innerWidth / 2
	// let cy = window.innerHeight / 2

	// body.addEventListener('mousemove', e => {

	// 	clientX = e.pageX
	// 	clientY = e.pageY

	// 	request = requestAnimationFrame(updateMe)

	// })

	// function updateMe() {

	// 	dx     = clientX - cx
	// 	dy     = clientY - cy
	// 	tiltx  = dy / cy
	// 	tilty  = dx / cx
	// 	radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
	// 	degree = radius * 12
	// 	gsap.to('.content', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` })

	// }
	
	// gsap.to('.card', { zoom: .98 })
	// gsap.to('.l_main', { opacity: 1, duration: .1 })
	// gsap.to('.l2_main', { opacity: 1, left: -10, top: 10, duration: .25, delay: .25 })
	// gsap.to('.l3_main', { opacity: 1, left: -20, top: 20, duration: .25, delay: .25 })
	// gsap.to('.card-russia', { opacity: .07, duration: .1 })
	// gsap.to('.card-logo_w', { opacity: 1, duration: .225 })
	// gsap.to('.card-chip', { opacity: 1, duration: .225 })
	// gsap.to('.card-valid', { opacity: 1, zoom: 1, duration: .1, delay: .25 })
  // gsap.to('.card-number-holder', { opacity: 1, zoom: 1, duration: .1, delay: .25 })
  

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