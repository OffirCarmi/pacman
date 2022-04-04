'use strict'
const GHOST = '&#9781;'
var gGhosts
var gIntervalGhosts
var gRemovedGhosts = []
var id = 1

function createGhost(board) {
    var ghost = {
        id: id++,
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }

}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell);

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        gameOver();
        return
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location.i = nextLocation.i
    ghost.location.j = nextLocation.j
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}


function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
            var removedGhost = gGhosts.splice(i, 1)[0]
            removedGhost.color = getRandomColor()
            if (removedGhost.currCellContent === FOOD) gTotalFood--
            gRemovedGhosts.push(removedGhost)
            setTimeout(returnGhost, 5000, removedGhost)
        }
    }

}


function returnGhost(removedGhost) {

    for (var i = 0; i < gRemovedGhosts.length; i++) {
        if (gRemovedGhosts[i].id === removedGhost.id) {
            var returnedGhost = gRemovedGhosts.splice(i, 1)[i]
            gGhosts.push(returnedGhost)
            gBoard[returnedGhost.location.i][returnedGhost.location.j] = GHOST
            // gTotalFood++
            renderCell(returnedGhost.location, getGhostHTML(returnedGhost))
            return
        }
    }
}