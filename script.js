/*
 * TODO:
 * - Add a DOM object
 * - Change the input from prompts to screen clicks
 * - Add a function that allows players to add their names; a start/restart
 *   function; a display element that shows the outcome of the game
 */
function newBoard() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const updateBoard = (row, column, marker) => {
    board[row][column] = marker;
  };
  const getBoard = () => board;
  const checkWinners = (row, column, marker) => {
    // Horizontal check
    let count = 1;
    // Check right
    for (let c = column + 1; c <= 2 && board[row][c] === marker; c++) {
      count++;
    }
    // Check left
    for (let c = column - 1; c >= 0 && board[row][c] === marker; c--) {
      count++;
    }
    if (count >= 3) return true;
    // Vertical check
    count = 1;
    // Check down
    for (let r = row + 1; r <= 2 && board[r][column] === marker; r++) {
      count++;
    }
    // Check up
    for (let r = row - 1; r >= 0 && board[r][column] === marker; r--) {
      count++;
    }
    if (count >= 3) return true;
    // Check left-top to bottom-right
    count = 1;
    // Check down/right
    for (
      let r = row + 1, c = column + 1;
      r <= 2 && c <= 2 && board[r][c] === marker;
      r++, c++
    ) {
      count++;
    }
    // Check up/left
    for (
      let r = row - 1, c = column - 1;
      r >= 0 && c >= 0 && board[r][c] === marker;
      r--, c--
    ) {
      count++;
    }
    if (count >= 3) return true;
    // Check bottom-left to top-right
    count = 1;
    // Check up/right
    for (
      let r = row - 1, c = column + 1;
      r >= 0 && c <= 2 && board[r][c] === marker;
      r--, c++
    ) {
      count++;
    }
    // Check down/left
    for (
      let r = row + 1, c = column - 1;
      r <= 2 && c >= 0 && board[r][c] === marker;
      r++, c--
    ) {
      count++;
    }
    if (count >= 3) return true;
    return false;
  };
  // TODO: check for an empty move
  function checkBoard(row, column) {
    if (board[row][column] === "X" || board[row][column] === "O") return false;
    return true;
  }
  return { updateBoard, getBoard, checkWinners, checkBoard };
}

function createPlayer(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

function gameLogic(p1, p2) {
  // TODO: figure out how to make this factories?
  // Create the players
  const player1 = createPlayer(p1, "X");
  const player2 = createPlayer(p2, "O");
  // Set variables for retrieving player 1 info
  const p1name = player1.getName();
  const p1mark = player1.getMarker();
  // Set variables for retrieving player 2 info
  const p2name = player2.getName();
  const p2mark = player2.getMarker();

  // Create a board and associated functions
  const gameBoard = newBoard();
  const updateBoard = gameBoard.updateBoard;
  const displayBoard = gameBoard.getBoard();

  // Begin game
  let gameOver = false;
  let turn = p1mark;
  let moves = 0;
  // TODO: remove while loop and make it event driven
  while (!gameOver) {
    // turn
    let row;
    let column;
    while (true) {
      let domMove = domControl();
      let move = domMove.makeMove(turn);
      console.log(move);
      row = move[0];
      column = move[1];
      //row = Number(prompt(`Player ${turn}: Enter row`));
      //column = Number(prompt(`Player ${turn}: Enter column`));
      if (gameBoard.checkBoard(row, column)) {
        updateBoard(row, column, turn);
        console.log(gameBoard);
        break;
      }
      alert("Invalid move");
    }
    // check for winners
    if (gameBoard.checkWinners(row, column, turn)) {
      gameOver = true;
    }
    if (turn === p1mark) {
      turn = p2mark;
    } else {
      turn = p1mark;
    }
    moves++;
    // 9 moves have been had, it's a tie (a win would have been caught)
    if (moves >= 9) {
      gameOver = true;
    }
  }
  // TODO: create a button that allows the user to reset the game
}

function domControl() {
  /* Do I need this?
  const topLeft = document.querySelector("#top-left");
  const top = document.querySelector("#top");
  const topRight = document.querySelector("#top-right");
  const middleLeft = document.querySelector("#middle-left");
  const middle = document.querySelector("#middle");
  const middleRight = document.querySelector("#middle-right");
  const bottomLeft = document.querySelector("#bottom-left");
  const bottom = document.querySelector("#bottom");
  const bottomRight = document.querySelector("#bottom-right");
  */

  function makeMove(marker) {
    const domBoard = document.querySelector(".gameboard");
    domBoard.addEventListener("click", (e) => {
      console.log(e.target.id);
      let cell = document.querySelector(`#${e.target.id}`);
      cell.textContent = marker;
      // TODO:
      // - change this switch statement to a key-value pair of ids and their
      // corresponding array of values, then just return the key's value
      switch (e.target.id) {
        case "top-left":
          return [0, 0];
          break;
        case "top":
          return [0, 1];
          break;
        case "top-right":
          return [0, 2];
          break;
        case "middle-left":
          return [1, 0];
          break;
        case "middle":
          return [1, 1];
          break;
        case "middle-right":
          return [1, 2];
          break;
        case "bottom-left":
          return [2, 0];
          break;
        case "bottom":
          return [2, 1];
          break;
        case "bottom-right":
          return [2, 2];
          break;
      }
    });
  }
  return { makeMove };
}

gameLogic("John", "Sarah");
