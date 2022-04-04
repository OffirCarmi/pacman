'use strict'
const PACMAN = '🙂';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 7
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gTotalFood--
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell

    var nextLocation = getNextLocation(ev);
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)

    // return if cannot move
    if (nextCell === WALL) return

    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
            
        }
        else {
            gameOver()
            return
        }
    }
    if (nextCell === FOOD) {
        updateScore(1);
        gTotalFood--
        // console.log(gTotalFood);
        checkForVictory()
    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        superFoodMode()
    }
    if (nextCell === CHERRY){
        updateScore(10)
    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY);

    // Move the pacman to new location
    // update the model
    gPacman.location.i = nextLocation.i;
    gPacman.location.j = nextLocation.j;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)

}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code', eventKeyboard.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}


function checkForVictory() {
    if (gTotalFood === 0) {
        gameOver()
        document.querySelector('.modal').innerText = 'WIN'
        document.querySelector('.restart').style.display = 'block'
    }
}

function superFoodMode() {
    gPacman.isSuper = true

    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'white'
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }

    setTimeout(() => {
        gPacman.isSuper = false
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor()
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
        }

    }, 5000);
}