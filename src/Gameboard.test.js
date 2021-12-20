const Gameboard = require("./Gameboard");
const Ship = require("./Ship");

test("Gameboards can place ships", () => {
  const testBoard = new Gameboard();
  const testShip = new Ship("battleship");

  testBoard.init();
  testBoard.addShip(testShip, "b4");
  expect(testBoard.getBoard()).toMatchObject({
    b: [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
  });
});

describe("Gameboards can receive attacks", () => {
  const testBoard = new Gameboard();
  const testShip = new Ship("battleship");
  const testShip2 = new Ship("destroyer");

  testBoard.init();

  test("Attack an empty tile", () => {
    testBoard.receiveAttack("c10");
    expect(testBoard.getBoard()).toMatchObject({
      c: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    });
  });

  test("Attack a tile occupied by a ship", () => {
    testBoard.addShip(testShip, "d2");
    testBoard.addShip(testShip2, "a4");
    testBoard.receiveAttack("d4");

    expect(testBoard.getBoard()).toMatchObject({
      d: [0, 2, 2, 3, 2, 0, 0, 0, 0, 0],
    });
    expect(testShip.getState()).toEqual([0, 0, 1, 0]);
  });

  test("Attack a tile that's already been attacked", () => {});
});

test("Gameboards can track missed attacks", () => {
  const testBoard = new Gameboard();

  testBoard.init();

  testBoard.receiveAttack("a4");
  expect(testBoard.getBoard()).toMatchObject({
    a: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  });
});

test("Gameboards can report if a ship exists at a given tile", () => {
  const testBoard = new Gameboard();
  const testShips = [
    new Ship("battleship"),
    new Ship("destroyer"),
    new Ship("submarine"),
  ];

  testBoard.init();

  testBoard.addShip(testShips[0], "a2");
  testBoard.addShip(testShips[1], "a6");
  testBoard.addShip(testShips[2], "d4");

  expect(testBoard.getShip("a2").obj.getName()).toBe("battleship");
  expect(testBoard.getShip("a7").obj.getName()).toBe("destroyer");
  expect(testBoard.getShip("d5").obj.getName()).toBe("submarine");
});

test("Gameboards can report if all ships are sunk", () => {
  const testBoard = new Gameboard();
  const testShips = [new Ship("battleship"), new Ship("destroyer")];

  testBoard.init();

  testBoard.addShip(testShips[0], "b2");
  testBoard.addShip(testShips[1], "f1");

  testBoard.receiveAttack("b2");
  testBoard.receiveAttack("b3");
  testBoard.receiveAttack("b4");
  testBoard.receiveAttack("b5");

  expect(testBoard.gameOver()).toBe(false);

  testBoard.receiveAttack("f1");
  testBoard.receiveAttack("f2");

  expect(testBoard.gameOver()).toBe(true);
});
