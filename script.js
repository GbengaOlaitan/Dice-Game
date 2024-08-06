'use strict';
//SELECTING ELEMENT
const player0El = document.querySelector('.player--0');
const playerEl = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const intialScore = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
};

intialScore();

diceEl.classList.add('hidden');

let scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  playerEl.classList.toggle('player--active');
};
//ROLING DICE FUNCTIONALITY
rollDice.addEventListener('click', function () {
  if (playing) {
    //GENERATINING A DICE RANDOM  NUMBER
    const dice = Math.trunc(Math.random() * 6) + 1;
    // DISPLAYING DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //CHECK FOR ROLLED 1: IF TRUE SWITCH TO NEXT PLAYER
    if (dice !== 1) {
      //Add dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // change later
    } else {
      //move to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to the active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
    //finsh the game

    //switch to the next player
  }
});

//RESET Game
btnNew.addEventListener('click', function () {
  //Remove the player--winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  // set playing to true
  playing = true;
  // set active player to player one
  player0El.classList.add('player--active');
  currentScore = 0;
  activePlayer = 0;
  //set scores to zero
  intialScore();
  // set current score to 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores = [0, 0];
});
