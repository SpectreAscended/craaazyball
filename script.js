'use strict';

const balls = document.querySelectorAll('.ball');
const targetBall = document.querySelector('.target');
const gameBox = document.querySelector('.game-box');
const loser = document.querySelectorAll('.loser');
const begin = document.querySelector('.start-game__button');
const winningPage = document.querySelector('.winning-page');
const losingPage = document.querySelector('.losing-page');
const lvlText = document.querySelector('.logo-box__level--level');
const highscoreText = document.querySelector('.logo-Box__level--highscore');

let lvl = 1;
let highscore = 0;

const ranNum = function (n) {
  return Math.trunc(Math.random() * n);
};

const crazyBall = function () {
  const clientHeight = Math.trunc(window.visualViewport.height) - 800;
  const clientWidth = Math.trunc(window.visualViewport.width) - 365;
  console.log(`Height: ${clientHeight}, Width: ${clientWidth}`);
  let clicked = false;
  let counter = 0;

  targetBall.classList.remove('spin');
  targetBall.classList.remove('marked');
  const level = setInterval(() => {
    counter++;
    balls.forEach(ball => {
      ball.style.transform = `translate(${ranNum(clientWidth > 235 ? clientWidth : 300)}px, ${ranNum(clientHeight > 50 ? clientHeight : 250)}px)`;
      ball.style.backgroundColor = `rgba(240, ${ranNum(255)}, ${ranNum(255)})`;
    });

    if (counter === 10) {
      clearInterval(level);
    }
  }, 400);

  balls.forEach(ball => {
    ball.addEventListener('click', function (e) {
      if (clicked) return;
      clicked = true;
      if (e.target.closest('.target')) {
        winningPage.classList.remove('hidden');
        counter = 0;
        lvl++;

        addHalo();
        renderLevel();
        renderHighscore();
        renderNextLevelMessage();
        setTimeout(() => {
          winningPage.classList.add('hidden');
        }, 2000);
      }

      if (e.target.closest('.lose')) {
        losingPage.classList.remove('hidden');
        targetBall.classList.add('marked');
        counter = 0;
        lvl = 1;
        addHalo();
        renderLevel();
        setTimeout(() => {
          losingPage.classList.add('hidden');
        }, 2000);
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
  winningPage.innerHTML = '';
  winningPage.insertAdjacentHTML(
    'beforeend',
    `<h2 class="winning-page__message results__message">Level ${lvl}</h2>`
  );
};

const addHalo = function() {
  targetBall.classList.add('marked');
  targetBall.style.backgroundColor = '#ffd700';
};

begin.addEventListener('click', function () {
  crazyBall();
});

