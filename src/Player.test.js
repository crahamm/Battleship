const Player = require("./Player");

test("Players can attack the enemy gameboard", () => {
  const playerOne = new Player(0);
  const playerTwo = new Player(1);

  playerOne.initBoard();
  playerTwo.initBoard();

  let attackTile = playerOne.generateAttack();
  playerTwo.board.receiveAttack(attackTile);

  const row = attackTile.slice(0, 1);
  const col = +attackTile.slice(1);

  attackTile = playerTwo.board.getBoard()[row][col - 1];
  expect(attackTile === 1 || attackTile === 3).toBe(true);
});

test("Players can sink other players ships", () => {
  const playerOne = new Player(0);
  const playerTwo = new Player(1);

  playerOne.initBoard();
  playerTwo.initBoard();

  let tile;

  // Simulate attacking all tiles on both boards
  for (let i = 0; i < 200; i++) {
    if (i % 2 === 0) {
      tile = playerOne.generateAttack();
      playerTwo.board.receiveAttack(tile);
    } else {
      tile = playerTwo.generateAttack();
      playerOne.board.receiveAttack(tile);
    }
  }

  // Check that all ships are sunk on both boards
  expect(playerOne.board.gameOver()).toBe(true);
  expect(playerTwo.board.gameOver()).toBe(true);
});
