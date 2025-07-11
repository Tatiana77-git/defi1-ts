
const game: HTMLElement | null = document.querySelector(".game");
const result: HTMLElement | null = document.querySelector(".result");
const btn: HTMLButtonElement | null = document.querySelector(".new-game");
const fields: NodeListOf<HTMLElement> = document.querySelectorAll(".field");

let step: boolean = false; 
let count: number = 0;

const circle: string = `
  <svg class="circle">
    <circle r="45" cx="58" cy="58" stroke="blue"
    stroke-width="10" fill="none" stroke-linecap="round"/>
  </svg>`;

const cross: string = `
  <svg class="cross">
    <line class="first" x1="15" y1="15" x2="100" y2="100"
    stroke="red" stroke-width="10" stroke-linecap="round" />
    <line class="second" x1="100" y1="15" x2="15" y2="100"
    stroke="red" stroke-width="10" stroke-linecap="round" />
  </svg>`;

function stepCross(target: HTMLElement): void {
  target.innerHTML = cross;
  target.classList.add('x');
  new Audio('audio/cross.mp3').play();
  count++;
}

function stepZero(target: HTMLElement): void {
  target.innerHTML = circle;
  target.classList.add('o');
  new Audio('audio/zero.mp3').play();
  count++;
}

function letsGO(e: Event): void {
  const target = e.target as HTMLElement;

  if (!target.classList.contains('field')) return;
  if (target.classList.contains('x') || target.classList.contains('o')) return;

  if (!step) {
    stepCross(target);
  } else {
    stepZero(target);
  }

  step = !step;
  winGame();
}

function newGame(): void {
  step = false;
  count = 0;
  if (result) result.innerText = '';
  fields.forEach(field => {
    field.innerHTML = '';
    field.classList.remove('x', 'o', 'active');
  });
  if (game) game.addEventListener('click', letsGO);
}

function showWinner(indices: number[], message: string): void {
  setTimeout(() => {
    for (let index of indices) {
      fields[index].classList.add('active');
    }
    if (result) result.innerText = message;
  }, 300);
  if (game) game.removeEventListener('click', letsGO);
}

function winGame(): void {
  const combos: number[][] = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of combos) {
    const [a, b, c] = combo;
    if (
      fields[a].classList.contains('x') &&
      fields[b].classList.contains('x') &&
      fields[c].classList.contains('x')
    ) {
      showWinner(combo, 'Gagné X');
      return;
    }

    if (
      fields[a].classList.contains('o') &&
      fields[b].classList.contains('o') &&
      fields[c].classList.contains('o')
    ) {
      showWinner(combo, 'Gagné O');
      return;
    }
  }

  if (count === 9) {
    if (result) result.innerText = "Match Nul";
    if (game) game.removeEventListener('click', letsGO);
  }
}

// Initialisation
if (btn) btn.addEventListener('click', newGame);
if (game) game.addEventListener('click', letsGO);
