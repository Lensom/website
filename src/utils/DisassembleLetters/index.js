const disassembleLetters = (letters) => {
  return new Promise((resolve, reject) => {
    const lettersTotal = letters.length;
    let cnt = 0;
    
    letters.forEach((letter, pos) => {
      setTimeout(() => {
        letter.style.opacity = 0;
        ++cnt;
        if ( cnt === lettersTotal ) {
          resolve();
        }
      }, pos * 30);
    });
  });
}

export default disassembleLetters;