const boardElement = document.querySelector("#game-board");
let player = "X";
let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function printBoard() {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];

    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      const columnElement = selectCell(i, j);

      columnElement.innerHTML = col;
    }
  }
}

for (let i = 0; i < board.length; i++) {
  const row = board[i];

  for (let j = 0; j < row.length; j++) {
    const columnElement = selectCell(i, j);

    columnElement.addEventListener("click", () => {
      if (board[i][j] === null) {
        populateCell(i, j);
        printBoard();
        checkWin();
        player = player === "X" ? "O" : "X";
      }
    });
  }
}

function selectCell(row, column) {
  return document.querySelector(`#item-${row}-${column}`);
}

function populateCell(row, column) {
  board[row][column] = player;
}

function checkWin() {
  let winOnRows = false;
  let winOnCols = false;
  let winOnDiag = false;

  for (let row = 0; row < board.length; row++) {
    let firstEl = board[row][0];

    winOnRows = board[row].every((col) => col === firstEl && firstEl !== null);
    if (winOnRows) {
      break;
    }
  }

  const transposedBoard = transposeBoard();
  for (let row = 0; row < board.length; row++) {
    let firstEl = transposedBoard[row][0];

    winOnCols = transposedBoard[row].every(
      (col) => col === firstEl && firstEl !== null
    );
    if (winOnCols) {
      break;
    }
  }

  if (
    (board[0][0] === board[1][1] &&
      (board[0][0] === board[2][2]) & (board[0][0] !== null)) ||
    (board[0][2] === board[1][1] &&
      (board[0][2] === board[2][0]) & (board[0][2] !== null))
  ) {
    winOnDiag = true;
  }

  if (winOnRows || winOnCols || winOnDiag) {
    console.log("Vitória do", player);
  }
}

function transposeBoard() {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}

printBoard();
