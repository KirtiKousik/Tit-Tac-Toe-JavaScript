document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const resetButton = document.querySelector(".reset-button");
  const messageElement = document.querySelector(".message");
  let currentPlayer = "X";
  let gameEnd = false;

  const xSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>`;

  const oSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z"/></svg>`;

  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
  });

  resetButton.addEventListener("click", resetGame);

  function cellClicked(event) {
    const cell = event.target;
    if (cell.textContent === "" && !gameEnd) {
      cell.innerHTML = currentPlayer === "X" ? xSvg : oSvg;
      cell.classList.add(currentPlayer);
      if (checkWin()) {
        endGame(
          `Player ${currentPlayer} wins! Do you want to start a new game?`
        );
      } else if (checkDraw()) {
        endGame("It's a draw! Do you want to start a new game?");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateMessage(`Player ${currentPlayer}'s turn`);
      }
    }
  }

  function checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        cells[a].classList.contains(currentPlayer) &&
        cells[b].classList.contains(currentPlayer) &&
        cells[c].classList.contains(currentPlayer)
      );
    });
  }

  function checkDraw() {
    return Array.from(cells).every((cell) => cell.textContent !== "");
  }

  function endGame(message) {
    gameEnd = true;
    updateMessage(message);
  }

  function resetGame() {
    gameEnd = false;
    currentPlayer = "X";
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("X", "O");
    });
    updateMessage(`Player ${currentPlayer}'s turn`);
  }

  function updateMessage(message) {
    messageElement.textContent = message;
  }
});
