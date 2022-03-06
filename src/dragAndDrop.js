import shipFactory from './shipFactory';
import { playerBoard } from './game';

const dropShip = (ship, tile) => {
  const shipLenght = parseInt(ship.dataset.lenght);
  const tilex = parseInt(tile.dataset.x);
  const tiley = parseInt(tile.dataset.y);
  const newShip = shipFactory(shipLenght);

  playerBoard.placeShip(newShip, tilex, tiley, ship.dataset.direction);

  for (let i = 0; i < shipLenght; i++) {
    let tileSelector = `[data-board="player"][data-x="${tilex}"][data-y="${
      tiley + i
    }"]`;
    if (ship.dataset.direction === 'y') {
      tileSelector = `[data-board="player"][data-x="${
        tilex + i
      }"][data-y="${tiley}"]`;
    }
    let tile = document.querySelector(tileSelector);
    tile.classList.add('hasShip');
  }
};

const isSpotAvaible = (ship, tile) => {
  const shipLenght = ship.dataset.lenght;
  const tilex = parseInt(tile.dataset.x);
  const tiley = parseInt(tile.dataset.y);
  const allTiles = [];
  for (let i = 0; i < shipLenght; i++) {
    let tileSelector = `[data-board="player"][data-x="${tilex}"][data-y="${
      tiley + i
    }"]`;
    if (ship.dataset.direction === 'y') {
      tileSelector = `[data-board="player"][data-x="${
        tilex + i
      }"][data-y="${tiley}"]`;
    }
    allTiles.push(document.querySelector(tileSelector));
  }
  for (let i = 0; i < allTiles.length; i++) {
    if (
      allTiles[i].classList.contains('hasShip') ||
      allTiles[i].dataset.y > 9 ||
      allTiles[i].dataset.x > 9
    )
      return false;
  }

  return true;
};

const dragShip = document.querySelectorAll('.menuShip');

dragShip.forEach((ship) => {
  ship.addEventListener('dblclick', () => {
    if (ship.style.flexDirection === 'row') {
      ship.style.flexDirection = 'column';
      ship.dataset.direction = 'y';
    } else {
      ship.style.flexDirection = 'row';
      ship.dataset.direction = 'x';
    }
  });
});

dragShip.forEach((ship) => {
  ship.addEventListener('dragstart', () => {
    ship.classList.add('dragging');
  });

  ship.addEventListener('dragend', () => {
    ship.classList.remove('dragging');
  });
});

const drag = () => {
  const board = document.querySelector('.menuGameboard');
  const boardTile = board.querySelectorAll('.boardTile');
  boardTile.forEach((tile) => {
    tile.addEventListener('dragover', (e) => {
      e.preventDefault();
      tile.classList.add('shipHover');
    });

    tile.addEventListener('dragleave', (e) => {
      e.preventDefault();
      tile.classList.remove('shipHover');
    });

    tile.addEventListener('drop', () => {
      tile.classList.remove('shipHover');
      const ship = document.querySelector('.dragging');
      if (!isSpotAvaible(ship, tile)) return;
      dropShip(ship, tile);
      ship.classList.remove('notPlaced');
    });
  });
};

export default drag;
