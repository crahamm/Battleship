const Ship = require("./Ship");

test("Ships are initialized with the correct ship class attributes", () => {
  const classData = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  const shipClasses = Object.keys(classData);

  shipClasses.forEach((shipClass) => {
    const testShip = new Ship(shipClass);

    expect(testShip.getName()).toBe(shipClass);
    expect(testShip.getLength()).toBe(classData[shipClass]);
  });
});

test("Ships can register hits", () => {
  const testShip = new Ship("destroyer");

  testShip.hit(2);
  testShip.hit(3);

  expect(testShip.getState()).toEqual([0, 0, 1, 1]);
});

test("Ships can be sunk", () => {
  const testShip = new Ship("battleship");

  for (let i = 0; i < testShip.getLength(); i++) {
    expect(testShip.isSunk()).toBe(false);
    testShip.hit(i);
  }

  expect(testShip.isSunk()).toBe(true);
});
