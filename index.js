let place = Array.from({ length: 4 }, () => Array(4).fill(0));
let gameWasOwer = true;
let score = 0;
let bestScore = 0;
let direction = {
  up: {
    x: 0,
    y: 1,
  },
  down: {
    x: 0,
    y: -1,
  },
  left: {
    x: 1,
    y: 0,
  },
  right: {
    x: -1,
    y: 0,
  },
};
let moveDirection = direction.up;

document.querySelector("#bestScoreValue").innerText = bestScore;
document.querySelector("#scoreValue").innerText = score;

function startGame() {
  if (!gameWasOwer) return;
  place = Array.from({ length: 4 }, () => Array(4).fill(0));
  newItems();
  newItems();
  displayBoard();
  gameWasOwer = false;
}
function newGame() {
  openModalNewGame();
  gameWasOwer = true;
}

function displayBoard() {
  const board = document.querySelector(".game-board");
  document.querySelector("#scoreValue").innerText = score;
  board.innerHTML = "";
  for (let x = 0; x < place.length; x++) {
    for (let y = 0; y < place[x].length; y++) {
      const cell = document.createElement("div");

      if (place[x][y] === 0) {
        cell.classList.add(`empty`);
      } else {
        cell.classList.add(`full`);
        cell.classList.add(`full${place[x][y]}`);
        cell.textContent = `${place[x][y]}`;
      }

      board.appendChild(cell);
    }
  }
}
displayBoard();

function move() {
  let chekPlace = JSON.parse(JSON.stringify(place));
  for (let index = 0; index < 4; index++) {
    for (let y = 0; y < place.length; y++) {
      for (let x = 0; x < place[0].length; x++) {
        collaps(place, x, y);
        calculationMove(place, x, y);
      }
    }
  }

  !arraysAreEqual(chekPlace, place) ? newItems() : false;

  displayBoard();

  stalemate() ? gameOwer() : 0;
}

function stalemate() {
  let pat = false;
  if (place.every((el) => el.every((el) => el !== 0))) {
    pat = true;
    for (let y = 0; y < place.length; y++) {
      for (let x = 0; x < place[0].length; x++) {
        if (
          (place[y + 1] && place[y][x] == place[y + 1][x]) ||
          (place[y][x + 1] !== undefined && place[y][x] == place[y][x + 1])
        )
          pat = false;
      }
    }
  }
  return pat;
}
function newItems() {
  let appeared = true;
  while (appeared) {
    let x = Math.floor(Math.random() * place[0].length);
    let y = Math.floor(Math.random() * place.length);
    let probabilityOfNewItem = Math.floor(Math.random() * 101);

    if (place[y][x] === 0) {
      probabilityOfNewItem < 75 ? (place[y][x] = 2) : (place[y][x] = 4);
      appeared = false;
    }
  }
}
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!arraysAreEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  }

  return true;
}

function collaps(place, x, y) {
  if (
    place[y + moveDirection.y] &&
    place[y + moveDirection.y][x + moveDirection.x] !== undefined &&
    place[y][x] == place[y + moveDirection.y][x + moveDirection.x]
  ) {
    place[y][x] = 0;
    place[y + moveDirection.y][x + moveDirection.x] *= 2;
    score += place[y + moveDirection.y][x + moveDirection.x];
  }
}
function calculationMove(place, x, y) {
  if (
    place[y][x] == 0 &&
    place[y + moveDirection.y] &&
    place[y + moveDirection.y][x + moveDirection.x] !== undefined
  ) {
    place[y][x] = place[y + moveDirection.y][x + moveDirection.x];
    place[y + moveDirection.y][x + moveDirection.x] = 0;
  }
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 38) {
    moveDirection = direction.up;
    move();
  }
  if (e.keyCode === 37) {
    moveDirection = direction.left;
    move();
  }
  if (e.keyCode === 39) {
    moveDirection = direction.right;
    move();
  }
  if (e.keyCode === 40) {
    moveDirection = direction.down;
    move();
  }
});
function openModalGameOver() {
  score > bestScore ? (bestScore = score) : 0;
  document.querySelector("#gameOverModal").style.display = "block";
  document.querySelector(".scoreModal span#scoreValueModal").innerText = score;
  document.querySelector(".scoreModal span#bestScoreValueModal").innerText =
    bestScore;
  document.querySelector("#scoreValueModal").style.display = "block";
}
function openModalNewGame() {
  score > bestScore ? (bestScore = score) : 0;
  document.querySelector("#newGameModal").style.display = "block";
  document.querySelector(".scoreModal span#scoreValueModalNewGame").innerText =
    score;
  document.querySelector(
    ".scoreModal span#bestScoreValueModalNewGame"
  ).innerText = bestScore;
  document.querySelector("#scoreValueModal").style.display = "block";
}

function closeModal() {
  document.querySelector("#gameOverModal").style.display = "none";
  document.querySelector("#newGameModal").style.display = "none";
  score > bestScore ? (bestScore = score) : 0;
  document.querySelector("#bestScoreValue").innerText = bestScore;
  score = 0;
  document.querySelector("#scoreValue").innerText = score;
}
function gameOwer() {
  openModalGameOver();
  gameWasOwer = true;
}
