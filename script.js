// Constants
const body = document.querySelector("body");
const PLAYER_ONE = "X";
const PLAYER_TWO = "O";

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

  // FIXME: bottom-left to top-right doesn't work on dom
  const isWinner = (row, column, marker) => {
    // HORIZONTAL CHECK
    let count = 1;
    // Right
    for (c = column + 1; c <= 2 && board[row][c] === marker; c++) {
      count++;
    }
    // Left
    for (c = column - 1; c >= 0 && board[row][c] === marker; c--) {
      count++;
    }
    if (count >= 3) return true;
    // VERTICAL CHECK
    count = 1;
    // Up
    for (r = row - 1; r >= 0 && board[r][column] === marker; r--) {
      count++;
    }
    // Down
    for (r = row + 1; r <= 2 && board[r][column] === marker; r++) {
      count++;
    }
    if (count >= 3) return true;
    // POSITIVE DIAGONAL CHECK
    count = 1;
    // Up/Right
    for (
      r = row - 1, c = column + 1;
      r >= 0 && c <= 2 && board[r][c] === marker;
      r--, c++
    ) {
      count++;
    }
    // Down/Left
    for (
      r = row + 1, c = column - 1;
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
      r = row + 1, c = column + 1;
      r <= 2 && c <= 2 && board[r][c] === marker;
      r++, c++
    ) {
      count++;
    }
    // Up/Left
    for (
      r = row - 1, c = column - 1;
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

// XXX: maybe don't set name, marker as parameters
function createPlayers(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

function gameLogic(p1, p2, gameboard) {
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
    // TODO: more will need to go in here
    let player = p1;
    let marker = player.getMarker();
    body.addEventListener("click", (e) => {
      // log where the turn will be
      const moves = domToArrayMap[e.target.id];
      // Check if space is free
      gameboard.isEmpty(moves[0], moves[1]);
      // Update cell
      gameboard.updateBoard(moves[0], moves[1], marker);
      let cell = document.querySelector(`#${e.target.id}`);
      cell.textContent = marker;
      // Check for a winner
      if (gameboard.isWinner(moves[0], moves[1], marker)) {
        // XXX:
        console.log(`${player.getName()} wins`);
      }
      // Change player turns
      if (player === p1) {
        player = p2;
        marker = player.getMarker();
      } else {
        player = p1;
        marker = player.getMarker();
      }
    });
  };

  return { processInput, domToArrayMap };
}

function main() {
  // Create players
  const player1 = createPlayers("John", "X");
  const player2 = createPlayers("Mary", "O");
  // Create board
  const gameboard = createGameboard();
  // Start game
  // XXX: parameters in game may be redundant
  const game = gameLogic(player1, player2, gameboard);
  game.processInput(player1, player2, gameboard);
}

// XXX: currently working in 'addEventListener' section

main();
