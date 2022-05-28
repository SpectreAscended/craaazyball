"use strict";

const balls = document.querySelectorAll('.ball');
const targetBall = document.querySelector('.target');
const gameBox = document.querySelector('.game-box');
const loser = document.querySelectorAll('.loser');
const begin = document.querySelector('.start-game__button');
const winningPage = document.querySelector('.winning-page');
const losingPage = document.querySelector('.losing-page');



const ranNum = function(n) {
    return Math.trunc(Math.random() * n);
}

let counter = 0;

// const init = function() {
//     const markup = `
//     <div class="game-box__group--1">
//         <div class="ball ball--1 loser"></div>
//         <div class="ball ball--2 loser"></div>
//         <div class="ball ball--3 target"></div>
//         <div class="ball ball--4 loser"></div>

//         <div class="ball ball--1 loser"></div>
//         <div class="ball ball--2 loser"></div>
//         <div class="ball ball--3 loser"></div>
//         <div class="ball ball--4 loser"></div>
//     </div>
// `
// gameBox.insertAdjacentHTML("afterbegin", markup);
// }
// init();

const crazyBall = function() {

    targetBall.style.outline = 'none';
    const level = setInterval(() => {
        counter++;
        balls.forEach(ball => {
            ball.style.transform = `translate(${ranNum(1500)}px, ${ranNum(300)}px)`;
            ball.style.backgroundColor = `rgba(240, ${ranNum(255)}, ${ranNum(255)})`;
        })
        
        if(counter === 10) {
            clearInterval(level);
        }
        console.log(counter);
    }, 400);

    balls.forEach(ball => {
        addEventListener('click', function(e) {
            if(e.target.closest('.target')) {
                console.log('winner');
                winningPage.classList.remove('hidden');
                this.setTimeout(() => {
                    winningPage.classList.add('hidden')
                }, 2000);
            }
            if(e.target.closest('.loser')){
                console.log('loser');
                losingPage.classList.remove('hidden');
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

