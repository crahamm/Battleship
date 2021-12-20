const Player = require("./Player");

const humanPlayer = 0;
const aiPlayer = 1;

const Game = () => {
  let turn;
  let players = [new Player(humanPlayer), new Player(aiPlayer)];

  const init = () => {
    players.forEach((player) => player.initBoard());
    turn = 1;
  };

  const processTurn = (move) => {
    const playerMove = players[aiPlayer].board.receiveAttack(move);
    let gameOver = false;
    let winner = 0;

    // Only process the turn if the player move is valid
    if (playerMove) {
      let aiAttack, aiMove;

      if (players[aiPlayer].board.gameOver()) {
        gameOver = true;
      } else {
        // Skip ai move if the player has already won
        aiAttack = players[aiPlayer].generateAttack();
        aiMove = players[humanPlayer].board.receiveAttack(aiAttack);

        if (players[humanPlayer].board.gameOver()) {
          gameOver = true;
          winner = 1;
        } else {
          // No need to increment the turn if there is a winner
          turn++;
        }
      }

      return {
        valid: true,
        turn: turn - 1,
        playerState: { hit: playerMove === 2 ? true : false },
        aiState: { hit: aiMove === 2 ? true : false, tile: aiAttack },
        gameOver: gameOver,
        winner: winner,
      };
    }

    return {
      valid: false,
    };
  };

  const getTurn = () => turn;
  const getHumanPlayer = () => players[humanPlayer];
  const getAiPlayer = () => players[aiPlayer];

  return { init, processTurn, getTurn, getHumanPlayer, getAiPlayer };
};

module.exports = Game;
