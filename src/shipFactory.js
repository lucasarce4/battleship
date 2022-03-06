const shipFactory = (lenght) => {
  const shipLenght = lenght;
  let position = [];
  let shipHits = [];

  const isSunk = () => {
    if (shipHits.length !== shipLenght) return false;
    return true;
  };

  const hit = (x, y) => {
    shipHits.push({ x: x, y: y });
  };

  const setPosition = (x, y, direction) => {
    for (let i = 0; i < shipLenght; i++) {
      if (direction === 'x') position.push({ x: x, y: y + i });
      if (direction === 'y') position.push({ x: x + i, y: y });
    }
  };

  return {
    shipLenght,
    shipHits,
    position,
    isSunk,
    setPosition,
    hit,
  };
};

export default shipFactory;
