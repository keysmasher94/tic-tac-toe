/*
 *  Tic-Tac-Toe - A simple two-player game of tic-tac-toe
 *  Copyright (C) 2026  Jared Lynch <jared@lynch-home.xyz>
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// TODO:
// - Include single player mode with oponent with easy,medium,impossible modes

// Constants
const body = document.querySelector("body");
const startBtn = document.querySelector(".start");
const display = document.querySelector(".display");
const playerNames = document.querySelector("#player-names");
const form = document.querySelector("form");

function createGameboard() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const updateBoard = (row, column, marker) => {
    board[row][column] = marker;
  };

  const isWinner = (row, column, marker) => {
    // HORIZONTAL CHECK
    let count = 1;
    // Right
    for (let c = column + 1; c <= 2 && board[row][c] === marker; c++) {
      count++;
    }
    // Left
    for (let c = column - 1; c >= 0 && board[row][c] === marker; c--) {
      count++;
    }
    if (count >= 3) return true;
    // VERTICAL CHECK
    count = 1;
    // Up
    for (let r = row - 1; r >= 0 && board[r][column] === marker; r--) {
      count++;
    }
    // Down
    for (let r = row + 1; r <= 2 && board[r][column] === marker; r++) {
      count++;
    }
    if (count >= 3) return true;
    // POSITIVE DIAGONAL CHECK
    count = 1;
    // Up/Right
    for (
      let r = row - 1, c = column + 1;
      r >= 0 && c <= 2 && board[r][c] === marker;
      r--, c++
    ) {
      count++;
    }
    // Down/Left
    for (
      let r = row + 1, c = column - 1;
      r <= 2 && c >= 0 && board[r][c] === marker;
      r++, c--
    ) {
      count++;
    }
    if (count >= 3) return true;
    // NEGATIVE DIAGONAL CHECK
    count = 1;
    // Down/Right
    for (
      let r = row + 1, c = column + 1;
      r <= 2 && c <= 2 && board[r][c] === marker;
      r++, c++
    ) {
      count++;
    }
    // Up/Left
    for (
      let r = row - 1, c = column - 1;
      r >= 0 && c >= 0 && board[r][c] === marker;
      r--, c--
    ) {
      count++;
    }
    if (count >= 3) return true;
    return false;
  };

  const isEmpty = (row, column) => {
    if (board[row][column] !== "X" && board[row][column] !== "O") return true;
    return false;
  };

  return { getBoard, updateBoard, isWinner, isEmpty };
}

function createPlayers() {
  let name;
  let marker;
  const setInformation = (setName, setMarker) => {
    name = setName;
    marker = setMarker;
  };
  const getName = () => name;
  const getMarker = () => marker;
  return { setInformation, getName, getMarker };
}

//function gameLogic(p1, p2, gameboard) {
function gameLogic() {
  const domToArrayMap = {
    "top-left": [0, 0],
    top: [0, 1],
    "top-right": [0, 2],
    "mid-left": [1, 0],
    mid: [1, 1],
    "mid-right": [1, 2],
    "bot-left": [2, 0],
    bot: [2, 1],
    "bot-right": [2, 2],
  };

  const processInput = (p1, p2, gameboard) => {
    let moveCount = 0;
    let player = p1;
    let marker = player.getMarker();
    //body.addEventListener("click", (e) => {
    function handleClick(e) {
      // log where the turn will be
      const moves = domToArrayMap[e.target.id];
      if (!moves) return;
      // Check if space is free
      if (!gameboard.isEmpty(moves[0], moves[1])) {
        // Stops from entering input twice on one cell
        return;
      }
      // Update cell
      gameboard.updateBoard(moves[0], moves[1], marker);
      let cell = document.querySelector(`#${e.target.id}`);
      if (player === p1) {
        cell.style.backgroundImage = "url(./images/x.png)";
        cell.style.backgroundPosition = "center";
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.height = "100%";
      } else {
        cell.style.backgroundImage = "url(./images/oSmall.png)";
        cell.style.backgroundPosition = "center";
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.height = "100%";
      }
      // Check for a winner
      if (gameboard.isWinner(moves[0], moves[1], marker)) {
        display.textContent = `${player.getName()} Wins!`;
        body.removeEventListener("click", handleClick);
        startBtn.textContent = "Play Again";
        startBtn.onclick = handleBtnClick;
      }

      function handleBtnClick() {
        main();
        display.textContent = "";
        for (key in domToArrayMap) {
          let cell = document.querySelector(`#${key}`);
          cell.style.backgroundImage = "none";
        }
      }
      // Change player turns
      if (player === p1) {
        player = p2;
        marker = player.getMarker();
      } else {
        player = p1;
        marker = player.getMarker();
      }
      moveCount++;
      if (moveCount >= 9) {
        display.textContent = `It's a draw...`;
        body.removeEventListener("click", handleClick);
        startBtn.textContent = "Play Again";
        startBtn.onclick = handleBtnClick;
      }
    }
    body.addEventListener("click", handleClick);
  };

  return { processInput, domToArrayMap };
}

function main() {
  // Create board
  const gameboard = createGameboard();
  // Create players
  const player1 = createPlayers();
  player1.setInformation(p1Name || "Alice", "X");
  const player2 = createPlayers();
  player2.setInformation(p2Name || "Bob", "O");
  startBtn.textContent = "Play Again";
  // Start game
  const game = gameLogic();
  game.processInput(player1, player2, gameboard);
}

let p1Name = "";
let p2Name = "";
playerNames.addEventListener("click", (e) => {
  e.preventDefault();
  p1Name = e.target.form[0].value;
  p2Name = e.target.form[1].value;
  body.removeChild(form);
  /*
  const displayNames = document.createElement("p");
  displayNames.textContent = `Player 1: ${p1Name} Player 2: ${p2Name}`;
  */
  const displayNames = document.createElement("div");
  displayNames.className = "displayNames";
  const leftName = document.createElement("p");
  p1Name
    ? (leftName.textContent = `Player 1: ${p1Name}`)
    : (leftName.textContent = "Player 1: Alice");
  const rightName = document.createElement("p");
  p2Name
    ? (rightName.textContent = `Player 2: ${p2Name}`)
    : (rightName.textContent = "Player 2: Bob");
  displayNames.appendChild(leftName);
  displayNames.appendChild(rightName);
  body.insertBefore(displayNames, startBtn);
});
startBtn.addEventListener("click", main);
