// elementos DOM a variables

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document
    .querySelector('.player--' + activePlayer)
    .classList.remove('player--winner');
  document
    .querySelector('.player--' + activePlayer)
    .classList.add('player--active');

  for (const elemDOM of [current0El, current1El, score0El, score1El])
    elemDOM.textContent = 0;

  // current0El.textContent = 0;
  // current1El.textContent = 0;
  // score0El.textContent = 0;
  // score1El.textContent = 0;

  // diceEl.style.display = 'none';
  diceEl.classList.add('hidden');
};

const endGame = function () {
  playing = false;
  diceEl.classList.add('hidden');
  document
    .querySelector('.player--' + activePlayer)
    .classList.add('player--winner');
  document
    .querySelector('.player--' + activePlayer)
    .classList.remove('player--active');
};
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // lo mismo más corto aprovechando coertion type
  // activePlayer = activePlayer ? 0 : 1

  // uso un bucle for para hacerlo "más sencillo"
  // player0El.classList.toggle('player--active');
  // player1El.classList.toggle('player--active');
  for (const playerEl of [player0El, player1El])
    playerEl.classList.toggle('player--active');
};

init();

btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    /* cambiar imagen  dado */
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      /* add dice to current score */
      // currentScore = currentScore + dice;
      currentScore += dice;
      /* display new score  */
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      endGame();
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', () => {
  init();
});
btnNew.addEventListener('click', init);
