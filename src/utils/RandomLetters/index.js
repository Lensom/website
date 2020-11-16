import getRandomInt from 'utils/GetRandomInt';

// Some random chars.
const chars = ['$','%','#','&','=','*','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','.',':',',','^'];
const charsTotal = chars.length;

// Equation of a line (y = mx + b ).
const lineEq = (y2, y1, x2, x1, currentVal) => {
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;
  return m * currentVal + b;
};

// Randomize letters function. Used when navigating the slideshow to switch the curretn slide´s texts.
const randomizeLetters = (letters) => {
  return new Promise((resolve, reject) => {
    const lettersTotal = letters.length;
    let cnt = 0;

    letters.forEach((letter, pos) => { 
      let loopTimeout;
      const loop = () => {
        letter.innerHTML = chars[getRandomInt(0,charsTotal-1)];
        loopTimeout = setTimeout(loop, getRandomInt(50,500));
      };
      loop();

      const timeout = setTimeout(() => {
        clearTimeout(loopTimeout);
        letter.style.opacity = 1;
        letter.innerHTML = letter.dataset.initial;
        ++cnt;
        if ( cnt === lettersTotal ) {
            resolve();
        }
      }, pos*lineEq(40,0,8,200,lettersTotal));
    });
  });
};

export default randomizeLetters;