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
  cells[randomIndex].style.backgroundColor = 'green'
  // cells[randomIndex].classList.add(`${tileNumber}`)
  cells[randomIndex].innerHTML = `${tileNumber}`
  console.dir(cells[randomIndex])
}

function compareTwoTilesForButtonUp(startIndex) {
  // if boarder reached, return
  if (!(startIndex > (width ** 2) - width - 1)) {
    return
  }
  tileA = cells[startIndex]
  tileB = cells[startIndex + 4]
  // case two number tiles
  if (tileA.classList.contains('number') && tileB.classList.contains('number')) {
    if (tileA.innerHTML === tileB.innerHTML) {
      tileB.classList.remove('number')
      // no ${} needed, because innerHTML is type string?
      // tileB.classList.remove(`${tileB.innerHTML}`)
      tileB.style.backgroundColor = 'white'
      tileB.innerHTML = ''
      // tileA.classList.remove(`${tileA.innerHTML}`)
      tileB.style.backgroundColor = 'white'

      // TODO test here before running

      tileA.classList.add(`${Number(tileA.innerHTML) * 2}`)
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      movement = true
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
    // tileA gets value of tileB
    tileA.classList.add('number')
    tileA.classList.add(`${tileB.innerHTML}`)
    tileA.innerHTML = `${tileB.innerHTML}`
    // tileB's value gets removed
    tileB.classList.remove('number')
    tileB.classList.remove(`${tileB.innerHTML}`)
    tileB.innerHTML = ''
    movement = true
    if (!startIndex < width) {
      return compareTwoTilesForButtonUp(startIndex - 4)
    } else {
      return compareTwoTilesForButtonUp(startIndex + 4)
    }
  }
  // case tileA number, tileB none & tileA none, tileB none
  else {
    compareTwoTilesForButtonUp(startIndex + 4)
  }
}

function moveUp() {
  if (!possibility) {
    alert('Game Over!')
  }
  // perform tile comparison for each column
  for (let index = 0; index < width.length; index++) {
    compareTwoTilesForButtonUp(index)
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

  // ! Game Start: randomly add two tile2
  addTileRandomly(2)
  addTileRandomly(2)

  document.addEventListener('keydown', (event) => {
    keyChoice = event.key
    if (keyChoice === 'ArrowUp') {
      moveUp()
    }
  })
})

// function seeIfThereArePossibilities()
// for loop 4 times // for each key, change function (up, down, left, right)
// for loop 4 times // for each column/row
// arrayOfFunctions[index]
// return possibility 