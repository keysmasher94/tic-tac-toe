# Tic-Tac-Toe

## Description

A simple 2-player game of tic-tac toe. This game was made as part of The Odin
Project course and therefore is limited in capacity to what has been taught in
the course up until this point. There are a number of features which I would
like to add in the future, such as the capacity to play single player games
against a computer with differing levels of difficulty.

## Code Review Notes

- `handleBtnClick` is inside `handleClick`

```javascript
function handleClick(e) {
  ...
  function handleBtnClick() {
    ...
  }
}
```

- Don't query the DOM repeatedly, e.g., `let cell =
document.querySelector(`#${target.id}`);`. Instead, use `const cell =
e.target;`
- Lot's of duplicated styling, e.g.,

```javascript
cell.style.backgroundImage = "center";
cell.style.backgroundRepeat = "no-repeat";
cell.style.height = "100%";
```

Instead use:

```javascript
cell.style.backgroundImage =
  player === p1 ? "url(./images/x.png)" : "usl(./images/o.png)";
```

For the CSS,

```CSS
.cell {
  background-position: center;
  background-repeat: no-repeat;
}
```

- `isEmpty()` can be simplified

```javascript
if (board[row][column] !== "X" && board[row][column] !== "O") return true;
return false;
```

Simplified:

```javascript
return board[row][column] === "";
```

Since the board already starts with empty strings.

- `updateBoard()` should validate

It would be better to reject invalid moves or make it private so only game logic
can call it.

```javascript
if (board[row][column] !== "") return false;

board[row][column] = marker;
return true;
```

- There are unnecessary globals, e.g., `let p1Name = "";`. It could be passed
  into main(), e.g., `main(p1Name, p2Name)`.

- Multiple magic numbers appear throughout.
- The `main()` event listener is slightly buggy. When "Play Again" is pressed
  during the middle of a game, the previous event listener for the previous game
  is still operating.
- One of the biggest comments is the fact that the game logic knows too much
  about the DOM. Also, there is mapping from the JavaScript to the HTML, where it
  would be better suited if the HTML was setup so the JavaScript could easily
  connect to it.
