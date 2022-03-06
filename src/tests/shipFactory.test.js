import shipFactory from '../shipFactory';

test('Ship lenght should be equal to argument', () => {
  const testShip = shipFactory(2, null);
  expect(testShip.shipLenght).toBe(2);
});

test('Ship position', () => {
  const testShip = shipFactory(2);
  testShip.setPosition(1, 1);
  expect(testShip.position).toEqual([
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ]);
});

test('Ship should save hits', () => {
  const testShip = shipFactory(5, null);
  testShip.hit(1, 1);
  expect(testShip.shipHits).toEqual([{ x: 1, y: 1 }]);
});

test('Ship not sunk', () => {
  const testShip = shipFactory(3, null);
  testShip.hit(0);
  testShip.hit(1);
  expect(testShip.isSunk()).toBeFalsy();
});

test('Ship sunk', () => {
  const testShip = shipFactory(2, null);
  testShip.hit(0);
  testShip.hit(1);
  expect(testShip.isSunk()).toBeTruthy();
});
