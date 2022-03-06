import gameboardFactory from './gameboardFactory';

const playerGenerator = () => {
  const attackEnemyGameboard = (enemyBoard, x, y) => {
    enemyBoard.receiveAttack(x, y);
  };

  return {
    attackEnemyGameboard,
  };
};

const aiPlayerGenerator = () => {
  const allHits = [];

  const checkValidAttack = (enemyBoard, x, y) => {
    const index = enemyBoard.findIndex(x, y);
    if (enemyBoard.board[index].wasHit) return false;
  };

  const checkValidSmartAttack = (enemyBoard, index) => {
    const possibleHits = [];
    if (
      enemyBoard.board[index + 1] !== undefined &&
      !enemyBoard.board[index + 1].wasHit
    ) {
      possibleHits.push(index + 1);
    }

    if (
      enemyBoard.board[index - 1] !== undefined &&
      !enemyBoard.board[index - 1].wasHit
    ) {
      possibleHits.push(index - 1);
    }
    if (
      enemyBoard.board[index + 10] !== undefined &&
      !enemyBoard.board[index + 10].wasHit
    ) {
      possibleHits.push(index + 10);
    }
    if (
      enemyBoard.board[index - 10] !== undefined &&
      !enemyBoard.board[index - 10].wasHit
    ) {
      possibleHits.push(index - 10);
    }

    let randomHit = Math.floor(Math.random() * possibleHits.length);
    return possibleHits[randomHit];
  };

  const smartAttack = (enemyBoard) => {
    let x, y, index;
    let currentIndex = allHits.length - 1;
    let direction;
    if (allHits.length === 1) {
      index = enemyBoard.findIndex(allHits[0].x, allHits[0].y);
      let newAttack = checkValidSmartAttack(enemyBoard, index);
      x = enemyBoard.board[newAttack].x;
      y = enemyBoard.board[newAttack].y;
      enemyBoard.receiveAttack(x, y);
      if (enemyBoard.board[newAttack].hasShip) allHits.push({ x, y });
      return newAttack;
    }

    if (allHits[0].x === allHits[1].x) {
      direction = 'x';
    } else if (allHits[0].y === allHits[1].y) {
      direction = 'y';
    }

    x = allHits[currentIndex].x;
    y = allHits[currentIndex].y + 1;
    if (direction == 'y') {
      x = allHits[currentIndex].x + 1;
      y = allHits[currentIndex].y;
    }

    index = enemyBoard.findIndex(x, y);
    if (
      enemyBoard.board[index] !== undefined &&
      !enemyBoard.board[index].wasHit
    ) {
      enemyBoard.receiveAttack(x, y);
      if (enemyBoard.board[index].hasShip) allHits.push({ x, y });
      return index;
    }

    x = allHits[currentIndex].x;
    y = allHits[currentIndex].y - 1;
    if (direction == 'y') {
      x = allHits[currentIndex].x - 1;
      y = allHits[currentIndex].y;
    }

    index = enemyBoard.findIndex(x, y);
    if (
      enemyBoard.board[index] !== undefined &&
      !enemyBoard.board[index].wasHit
    ) {
      enemyBoard.receiveAttack(x, y);
      if (enemyBoard.board[index].hasShip) allHits.push({ x, y });
      return index;
    }

    x = allHits[0].x;
    y = allHits[0].y - 1;
    if (direction == 'y') {
      x = allHits[0].x - 1;
      y = allHits[0].y;
    }

    index = enemyBoard.findIndex(x, y);
    if (
      enemyBoard.board[index] !== undefined &&
      !enemyBoard.board[index].wasHit
    ) {
      enemyBoard.receiveAttack(x, y);
      if (enemyBoard.board[index].hasShip) allHits.push({ x, y });
      return index;
    }

    x = allHits[0].x;
    y = allHits[0].y + 1;
    if (direction == 'y') {
      x = allHits[0].x + 1;
      y = allHits[0].y;
    }
    index = enemyBoard.findIndex(x, y);
    if (
      enemyBoard.board[index] !== undefined &&
      !enemyBoard.board[index].wasHit
    ) {
      enemyBoard.receiveAttack(x, y);
      if (enemyBoard.board[index].hasShip) allHits.push({ x, y });
      return index;
    }
  };

  const attack = (enemyBoard) => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    const index = enemyBoard.findIndex(x, y);

    while (checkValidAttack(enemyBoard, x, y) === false) {
      y = Math.floor(Math.random() * 10);
      x = Math.floor(Math.random() * 10);
    }

    if (allHits.length > 0) {
      let newIndex = enemyBoard.findIndex(allHits[0].x, allHits[0].y);
      if (enemyBoard.board[newIndex].hasShip) {
        const shipIndex = enemyBoard.findShip(allHits[0].x, allHits[0].y);
        if (!enemyBoard.ships[shipIndex].isSunk()) {
          let possibleAttack = smartAttack(enemyBoard);
          x = enemyBoard.board[possibleAttack].x;
          y = enemyBoard.board[possibleAttack].y;
          return { x, y };
        }
        console.log('ship sunk');
        allHits.length = 0;
      }
    }

    if (allHits.length === 0 && enemyBoard.board[index].hasShip) {
      allHits.push({ x, y });
    }

    enemyBoard.receiveAttack(x, y);
    return { x, y };
  };

  return { attack, allHits };
};

export { playerGenerator, aiPlayerGenerator };
