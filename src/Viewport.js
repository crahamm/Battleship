const boardSize = 10;
const rowHeaders = "abcdefghij";

const Viewport = (container, clickCallback, resetCallBack) => {
  let aiBoard, playerBoard, gameConsole;

  const generateBoard = (isPlayer) => {
    const board = document.createElement("div");
    const header = document.createElement("h2");

    header.innerHTML = isPlayer ? "You" : "Computer";
    board.append(header);

    for (let cols = 0; cols < boardSize + 1; cols++) {
      const col = document.createElement("div");
      col.classList.add("board-col");

      for (let cells = 0; cells < boardSize + 1; cells++) {
        const cell = document.createElement("div");
        cell.classList.add(isPlayer ? "empty-cell" : "empty-ai-cell");

        if (cols > 0 && cells === 0) {
          // A-J column headers
          cell.innerHTML = rowHeaders.charAt(cols - 1).toUpperCase();
          cell.classList.add("header-cell");
        } else if (cols === 0 && cells > 0) {
          // 0-10 row headers
          cell.innerHTML = cells;
          cell.classList.add("header-cell");
        } else if (!isPlayer && cols > 0 && cells > 0) {
          // Only the computer cells should be clickable
          cell.addEventListener("click", () =>
            clickCallback(rowHeaders.charAt(cols - 1) + cells)
          );
        }

        col.append(cell);
      }

      board.append(col);
    }

    return board;
  };

  const updateBoard = (board, isPlayer) => {
    const boardElement = isPlayer ? playerBoard : aiBoard;
    let value;

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        value = board[rowHeaders.charAt(row)][col];

        boardElement.childNodes[row + 2].childNodes[col + 1].innerHTML = "";
        if (isPlayer)
          boardElement.childNodes[row + 2].childNodes[col + 1].className =
            "empty-cell";
        else
          boardElement.childNodes[row + 2].childNodes[col + 1].className =
            "empty-ai-cell";

        switch (value) {
          case 1: // Missed attack tile
            boardElement.childNodes[row + 2].childNodes[col + 1].innerHTML =
              "X";
            boardElement.childNodes[row + 2].childNodes[col + 1].classList.add(
              "missed-cell"
            );
            break;
          case 2: // Ship tile
            boardElement.childNodes[row + 2].childNodes[col + 1].innerHTML = "";
            if (isPlayer)
              // Don't show computer ships to the player
              boardElement.childNodes[row + 2].childNodes[
                col + 1
              ].classList.add("ship-cell");
            break;
          case 3: // Hit attack tile
            boardElement.childNodes[row + 2].childNodes[col + 1].innerHTML =
              "X";
            boardElement.childNodes[row + 2].childNodes[col + 1].classList.add(
              "hit-cell"
            );
            break;
        }
      }
    }
  };

  const generateConsole = () => {
    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.innerHTML = "Game log";

    const output = document.createElement("div");
    const outputText = document.createElement("textarea");

    outputText.id = "game-output-text";
    outputText.disabled = true;

    output.id = "game-output";
    output.append(outputText);

    const controls = document.createElement("div");
    const resetButton = document.createElement("button");

    resetButton.type = "button";
    resetButton.innerHTML = "Reset game";
    resetButton.id = "game-controls-reset";
    resetButton.addEventListener("click", () => resetCallBack());

    controls.id = "game-controls";
    controls.append(resetButton);

    container.append(title, output, controls);
    return container;
  };

  const updateConsole = (msg) => {
    const textArea = gameConsole.childNodes[1].childNodes[0];

    if (!textArea.value) {
      textArea.value = msg; // Don't prepend newline for first message
    } else {
      textArea.value += "\n" + msg;
    }

    // Keep scrollbar at the bottom
    textArea.scrollTop = textArea.scrollHeight;
  };

  const resetConsole = () => {
    const textArea = gameConsole.childNodes[1].childNodes[0];

    textArea.value = "";
  };

  const init = () => {
    aiBoard = generateBoard(false);
    playerBoard = generateBoard(true);
    gameConsole = generateConsole();

    aiBoard.id = "ai-board";
    aiBoard.classList.add("gameboard");

    playerBoard.id = "player-board";
    playerBoard.classList.add("gameboard");

    gameConsole.id = "game-console";
    gameConsole.classList.add("console");

    container.append(aiBoard, playerBoard, gameConsole);
  };

  return { init, updateBoard, updateConsole, resetConsole };
};

module.exports = Viewport;
