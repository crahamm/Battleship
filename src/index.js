import "./index.css";

const Viewport = require("./Viewport");
const Game = require("./Game");

let game = new Game();
game.init();

const container = document.getElementById("app");

const pageTitle = document.createElement("h1");
pageTitle.innerHTML = "Battleship.js";

const gameViewContainer = document.createElement("div");
gameViewContainer.id = "game-view";

container.append(pageTitle, gameViewContainer);

// Track whether the current game is over
let gameEnded;

// Callback function for clicked cells
const clickCallBack = (cell) => {
  const res = game.processTurn(cell);

  console.table(res);

  if (res.valid && !gameEnded) {
    gameView.updateConsole(`Turn: ${res.turn}`);
    gameView.updateConsole(
      `Player struck tile ${cell} and ${
        res.playerState.hit ? "hit!" : "missed..."
      }`
    );

    if (res.gameOver && res.winner === 0) {
      gameView.updateConsole("You win!");
      gameView.updateConsole("Hit the button below to restart...");
      gameEnded = true;
    }

    if (!gameEnded) {
      gameView.updateConsole(
        `Computer struck tile ${res.aiState.tile} and ${
          res.aiState.hit ? "hit!" : "missed..."
        }`
      );
    }

    if (res.gameOver && res.winner === 1) {
      gameView.updateConsole("You lose!");
      gameView.updateConsole("Hit the button below to restart");
      gameEnded = true;
    }

    gameView.updateBoard(game.getHumanPlayer().board.getBoard(), true);
    gameView.updateBoard(game.getAiPlayer().board.getBoard(), false);
  } else if (!gameEnded) {
    gameView.updateConsole("Tile already hit, select another");
  }
};

// Callback function for reset button
const resetCallBack = () => {
  game = new Game();
  game.init();

  gameEnded = false;

  gameView.resetConsole();
  gameView.updateConsole("Click a tile to attack...");

  gameView.updateBoard(game.getHumanPlayer().board.getBoard(), true);
  gameView.updateBoard(game.getAiPlayer().board.getBoard(), false);
};

const gameView = new Viewport(gameViewContainer, clickCallBack, resetCallBack);
gameView.init();

// gameView.updateBoard(game.getHumanPlayer().board.getBoard(), true);
// gameView.updateBoard(game.getAiPlayer().board.getBoard(), false);

// Populate initial game board
resetCallBack();
