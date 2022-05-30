'use strict';

const balls = document.querySelectorAll('.ball');
const targetBall = document.querySelector('.target');
const gameBox = document.querySelector('.game-box');
const loser = document.querySelectorAll('.loser');
const begin = document.querySelector('.start-game__button');
const winningPage = document.querySelector('.winning-page');
const winningPageMsg = document.querySelector('.winning-page__message');
const winningPageBox = document.querySelector('.winning-page__box');
const losingPage = document.querySelector('.losing-page');
const losingPageBox = document.querySelector('.losing-page__box');
const lvlText = document.querySelector('.logo-box__level--level');
const highscoreText = document.querySelector('.logo-Box__level--highscore');

let lvl = 1;
let highscore = 0;
let difficulty = 500;
let initialDifficulty = 500;
let initialCounter = 10;
let initialized = false;


const ranNum = function (n) {
  return Math.trunc(Math.random() * n);
};

const crazyBall = function () {
  difficulty  =+ lvl * 15;
  let curDifficulty = initialDifficulty - difficulty;
  const clientHeight = Math.trunc(window.visualViewport.height) - 810;
  const clientWidth = Math.trunc(window.visualViewport.width) - 360;
  console.log(`Height: ${clientHeight}, Width: ${clientWidth}`);
  let clicked = false;
  let counter = initialCounter;
  if(lvl > 10) {
    counter = lvl;
  }
  if(lvl > 20) {
    counter = lvl + 5;
  }
  if(lvl > 30) {
    counter = lvl + 10;
  }

  targetBall.classList.remove('spin');
  targetBall.classList.remove('marked');
  
  const gameLevel = setInterval(() => {
    counter--;
    balls.forEach(ball => {
      ball.style.transform = `translate(${ranNum(clientWidth > 235 ? clientWidth : 300)}px, ${ranNum(clientHeight > 50 ? clientHeight + 300 : 250)}px)`;
      ball.style.backgroundColor = `rgba(240, ${ranNum(255)}, ${ranNum(255)})`;
    });

    if (counter === 0) {
      clearInterval(gameLevel);
    }
  }, curDifficulty);
  
  balls.forEach(ball => {

    ball.style.transition = `all ${curDifficulty}ms ease-in-out`;

    ball.addEventListener('click', function (e) {
      if (clicked) return;
      clicked = true;
      initialized = false;
      begin.classList.remove('initialized');
      if (e.target.closest('.target')) {
        winningPage.classList.remove('hidden');
        winningPageBox.style.transform = 'scale(1)';
        counter = initialCounter;
        lvl++;

        addHalo();
        renderLevel();
        renderHighscore();
        renderNextLevelMessage();
        setTimeout(() => {
          winningPage.classList.add('hidden');
          winningPageBox.style.transform = 'scale(.25)';
        }, 2000);
      }

      if (e.target.closest('.lose')) {
        losingPage.classList.remove('hidden');
        losingPageBox.style.transform = 'scale(1)';
        targetBall.classList.add('marked');
        counter = initialCounter;
        lvl = 1;
        addHalo();
        renderLevel();
        setTimeout(() => {
          losingPage.classList.add('hidden');
          losingPageBox.style.transform = 'scale(.25)';
        }, 3000);
      }
    });
  });
};

const renderLevel = function () {
  lvlText.textContent = `Level: ${lvl}`;
};

const renderHighscore = function () {
  if (lvl > highscore && lvl > 1) {
    highscore = lvl - 1;
    highscoreText.textContent = `Highscore: ${highscore}`;
  }
};

const renderNextLevelMessage = function () {
  winningPageMsg.textContent = `Level ${lvl}`;
};

const addHalo = function() {
  targetBall.classList.add('marked');
  targetBall.style.backgroundColor = '#ffd700';
};

begin.addEventListener('click', function () {
  if(initialized) return;
  initialized = true;
  begin.classList.add('initialized');
  crazyBall();
});

