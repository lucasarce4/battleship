/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dragAndDrop.js":
/*!****************************!*\
  !*** ./src/dragAndDrop.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");



const dropShip = (ship, tile) => {
  const shipLenght = parseInt(ship.dataset.lenght);
  const tilex = parseInt(tile.dataset.x);
  const tiley = parseInt(tile.dataset.y);
  const newShip = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(shipLenght);

  _game__WEBPACK_IMPORTED_MODULE_1__.playerBoard.placeShip(newShip, tilex, tiley, ship.dataset.direction);

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (drag);


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateBoards": () => (/* binding */ generateBoards),
/* harmony export */   "placeAiShips": () => (/* binding */ placeAiShips),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard)
/* harmony export */ });
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dragAndDrop */ "./src/dragAndDrop.js");





const playerBoard = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();
const aiBoard = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();
const player1 = (0,_players__WEBPACK_IMPORTED_MODULE_0__.playerGenerator)();
const aiPlayer = (0,_players__WEBPACK_IMPORTED_MODULE_0__.aiPlayerGenerator)();

const menuGameboardContainer = document.querySelector('.menuGameboard');
const playerContainer = document.querySelector('.gameboard-player');
const aiContainer = document.querySelector('.gameboard-cpu');

window.addEventListener('load', () => {
  generateBoards(playerBoard, menuGameboardContainer, 'player');
  (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_3__["default"])();
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
  const carrier = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])(5);
  const battleship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])(4);
  const cruiser = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  const submarine = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  const destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])(2);

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




/***/ }),

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardFactory);


/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerGenerator": () => (/* binding */ playerGenerator),
/* harmony export */   "aiPlayerGenerator": () => (/* binding */ aiPlayerGenerator)
/* harmony export */ });
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");


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




