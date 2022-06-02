'use strict';

const balls = document.querySelectorAll('.ball');
const targetBall = document.querySelector('.target');
const gameBox = document.querySelector('.game-box');
const begin = document.querySelector('.start-game__button');
const winningPage = document.querySelector('.winning-page');
const winningPageMsg = document.querySelector('.winning-page__message');
const winningPageBox = document.querySelector('.winning-page__box');
const losingPage = document.querySelector('.losing-page');
const losingPageBox = document.querySelector('.losing-page__box');
const lvlText = document.querySelector('.logo-box__level--level');
const highscoreText = document.querySelector('.logo-Box__level--highscore');
const resetHighscore = document.querySelector('.reset-highscore');
const resetPage = document.querySelector('.reset-page');
const resetPageBox = document.querySelector('.reset-page__box');

// Initial settings
let lvl = 1;
let highscore = 0;
let initialDifficulty = 500;
let initialCounter = 10;
let initialized = false;

// Generates a random number. Used for our "Craaazy" bouncing balls, as well as our random colors.
const ranNum = function (n) {
  return Math.trunc(Math.random() * n);
};

const crazyBall = function () {
  // Calculates current difficulty setting
  let difficulty = lvl * 15;
  let curDifficulty = initialDifficulty - difficulty;

  // Determines your viewport size to determine what numbers to give our random number generator to make our balls bounce around.
  const clientHeight = Math.trunc(window.visualViewport.height) - 810;
  const clientWidth = Math.trunc(window.visualViewport.width) - 360;
  console.log(`Height: ${clientHeight}, Width: ${clientWidth}`);
  let clicked = false;
  let counter = initialCounter;

  // Adds more iterations of the balls bouncing, beginning at level 11.
  if (lvl > 10) {
    counter = lvl;
  }
  if (lvl > 20) {
    counter = lvl + 5;
  }
  if (lvl > 30) {
    counter = lvl + 10;
  }

  // Removes the highlighting on the target ball at the beginning.
  targetBall.classList.remove('spin');
  targetBall.classList.remove('marked');

  // This is the function that makes the balls bounce.  Each level, curDifficulty is actually decreased, which gives our setInterval method fewer milliseconds between iterations.  We count down from our initial iteration count, and when that reaches 0 you choose which ball you think is the target ball.
  const gameLevel = setInterval(() => {
    counter--;
    balls.forEach(ball => {
      ball.style.transform = `translate(${ranNum(
        clientWidth > 235 ? clientWidth : 260
      )}px, ${ranNum(clientHeight > 50 ? clientHeight + 250 : 250)}px)`;
      ball.style.backgroundColor = `rgba(240, ${ranNum(255)}, ${ranNum(255)})`;
    });

    if (counter === 0) {
      clearInterval(gameLevel);
    }
  }, curDifficulty);

  // This function adds eventlisteners to each ball to determine if we win or lose.  Here we render winning or losing messages and edit the scores.
  balls.forEach(ball => {
    ball.style.transition = `all ${curDifficulty}ms ease-in-out`;

    ball.addEventListener('click', function (e) {
      if (counter > 0 || clicked) return;
      clicked = true;
      initialized = false;
      
      begin.classList.remove('initialized');
      if (e.target.closest('.target')) {
        counter = initialCounter;
        lvl++;
        
        addHalo();
        renderLevel();
        renderHighscore();
        renderNextLevelMessage();
        showPopup(winningPage, winningPageBox);

        localStorage.setItem('userHighscore', highscore);

        winningPageBox.addEventListener('click', function() {
          hidePopup(winningPage, winningPageBox);
        });

        setTimeout(() => {
          hidePopup(winningPage, winningPageBox);
        }, 2000);
      }

      if (e.target.closest('.lose')) {
        targetBall.classList.add('marked');
        counter = initialCounter;
        lvl = 1;

        addHalo();
        renderLevel();
        showPopup(losingPage, losingPageBox);

        losingPageBox.addEventListener('click', function () {
          hidePopup(losingPage, losingPageBox);
        });

        setTimeout(() => {
          hidePopup(losingPage, losingPageBox);
        }, 3000);
      }
    });
  });
};

// Renders the level text on the screen.
const renderLevel = function () {
  lvlText.textContent = `Level: ${lvl}`;
};

// Renders the highscore text on to the screen.
const renderHighscore = function () {
  if (!highscore) highscore = 0;

  if (lvl > highscore && lvl > 1) {
    highscore = lvl - 1;
  }
  highscoreText.textContent = `Highscore: ${highscore}`;
};

// Renders the next level message on to the screen.
const renderNextLevelMessage = function () {
  winningPageMsg.textContent = `Level ${lvl}`;
};

// Adds a halo around the target ball between levels so you can keep track of which ball you should be focusing on.
const addHalo = function () {
  targetBall.classList.add('marked');
  targetBall.style.backgroundColor = '#ffd700';
};

// The button that initiates the current game level.
begin.addEventListener('click', function () {
  if (initialized) return;

  initialized = true;
  begin.classList.add('initialized');
  crazyBall();
});

// Retrieves our highscore from localstorage.
const initHighscore = function () {
  highscore = localStorage.getItem('userHighscore');
  renderHighscore();
};
initHighscore();

// Resets the highscore, as well as your current level.
resetHighscore.addEventListener('click', function () {
  if(!highscore) return;

  localStorage.clear();
  lvl = 1;
  highscore = 0;

  renderLevel();
  renderHighscore();
  showPopup(resetPage, resetPageBox);

  resetPageBox.addEventListener('click', function() {
    hidePopup(resetPage, resetPageBox);
  });

  setTimeout(() => {
    hidePopup(resetPage, resetPageBox);
  }, 3000);
});

// Displays popup
const showPopup = function(page, pageBox) {
  page.classList.remove('hidden');
  pageBox.style.transform = 'scale(1)';
};

// Hides popup
const hidePopup = function(page, pageBox) {
  page.classList.add('hidden');
  pageBox.style.transform = 'scale(.25)';
};

const date = new Date();
document.querySelector('.year').textContent = date.getFullYear();
