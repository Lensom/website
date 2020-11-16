import React, { useEffect, useRef } from "react"
import './style.css';
import classes from './Styles.module.scss';
import { TweenMax, Power3, Power4, Elastic } from "gsap";
import charming from 'charming';
import getMousePos from 'utils/GetMousePos';
import disassembleLetters from 'utils/DisassembleLetters';
import randomizeLetters from 'utils/RandomLetters';

import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

const Projects = () => {

  const slideshowItem = useRef(null);

  // The Slide class.
  class Slide {
    constructor(el) {
      this.DOM = {el: el};
      this.DOM.imgWrap = this.DOM.el.querySelector('.slide__img-wrap');
      this.DOM.img = this.DOM.imgWrap.querySelector('.slide__img');
      this.DOM.texts = {
          wrap: this.DOM.el.querySelector('.slide__title-wrap'),
          title: this.DOM.el.querySelector('.slide__title'),
          number: this.DOM.el.querySelector('.slide__number'),
          side: this.DOM.el.querySelector('.slide__side'),
      };

      charming(this.DOM.texts.title);
      charming(this.DOM.texts.side);
      this.DOM.titleLetters = Array.from(this.DOM.texts.title.querySelectorAll('span')).sort(() => 0.5 - Math.random());
      this.DOM.sideLetters = Array.from(this.DOM.texts.side.querySelectorAll('span')).sort(() => 0.5 - Math.random());
      this.DOM.titleLetters.forEach(letter => letter.dataset.initial = letter.innerHTML);
      this.DOM.sideLetters.forEach(letter => letter.dataset.initial = letter.innerHTML);

      this.calcSizes();
      
      this.calcTransforms();
      
      this.initEvents();
    }
    // Gets the size of the image wrap.
    calcSizes() {
        this.width = this.DOM.imgWrap.offsetWidth;
        this.height = this.DOM.imgWrap.offsetHeight;
    }
    // Gets the transforms per slide position.
    calcTransforms() {
        /*
        Each position corresponds to the position of a given slide:
        0: left top corner outside the viewport
        1: left top corner (prev slide position)
        2: center (current slide position)
        3: right bottom corner (next slide position)
        4: right bottom corner outside the viewport
        5: left side, for when the content is shown
        */
        this.transforms = [
            {x: -1*(winsize.width/2+this.width), y: -1*(winsize.height/2+this.height), rotation: -30},
            {x: -1*(winsize.width/2-this.width/3), y: -1*(winsize.height/2-this.height/3), rotation: 0},
            {x: 0, y: 0, rotation: 0},
            {x: winsize.width/2-this.width/3, y: winsize.height/2-this.height/3, rotation: 0},
            {x: winsize.width/2+this.width, y: winsize.height/2+this.height, rotation: 30},
            {x: -1*(winsize.width/2 - this.width/2 - winsize.width*0.075), y: 0, rotation: 0}
        ];
    }
    // Init events:
    // Mouseevents for mousemove/tilt/scale on the current image, and window resize.
    initEvents() {
        this.mouseenterFn = () => {
            if ( !this.isPositionedCenter() || !allowTilt ) return;
            clearTimeout(this.mousetime);
            this.mousetime = setTimeout(() => {
                // Scale the image.
                TweenMax.to(this.DOM.img, 0.8, {
                    ease: Power3.easeOut,
                    scale: 1.1
                });
            }, 40);
        };

        this.mousemoveFn = ev => requestAnimationFrame(() => {
            // Tilt the current slide.
            if ( !allowTilt || !this.isPositionedCenter() ) return;
            this.tilt(ev);
        });

        this.mouseleaveFn = (ev) => requestAnimationFrame(() => {
            if ( !allowTilt || !this.isPositionedCenter() ) return;
            clearTimeout(this.mousetime);

            // Reset tilt and image scale.
            TweenMax.to([this.DOM.imgWrap,this.DOM.texts.wrap], 1.8, {
                ease: 'Power4.easeOut',
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0
            });
            TweenMax.to(this.DOM.img, 1.8, {
                ease: 'Power4.easeOut',
                scale: 1
            });
        });
        // When resizing the window recalculate size and transforms, since both will depend on the window size.
        this.resizeFn = () => {
            this.calcSizes();
            this.calcTransforms();
        };
        // this.DOM.imgWrap.addEventListener('mouseenter', this.mouseenterFn);
        // this.DOM.imgWrap.addEventListener('mousemove', this.mousemoveFn);
        // this.DOM.imgWrap.addEventListener('mouseleave', this.mouseleaveFn);
        window.addEventListener('resize', this.resizeFn);
    }
    // Tilt the image wrap and texts when mouse moving the current slide.
    tilt(ev) {
        const mousepos = getMousePos(ev);
        // Document scrolls.
        const docScrolls = {
            left : document.body.scrollLeft + document.documentElement.scrollLeft, 
            top : document.body.scrollTop + document.documentElement.scrollTop
        };
        const bounds = this.DOM.imgWrap.getBoundingClientRect();;
        // Mouse position relative to the main element (this.DOM.el).
        const relmousepos = { 
            x : mousepos.x - bounds.left - docScrolls.left, 
            y : mousepos.y - bounds.top - docScrolls.top 
        };
        
        // Move the element from -20 to 20 pixels in both x and y axis.
        // Rotate the element from -15 to 15 degrees in both x and y axis.
        let t = {x:[-20,20],y:[-20,20]},
            r = {x:[-15,15],y:[-15,15]};

        const transforms = {
            translation : {
                x: (t.x[1]-t.x[0])/bounds.width*relmousepos.x + t.x[0],
                y: (t.y[1]-t.y[0])/bounds.height*relmousepos.y + t.y[0]
            },
            rotation : {
                x: (r.x[1]-r.x[0])/bounds.height*relmousepos.y + r.x[0],
                y: (r.y[1]-r.y[0])/bounds.width*relmousepos.x + r.y[0]
            }
        };

        // Move the image wrap.
        TweenMax.to(this.DOM.imgWrap, 1.5, {
            ease: 'Power1.easeOut',
            x: transforms.translation.x,
            y: transforms.translation.y,
            rotationX: transforms.rotation.x,
            rotationY: transforms.rotation.y
        }); 

        // Move the texts wrap.
        TweenMax.to(this.DOM.texts.wrap, 1.5, {
            ease: 'Power1.easeOut',
            x: -1*transforms.translation.x,
            y: -1*transforms.translation.y
        }); 
    }
    // Positions one slide (left, right or current) in the viewport.
    position(pos) {
        TweenMax.set(this.DOM.imgWrap, {
            x: this.transforms[pos].x, 
            y: this.transforms[pos].y, 
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            rotationZ: this.transforms[pos].rotation
        });
    }
    // Sets it as current.
    setCurrent(isContentOpen) {
        this.isCurrent = true;
        this.DOM.el.classList.add('slide--current', 'slide--visible');
        // Position it on the current´s position.
        this.position(isContentOpen ? 5 : 2);
    }
    // Position the slide on the left side.
    setLeft(isContentOpen) {
        this.isRight = this.isCurrent = false;
        this.isLeft = true;
        this.DOM.el.classList.add('slide--visible');
        // Position it on the left position.
        this.position(isContentOpen ? 0 : 1);
    }
    // Position the slide on the right side.
    setRight(isContentOpen) {
        this.isLeft = this.isCurrent = false;
        this.isRight = true;
        this.DOM.el.classList.add('slide--visible');
        // Position it on the right position.
        this.position(isContentOpen ? 4 : 3);
    }
    // Check if the slide is positioned on the right side (if it´s the next slide in the slideshow).
    isPositionedRight() {
        return this.isRight;
    }
    // Check if the slide is positioned on the left side (if it´s the previous slide in the slideshow).
    isPositionedLeft() {
        return this.isLeft;
    }
    // Check if the slide is the current one.
    isPositionedCenter() {
        return this.isCurrent;
    }
    // Reset classes and state.
    reset() {
        this.isRight = this.isLeft = this.isCurrent = false;
        this.DOM.el.classList = 'slide';
    }
    hide() {
        TweenMax.set(this.DOM.imgWrap, {x:0, y:0, rotationX:0, rotationY:0, rotationZ:0, opacity:0});
    }
    // Moves a slide to a specific position defined in settings.position.
    // Also, moves it from position settings.from and if we need to reset the image scale when moving the slide then settings.resetImageScale should be true.
    moveToPosition(settings) {
        return new Promise((resolve, reject) => {
            /*
            Moves the slide to a specific position:
            -2: left top corner outside the viewport
            -1: left top corner (prev slide position)
            0: center (current slide position)
            1: right bottom corner (next slide position)
            2: right bottom corner outside the viewport
            3: left side, for when the content is shown
            */
            TweenMax.to(this.DOM.imgWrap, .8, {
                ease: Power4.easeInOut,
                delay: settings.delay || 0,
                startAt: settings.from !== undefined ? {
                    x: this.transforms[settings.from+2].x,
                    y: this.transforms[settings.from+2].y,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: this.transforms[settings.from+2].rotation
                } : {},
                x: this.transforms[settings.position+2].x,
                y: this.transforms[settings.position+2].y,
                rotationX: 0,
                rotationY: 0,
                rotationZ: this.transforms[settings.position+2].rotation,
                onStart: settings.from !== undefined ? () => TweenMax.set(this.DOM.imgWrap, {opacity: 1}) : null,
                onComplete: resolve
            });
            
            // Reset image scale when showing the content of the current slide.
            if ( settings.resetImageScale ) {
                TweenMax.to(this.DOM.img, .8, {
                    ease: Power4.easeInOut,
                    scale: 1
                });
            }
        });
    }
    // Hides the current slide´s texts.
    hideTexts(animation = false) {
        if ( animation ) {
            disassembleLetters(this.DOM.titleLetters).then(() => TweenMax.set(this.DOM.texts.wrap, {opacity: 0}));
            disassembleLetters(this.DOM.sideLetters).then(() => TweenMax.set(this.DOM.texts.side, {opacity: 0}));
        }
        else {
            TweenMax.set(this.DOM.texts.wrap, {opacity: 0});
            TweenMax.set(this.DOM.texts.side, {opacity: 0});
        }
    }
    // Shows the current slide´s texts.
    showTexts(animation = true) {
        TweenMax.set(this.DOM.texts.wrap, {opacity: 1});
        TweenMax.set(this.DOM.texts.side, {opacity: 1});

        if ( animation ) { 
            randomizeLetters(this.DOM.titleLetters);
            randomizeLetters(this.DOM.sideLetters);
            TweenMax.to(this.DOM.texts.number, 0.6, {
                ease: Elastic.easeOut.config(1,0.5),
                startAt: {x: '-10%', opacity: 0},
                x: '0%',
                opacity: 1 
            });
        }
    }
  }

  // The Content class. Represents one content item per slide.
  class Content {
      constructor(el) {
          this.DOM = {el: el};
          this.DOM.number = this.DOM.el.querySelector('.content__number');
          this.DOM.title = this.DOM.el.querySelector('.content__title');
          this.DOM.subtitle = this.DOM.el.querySelector('.content__subtitle');
          this.DOM.text = this.DOM.el.querySelector('.content__text');
          this.DOM.backCtrl = this.DOM.el.parentNode.querySelector('.content__close');
          this.DOM.backCtrl.addEventListener('click', () => slideshow.hideContent());
      }
      show() {
          this.DOM.el.classList.add('content__item--current');

          TweenMax.staggerTo([this.DOM.backCtrl,this.DOM.number,this.DOM.title,this.DOM.subtitle,this.DOM.text], 0.8, {
              ease: Power4.easeOut,
              delay: 0.4,
              opacity: 1,
              startAt: {y: 40},
              y: 0
          }, 0.05);
      }
      hide() {
          this.DOM.el.classList.remove('content__item--current');

          TweenMax.staggerTo([this.DOM.backCtrl,this.DOM.number,this.DOM.title,this.DOM.subtitle,this.DOM.text].reverse(), 0.3, {
              ease: Power3.easeIn,
              opacity: 0,
              y: 10
          }, 0.01);
      }
  }

  // The Slideshow class.
  class Slideshow {
    constructor(el) {
      this.DOM = { el }

      // The slides.
      this.slides = [];
      let { current } = this.DOM.el;
      
      if (current != null) {
        Array.from(current.querySelectorAll('.slide')).forEach(slideEl => this.slides.push(new Slide(slideEl))); 
      }

      // The total number of slides.
      this.slidesTotal = this.slides.length;

      // At least 4 slides to continue...
      if ( this.slidesTotal < 4 ) return false;

      // Current slide position.
      this.currentStep = 0;
      this.DOM.deco = current.querySelector('.slideshow__deco');

      this.contents = [];
      Array.from(document.querySelectorAll('.content > .content__item')).forEach(contentEl => this.contents.push(new Content(contentEl)));
      // Set the current/next/previous slides. 
      this.render();
      this.currentSlide.showTexts(false);

      // Init/Bind events.
      this.initEvents();
    }

    render() {
      // The current, next, and previous slides.
      this.currentSlide = this.slides[this.currentStep];

      this.nextSlide = this.slides[this.currentStep+1 <= this.slidesTotal-1 ? this.currentStep+1 : 0];
      this.prevSlide = this.slides[this.currentStep-1 >= 0 ? this.currentStep-1 : this.slidesTotal-1];

      this.currentSlide.setCurrent();
      this.nextSlide.setRight();

      this.prevSlide.setLeft();
    }


    initEvents() {
      // Clicking the next and previous slide starts the navigation / clicking the current shows its content..
      this.clickFn = (slide) => {
        if ( slide.isPositionedRight() ) {
          this.navigate('next');
        }
        else if ( slide.isPositionedLeft() ) {
          this.navigate('prev');
        }
        else {
          this.showContent();
        }
      };
      for (let slide of this.slides) {
        slide.DOM.imgWrap.addEventListener('click', () => this.clickFn(slide));
      }

      this.resizeFn = () => {
        // Reposition the slides.
        this.nextSlide.setRight(this.isContentOpen);
        this.prevSlide.setLeft(this.isContentOpen);
        this.currentSlide.setCurrent(this.isContentOpen);

        if ( this.isContentOpen ) {
            TweenMax.set(this.DOM.deco, {
                scaleX: winsize.width/this.DOM.deco.offsetWidth,
                scaleY: winsize.height/this.DOM.deco.offsetHeight,
                x: -20,
                y: 20
            });
        }
      };
      window.addEventListener('resize', this.resizeFn);
    }

    showContent() {
      if ( this.isContentOpen || this.isAnimating ) return;
      allowTilt = false;
      this.isContentOpen = true;

      this.DOM.el.current.classList.add('slideshow--previewopen');
      TweenMax.to(this.DOM.deco, .8, {
          ease: Power4.easeInOut,
          scaleX: winsize.width/this.DOM.deco.offsetWidth,
          scaleY: winsize.height/this.DOM.deco.offsetHeight,
          x: -20,
          y: 20
      });
      // Move away right/left slides.
      this.prevSlide.moveToPosition({position: -2});
      this.nextSlide.moveToPosition({position: 2});
      // Position the current slide and reset its image scale value.
      this.currentSlide.moveToPosition({position: 3, resetImageScale: true});
      // Show content and back arrow (to close the content).
      this.contents[this.currentStep].show();
      // Hide texts.
      this.currentSlide.hideTexts(true);

    }
      hideContent() {
          if ( !this.isContentOpen || this.isAnimating ) return;

          this.DOM.el.classList.remove('slideshow--previewopen');

          // Hide content.
          this.contents[this.currentStep].hide();

          TweenMax.to(this.DOM.deco, .8, {
              ease: Power4.easeInOut,
              scaleX: 1,
              scaleY: 1,
              x: 0,
              y: 0
          });
          // Move in right/left slides.
          this.prevSlide.moveToPosition({position: -1});
          this.nextSlide.moveToPosition({position: 1});
          // Position the current slide.
          this.currentSlide.moveToPosition({position: 0}).then(() => {
              allowTilt = true;
              this.isContentOpen = false;
          });
          // Show texts.
          this.currentSlide.showTexts();
      }
      // Animates the element behind the current slide.
      bounceDeco(direction, delay) {
          TweenMax.to(this.DOM.deco, .4, {
              ease: 'Power2.easeIn',
              delay: delay+delay*0.2,
              x: direction === 'next' ? -40 : 40,
              y: direction === 'next' ? -40 : 40,
              onComplete: () => {
                  TweenMax.to(this.DOM.deco, 0.6, {
                      //ease: Elastic.easeOut.config(1, 0.65),
                      ease: 'Power2.easeOut',
                      x: 0,
                      y: 0
                  });
              }
          });
      }
      // Navigate the slideshow.
      navigate(direction) {
          // If animating return.
          if ( this.isAnimating ) return;
          this.isAnimating = true;
          allowTilt = false;

          const upcomingPos = direction === 'next' ? 
                  this.currentStep < this.slidesTotal-2 ? this.currentStep+2 : Math.abs(this.slidesTotal-2-this.currentStep):
                  this.currentStep >= 2 ? this.currentStep-2 : Math.abs(this.slidesTotal-2+this.currentStep);
          
          this.upcomingSlide = this.slides[upcomingPos];

          // Update current.
          this.currentStep = direction === 'next' ? 
                  this.currentStep < this.slidesTotal-1 ? this.currentStep+1 : 0 :
                  this.currentStep > 0 ? this.currentStep-1 : this.slidesTotal-1;
          
          // Move slides (the previous, current, next and upcoming slide).
          this.prevSlide.moveToPosition({position: direction === 'next' ? -2 : 0, delay: direction === 'next' ? 0 : 0.14}).then(() => {
              if ( direction === 'next' ) {
                  this.prevSlide.hide();
              }
          });
          this.currentSlide.moveToPosition({position: direction === 'next' ? -1 : 1, delay: 0.07 });
          this.currentSlide.hideTexts();
          
          this.bounceDeco(direction, 0.07);
          
          this.nextSlide.moveToPosition({position: direction === 'next' ? 0 : 2, delay: direction === 'next' ? 0.14 : 0 }).then(() => {
              if ( direction === 'prev' ) {
                  this.nextSlide.hide();
              }
          });

          if ( direction === 'next' ) {
              this.nextSlide.showTexts();
          }
          else {
              this.prevSlide.showTexts();
          }
          
          this.upcomingSlide.moveToPosition({position: direction === 'next' ? 1 : -1, from: direction === 'next' ? 2 : -2, delay: 0.21 }).then(() => {
              // Reset classes.
              [this.nextSlide,this.currentSlide,this.prevSlide].forEach(slide => slide.reset());
              this.render();
              allowTilt = true;
              this.isAnimating = false;
          });
      }
  }

  // Window sizes.
  let winsize;
  const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
  calcWinsize();
  window.addEventListener('resize', calcWinsize);

  let allowTilt = true;

  // Init slideshow.
  const slideshow = new Slideshow(slideshowItem);

  return (
    <main>
			<div className="slideshow" ref={slideshowItem}>
				<div className="slideshow__deco"></div>
				<div className="slide">
					<div className="slide__img-wrap">
						<div className="slide__img img1" style={{backgroundImage: img1}}></div>
					</div>
					<div className="slide__side">Memories &amp; Thoughts</div>
					<div className="slide__title-wrap">
						<span className="slide__number">1</span>
						<h3 className="slide__title">Automation</h3>
						<h4 className="slide__subtitle">A tree needs to be your friend if you're going to paint him</h4>
					</div>
				</div>
				<div className="slide">
					<div className="slide__img-wrap">
						<div className="slide__img img2" style={{backgroundImage: img2}}></div>
					</div>
					<div className="slide__side">Random Roam</div>
					<div className="slide__title-wrap">
						<span className="slide__number">2</span>
						<h3 className="slide__title">Machines</h3>
						<h4 className="slide__subtitle">This is probably the greatest thing to happen in my life</h4>
					</div>
				</div>
				<div className="slide">
					<div className="slide__img-wrap">
						<div className="slide__img img3" style={{backgroundImage: img3}}></div>
					</div>
					<div className="slide__side">Arbitrary Words</div>
					<div className="slide__title-wrap">
						<span className="slide__number">3</span>
						<h3 className="slide__title">Coexistence</h3>
						<h4 className="slide__subtitle">The only guide is your heart</h4>
					</div>
				</div>
				<div className="slide">
					<div className="slide__img-wrap">
						<div className="slide__img img4" style={{backgroundImage: img4}}></div>
					</div>
					<div className="slide__side">Haunted Drift</div>
					<div className="slide__title-wrap">
						<span className="slide__number">4</span>
						<h3 className="slide__title">Bellamio</h3>
						<h4 className="slide__subtitle">The only prerequisite is that it makes you happy</h4>
					</div>
				</div>
				<div className="slide">
					<div className="slide__img-wrap">
						<div className="slide__img img5" style={{backgroundImage: img5}}></div>
					</div>
					<div className="slide__side">Fun Diverge</div>
					<div className="slide__title-wrap">
						<span className="slide__number">5</span>
						<h3 className="slide__title">Pastures</h3>
						<h4 className="slide__subtitle">Let's go up in here, and start having some fun</h4>
					</div>
				</div>
				<div className="slide">
					<div className="slide__img-wrap">
						<div className="slide__img img6" style={{backgroundImage: img6}}></div>
					</div>
					<div className="slide__side">Hopes &amp; Dreams</div>
					<div className="slide__title-wrap">
						<span className="slide__number">6</span>
						<h3 className="slide__title">Focus</h3>
						<h4 className="slide__subtitle">This is unplanned it really just happens</h4>
					</div>
				</div>
				<button className="nav nav--prev">
					<svg className="icon icon--navarrow-prev">
					</svg>
				</button>
				<button className="nav nav--next">
					<svg className="icon icon--navarrow-next">
					</svg>
				</button>
			</div>
			<div className="content">
				<div className="content__item">
					<span className="content__number">1</span>
					<h3 className="content__title">Automation</h3>
					<h4 className="content__subtitle">A tree needs to be your friend if you're going to paint him</h4>
					<div className="content__text">Just let this happen. We just let this flow right out of our minds. Just relax and let it flow. That easy. Let's put some happy little clouds in our world. It's a very cold picture, I may have to go get my coat. It’s about to freeze me to death. This is gonna be a happy little seascape. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.</div>
				</div>
				<div className="content__item">
					<span className="content__number">2</span>
					<h3 className="content__title">Machines</h3>
					<h4 className="content__subtitle">This is probably the greatest thing to happen in my life</h4>
					<div className="content__text">We're not trying to teach you a thing to copy. We're just here to teach you a technique, then let you loose into the world. Now, we're going to fluff this cloud. We don't have anything but happy trees here. Let's do that again. Use what you see, don't plan it. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.</div>
				</div>
				<div className="content__item">
					<span className="content__number">3</span>
					<h3 className="content__title">Coexistence</h3>
					<h4 className="content__subtitle">The only guide is your heart</h4>
					<div className="content__text">Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping. But we're not there yet, so we don't need to worry about it. Now let's put some happy little clouds in here. What the devil. A thin paint will stick to a thick paint. I'm going to mix up a little color. </div>
				</div>
				<div className="content__item">
					<span className="content__number">4</span>
					<h3 className="content__title">Bellamio</h3>
					<h4 className="content__subtitle">The only prerequisite is that it makes you happy</h4>
					<div className="content__text">See. We take the corner of the brush and let it play back-and-forth. This is unplanned it really just happens. I'm sort of a softy, I couldn't shoot Bambi except with a camera. I guess I'm a little weird. I like to talk to trees and animals. That's okay though; I have more fun than most people. We'll play with clouds today. Didn't you know you had that much power? You can move mountains. You can do anything. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.</div>
				</div>
				<div className="content__item">
					<span className="content__number">5</span>
					<h3 className="content__title">Pastures</h3>
					<h4 className="content__subtitle">Let's go up in here, and start having some fun</h4>
					<div className="content__text">So often we avoid running water, and running water is a lot of fun. Everyone is going to see things differently - and that's the way it should be. A big strong tree needs big strong roots. Steve wants reflections, so let's give him reflections. We don't have to be committed. We are just playing here. Making all those little fluffies that live in the clouds. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.</div>
				</div>
				<div className="content__item">
					<span className="content__number">6</span>
					<h3 className="content__title">Focus</h3>
					<h4 className="content__subtitle">This is unplanned it really just happens</h4>
					<div className="content__text">But we're not there yet, so we don't need to worry about it. Now let's put some happy little clouds in here. What the devil. A thin paint will stick to a thick paint. I'm going to mix up a little color. We’ll use Van Dyke Brown, Permanent Red, and a little bit of Prussian Blue. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.</div>
				</div>
				<button className="content__close">
					<svg className="icon icon--longarrow">
					</svg>
				</button>
			</div>
		</main>
  )
}

export default Projects;