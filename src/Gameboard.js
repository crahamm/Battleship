const tileState = {
  empty: 0,
  missedAttack: 1,
  ship: 2,
  shipHit: 3,
};

const boardSize = 10;
const emptyBoard = {
  a: new Array(boardSize).fill(tileState.empty),
  b: new Array(boardSize).fill(tileState.empty),
  c: new Array(boardSize).fill(tileState.empty),
  d: new Array(boardSize).fill(tileState.empty),
  e: new Array(boardSize).fill(tileState.empty),
  f: new Array(boardSize).fill(tileState.empty),
  g: new Array(boardSize).fill(tileState.empty),
  h: new Array(boardSize).fill(tileState.empty),
  i: new Array(boardSize).fill(tileState.empty),
  j: new Array(boardSize).fill(tileState.empty),
};

const Gameboard = () => {
  let board;
  let ships;

  const init = () => {
    board = JSON.parse(JSON.stringify(emptyBoard));
    ships = [];
  };

  const parsePos = (pos) => {
    const row = pos.slice(0, 1);
    const col = +pos.slice(1);

    return { row, col };
  };

  const addShip = (ship, pos) => {
    pos = parsePos(pos);
    const start = pos.col - 1;
    const len = ship.getLength();

    ships.push({ obj: ship, pos });

    for (let i = 0; i < len; i++) {
      board[pos.row][start + i] = tileState.ship;
    }
  };

  const getBoard = () => board;

  const getShip = (pos) => {
    pos = parsePos(pos);

    const result = ships.find((ship) => {
      if (ship.pos.row != pos.row) {
        return false;
      }

      if (ship.pos.col > pos.col) {
        return false;
      }

      if (pos.col > ship.pos.col + ship.obj.getLength()) {
        return false;
      }

      return true;
    });

    return result;
  };

  // Returns 0 for duplicate/invalid attack
  //         1 for missed attack
  //         2 for attack that hit
  const receiveAttack = (pos) => {
    pos = parsePos(pos);

    switch (board[pos.row][pos.col - 1]) {
      case tileState.empty: {
        board[pos.row][pos.col - 1] = tileState.missedAttack;
        return 1;
      }
      case tileState.ship: {
        const ship = getShip(pos.row + pos.col);

        board[pos.row][pos.col - 1] = tileState.shipHit;
        ship.obj.hit(pos.col - ship.pos.col);
        return 2;
      }
      case tileState.shipHit:
      case tileState.missedAttack:
        return 0;
    }
  };

  const gameOver = () => {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].obj.isSunk()) return false;
    }

    return true;
  };

  return { init, addShip, getBoard, getShip, receiveAttack, gameOver };
};

module.exports = Gameboard;
