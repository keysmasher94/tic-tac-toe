// Constants
const body = document.querySelector("body");
// XXX: these may not be necessary
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
    let gameOver = false;
    let player = p1;
    let marker = player.getMarker();
    //body.addEventListener("click", (e) => {
    function handleClick(e) {
      // log where the turn will be
      const moves = domToArrayMap[e.target.id];
      // Check if space is free
      if (!gameboard.isEmpty(moves[0], moves[1])) {
        // Stops from entering input twice on one cell
        return;
      }
      // Update cell
      gameboard.updateBoard(moves[0], moves[1], marker);
      let cell = document.querySelector(`#${e.target.id}`);
      cell.textContent = marker;
      // Check for a winner
      if (gameboard.isWinner(moves[0], moves[1], marker)) {
        // XXX: GAME OVER STATE; maybe trigger a button on screen to reset
        // and then call `main()` again; as well as write the winners name
        // to a screen
        console.log(`${player.getName()} wins`);
        body.removeEventListener("click", handleClick);
        gameOver = true;
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
        // XXX: TIE STATE; same as if there's a winner
        console.log("It's a draw");
        body.removeEventListener("click", handleClick);
        gameOver = true;
      }
    }
    body.addEventListener("click", handleClick);
  };

  return { processInput, domToArrayMap };
}

function main() {
  // Create board
  const gameboard = createGameboard();
  // TODO:
  // - add a display for the winner's name to go into
  // - add inputs for the user's to enter their names
  // Create players
  // p1name = ...
  // p2name = ...
  const player1 = createPlayers();
  player1.setInformation("John", "X");
  const player2 = createPlayers();
  player2.setInformation("Mary", "O");
  // Start game
  const game = gameLogic();
  game.processInput(player1, player2, gameboard);
}

main();

/* TODO:
 * - Place images rather than text in boxes
 * - Allow users to put in their names
 * - Include a 'start'/'restart' button
 * - Add a display that shows the results at the end of the game
 * - Clean up the UI
 */
