const shipClasses = {
  carrier: [0, 0, 0, 0, 0],
  battleship: [0, 0, 0, 0],
  cruiser: [0, 0, 0],
  submarine: [0, 0, 0],
  destroyer: [0, 0],
};

const Ship = (type) => {
  if (!(type in shipClasses)) {
    return undefined;
  }

  let state = [...shipClasses[type]];

  const getLength = () => state.length;
  const getState = () => state;
  const getName = () => type;

  const hit = (tile) => {
    state[tile] = 1;
  };

  const isSunk = () => {
    let sunk = true;

    state.forEach((tile) => {
      if (tile === 0) sunk = false;
    });

    return sunk;
  };

  return { getLength, getState, getName, hit, isSunk };
};

module.exports = Ship;
