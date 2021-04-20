// ! constructor
const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const scoreScreen = document.querySelector('#score-screen')
const gridSize = document.querySelector('#grid-size')
let cells = []
let width = 0
let movement = false
let possibility = true
let arrayOfFreePos = []
let randomIndex = 0
let keyChoice = null
let tileA = null
let tileB = null
let score = 0
let allowed = true

const colors = {
  '2': 'lightgreen',
  '4': 'greenyellow',
  '8': 'lawngreen',
  '16': 'limegreen',
  '32': 'green',
  '64': 'darkgreen',
  '128': 'olivedrab',
  '256': 'darkolivegreen',
  '512': 'olive',
  '1024': 'seagreen',
  '2048': 'crimson',
}

// ! functions

// build grid
function buildGrid() {
  width = Number(gridSize.value)
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild)
  }
  cells = []
  for (let index = 0; index < width ** 2; index++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    // show index in cells of grid
    // div.innerHTML = index
    div.style.width = `${100 / width}%`
    div.style.height = `${100 / width}%`
    cells.push(div)
  }
}
// cells.forEach(cell => {
  //   cell.classList.remove('number')
  //   cell.style.backgroundColor = ''
  //   cell.innerHTML = ''
  // })

// create array with all indexes of free positions
function getFreeTileIndeces() {
  arrayOfFreePos = []
  cells.forEach((cell, index) => {
    if (!cell.classList.contains('number')) {
      arrayOfFreePos.push(index)
    }
  })
}

function checkIf2048() {
  cells.forEach((cell) => {
    if (cell.innerHTML === '2048') {
      alert('Win')
    }
    return
  })
}

function seeIfThereArePossibilities() {
  possibility = false
  for (let index = 0; index < width; index++) {
    checkTilesForButtonUp(index)
  }
  for (let index = width ** 2 - width; index < width ** 2; index++) {
    checkTilesForButtonDown(index)
  }
  for (let index = width - 1; index < width ** 2; index += width) {
    checkTilesForButtonRight(index)
  }
  for (let index = 0; index <= width ** 2 - width; index += width) {
    checkTilesForButtonLeft(index)
  }
  return possibility
}

// get new random number
function getRandomIndexFromFreeCells() {
  getFreeTileIndeces()
  randomIndex = Math.floor(Math.random() * arrayOfFreePos.length)
  return arrayOfFreePos[randomIndex]
}

function addTileRandomly(tileNumber) {
  randomIndex = getRandomIndexFromFreeCells()
  cells[randomIndex].classList.add('number')
  cells[randomIndex].style.backgroundColor = colors[tileNumber]
  cells[randomIndex].innerHTML = `${tileNumber}`
  // cells[randomIndex].classList.add(`${tileNumber}`)
  // console.dir(cells[randomIndex])
}

// * only chance left when all tiles numbered, is
// * that at least two of them sum up

function checkTilesForButtonUp(startIndex) {
  // if boarder reached, return
  if ((startIndex > (width ** 2) - width - 1)) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex + width]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    if (tileA.innerHTML === tileB.innerHTML) {
      possibility = true
      return
    } else {
      return checkTilesForButtonUp(startIndex + width)
    }
    // case first is none, second is tile
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    checkTilesForButtonUp(startIndex + width)
  }
}
function checkTilesForButtonDown(startIndex) {
  // if boarder reached, return
  if (startIndex < width) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex - width]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // case both tiles are the same
    if (tileA.innerHTML === tileB.innerHTML) {
      possibility = true
      return
    } else {
      return checkTilesForButtonDown(startIndex - width)
    }
    // case first is none, second is tile
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    checkTilesForButtonDown(startIndex - width)
  }
}
function checkTilesForButtonRight(startIndex) {
  // if boarder reached, return
  if ((startIndex % width) === 0) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex - 1]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // case both tiles are the same
    if (tileA.innerHTML === tileB.innerHTML) {
      possibility = true
      return
    } else {
      return checkTilesForButtonRight(startIndex - 1)
    }
    // case first is none, second is tile
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    checkTilesForButtonRight(startIndex - 1)
  }
}
function checkTilesForButtonLeft(startIndex) {
  // if boarder reached, return
  if ((startIndex % width) === width - 1) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex + 1]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // case both tiles are the same
    if (tileA.innerHTML === tileB.innerHTML) {
      possibility = true
      return
    } else {
      return checkTilesForButtonLeft(startIndex + 1)
    }
    // case first is none, second is tile
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    checkTilesForButtonLeft(startIndex + 1)
  }
}

