const scoreDice1 = document.getElementById("score1");
const scoreDice2 = document.getElementById("score2");
const scoresDice = document.querySelectorAll(".curent-score");
const diceImage = document.querySelector(".dice-img");
const startBtn = document.querySelector(".start-btn");
const rollBtn = document.querySelector(".roll-btn");
const holdBtn = document.querySelector(".hold-btn");
const modal = document.querySelector(".modal-body");
const playerName = document.getElementById("playerName");
const submitBtn = document.querySelector(".submit-btn");
const modalContent = document.querySelector(".modal-content");
const playerContainName = document.querySelectorAll(".player-name");
const playerSection = document.querySelectorAll(".player");

const wining = () => {
  playerSection[activePlayer].classList.add("winer");
  playerContainName[activePlayer].textContent =
    players[`player${activePlayer + 1}Name`] + " Wins.";
  rollBtn.disabled = true;
  holdBtn.disabled = true;
};

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerSection[activePlayer].classList.add("active");
};

// starting
diceImage.classList.add("hidden");
let players = {};
let playerCount = 0;
let activePlayer = 0;
modal.classList.remove("hidden");

playerName.addEventListener("keydown", (e) => {
  if (playerName.value) {
    submitBtn.style.display = "block";
  } else submitBtn.style.display = "none";
});

const starting = () => {
  diceImage.classList.add("hidden");
  players = {};
  playerCount = 0;
  activePlayer = 0;
  modal.classList.remove("hidden");
  modalContent.textContent = `Hello Player1, what's your name?`;
  submitBtn.textContent = `OK`;
  scoreDice1.textContent = 0;
  scoreDice2.textContent = 0;
  scoresDice[0].textContent = 0;
  scoresDice[1].textContent = 0;
  playerSection[0].classList.remove("winer");
  playerSection[1].classList.remove("winer");
  playerSection[0].classList.add("active");
  playerSection[1].classList.remove("active");
};

// get the name of players
submitBtn.addEventListener("click", () => {
  playerCount++;
  if (playerCount === 1) {
    modal.classList.add("hidden");
    players.player1Name = playerName.value;
    players.player1score = 0;
    players.player1curentScore = 0;
    playerName.value = "";
    setTimeout(() => {
      modalContent.textContent = `And Hello Player2, what's your name?`;
      submitBtn.textContent = `Let's play!`;
      modal.classList.remove("hidden");
    }, 200);
  } else if (playerCount === 2) {
    modal.classList.add("hidden");
    players.player2Name = playerName.value;
    players.player2score = 0;
    players.player2curentScore = 0;
    playerName.value = "";
    for (let i = 0; i < 2; i++) {
      playerContainName[i].textContent = players[`player${i + 1}Name`];
    }
  }
});

// rolling the dice
rollBtn.addEventListener("click", () => {
  let num = Math.trunc(Math.random() * 6) + 1;
  diceImage.src = `load.png`;
  diceImage.classList.add("rotate");
  diceImage.classList.remove("hidden");
  setTimeout(() => {
    diceImage.src = `dice-${num}.png`;
    diceImage.classList.remove("rotate");
    if (num !== 1) {
      players[`player${activePlayer + 1}curentScore`] += num;
      scoresDice[activePlayer].textContent =
        players[`player${activePlayer + 1}curentScore`];
    } else {
      playerSection[activePlayer].classList.remove("active");

      players[`player${activePlayer + 1}score`] +=
        players[`player${activePlayer + 1}curentScore`];
      players[`player${activePlayer + 1}curentScore`] = 0;
      scoresDice[activePlayer].textContent = 0;
      document.getElementById(`score${activePlayer + 1}`).textContent =
        players[`player${activePlayer + 1}score`];

      if (players[`player${activePlayer + 1}score`] >= 100) wining();
      else switchPlayer();
    }
  }, 700);
});

// hold and other player plays
holdBtn.addEventListener("click", () => {
  playerSection[activePlayer].classList.remove("active");

  players[`player${activePlayer + 1}score`] +=
    players[`player${activePlayer + 1}curentScore`];
  players[`player${activePlayer + 1}curentScore`] = 0;
  scoresDice[activePlayer].textContent = 0;
  document.getElementById(`score${activePlayer + 1}`).textContent =
    players[`player${activePlayer + 1}score`];

  if (players[`player${activePlayer + 1}score`] >= 100) wining();
  else switchPlayer();
});

//play again
startBtn.addEventListener("click", starting);
