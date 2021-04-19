// ! constructor
const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const width = 4
const cells = []
let movement = false
let possibility = true
let arrayOfFreePos = []
let randomIndex = 0
let keyChoice = null
let tileA = null
let tileB = null

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
  '1028': 'seagreen',
  '2048': 'crimson',
}

// build grid
for (let index = 0; index < width ** 2; index++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  // show index in cells of grid
  div.innerHTML = index
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  cells.push(div)
}

// ! functions

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
    if (cell.classList.contains('2048')) {
      alert('Win')
    }
    return
  })
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

function compareTwoTilesForButtonUp(startIndex) {
  // if boarder reached, return
  if ((startIndex > (width ** 2) - width - 1)) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex + 4]
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
      movement = true
      // ! test here before running
      // no ${} needed, because innerHTML is type string?
      // tileB.classList.remove(`${tileB.innerHTML}`)
      // tileA.classList.remove(`${tileA.innerHTML}`)
      // tileA.classList.add(`${Number(tileA.innerHTML) * 2}`)
      if (!(startIndex < width)) {
        compareTwoTilesForButtonUp(startIndex - 4)
        return
      } else {
        compareTwoTilesForButtonUp(startIndex)
        return
      }
    } else {
      return compareTwoTilesForButtonUp(startIndex + 4)
    }
    // case first is none, second is tile
  } else if (!tileA.classList.contains('number') && tileB.classList.contains('number')) {
    console.dir(tileA)
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
      return compareTwoTilesForButtonUp(startIndex - 4)
    } else {
      return compareTwoTilesForButtonUp(startIndex + 4)
    }
  } else {
  // case tileA number, tileB none & tileA none, tileB none
    compareTwoTilesForButtonUp(startIndex + 4)
  }
}

function compareTwoTilesForButtonDown(startIndex) {
  // if boarder reached, return
  if (startIndex < width) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex - 4]
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
      movement = true
      // ! test here before running
      // no ${} needed, because innerHTML is type string?
      // tileB.classList.remove(`${tileB.innerHTML}`)
      // tileA.classList.remove(`${tileA.innerHTML}`)
      // tileA.classList.add(`${Number(tileA.innerHTML) * 2}`)
      // as long as bottom row not reached go further down
      if (!(startIndex > (width ** 2) - width - 1)) {
        compareTwoTilesForButtonDown(startIndex + 4)
        return
      } else {
        compareTwoTilesForButtonDown(startIndex)
        return
      }
    } else {
      return compareTwoTilesForButtonDown(startIndex - 4)
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
      return compareTwoTilesForButtonDown(startIndex + 4)
    } else {
    // if bottom reached (tile cannot be moved down further)
      return compareTwoTilesForButtonDown(startIndex - 4)
    }
  } else {
  // case tileA number, tileB none & tileA none, tileB none
    compareTwoTilesForButtonDown(startIndex - 4)
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

  if (!possibility) {
    alert('Game Over!')
  }
  // perform tile comparison for each column

  for (let index = 0; index < width; index++) {
    callback(startIndex)
    startIndex += steps
    console.log(index)
  }

  checkIf2048()

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

// ! wrap whole execution in below
startButton.addEventListener('click', (event) => {

  // ! Game Start: 
  // ! first: remove all existing (forEach)
  cells.forEach(cell => {
    cell.classList.remove('number')
    cell.style.backgroundColor = ''
    cell.innerHTML = ''
  })
  // ! second: randomly add two tile2
  addTileRandomly(2)
  addTileRandomly(2)

  document.addEventListener('keydown', (event) => {
    keyChoice = event.key
    if (keyChoice === 'ArrowUp') {
      move(compareTwoTilesForButtonUp, 0, 1)
    } else if (keyChoice === 'ArrowDown') {
      move(compareTwoTilesForButtonDown, (width ** 2 - width), 1)
    } else if (keyChoice === 'ArrowRight') {
      move(compareTwoTilesForButtonRight, (width - 1), 4)
    } else if (keyChoice === 'ArrowLeft') {
      move(compareTwoTilesForButtonLeft, 0, 4)
    }
  })
})

// function seeIfThereArePossibilities()
// for loop 4 times // for each key, change function (up, down, left, right)
// for loop 4 times // for each column/row
// arrayOfFunctions[index]
// return possibility 