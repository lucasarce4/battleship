import { player, aiPlayer } from '../players';
import gameboardFactory from '../gameboardFactory';
import { mockRandomForEach } from 'jest-mock-random';

test('enemy board should receive attack', () => {
  const player2Board = gameboardFactory();
  const player1 = player();
  player1.attackEnemyGameboard(player2Board, 3, 6);
  expect(player2Board.missedShot).toEqual([{ x: 3, y: 6 }]);
});
