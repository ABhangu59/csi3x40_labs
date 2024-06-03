/*
Mustafa Ahmed
CSI3140 Lab 3 - 1D Pacman
June 2, 2024
*/


//Define Game pieces
const PACMAN = "C";
const GHOST = "^";
const FRUIT = "@";
const PELLET = ".";


var game = []; //gameboard
var gameWin = 0;
var score = 0; //continues until session ends
var pellets = 0; //resets after each game

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

//Locate Pacman
indexPacMan = game.indexOf(PACMAN);
indexLeftPacMan = 0;

if (indexPacMan == 0) {//Far left edge case
    indexLeftPacMan = game.length - 1;
} else {
    indexLeftPacMan = indexPacMan - 1;
}

left_val = game[indexLeftPacMan];

if (left_val == PELLET) {//Eat a pellet
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

    //Locate pacman
    indexPacMan = game.indexOf(PACMAN);
    indexRightPacMan = 0;

    if (indexPacMan == game.length - 1) {//Far right edge case
        indexLeftPacMan = 0;
    } else {
        indexRightPacMan = indexPacMan + 1;
    }
    right_val = game[indexRightPacMan];

    if (right_val == PELLET) {//Eat a pellet
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

    //Locate ghost
    indexGhost = game.indexOf(GHOST);
    indexNextGhost = 0;
    leftOrRight = Math.random(); //randomly decide to move left or right

    if (leftOrRight >= 0.5) { //move ghost right 
        if (indexGhost == game.length - 1) { //Far right edge case
        indexNextGhost = 0;
        } else { 
        indexNextGhost = indexGhost + 1;
        }
    } else { //move ghost left
       
        if (indexGhost == 0) { //Far left edge case
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

    if (pellets == gameWin) { //Proceed to next level if all pellets eaten
        return createGame(game.length + 3); //new game is 3 spaces larger
    }
    //remove pellet from game once eaten
    game[indexOfCrossing] = PACMAN;
    game[indexPrev] = "_";
    return game;
}


//Controls
function handleKeyPress(event) {
    if (event.keyCode === 37) {//left key
        moveLeft(game);
    } else if (event.keyCode === 39) {//right key
        moveRight(game);
    } else if (event.keyCode === 77) {//M key moves ghost - meant for testing
        moveGhost(game);
    }
}

//Run game in live time
function updateGameDisplay() {

    var gameDisplay = document.getElementById("game-display"); //gameboard
    var pelletCountDisplay = document.getElementById("pellet-display"); //pellet counter
    var scoreDisplay = document.getElementById("score-display"); //total score

    //Strings to output
    var gameString = game.join(" "); 
    var pelletString = "Pellets: " + pellets + "/" + gameWin;
    var scoreString = "Score: " + score;

    //output to HTML
    gameDisplay.textContent = gameString;
    pelletCountDisplay.textContent = pelletString;
    scoreDisplay.textContent = scoreString;
}

var game = createGame(12);//initialize game
document.addEventListener("keydown", handleKeyPress); //listen for keyboard inputs

//move ghost every 2 seconds
setInterval(function () {
moveGhost(game);
}, 2000);