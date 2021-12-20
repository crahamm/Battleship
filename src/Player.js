const Gameboard = require("./Gameboard");
const Ship = require("./Ship");

const rows = "abcdefghij";
const boardSize = 10;

const Player = (id) => {
  const board = new Gameboard();

  const initBoard = () => {
    const ships = [
      new Ship("carrier"),
      new Ship("battleship"),
      new Ship("cruiser"),
      new Ship("submarine"),
      new Ship("submarine"),
      new Ship("destroyer"),
      new Ship("destroyer"),
    ];

    // Store how many times each row is used, avoiding using a row more than twice
    let usedRows = {};

    board.init();

    ships.forEach((ship) => {
      let row;

      do {
        row = rows[Math.floor(Math.random() * rows.length)];
      } while (usedRows[row] !== undefined && usedRows[row] < 2);

      if (usedRows[row] === undefined) {
        usedRows[row] = 1;
      } else {
        usedRows[row]++;
      }

      let col;

      do {
        col = Math.floor(Math.random() * boardSize) + 1;
      } while (
        col + ship.getLength() > boardSize ||
        board.getShip(row + col) !== undefined
      );

      board.addShip(ship, row + col);
    });
  };

  // Store AI moves so they are not repeated
  let aiTiles = [];

  const generateAttack = () => {
    let row, col, tile;

    do {
      row = rows[Math.floor(Math.random() * rows.length)];
      col = Math.floor(Math.random() * boardSize) + 1;
      tile = row + col;
    } while (aiTiles.includes(tile));

    aiTiles.push(tile);

    return tile;
  };

  return { id, board, initBoard, generateAttack };
};

module.exports = Player;
