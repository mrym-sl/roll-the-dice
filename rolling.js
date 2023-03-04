const scoreDice1 = document.getElementById("score1");
const scoreDice2 = document.getElementById("score2");
const diceImage = document.querySelector(".dice-img");
const startBtn = document.querySelector(".start-btn");
const rollBtn = document.querySelector(".roll-btn");
const holdBtn = document.querySelector(".hold-btn");

// start step
diceImage.classList.add("hidden");

// rolling the dice
rollBtn.addEventListener("click", () => {
  let num = Math.trunc(Math.random() * 6) + 1;
  diceImage.src = `load.png`;
  diceImage.classList.add("rotate");
  diceImage.classList.remove("hidden");
  setTimeout(() => {
    diceImage.src = `dice-${num}.png`;
    diceImage.classList.remove("rotate");
  }, 800);
});
