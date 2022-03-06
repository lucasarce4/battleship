import gameboardFactory from '../gameboardFactory';
import shipFactory from '../shipFactory';

test('board created with index', () => {
  const board = gameboardFactory();
  expect(board.board[0]).toEqual({ x: 0, y: 0, hasShip: false, wasHit: false });
});

test('index of element using x,y keys', () => {
  const board = gameboardFactory();
  const boardTile = board.findIndex(0, 0);
  expect(boardTile).toBe(0);
});

test('Attack received', () => {
  const board = gameboardFactory();
  board.receiveAttack(1, 2);
  expect(board.missedShot).toEqual([{ x: 1, y: 2 }]);
});

test('Cant attack twice the same tile', () => {
  const board = gameboardFactory();
  board.receiveAttack(1, 2);
  board.receiveAttack(1, 2);
  expect(board.missedShot).toEqual([{ x: 1, y: 2 }]);
});

test('Saves ship in array when ship is placed', () => {
  const board = gameboardFactory();
  const ship1 = shipFactory(2);
  const ship2 = shipFactory(2);
  board.placeShip(ship1, 2, 2);
  board.placeShip(ship2, 4, 4);
  expect(board.ships).toEqual([ship1, ship2]);
});

test('ship received attack', () => {
  const board = gameboardFactory();
  const ship1 = shipFactory(2);
  board.placeShip(ship1, 2, 2);
  board.receiveAttack(2, 2);
  expect(ship1.shipHits).toEqual([{ x: 2, y: 2 }]);
});

test('if all ships are sunk should return true', () => {
  const board = gameboardFactory();
  const ship1 = shipFactory(2);
  const ship2 = shipFactory(2);
  board.placeShip(ship1, 2, 2);
  board.placeShip(ship2, 4, 2);
  board.receiveAttack(2, 2);
  board.receiveAttack(3, 2);
  board.receiveAttack(4, 2);
  board.receiveAttack(5, 2);
  expect(board.areAllShipsSunk()).toBeTruthy();
});

test('if one or more ships are not sunk should return false', () => {
  const board = gameboardFactory();
  const ship1 = shipFactory(2);
  const ship2 = shipFactory(2);
  board.placeShip(ship1, 2, 2);
  board.placeShip(ship2, 4, 2);
  board.receiveAttack(2, 2);
  board.receiveAttack(3, 2);
  board.receiveAttack(5, 2);
  expect(board.areAllShipsSunk()).toBeFalsy();
});