function compareTwoTilesForButtonUp(startIndex) {
  // if boarder reached, return
  if ((startIndex > (width ** 2) - width - 1)) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex + width]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    if (tileA.innerHTML === tileB.innerHTML) {
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = score
      movement = true
      // ! test here before running
      // no ${} needed, because innerHTML is type string?
      // tileB.classList.remove(`${tileB.innerHTML}`)
      // tileA.classList.remove(`${tileA.innerHTML}`)
      // tileA.classList.add(`${Number(tileA.innerHTML) * 2}`)
      if (!(startIndex < width)) {
        compareTwoTilesForButtonUp(startIndex - width)
        return
      } else {
        compareTwoTilesForButtonUp(startIndex)
        return
      }
    } else {
      return compareTwoTilesForButtonUp(startIndex + width)
    }
    // case first is none, second is tile
  } else if (!tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // tileA gets value of tileB
    tileA.classList.add('number')
    tileA.style.backgroundColor = colors[Number(tileB.innerHTML)]
    tileA.innerHTML = `${tileB.innerHTML}`
    // tileB's value gets removed
    tileB.classList.remove('number')
    tileB.style.backgroundColor = ''
    tileB.innerHTML = ''
    movement = true
    // tileA.classList.add(`${tileB.innerHTML}`)
    // tileB.classList.remove(`${tileB.innerHTML}`)
    if (startIndex >= width) {
      return compareTwoTilesForButtonUp(startIndex - width)
    } else {
      return compareTwoTilesForButtonUp(startIndex + width)
    }
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    compareTwoTilesForButtonUp(startIndex + width)
  }
}
function compareTwoTilesForButtonDown(startIndex) {
  // if boarder reached, return
  if (startIndex < width) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex - width]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // case both tiles are the same
    if (tileA.innerHTML === tileB.innerHTML) {
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = score
      movement = true
      // ! test here before running
      // no ${} needed, because innerHTML is type string?
      // tileB.classList.remove(`${tileB.innerHTML}`)
      // tileA.classList.remove(`${tileA.innerHTML}`)
      // tileA.classList.add(`${Number(tileA.innerHTML) * 2}`)
      // as long as bottom row not reached go further down
      if (!(startIndex > (width ** 2) - width - 1)) {
        compareTwoTilesForButtonDown(startIndex + width)
        return
      } else {
        compareTwoTilesForButtonDown(startIndex)
        return
      }
    } else {
      return compareTwoTilesForButtonDown(startIndex - width)
    }
    // case first is none, second is tile
  } else if (!tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // tileA gets value of tileB
    tileA.classList.add('number')
    tileA.style.backgroundColor = colors[Number(tileB.innerHTML)]
    tileA.innerHTML = `${tileB.innerHTML}`
    // tileB's value gets removed
    tileB.classList.remove('number')
    tileB.style.backgroundColor = ''
    tileB.innerHTML = ''
    movement = true
    // tileA.classList.add(`${tileB.innerHTML}`)
    // tileB.classList.remove(`${tileB.innerHTML}`)

    // as long as bottom not reached, see if tile can move further down
    if (!(startIndex > (width ** 2) - width - 1)) {
      return compareTwoTilesForButtonDown(startIndex + width)
    } else {
      // if bottom reached (tile cannot be moved down further)
      return compareTwoTilesForButtonDown(startIndex - width)
    }
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    compareTwoTilesForButtonDown(startIndex - width)
  }
}
function compareTwoTilesForButtonRight(startIndex) {
  // if boarder reached, return
  if ((startIndex % width) === 0) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex - 1]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // case both tiles are the same
    if (tileA.innerHTML === tileB.innerHTML) {
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = score
      movement = true
      // ! test here before running
      // no ${} needed, because innerHTML is type string?
      // tileB.classList.remove(`${tileB.innerHTML}`)
      // tileA.classList.remove(`${tileA.innerHTML}`)
      // tileA.classList.add(`${Number(tileA.innerHTML) * 2}`)
      // as long as boarder not reached go further right
      if (!(startIndex % width === width - 1)) {
        compareTwoTilesForButtonRight(startIndex + 1)
        return
      } else {
        compareTwoTilesForButtonRight(startIndex)
        return
      }
    } else {
      return compareTwoTilesForButtonRight(startIndex - 1)
    }
    // case first is none, second is tile
  } else if (!tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // tileA gets value of tileB
    tileA.classList.add('number')
    tileA.style.backgroundColor = colors[Number(tileB.innerHTML)]
    tileA.innerHTML = `${tileB.innerHTML}`
    // tileB's value gets removed
    tileB.classList.remove('number')
    tileB.style.backgroundColor = ''
    tileB.innerHTML = ''
    movement = true
    // tileA.classList.add(`${tileB.innerHTML}`)
    // tileB.classList.remove(`${tileB.innerHTML}`)

    // as long as boarder not reached, see if tile can move further right
    if (!(startIndex % width === width - 1)) {
      return compareTwoTilesForButtonRight(startIndex + 1)
    } else {
      // if bottom reached (tile cannot be moved down further)
      return compareTwoTilesForButtonRight(startIndex - 1)
    }
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    compareTwoTilesForButtonRight(startIndex - 1)
  }
}
function compareTwoTilesForButtonLeft(startIndex) {
  // if boarder reached, return
  if ((startIndex % width) === width - 1) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex + 1]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // case both tiles are the same
    if (tileA.innerHTML === tileB.innerHTML) {
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = score
      movement = true
      // ! test here before running
      // no ${} needed, because innerHTML is type string?
      // tileB.classList.remove(`${tileB.innerHTML}`)
      // tileA.classList.remove(`${tileA.innerHTML}`)
      // tileA.classList.add(`${Number(tileA.innerHTML) * 2}`)
      // as long as boarder not reached go further left
      if (!(startIndex % width === 0)) {
        compareTwoTilesForButtonLeft(startIndex - 1)
        return
      } else {
        compareTwoTilesForButtonLeft(startIndex)
        return
      }
    } else {
      return compareTwoTilesForButtonLeft(startIndex + 1)
    }
    // case first is none, second is tile
  } else if (!tileA.classList.contains('number') && tileB.classList.contains('number')) {
    // tileA gets value of tileB
    tileA.classList.add('number')
    tileA.style.backgroundColor = colors[Number(tileB.innerHTML)]
    tileA.innerHTML = `${tileB.innerHTML}`
    // tileB's value gets removed
    tileB.classList.remove('number')
    tileB.style.backgroundColor = ''
    tileB.innerHTML = ''
    movement = true
    // tileA.classList.add(`${tileB.innerHTML}`)
    // tileB.classList.remove(`${tileB.innerHTML}`)

    // as long as boarder not reached, see if tile can move further left
    if (!(startIndex % width === 0)) {
      return compareTwoTilesForButtonLeft(startIndex - 1)
    } else {
      // if bottom reached (tile cannot be moved down further)
      return compareTwoTilesForButtonLeft(startIndex + 1)
    }
  } else {
    // case tileA number, tileB none & tileA none, tileB none
    compareTwoTilesForButtonLeft(startIndex + 1)
  }
}

