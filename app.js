/*
  GAME RULES:

  - The game has 2 players, playing in rounds
  - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
  - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
  - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
  - The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice2RollpreviousDiceRoll;
var $roundScore, $winnerName;
var firstGame = true;

var $dice1 = document.querySelector('#dice-1');
var $dice2 = document.querySelector('#dice-2');

var $btnNew = document.querySelector('.btn-new');
var $btnRoll = document.querySelector('.btn-roll');
var $btnHold = document.querySelector('.btn-hold');

function newGame() {
  if (!firstGame) {
    document.querySelector('.winner').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
  }

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  firstGame = false;

  renderScores();

  $btnHold.style.display = 'block';
  $btnRoll.style.display = 'block';
}

function rollDice() {
  var dice1Roll = Math.ceil(Math.random() * 6);
  var dice2Roll = Math.ceil(Math.random() * 6);

  $dice1.style.display = 'block';
  $dice2.style.display = 'block';
  $dice1.src = 'dice-' + dice1Roll + '.png';
  $dice2.src = 'dice-' + dice2Roll + '.png';

  var dicesTotal = dice1Roll + dice2Roll;

  $roundScore = document.querySelector('#current-' + activePlayer);
  $roundScore.textContent = dicesTotal;

  if (dice1Roll === 1 || dice2Roll === 1) {
    nextRound();
  } else if (dicesTotal === 12) {
    scores[activePlayer] = 0;
    renderScores();
    nextRound();
  } else {
    roundScore += dicesTotal;
    $roundScore.textContent = roundScore;
  }
}

function hold() {
  hideDices();

  scores[activePlayer] += roundScore;
  renderScores();

  scores[activePlayer] >= 100 ? setWinner() : nextRound();
}

function setWinner() {
  $winnerName = document.getElementById('name-' + activePlayer);
  $winnerName.textContent = 'WINNER';

  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

  hideDices();

  $roundScore = document.querySelector('#current-' + activePlayer);
  $roundScore.textContent = roundScore = 0;

  $btnHold.style.display = 'none';
  $btnRoll.style.display = 'none';
  $btnNew.style.display = 'block';
}

function nextRound() {
  $roundScore = document.querySelector('#current-' + activePlayer);
  $roundScore.textContent = roundScore = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  activePlayer = activePlayer === 1 ? 0 : 1;
}

function renderScores() {
  document.querySelector('#score-0').textContent = scores[0];
  document.querySelector('#score-1').textContent = scores[1];
}

function hideDices() {
  $dice1.style.display = 'none';
  $dice2.style.display = 'none';
}

$btnRoll.addEventListener('click', rollDice);
$btnHold.addEventListener('click', hold);
$btnNew.addEventListener('click', newGame);

newGame();
