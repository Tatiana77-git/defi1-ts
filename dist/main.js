"use strict";
const game = document.querySelector(".game");
const result = document.querySelector(".result");
const btn = document.querySelector(".new-game");
const fields = document.querySelectorAll(".field");
let step = false;
let count = 0;
const circle = `
  <svg class="circle">
    <circle r="45" cx="58" cy="58" stroke="blue"
    stroke-width="10" fill="none" stroke-linecap="round"/>
  </svg>`;
const cross = `
  <svg class="cross">
    <line class="first" x1="15" y1="15" x2="100" y2="100"
    stroke="red" stroke-width="10" stroke-linecap="round" />
    <line class="second" x1="100" y1="15" x2="15" y2="100"
    stroke="red" stroke-width="10" stroke-linecap="round" />
  </svg>`;
function stepCross(target) {
    target.innerHTML = cross;
    target.classList.add('x');
    new Audio('audio/cross.mp3').play();
    count++;
}
function stepZero(target) {
    target.innerHTML = circle;
    target.classList.add('o');
    new Audio('audio/zero.mp3').play();
    count++;
}
function letsGO(e) {
    const target = e.target;
    if (!target.classList.contains('field'))
        return;
    if (target.classList.contains('x') || target.classList.contains('o'))
        return;
    if (!step) {
        stepCross(target);
    }
    else {
        stepZero(target);
    }
    step = !step;
    winGame();
}
function newGame() {
    step = false;
    count = 0;
    if (result)
        result.innerText = '';
    fields.forEach(field => {
        field.innerHTML = '';
        field.classList.remove('x', 'o', 'active');
    });
    if (game)
        game.addEventListener('click', letsGO);
}
function showWinner(indices, message) {
    setTimeout(() => {
        for (let index of indices) {
            fields[index].classList.add('active');
        }
        if (result)
            result.innerText = message;
    }, 300);
    if (game)
        game.removeEventListener('click', letsGO);
}
function winGame() {
    const combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of combos) {
        const [a, b, c] = combo;
        if (fields[a].classList.contains('x') &&
            fields[b].classList.contains('x') &&
            fields[c].classList.contains('x')) {
            showWinner(combo, 'X wins');
            return;
        }
        if (fields[a].classList.contains('o') &&
            fields[b].classList.contains('o') &&
            fields[c].classList.contains('o')) {
            showWinner(combo, 'O wins');
            return;
        }
    }
    if (count === 9) {
        if (result)
            result.innerText = "It's a tie!";
        if (game)
            game.removeEventListener('click', letsGO);
    }
}
// Initialisation
if (btn)
    btn.addEventListener('click', newGame);
if (game)
    game.addEventListener('click', letsGO);
