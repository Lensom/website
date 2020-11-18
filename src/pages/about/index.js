import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './Styles.module.scss';
import photo from './images/photo.jpg';

import gsap from "gsap";


const About = () => {

  const body = document.querySelector('body')
	let cx = window.innerWidth / 2
	let cy = window.innerHeight / 2
	let clientX = null;
	let clientY = null;

	body.addEventListener('mousemove', e => {

		clientX = e.pageX
		clientY = e.pageY

		console.log(clientX, clientY)

		let request = requestAnimationFrame(updateMe)

	})

	function updateMe() {

		let dx     = clientX - cx
		let dy     = clientY - cy
		let tiltx  = dy / cy
		let tilty  = dx / cx
		let radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
		let degree = radius * 12
		gsap.to(`.${classes.wrapper}`, 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` })

	}
	
	gsap.to(`.${classes.link}`, { opacity: 1, delay: 1.4, duration: 2.5 })
	gsap.to(`.${classes.title}`, { opacity: 1, delay: .4, duration: 2.5 })
	gsap.to(`.${classes.text}`, { opacity: 1, delay: .9, duration: 3 })
	gsap.to(`.${classes.image}`, { opacity: 1, left: 0, top: 0, duration: 2, delay: .25 })

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