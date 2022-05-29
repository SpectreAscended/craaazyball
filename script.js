"use strict";

const balls = document.querySelectorAll('.ball');
const targetBall = document.querySelector('.target');
const gameBox = document.querySelector('.game-box');
const loser = document.querySelectorAll('.loser');
const begin = document.querySelector('.start-game__button');
const winningPage = document.querySelector('.winning-page');
const losingPage = document.querySelector('.losing-page');
const lvlText = document.querySelector('.logo-box__level--level');
const highscoreText = document.querySelector('.logo-Box__level--highscore');



const ranNum = function(n) {
    return Math.trunc(Math.random() * n);
}

let counter = 0;
let lvl = 1;
let highscore = 0;

const crazyBall = function() {
    // targetBall.style.outline = 'none';
    targetBall.classList.remove('spin');
    const level = setInterval(() => {
        counter++;
        balls.forEach(ball => {
            ball.style.transform = `translate(${ranNum(1500)}px, ${ranNum(300)}px)`;
            ball.style.backgroundColor = `rgba(240, ${ranNum(255)}, ${ranNum(255)})`;
        })
        
        if(counter === 10) {
            clearInterval(level);
        }
    }, 400);

    balls.forEach(ball => {
        addEventListener('click', function(e) {
            if(e.target.closest('.target')) {
                winningPage.classList.remove('hidden');
                counter = 0;
                // lvl++
                // lvlText.textContent = `Level: ${lvl}`;
                // if(lvl > highscore && lvl > 1) {
                //     highscore = lvl - 1;
                //     highscoreText.textContent = `Highscore: ${highscore}`;
                // }
                this.setTimeout(() => {
                    winningPage.classList.add('hidden')
                }, 2000);
            }
            if(e.target.closest('.loser')){
                losingPage.classList.remove('hidden');
                counter = 0;
                this.setTimeout(() => {
                    losingPage.classList.add('hidden');
                }, 2000) 
            };
        });
    });


}
// crazyBall();

begin.addEventListener('click', function() {
    crazyBall();
})