/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dragAndDrop */ "./src/dragAndDrop.js");






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGdCQUFnQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BGa0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsTUFBTTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELE1BQU07QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsTUFBTTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxNQUFNO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxNQUFNO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLE1BQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUM4Qzs7Ozs7Ozs7Ozs7Ozs7O0FDaEw5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQyw2Q0FBNkMsZ0JBQWdCO0FBQzdELDZDQUE2QyxnQkFBZ0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7VUMvQjNCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ1Y7QUFDSztBQUNPO0FBQ25CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnQW5kRHJvcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaGlwRmFjdG9yeSBmcm9tICcuL3NoaXBGYWN0b3J5JztcclxuaW1wb3J0IHsgcGxheWVyQm9hcmQgfSBmcm9tICcuL2dhbWUnO1xyXG5cclxuY29uc3QgZHJvcFNoaXAgPSAoc2hpcCwgdGlsZSkgPT4ge1xyXG4gIGNvbnN0IHNoaXBMZW5naHQgPSBwYXJzZUludChzaGlwLmRhdGFzZXQubGVuZ2h0KTtcclxuICBjb25zdCB0aWxleCA9IHBhcnNlSW50KHRpbGUuZGF0YXNldC54KTtcclxuICBjb25zdCB0aWxleSA9IHBhcnNlSW50KHRpbGUuZGF0YXNldC55KTtcclxuICBjb25zdCBuZXdTaGlwID0gc2hpcEZhY3Rvcnkoc2hpcExlbmdodCk7XHJcblxyXG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcChuZXdTaGlwLCB0aWxleCwgdGlsZXksIHNoaXAuZGF0YXNldC5kaXJlY3Rpb24pO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5naHQ7IGkrKykge1xyXG4gICAgbGV0IHRpbGVTZWxlY3RvciA9IGBbZGF0YS1ib2FyZD1cInBsYXllclwiXVtkYXRhLXg9XCIke3RpbGV4fVwiXVtkYXRhLXk9XCIke1xyXG4gICAgICB0aWxleSArIGlcclxuICAgIH1cIl1gO1xyXG4gICAgaWYgKHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPT09ICd5Jykge1xyXG4gICAgICB0aWxlU2VsZWN0b3IgPSBgW2RhdGEtYm9hcmQ9XCJwbGF5ZXJcIl1bZGF0YS14PVwiJHtcclxuICAgICAgICB0aWxleCArIGlcclxuICAgICAgfVwiXVtkYXRhLXk9XCIke3RpbGV5fVwiXWA7XHJcbiAgICB9XHJcbiAgICBsZXQgdGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGlsZVNlbGVjdG9yKTtcclxuICAgIHRpbGUuY2xhc3NMaXN0LmFkZCgnaGFzU2hpcCcpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGlzU3BvdEF2YWlibGUgPSAoc2hpcCwgdGlsZSkgPT4ge1xyXG4gIGNvbnN0IHNoaXBMZW5naHQgPSBzaGlwLmRhdGFzZXQubGVuZ2h0O1xyXG4gIGNvbnN0IHRpbGV4ID0gcGFyc2VJbnQodGlsZS5kYXRhc2V0LngpO1xyXG4gIGNvbnN0IHRpbGV5ID0gcGFyc2VJbnQodGlsZS5kYXRhc2V0LnkpO1xyXG4gIGNvbnN0IGFsbFRpbGVzID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ2h0OyBpKyspIHtcclxuICAgIGxldCB0aWxlU2VsZWN0b3IgPSBgW2RhdGEtYm9hcmQ9XCJwbGF5ZXJcIl1bZGF0YS14PVwiJHt0aWxleH1cIl1bZGF0YS15PVwiJHtcclxuICAgICAgdGlsZXkgKyBpXHJcbiAgICB9XCJdYDtcclxuICAgIGlmIChzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID09PSAneScpIHtcclxuICAgICAgdGlsZVNlbGVjdG9yID0gYFtkYXRhLWJvYXJkPVwicGxheWVyXCJdW2RhdGEteD1cIiR7XHJcbiAgICAgICAgdGlsZXggKyBpXHJcbiAgICAgIH1cIl1bZGF0YS15PVwiJHt0aWxleX1cIl1gO1xyXG4gICAgfVxyXG4gICAgYWxsVGlsZXMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRpbGVTZWxlY3RvcikpO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGFsbFRpbGVzW2ldLmNsYXNzTGlzdC5jb250YWlucygnaGFzU2hpcCcpIHx8XHJcbiAgICAgIGFsbFRpbGVzW2ldLmRhdGFzZXQueSA+IDkgfHxcclxuICAgICAgYWxsVGlsZXNbaV0uZGF0YXNldC54ID4gOVxyXG4gICAgKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGRyYWdTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVTaGlwJyk7XHJcblxyXG5kcmFnU2hpcC5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsICgpID0+IHtcclxuICAgIGlmIChzaGlwLnN0eWxlLmZsZXhEaXJlY3Rpb24gPT09ICdyb3cnKSB7XHJcbiAgICAgIHNoaXAuc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nO1xyXG4gICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gJ3knO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hpcC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ3Jvdyc7XHJcbiAgICAgIHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSAneCc7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuZHJhZ1NoaXAuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKCkgPT4ge1xyXG4gICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xyXG4gIH0pO1xyXG5cclxuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoKSA9PiB7XHJcbiAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY29uc3QgZHJhZyA9ICgpID0+IHtcclxuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51R2FtZWJvYXJkJyk7XHJcbiAgY29uc3QgYm9hcmRUaWxlID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkVGlsZScpO1xyXG4gIGJvYXJkVGlsZS5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICB0aWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoJ3NoaXBIb3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGlsZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcEhvdmVyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoKSA9PiB7XHJcbiAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcEhvdmVyJyk7XHJcbiAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dpbmcnKTtcclxuICAgICAgaWYgKCFpc1Nwb3RBdmFpYmxlKHNoaXAsIHRpbGUpKSByZXR1cm47XHJcbiAgICAgIGRyb3BTaGlwKHNoaXAsIHRpbGUpO1xyXG4gICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ25vdFBsYWNlZCcpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkcmFnO1xyXG4iLCJpbXBvcnQgeyBwbGF5ZXJHZW5lcmF0b3IsIGFpUGxheWVyR2VuZXJhdG9yIH0gZnJvbSAnLi9wbGF5ZXJzJztcclxuaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5JztcclxuaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gJy4vc2hpcEZhY3RvcnknO1xyXG5pbXBvcnQgZHJhZyBmcm9tICcuL2RyYWdBbmREcm9wJztcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xyXG5jb25zdCBhaUJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xyXG5jb25zdCBwbGF5ZXIxID0gcGxheWVyR2VuZXJhdG9yKCk7XHJcbmNvbnN0IGFpUGxheWVyID0gYWlQbGF5ZXJHZW5lcmF0b3IoKTtcclxuXHJcbmNvbnN0IG1lbnVHYW1lYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudUdhbWVib2FyZCcpO1xyXG5jb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkLXBsYXllcicpO1xyXG5jb25zdCBhaUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQtY3B1Jyk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICBnZW5lcmF0ZUJvYXJkcyhwbGF5ZXJCb2FyZCwgbWVudUdhbWVib2FyZENvbnRhaW5lciwgJ3BsYXllcicpO1xyXG4gIGRyYWcoKTtcclxufSk7XHJcblxyXG5jb25zdCByZXNldEJvYXJkQ29udGFpbmVyID0gKGJvYXJkKSA9PiB7XHJcbiAgY29uc3QgYm9hcmRUaWxlcyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZFRpbGUnKTtcclxuICBib2FyZFRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcclxuICAgIGlmICh0aWxlLmNsYXNzTGlzdC5jb250YWlucygnaGFzU2hpcCcpKSB0aWxlLmNsYXNzTGlzdC5yZW1vdmUoJ2hhc1NoaXAnKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlc2V0U2hpcENvbnRhaW5lciA9ICgpID0+IHtcclxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51U2hpcCcpO1xyXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIHNoaXAuY2xhc3NMaXN0LmFkZCgnbm90UGxhY2VkJyk7XHJcbiAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gJ3gnO1xyXG4gICAgc2hpcC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ3Jvdyc7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBjbGVhclBsYWNlZFNoaXBzID0gKGJvYXJkKSA9PiB7XHJcbiAgY29uc3QgYm9hcmRUaWxlcyA9IFsuLi5ib2FyZC5ib2FyZF07XHJcbiAgYm9hcmRUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICB0aWxlLmhhc1NoaXAgPSBmYWxzZTtcclxuICAgIHRpbGUud2FzSGl0ID0gZmFsc2U7XHJcbiAgfSk7XHJcbiAgcGxheWVyQm9hcmQuc2hpcHMubGVuZ3RoID0gMDtcclxuICBhaUJvYXJkLnNoaXBzLmxlbmd0aCA9IDA7XHJcbn07XHJcblxyXG5jb25zdCByZXNldEV2ZXJpdGhpbmcgPSAoKSA9PiB7XHJcbiAgcmVzZXRCb2FyZENvbnRhaW5lcihtZW51R2FtZWJvYXJkQ29udGFpbmVyKTtcclxuICByZXNldEJvYXJkQ29udGFpbmVyKHBsYXllckNvbnRhaW5lcik7XHJcbiAgcmVzZXRCb2FyZENvbnRhaW5lcihhaUNvbnRhaW5lcik7XHJcbiAgY2xlYXJQbGFjZWRTaGlwcyhwbGF5ZXJCb2FyZCk7XHJcbiAgY2xlYXJQbGFjZWRTaGlwcyhhaUJvYXJkKTtcclxuICByZXNldFNoaXBDb250YWluZXIoKTtcclxuICBhaVBsYXllci5hbGxIaXRzLmxlbmd0aCA9IDA7XHJcbn07XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICByZXNldEV2ZXJpdGhpbmcoKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAvLyBpZiAocGxheWVyQm9hcmQuc2hpcHMubGVuZ3RoICE9PSA1KSByZXR1cm47XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVNZW51Q29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gIGdlbmVyYXRlQm9hcmRzKHBsYXllckJvYXJkLCBwbGF5ZXJDb250YWluZXIsICdwbGF5ZXInKTtcclxuICBjaGFuZ2VEb20ocGxheWVyQm9hcmQsICdwbGF5ZXInLCBwbGF5ZXJDb250YWluZXIpO1xyXG5cclxuICBnZW5lcmF0ZUJvYXJkcyhhaUJvYXJkLCBhaUNvbnRhaW5lciwgJ2FpJyk7XHJcbiAgcGxhY2VBaVNoaXBzKGFpQm9hcmQpO1xyXG59KTtcclxuXHJcbmNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzdGFydCcpO1xyXG5yZXN0YXJ0QnV0dG9uLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHJlc2V0RXZlcml0aGluZygpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZC1wbGF5ZXInKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZC1jcHUnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVGaW5pc2hlZENvbnRhaW5lcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lTWVudUNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5jb25zdCBjaGFuZ2VEb20gPSAoYm9hcmQsIHBsYXllciwgY29udGFpbmVyKSA9PiB7XHJcbiAgbGV0IGJvYXJkVGFibGUgPSBbLi4uYm9hcmQuYm9hcmRdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgIGlmIChib2FyZFRhYmxlW2ldLmhhc1NoaXApIHtcclxuICAgICAgbGV0IHggPSBib2FyZFRhYmxlW2ldLng7XHJcbiAgICAgIGxldCB5ID0gYm9hcmRUYWJsZVtpXS55O1xyXG4gICAgICBsZXQgc2hpcFRpbGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBgW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXVtkYXRhLWJvYXJkPVwiJHtwbGF5ZXJ9XCJdYFxyXG4gICAgICApO1xyXG4gICAgICBzaGlwVGlsZS5jbGFzc0xpc3QuYWRkKCdoYXNTaGlwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVBaVJhbmRvbVBsYWNlbWVudCA9IChib2FyZCwgc2hpcCkgPT4ge1xyXG4gIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICBsZXQgZGlyZWN0aW9uID0gJ3gnO1xyXG4gIGlmIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMSkgZGlyZWN0aW9uID0gJ3knO1xyXG4gIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gIGxldCBpbmRleCA9IGJvYXJkLmZpbmRJbmRleCh4LCB5KTtcclxuICBsZXQgaiA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5naHQ7IGkrKykge1xyXG4gICAgaWYgKFxyXG4gICAgICAoZGlyZWN0aW9uID09PSAneCcgJiYgaW5kZXggKyBpID4gOTkpIHx8XHJcbiAgICAgIChkaXJlY3Rpb24gPT09ICd5JyAmJiBpbmRleCArIGogPiA5OSlcclxuICAgICkge1xyXG4gICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAneCcgJiYgc2hpcC5zaGlwTGVuZ2h0ICsgeSA+IDkpIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3knICYmIHNoaXAuc2hpcExlbmdodCArIHggPiA5KSByZXN1bHQgPSBmYWxzZTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICd4JyAmJiBib2FyZC5ib2FyZFtpbmRleCArIGldLmhhc1NoaXApIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3knICYmIGJvYXJkLmJvYXJkW2luZGV4ICsgal0uaGFzU2hpcCkgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICBqICs9IDEwO1xyXG4gIH1cclxuICBpZiAocmVzdWx0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiB7IHgsIHksIGRpcmVjdGlvbiB9O1xyXG59O1xyXG5cclxuY29uc3QgcGxhY2VBaVNoaXBzID0gKGJvYXJkKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IHNoaXBGYWN0b3J5KDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeSg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gc2hpcEZhY3RvcnkoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gc2hpcEZhY3RvcnkoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gc2hpcEZhY3RvcnkoMik7XHJcblxyXG4gIGxldCBzaGlwMSA9IGdlbmVyYXRlQWlSYW5kb21QbGFjZW1lbnQoYm9hcmQsIGNhcnJpZXIpO1xyXG4gIHdoaWxlIChzaGlwMSA9PT0gZmFsc2UpIHNoaXAxID0gZ2VuZXJhdGVBaVJhbmRvbVBsYWNlbWVudChib2FyZCwgY2Fycmllcik7XHJcbiAgYm9hcmQucGxhY2VTaGlwKGNhcnJpZXIsIHNoaXAxLngsIHNoaXAxLnksIHNoaXAxLmRpcmVjdGlvbik7XHJcblxyXG4gIGxldCBzaGlwMiA9IGdlbmVyYXRlQWlSYW5kb21QbGFjZW1lbnQoYm9hcmQsIGJhdHRsZXNoaXApO1xyXG4gIHdoaWxlIChzaGlwMiA9PT0gZmFsc2UpIHNoaXAyID0gZ2VuZXJhdGVBaVJhbmRvbVBsYWNlbWVudChib2FyZCwgY2Fycmllcik7XHJcbiAgYm9hcmQucGxhY2VTaGlwKGJhdHRsZXNoaXAsIHNoaXAyLngsIHNoaXAyLnksIHNoaXAyLmRpcmVjdGlvbik7XHJcblxyXG4gIGxldCBzaGlwMyA9IGdlbmVyYXRlQWlSYW5kb21QbGFjZW1lbnQoYm9hcmQsIGNydWlzZXIpO1xyXG4gIHdoaWxlIChzaGlwMyA9PT0gZmFsc2UpIHNoaXAzID0gZ2VuZXJhdGVBaVJhbmRvbVBsYWNlbWVudChib2FyZCwgY2Fycmllcik7XHJcbiAgYm9hcmQucGxhY2VTaGlwKGNydWlzZXIsIHNoaXAzLngsIHNoaXAzLnksIHNoaXAzLmRpcmVjdGlvbik7XHJcblxyXG4gIGxldCBzaGlwNCA9IGdlbmVyYXRlQWlSYW5kb21QbGFjZW1lbnQoYm9hcmQsIHN1Ym1hcmluZSk7XHJcbiAgd2hpbGUgKHNoaXA0ID09PSBmYWxzZSkgc2hpcDQgPSBnZW5lcmF0ZUFpUmFuZG9tUGxhY2VtZW50KGJvYXJkLCBjYXJyaWVyKTtcclxuICBib2FyZC5wbGFjZVNoaXAoc3VibWFyaW5lLCBzaGlwNC54LCBzaGlwNC55LCBzaGlwNC5kaXJlY3Rpb24pO1xyXG5cclxuICBsZXQgc2hpcDUgPSBnZW5lcmF0ZUFpUmFuZG9tUGxhY2VtZW50KGJvYXJkLCBkZXN0cm95ZXIpO1xyXG4gIHdoaWxlIChzaGlwNSA9PT0gZmFsc2UpIHNoaXA1ID0gZ2VuZXJhdGVBaVJhbmRvbVBsYWNlbWVudChib2FyZCwgY2Fycmllcik7XHJcbiAgYm9hcmQucGxhY2VTaGlwKGRlc3Ryb3llciwgc2hpcDUueCwgc2hpcDUueSwgc2hpcDUuZGlyZWN0aW9uKTtcclxufTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlQm9hcmRzID0gKGJvYXJkLCBjb250YWluZXIsIHBsYXllcikgPT4ge1xyXG4gIGJvYXJkLmJvYXJkLmZvckVhY2goKHRpbGUpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkVGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYm9hcmRUaWxlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkVGlsZScpO1xyXG4gICAgYm9hcmRUaWxlLmRhdGFzZXQueCA9IHRpbGUueDtcclxuICAgIGJvYXJkVGlsZS5kYXRhc2V0LnkgPSB0aWxlLnk7XHJcbiAgICBib2FyZFRpbGUuZGF0YXNldC5ib2FyZCA9IHBsYXllcjtcclxuICAgIGJvYXJkVGlsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdhbWVsb29wKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZFRpbGUpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcGxhY2VNYXJrT25Cb2FyZCA9IChib2FyZCwgeCwgeSwgcGxheWVyLCBjb250YWluZXIpID0+IHtcclxuICBjb25zdCBpbmRleCA9IGJvYXJkLmZpbmRJbmRleCh4LCB5KTtcclxuICBjb25zdCBib2FyZEFycmF5ID0gYm9hcmQuYm9hcmQ7XHJcbiAgY29uc3QgdGlsZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxyXG4gICAgYFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1bZGF0YS1ib2FyZD1cIiR7cGxheWVyfVwiXWBcclxuICApO1xyXG4gIGlmIChib2FyZEFycmF5W2luZGV4XS5oYXNTaGlwKSB7XHJcbiAgICB0aWxlLmNsYXNzTGlzdC5hZGQoJ3NoaXBIaXQnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdGlsZS5jbGFzc0xpc3QuYWRkKCdzaG90TWlzcycpO1xyXG59O1xyXG5cclxuY29uc3QgY2hlY2tTdW5rU2hpcHMgPSAoYm9hcmQpID0+IHtcclxuICBsZXQgYWxsU3VuayA9IHRydWU7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgYWxsU3VuayA9IGJvYXJkLnNoaXBzW2ldLmlzU3VuaygpO1xyXG4gICAgaWYgKCFib2FyZC5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuO1xyXG4gIH1cclxuICByZXR1cm4gYWxsU3VuaztcclxufTtcclxuXHJcbmNvbnN0IGdhbWVGaW5pc2hlZCA9ICh3aW5uZXIpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZUZpbmlzaGVkQ29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gIGlmICh3aW5uZXIgPT09ICdwbGF5ZXIgd29uJylcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lT25lJykudGV4dENvbnRlbnQgPSAnQ29uZ3JhdHVsYXRpb25zISc7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVUd28nKS50ZXh0Q29udGVudCA9ICdZb3Ugd2luISc7XHJcbiAgaWYgKHdpbm5lciA9PT0gJ2FpIHdvbicpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZU9uZScpLnRleHRDb250ZW50ID0gJ1lvdSBsb3NlJztcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZVR3bycpLnRleHRDb250ZW50ID0gJ1RyeSBhZ2FpbiEnO1xyXG59O1xyXG5cclxuY29uc3QgZ2FtZWxvb3AgPSAoZSkgPT4ge1xyXG4gIGNvbnN0IHggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LngpO1xyXG4gIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnkpO1xyXG4gIHBsYXllcjEuYXR0YWNrRW5lbXlHYW1lYm9hcmQoYWlCb2FyZCwgeCwgeSk7XHJcbiAgcGxhY2VNYXJrT25Cb2FyZChhaUJvYXJkLCB4LCB5LCAnYWknLCBhaUNvbnRhaW5lcik7XHJcbiAgaWYgKGNoZWNrU3Vua1NoaXBzKGFpQm9hcmQpKSB7XHJcbiAgICBnYW1lRmluaXNoZWQoJ3BsYXllciB3b24nKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgYWlBdHRhY2sgPSBhaVBsYXllci5hdHRhY2socGxheWVyQm9hcmQpO1xyXG4gIHNldFRpbWVvdXQoXHJcbiAgICBwbGFjZU1hcmtPbkJvYXJkLFxyXG4gICAgNTAwLFxyXG4gICAgcGxheWVyQm9hcmQsXHJcbiAgICBhaUF0dGFjay54LFxyXG4gICAgYWlBdHRhY2sueSxcclxuICAgICdwbGF5ZXInLFxyXG4gICAgcGxheWVyQ29udGFpbmVyXHJcbiAgKTtcclxuICBpZiAoY2hlY2tTdW5rU2hpcHMocGxheWVyQm9hcmQpKSBnYW1lRmluaXNoZWQoJ2FpIHdvbicpO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2VuZXJhdGVCb2FyZHMsIHBsYWNlQWlTaGlwcywgcGxheWVyQm9hcmQgfTtcclxuIiwiY29uc3QgZ2FtZWJvYXJkRmFjdG9yeSA9ICgpID0+IHtcclxuICBsZXQgbWlzc2VkU2hvdCA9IFtdO1xyXG4gIGxldCBzaGlwcyA9IFtdO1xyXG4gIGNvbnN0IHNpemUgPSAxMDtcclxuXHJcbiAgY29uc3QgYm9hcmRHZW5lcmF0b3IgPSAoKSA9PiB7XHJcbiAgICBsZXQgYm9hcmQgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XHJcbiAgICAgICAgYm9hcmQucHVzaCh7IHg6IGksIHk6IGosIGhhc1NoaXA6IGZhbHNlLCB3YXNIaXQ6IGZhbHNlIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZmluZEluZGV4ID0gKHgsIHkpID0+IHtcclxuICAgIHJldHVybiBib2FyZC5maW5kSW5kZXgoKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC54ID09PSB4ICYmIGVsLnkgPT09IHkpIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYm9hcmQgPSBib2FyZEdlbmVyYXRvcigpO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICBsZXQgaW5kZXggPSBmaW5kSW5kZXgoeCwgeSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIChkaXJlY3Rpb24gPT09ICd4JyAmJiBzaGlwLnNoaXBMZW5naHQgKyB5ID4gc2l6ZSkgfHxcclxuICAgICAgYm9hcmRbaW5kZXhdLmhhc1NoaXBcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgc2hpcC5zZXRQb3NpdGlvbih4LCB5LCBkaXJlY3Rpb24pO1xyXG4gICAgbGV0IGogPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5naHQ7IGkrKykge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAneCcpIGJvYXJkW2luZGV4ICsgaV0uaGFzU2hpcCA9IHRydWU7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd5JykgYm9hcmRbaW5kZXggKyBqXS5oYXNTaGlwID0gdHJ1ZTtcclxuICAgICAgaiArPSAxMDtcclxuICAgIH1cclxuICAgIHNoaXBzLnB1c2goc2hpcCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZmluZFNoaXAgPSAoeCwgeSkgPT4ge1xyXG4gICAgbGV0IGluZGV4ID0gbnVsbDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwc1tpXS5zaGlwTGVuZ2h0OyBqKyspIHtcclxuICAgICAgICBpZiAoc2hpcHNbaV0ucG9zaXRpb25bal0ueCA9PT0geCAmJiBzaGlwc1tpXS5wb3NpdGlvbltqXS55ID09PSB5KSB7XHJcbiAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XHJcbiAgICBsZXQgaW5kZXggPSBmaW5kSW5kZXgocGFyc2VJbnQoeCksIHBhcnNlSW50KHkpKTtcclxuICAgIGlmIChib2FyZFtpbmRleF0ud2FzSGl0KSByZXR1cm47XHJcbiAgICBpZiAoYm9hcmRbaW5kZXhdLmhhc1NoaXApIHtcclxuICAgICAgbGV0IHNoaXBpbmRleCA9IGZpbmRTaGlwKHgsIHkpO1xyXG4gICAgICBzaGlwc1tzaGlwaW5kZXhdLmhpdCh4LCB5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1pc3NlZFNob3QucHVzaCh7IHg6IHgsIHk6IHkgfSk7XHJcbiAgICB9XHJcbiAgICBib2FyZFtpbmRleF0ud2FzSGl0ID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICghc2hpcHNbaV0uaXNTdW5rKCkpIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBib2FyZCxcclxuICAgIGZpbmRJbmRleCxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBtaXNzZWRTaG90LFxyXG4gICAgcGxhY2VTaGlwLFxyXG4gICAgc2hpcHMsXHJcbiAgICBmaW5kU2hpcCxcclxuICAgIGFyZUFsbFNoaXBzU3VuayxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkRmFjdG9yeTtcclxuIiwiaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5JztcclxuXHJcbmNvbnN0IHBsYXllckdlbmVyYXRvciA9ICgpID0+IHtcclxuICBjb25zdCBhdHRhY2tFbmVteUdhbWVib2FyZCA9IChlbmVteUJvYXJkLCB4LCB5KSA9PiB7XHJcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGF0dGFja0VuZW15R2FtZWJvYXJkLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBhaVBsYXllckdlbmVyYXRvciA9ICgpID0+IHtcclxuICBjb25zdCBhbGxIaXRzID0gW107XHJcblxyXG4gIGNvbnN0IGNoZWNrVmFsaWRBdHRhY2sgPSAoZW5lbXlCb2FyZCwgeCwgeSkgPT4ge1xyXG4gICAgY29uc3QgaW5kZXggPSBlbmVteUJvYXJkLmZpbmRJbmRleCh4LCB5KTtcclxuICAgIGlmIChlbmVteUJvYXJkLmJvYXJkW2luZGV4XS53YXNIaXQpIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaGVja1ZhbGlkU21hcnRBdHRhY2sgPSAoZW5lbXlCb2FyZCwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IHBvc3NpYmxlSGl0cyA9IFtdO1xyXG4gICAgaWYgKFxyXG4gICAgICBlbmVteUJvYXJkLmJvYXJkW2luZGV4ICsgMV0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAhZW5lbXlCb2FyZC5ib2FyZFtpbmRleCArIDFdLndhc0hpdFxyXG4gICAgKSB7XHJcbiAgICAgIHBvc3NpYmxlSGl0cy5wdXNoKGluZGV4ICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBlbmVteUJvYXJkLmJvYXJkW2luZGV4IC0gMV0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAhZW5lbXlCb2FyZC5ib2FyZFtpbmRleCAtIDFdLndhc0hpdFxyXG4gICAgKSB7XHJcbiAgICAgIHBvc3NpYmxlSGl0cy5wdXNoKGluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGVuZW15Qm9hcmQuYm9hcmRbaW5kZXggKyAxMF0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAhZW5lbXlCb2FyZC5ib2FyZFtpbmRleCArIDEwXS53YXNIaXRcclxuICAgICkge1xyXG4gICAgICBwb3NzaWJsZUhpdHMucHVzaChpbmRleCArIDEwKTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgZW5lbXlCb2FyZC5ib2FyZFtpbmRleCAtIDEwXSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICFlbmVteUJvYXJkLmJvYXJkW2luZGV4IC0gMTBdLndhc0hpdFxyXG4gICAgKSB7XHJcbiAgICAgIHBvc3NpYmxlSGl0cy5wdXNoKGluZGV4IC0gMTApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByYW5kb21IaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZUhpdHMubGVuZ3RoKTtcclxuICAgIHJldHVybiBwb3NzaWJsZUhpdHNbcmFuZG9tSGl0XTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzbWFydEF0dGFjayA9IChlbmVteUJvYXJkKSA9PiB7XHJcbiAgICBsZXQgeCwgeSwgaW5kZXg7XHJcbiAgICBsZXQgY3VycmVudEluZGV4ID0gYWxsSGl0cy5sZW5ndGggLSAxO1xyXG4gICAgbGV0IGRpcmVjdGlvbjtcclxuICAgIGlmIChhbGxIaXRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpbmRleCA9IGVuZW15Qm9hcmQuZmluZEluZGV4KGFsbEhpdHNbMF0ueCwgYWxsSGl0c1swXS55KTtcclxuICAgICAgbGV0IG5ld0F0dGFjayA9IGNoZWNrVmFsaWRTbWFydEF0dGFjayhlbmVteUJvYXJkLCBpbmRleCk7XHJcbiAgICAgIHggPSBlbmVteUJvYXJkLmJvYXJkW25ld0F0dGFja10ueDtcclxuICAgICAgeSA9IGVuZW15Qm9hcmQuYm9hcmRbbmV3QXR0YWNrXS55O1xyXG4gICAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XHJcbiAgICAgIGlmIChlbmVteUJvYXJkLmJvYXJkW25ld0F0dGFja10uaGFzU2hpcCkgYWxsSGl0cy5wdXNoKHsgeCwgeSB9KTtcclxuICAgICAgcmV0dXJuIG5ld0F0dGFjaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWxsSGl0c1swXS54ID09PSBhbGxIaXRzWzFdLngpIHtcclxuICAgICAgZGlyZWN0aW9uID0gJ3gnO1xyXG4gICAgfSBlbHNlIGlmIChhbGxIaXRzWzBdLnkgPT09IGFsbEhpdHNbMV0ueSkge1xyXG4gICAgICBkaXJlY3Rpb24gPSAneSc7XHJcbiAgICB9XHJcblxyXG4gICAgeCA9IGFsbEhpdHNbY3VycmVudEluZGV4XS54O1xyXG4gICAgeSA9IGFsbEhpdHNbY3VycmVudEluZGV4XS55ICsgMTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT0gJ3knKSB7XHJcbiAgICAgIHggPSBhbGxIaXRzW2N1cnJlbnRJbmRleF0ueCArIDE7XHJcbiAgICAgIHkgPSBhbGxIaXRzW2N1cnJlbnRJbmRleF0ueTtcclxuICAgIH1cclxuXHJcbiAgICBpbmRleCA9IGVuZW15Qm9hcmQuZmluZEluZGV4KHgsIHkpO1xyXG4gICAgaWYgKFxyXG4gICAgICBlbmVteUJvYXJkLmJvYXJkW2luZGV4XSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICFlbmVteUJvYXJkLmJvYXJkW2luZGV4XS53YXNIaXRcclxuICAgICkge1xyXG4gICAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XHJcbiAgICAgIGlmIChlbmVteUJvYXJkLmJvYXJkW2luZGV4XS5oYXNTaGlwKSBhbGxIaXRzLnB1c2goeyB4LCB5IH0pO1xyXG4gICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgeCA9IGFsbEhpdHNbY3VycmVudEluZGV4XS54O1xyXG4gICAgeSA9IGFsbEhpdHNbY3VycmVudEluZGV4XS55IC0gMTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT0gJ3knKSB7XHJcbiAgICAgIHggPSBhbGxIaXRzW2N1cnJlbnRJbmRleF0ueCAtIDE7XHJcbiAgICAgIHkgPSBhbGxIaXRzW2N1cnJlbnRJbmRleF0ueTtcclxuICAgIH1cclxuXHJcbiAgICBpbmRleCA9IGVuZW15Qm9hcmQuZmluZEluZGV4KHgsIHkpO1xyXG4gICAgaWYgKFxyXG4gICAgICBlbmVteUJvYXJkLmJvYXJkW2luZGV4XSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICFlbmVteUJvYXJkLmJvYXJkW2luZGV4XS53YXNIaXRcclxuICAgICkge1xyXG4gICAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XHJcbiAgICAgIGlmIChlbmVteUJvYXJkLmJvYXJkW2luZGV4XS5oYXNTaGlwKSBhbGxIaXRzLnB1c2goeyB4LCB5IH0pO1xyXG4gICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgeCA9IGFsbEhpdHNbMF0ueDtcclxuICAgIHkgPSBhbGxIaXRzWzBdLnkgLSAxO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PSAneScpIHtcclxuICAgICAgeCA9IGFsbEhpdHNbMF0ueCAtIDE7XHJcbiAgICAgIHkgPSBhbGxIaXRzWzBdLnk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXggPSBlbmVteUJvYXJkLmZpbmRJbmRleCh4LCB5KTtcclxuICAgIGlmIChcclxuICAgICAgZW5lbXlCb2FyZC5ib2FyZFtpbmRleF0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAhZW5lbXlCb2FyZC5ib2FyZFtpbmRleF0ud2FzSGl0XHJcbiAgICApIHtcclxuICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xyXG4gICAgICBpZiAoZW5lbXlCb2FyZC5ib2FyZFtpbmRleF0uaGFzU2hpcCkgYWxsSGl0cy5wdXNoKHsgeCwgeSB9KTtcclxuICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHggPSBhbGxIaXRzWzBdLng7XHJcbiAgICB5ID0gYWxsSGl0c1swXS55ICsgMTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT0gJ3knKSB7XHJcbiAgICAgIHggPSBhbGxIaXRzWzBdLnggKyAxO1xyXG4gICAgICB5ID0gYWxsSGl0c1swXS55O1xyXG4gICAgfVxyXG4gICAgaW5kZXggPSBlbmVteUJvYXJkLmZpbmRJbmRleCh4LCB5KTtcclxuICAgIGlmIChcclxuICAgICAgZW5lbXlCb2FyZC5ib2FyZFtpbmRleF0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAhZW5lbXlCb2FyZC5ib2FyZFtpbmRleF0ud2FzSGl0XHJcbiAgICApIHtcclxuICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xyXG4gICAgICBpZiAoZW5lbXlCb2FyZC5ib2FyZFtpbmRleF0uaGFzU2hpcCkgYWxsSGl0cy5wdXNoKHsgeCwgeSB9KTtcclxuICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteUJvYXJkKSA9PiB7XHJcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgaW5kZXggPSBlbmVteUJvYXJkLmZpbmRJbmRleCh4LCB5KTtcclxuXHJcbiAgICB3aGlsZSAoY2hlY2tWYWxpZEF0dGFjayhlbmVteUJvYXJkLCB4LCB5KSA9PT0gZmFsc2UpIHtcclxuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWxsSGl0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBuZXdJbmRleCA9IGVuZW15Qm9hcmQuZmluZEluZGV4KGFsbEhpdHNbMF0ueCwgYWxsSGl0c1swXS55KTtcclxuICAgICAgaWYgKGVuZW15Qm9hcmQuYm9hcmRbbmV3SW5kZXhdLmhhc1NoaXApIHtcclxuICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBlbmVteUJvYXJkLmZpbmRTaGlwKGFsbEhpdHNbMF0ueCwgYWxsSGl0c1swXS55KTtcclxuICAgICAgICBpZiAoIWVuZW15Qm9hcmQuc2hpcHNbc2hpcEluZGV4XS5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgbGV0IHBvc3NpYmxlQXR0YWNrID0gc21hcnRBdHRhY2soZW5lbXlCb2FyZCk7XHJcbiAgICAgICAgICB4ID0gZW5lbXlCb2FyZC5ib2FyZFtwb3NzaWJsZUF0dGFja10ueDtcclxuICAgICAgICAgIHkgPSBlbmVteUJvYXJkLmJvYXJkW3Bvc3NpYmxlQXR0YWNrXS55O1xyXG4gICAgICAgICAgcmV0dXJuIHsgeCwgeSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygnc2hpcCBzdW5rJyk7XHJcbiAgICAgICAgYWxsSGl0cy5sZW5ndGggPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFsbEhpdHMubGVuZ3RoID09PSAwICYmIGVuZW15Qm9hcmQuYm9hcmRbaW5kZXhdLmhhc1NoaXApIHtcclxuICAgICAgYWxsSGl0cy5wdXNoKHsgeCwgeSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XHJcbiAgICByZXR1cm4geyB4LCB5IH07XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgYXR0YWNrLCBhbGxIaXRzIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBwbGF5ZXJHZW5lcmF0b3IsIGFpUGxheWVyR2VuZXJhdG9yIH07XHJcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmdodCkgPT4ge1xyXG4gIGNvbnN0IHNoaXBMZW5naHQgPSBsZW5naHQ7XHJcbiAgbGV0IHBvc2l0aW9uID0gW107XHJcbiAgbGV0IHNoaXBIaXRzID0gW107XHJcblxyXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcclxuICAgIGlmIChzaGlwSGl0cy5sZW5ndGggIT09IHNoaXBMZW5naHQpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhpdCA9ICh4LCB5KSA9PiB7XHJcbiAgICBzaGlwSGl0cy5wdXNoKHsgeDogeCwgeTogeSB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZXRQb3NpdGlvbiA9ICh4LCB5LCBkaXJlY3Rpb24pID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmdodDsgaSsrKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd4JykgcG9zaXRpb24ucHVzaCh7IHg6IHgsIHk6IHkgKyBpIH0pO1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAneScpIHBvc2l0aW9uLnB1c2goeyB4OiB4ICsgaSwgeTogeSB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hpcExlbmdodCxcclxuICAgIHNoaXBIaXRzLFxyXG4gICAgcG9zaXRpb24sXHJcbiAgICBpc1N1bmssXHJcbiAgICBzZXRQb3NpdGlvbixcclxuICAgIGhpdCxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hpcEZhY3Rvcnk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5JztcclxuaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gJy4vc2hpcEZhY3RvcnknO1xyXG5pbXBvcnQgeyBwbGF5ZXIsIGFpUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXJzJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVCb2FyZHMsIHBsYWNlU2hpcHMgfSBmcm9tICcuL2dhbWUnO1xyXG5pbXBvcnQgZHJhZyBmcm9tICcuL2RyYWdBbmREcm9wJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9