function move(callback, startIndex, steps) {
  getFreeTileIndeces()
  if (arrayOfFreePos.length === 0) {
    if (!(seeIfThereArePossibilities())) {
      alert('Game Over!')
    }
  }
  // perform tile comparison for each row/column (width times)
  for (let index = 0; index < width; index++) {
    callback(startIndex)
    startIndex += steps
  }
  checkIf2048()
}

function addNewTileIfMovement() {
  if (movement) {
    getFreeTileIndeces()
    if (arrayOfFreePos.length !== 0) {
      addTileRandomly(2)
    }
    // reset movement
    movement = false
  } else {
    return
  }
}

startButton.addEventListener('click', (event) => {

  // ! Game Start: 
  // ! first: remove all existing (formerly forEach)
  // ! & create the grid of specified size
  buildGrid()
  // ! second: randomly add two tile2
  addTileRandomly(2)
  addTileRandomly(2)

  document.addEventListener('keydown', (event) => {
    keyChoice = event.key
    if (keyChoice === 'ArrowUp') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonUp, 0, 1)
      setTimeout(addNewTileIfMovement, 90)
    } else if (keyChoice === 'ArrowDown') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonDown, (width ** 2 - width), 1)
      setTimeout(addNewTileIfMovement, 90)
    } else if (keyChoice === 'ArrowRight') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonRight, (width - 1), width)
      setTimeout(addNewTileIfMovement, 90)
    } else if (keyChoice === 'ArrowLeft') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonLeft, 0, width)
      setTimeout(addNewTileIfMovement, 90)
    }
  })
  document.addEventListener('keyup', (event) => {
    keyChoice = event.key
    if (keyChoice === 'ArrowUp') {
      allowed = true
    } else if (keyChoice === 'ArrowDown') {
      allowed = true
    } else if (keyChoice === 'ArrowRight') {
      allowed = true
    } else if (keyChoice === 'ArrowLeft') {
      allowed = true
    }
  })
  document.addEventListener('focus', (event) => {
    keyChoice = event.key
    if (keyChoice === 'ArrowUp') {
      allowed = true
    } else if (keyChoice === 'ArrowDown') {
      allowed = true
    } else if (keyChoice === 'ArrowRight') {
      allowed = true
    } else if (keyChoice === 'ArrowLeft') {
      allowed = true
    }
  })
})