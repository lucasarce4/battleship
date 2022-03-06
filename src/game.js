import { playerGenerator, aiPlayerGenerator } from './players';
import gameboardFactory from './gameboardFactory';
import shipFactory from './shipFactory';
import drag from './dragAndDrop';

const playerBoard = gameboardFactory();
const aiBoard = gameboardFactory();
const player1 = playerGenerator();
const aiPlayer = aiPlayerGenerator();

const menuGameboardContainer = document.querySelector('.menuGameboard');
const playerContainer = document.querySelector('.gameboard-player');
const aiContainer = document.querySelector('.gameboard-cpu');

window.addEventListener('load', () => {
  generateBoards(playerBoard, menuGameboardContainer, 'player');
  drag();
});

const resetBoardContainer = (board) => {
  const boardTiles = board.querySelectorAll('.boardTile');
  boardTiles.forEach((tile) => {
    if (tile.classList.contains('hasShip')) tile.classList.remove('hasShip');
  });
};

const resetShipContainer = () => {
  const ships = document.querySelectorAll('.menuShip');
  ships.forEach((ship) => {
    ship.classList.add('notPlaced');
    ship.dataset.direction = 'x';
    ship.style.flexDirection = 'row';
  });
};

const clearPlacedShips = (board) => {
  const boardTiles = [...board.board];
  boardTiles.forEach((tile) => {
    tile.hasShip = false;
    tile.wasHit = false;
  });
  playerBoard.ships.length = 0;
  aiBoard.ships.length = 0;
};

const resetEverithing = () => {
  resetBoardContainer(menuGameboardContainer);
  resetBoardContainer(playerContainer);
  resetBoardContainer(aiContainer);
  clearPlacedShips(playerBoard);
  clearPlacedShips(aiBoard);
  resetShipContainer();
  aiPlayer.allHits.length = 0;
};

document.querySelector('.reset').addEventListener('click', () => {
  resetEverithing();
});

document.querySelector('.start').addEventListener('click', () => {
  // if (playerBoard.ships.length !== 5) return;
  document.querySelector('.gameMenuContainer').classList.remove('show');
  generateBoards(playerBoard, playerContainer, 'player');
  changeDom(playerBoard, 'player', playerContainer);

  generateBoards(aiBoard, aiContainer, 'ai');
  placeAiShips(aiBoard);
});

const restartButton = document.querySelectorAll('.restart');
restartButton.forEach((button) => {
  button.addEventListener('click', () => {
    resetEverithing();
    document.querySelector('.gameboard-player').textContent = '';
    document.querySelector('.gameboard-cpu').textContent = '';
    document.querySelector('.gameFinishedContainer').classList.remove('show');
    document.querySelector('.gameMenuContainer').classList.add('show');
  });
});

const changeDom = (board, player, container) => {
  let boardTable = [...board.board];
  for (let i = 0; i < 100; i++) {
    if (boardTable[i].hasShip) {
      let x = boardTable[i].x;
      let y = boardTable[i].y;
      let shipTile = container.querySelector(
        `[data-x="${x}"][data-y="${y}"][data-board="${player}"]`
      );
      shipTile.classList.add('hasShip');
    }
  }
};

const generateAiRandomPlacement = (board, ship) => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  let direction = 'x';
  if (Math.floor(Math.random() * 2) === 1) direction = 'y';
  let result = true;
  let index = board.findIndex(x, y);
  let j = 0;
  for (let i = 0; i < ship.shipLenght; i++) {
    if (
      (direction === 'x' && index + i > 99) ||
      (direction === 'y' && index + j > 99)
    ) {
      result = false;
      break;
    }
    if (direction === 'x' && ship.shipLenght + y > 9) result = false;
    if (direction === 'y' && ship.shipLenght + x > 9) result = false;
    if (direction === 'x' && board.board[index + i].hasShip) result = false;
    if (direction === 'y' && board.board[index + j].hasShip) result = false;
    j += 10;
  }
  if (result === false) return false;
  return { x, y, direction };
};

const placeAiShips = (board) => {
  const carrier = shipFactory(5);
  const battleship = shipFactory(4);
  const cruiser = shipFactory(3);
  const submarine = shipFactory(3);
  const destroyer = shipFactory(2);

  let ship1 = generateAiRandomPlacement(board, carrier);
  while (ship1 === false) ship1 = generateAiRandomPlacement(board, carrier);
  board.placeShip(carrier, ship1.x, ship1.y, ship1.direction);

  let ship2 = generateAiRandomPlacement(board, battleship);
  while (ship2 === false) ship2 = generateAiRandomPlacement(board, carrier);
  board.placeShip(battleship, ship2.x, ship2.y, ship2.direction);

  let ship3 = generateAiRandomPlacement(board, cruiser);
  while (ship3 === false) ship3 = generateAiRandomPlacement(board, carrier);
  board.placeShip(cruiser, ship3.x, ship3.y, ship3.direction);

  let ship4 = generateAiRandomPlacement(board, submarine);
  while (ship4 === false) ship4 = generateAiRandomPlacement(board, carrier);
  board.placeShip(submarine, ship4.x, ship4.y, ship4.direction);

  let ship5 = generateAiRandomPlacement(board, destroyer);
  while (ship5 === false) ship5 = generateAiRandomPlacement(board, carrier);
  board.placeShip(destroyer, ship5.x, ship5.y, ship5.direction);
};

const generateBoards = (board, container, player) => {
  board.board.forEach((tile) => {
    const boardTile = document.createElement('div');
    boardTile.classList.add('boardTile');
    boardTile.dataset.x = tile.x;
    boardTile.dataset.y = tile.y;
    boardTile.dataset.board = player;
    boardTile.addEventListener('click', gameloop);
    container.appendChild(boardTile);
  });
};

const placeMarkOnBoard = (board, x, y, player, container) => {
  const index = board.findIndex(x, y);
  const boardArray = board.board;
  const tile = container.querySelector(
    `[data-x="${x}"][data-y="${y}"][data-board="${player}"]`
  );
  if (boardArray[index].hasShip) {
    tile.classList.add('shipHit');
    return;
  }
  tile.classList.add('shotMiss');
};

const checkSunkShips = (board) => {
  let allSunk = true;
  for (let i = 0; i < board.ships.length; i++) {
    allSunk = board.ships[i].isSunk();
    if (!board.ships[i].isSunk()) return;
  }
  return allSunk;
};

const gameFinished = (winner) => {
  document.querySelector('.gameFinishedContainer').classList.add('show');
  if (winner === 'player won')
    document.querySelector('.lineOne').textContent = 'Congratulations!';
  document.querySelector('.lineTwo').textContent = 'You win!';
  if (winner === 'ai won')
    document.querySelector('.lineOne').textContent = 'You lose';
  document.querySelector('.lineTwo').textContent = 'Try again!';
};

const gameloop = (e) => {
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);
  player1.attackEnemyGameboard(aiBoard, x, y);
  placeMarkOnBoard(aiBoard, x, y, 'ai', aiContainer);
  if (checkSunkShips(aiBoard)) {
    gameFinished('player won');
    return;
  }
  const aiAttack = aiPlayer.attack(playerBoard);
  setTimeout(
    placeMarkOnBoard,
    500,
    playerBoard,
    aiAttack.x,
    aiAttack.y,
    'player',
    playerContainer
  );
  if (checkSunkShips(playerBoard)) gameFinished('ai won');
};

export { generateBoards, placeAiShips, playerBoard };
