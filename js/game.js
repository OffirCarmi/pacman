'use strict'
const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '⭐'
const CHERRY = '🍒'

var gTotalFood = 0
var gCherryInterval

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    // console.log('hello')
    gTotalFood = 0
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry,10000)
}

function restart() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame = {
        score: 0,
        isOn: false
    }
    document.querySelector('h2 span').innerText = gGame.score;
    document.querySelector('.modal').innerText = ''
    document.querySelector('.restart').style.display = 'none'
    init()

}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            } else if (i === 1 && (j === 1 || j === SIZE - 2) ||
                (i === SIZE - 2 && (j === 1 || j === SIZE - 2))) {
                board[i][j] = SUPER_FOOD
            } else {
                board[i][j] = FOOD
                gTotalFood++
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)
    document.querySelector('.modal').innerText = 'GAME OVER'
    document.querySelector('.restart').style.display = 'block'
}


function addCherry() {
    var freeCell = getRandomEmptyPos()
    gBoard[freeCell.i][freeCell.j] = CHERRY
    renderCell(freeCell,CHERRY)
}
