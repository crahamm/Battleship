/**
 * @jest-environment jsdom
 */

const Game = require("./Game");

test("Game can process a turn", () => {
  const game = new Game();
  const testStrike = "a4";

  game.init();
  game.processTurn(testStrike);

  // Turn incremented,
  expect(game.getTurn() === 2).toBe(true);
});

test("Game correctly reports when the game is over", () => {
  const game = new Game();

  game.init();

  while (!game.processTurn(game.getHumanPlayer().generateAttack())) {
    // Run through game loop
  }

  // Game over condition should be true for only one player
  expect(
    game.getHumanPlayer().board.gameOver() ^ game.getAiPlayer().board.gameOver()
  );
});
