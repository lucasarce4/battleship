const gameboardFactory = () => {
  let missedShot = [];
  let ships = [];
  const size = 10;

  const boardGenerator = () => {
    let board = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        board.push({ x: i, y: j, hasShip: false, wasHit: false });
      }
    }
    return board;
  };

  const findIndex = (x, y) => {
    return board.findIndex((el) => {
      if (el.x === x && el.y === y) return true;
    });
  };

  const board = boardGenerator();

  const placeShip = (ship, x, y, direction) => {
    let index = findIndex(x, y);
    if (
      (direction === 'x' && ship.shipLenght + y > size) ||
      board[index].hasShip
    )
      return;
    ship.setPosition(x, y, direction);
    let j = 0;
    for (let i = 0; i < ship.shipLenght; i++) {
      if (direction === 'x') board[index + i].hasShip = true;
      if (direction === 'y') board[index + j].hasShip = true;
      j += 10;
    }
    ships.push(ship);
  };

  const findShip = (x, y) => {
    let index = null;
    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].shipLenght; j++) {
        if (ships[i].position[j].x === x && ships[i].position[j].y === y) {
          return i;
        }
      }
    }

    return index;
  };

  const receiveAttack = (x, y) => {
    let index = findIndex(parseInt(x), parseInt(y));
    if (board[index].wasHit) return;
    if (board[index].hasShip) {
      let shipindex = findShip(x, y);
      ships[shipindex].hit(x, y);
    } else {
      missedShot.push({ x: x, y: y });
    }
    board[index].wasHit = true;
  };

  const areAllShipsSunk = () => {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) return false;
    }
    return true;
  };

  return {
    board,
    findIndex,
    receiveAttack,
    missedShot,
    placeShip,
    ships,
    findShip,
    areAllShipsSunk,
  };
};

export default gameboardFactory;
