/*
 * TODO:
 * - Add checks to make sure a space hasn't already been entered
 * - Add checks to make sure the number entered is between 0 and 2 (probably
 *   not necessary though, as the game will become a DOM game)
 * - At this point work on HTML/CSS
 * - Add a DOM object
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
  return { updateBoard, getBoard, checkWinners };
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

  // Create a board
  const gameBoard = newBoard();
  // Create a function for updating the board
  const updateBoard = gameBoard.updateBoard;
  // Create a function for displaying the board
  const displayBoard = gameBoard.getBoard();

  // Begin game
  let gameOver = false;
  let turn = p1mark;
  let moves = 0;
  while (!gameOver) {
    // turn
    const row = Number(prompt("Enter row"));
    const column = Number(prompt("Enter column"));
    updateBoard(row, column, turn);
    // check for winners
    if (gameBoard.checkWinners(row, column, turn)) {
      gameOver = true;
    }
    if (turn === p1mark) {
      turn = p2mark;
    } else {
      turn = p1mark;
    }
    console.log(displayBoard);
    moves++;
    // 9 moves have been had, it's a tie (a win would have been caught)
    if (moves >= 9) {
      gameOver = true;
    }
  }
  // TODO: create a button that allows the user to reset the game
}

gameLogic("John", "Sarah");
