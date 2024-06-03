const PACMAN = "C";
const GHOST = "^";
const FRUIT = "@";
const PELLET = ".";

var game = [];
var gameWin = 0;
var score = 0;
var pellets = 0;

function createGame(n) {
gameArray = [];
pellets = 0;
gameWin = n - 3; //all pellets subract other game pieces
for (let i = 0; i < n; i++) {
    //spawn pacman in the middle
    if (i == Math.ceil(n / 2)) {
    gameArray.push(PACMAN);
    //spawn ghost at the end
    } else if (i == n - 1) {
    gameArray.push(GHOST);
    //spawn the fruit about between pacman and ghost
    } else if (i == Math.ceil((n * 2) / 3)) {
    gameArray.push(FRUIT);
    //spawn pellets everywhere else
    } else {
    gameArray.push(PELLET);
    }
}

game = gameArray;
updateGameDisplay();
return gameArray;
}

function moveLeft(game) {
indexPacMan = game.indexOf(PACMAN);
indexLeftPacMan = 0;
if (indexPacMan == 0) {
    indexLeftPacMan = game.length - 1;
} else {
    indexLeftPacMan = indexPacMan - 1;
}

left_val = game[indexLeftPacMan];

if (left_val == PELLET) {
    processPellet(game, indexLeftPacMan, indexPacMan);
} else {
    //swap
    temp = game[indexLeftPacMan];
    game[indexLeftPacMan] = PACMAN;
    game[indexPacMan] = temp;
}

updateGameDisplay();
return game;
}

function moveRight(game) {
indexPacMan = game.indexOf(PACMAN);
indexRightPacMan = 0;

if (indexPacMan == game.length - 1) {
    indexLeftPacMan = 0;
} else {
    indexRightPacMan = indexPacMan + 1;
}
right_val = game[indexRightPacMan];

if (right_val == PELLET) {
    processPellet(game, indexRightPacMan, indexPacMan);
} else {
    //swap
    temp = game[indexRightPacMan];
    game[indexRightPacMan] = PACMAN;
    game[indexPacMan] = temp;
}

updateGameDisplay();
return game;
}

function moveGhost(game) {
indexGhost = game.indexOf(GHOST);
indexNextGhost = 0;
leftOrRight = Math.random();

if (leftOrRight >= 0.5) {
    //move ghost right
    if (indexGhost == game.length - 1) {
    indexNextGhost = 0;
    } else {
    indexNextGhost = indexGhost + 1;
    }
} else {
    //move ghost left
    if (indexGhost == 0) {
    indexNextGhost = game.length - 1;
    } else {
    indexGhostNext = indexGhost - 1;
    }
}

temp = game[indexNextGhost];
game[indexNextGhost] = GHOST;
game[indexGhost] = temp;

updateGameDisplay();
return game;
}

function processPellet(game, indexOfCrossing, indexPrev) {
pellets++;
score++;
if (pellets == gameWin) {
    return createGame(game.length + 3);
}
game[indexOfCrossing] = PACMAN;
game[indexPrev] = "_";
return game;
}

function handleKeyPress(event) {
if (event.keyCode === 37) {
    moveLeft(game);
} else if (event.keyCode === 39) {
    moveRight(game);
} else if (event.keyCode === 77) {
    moveGhost(game);
}
}

// Function to update the game display
function updateGameDisplay() {
var gameDisplay = document.getElementById("game-display");

var pelletCountDisplay = document.getElementById("pellet-display");
var scoreDisplay = document.getElementById("score-display");

var gameString = game.join(" "); // Use join to display array elements with spaces
var pelletString = "Pellets: " + pellets + "/" + gameWin;
var scoreString = "Score: " + score;

gameDisplay.textContent = gameString;
pelletCountDisplay.textContent = pelletString;
scoreDisplay.textContent = scoreString;
}

var game = createGame(12);
document.addEventListener("keydown", handleKeyPress);
setInterval(function () {
moveGhost(game);
}, 2000);