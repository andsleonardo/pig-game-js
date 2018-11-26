/*
  GAME RULES:

  - The game has 2 players, playing in rounds
  - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
  - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
  - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
  - The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;
var $roundScore, $winnerName;
var firstGame = true;

var $dice = document.querySelector('.dice');
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

  document.querySelector('#score-0').textContent = scores[0];
  document.querySelector('#score-1').textContent = scores[1];

  $btnNew.style.display = 'none';
  $btnHold.style.display = 'block';
  $btnRoll.style.display = 'block';
}

function rollDice() {
  var randomNum = Math.ceil(Math.random() * 6);

  $dice.style.display = 'block';
  $dice.src = 'dice-' + randomNum + '.png';

  $roundScore = document.querySelector('#current-' + activePlayer);
  $roundScore.textContent = randomNum;

  if (randomNum === 1) nextRound();
  else {
    roundScore += randomNum;
    $roundScore.textContent = roundScore;
  }
}

function hold() {
  scores[activePlayer] += roundScore;
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  scores[activePlayer] >= 100 ? setWinner() : nextRound();
}

function setWinner() {
  $winnerName = document.getElementById('name-' + activePlayer);
  $winnerName.textContent = 'WINNER';

  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

  $dice.style.display = 'none';

  $roundScore = document.querySelector('#current-' + activePlayer);
  $roundScore.textContent = roundScore = 0;

  $btnHold.style.display = 'none';
  $btnRoll.style.display = 'none';
  $btnNew.style.display = 'block';
}

function nextRound() {
  $dice.style.display = 'none';

  $roundScore = document.querySelector('#current-' + activePlayer);
  $roundScore.textContent = roundScore = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  activePlayer = activePlayer === 1 ? 0 : 1;
}

$btnRoll.addEventListener('click', rollDice);
$btnHold.addEventListener('click', hold);
$btnNew.addEventListener('click', newGame);

newGame();
