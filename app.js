// ! constructor
const grid = document.querySelector('.grid')
const gridCells = document.querySelectorAll('.grid div')
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const scoreScreen = document.querySelector('#score-screen')
const bestScreen = document.querySelector('#best-screen')
const gridSize = document.querySelector('#grid-size')
const pacButton = document.querySelector('#pacman-mode')
const pacLivesLeft = document.querySelector('#lives')
const lives = ['life1', 'life2', 'life3']
const headline = document.querySelector('#headline')
// const testButton = document.querySelector('#test')
let lifeToReduce = null
let pacmanIntervalID = null
let pacIndex = 0
let pacmanLives = 3
let pacman = null
let pacmanEye = null
let pacmanMouth = null
let pacmanActive = false
let intitalDelete = false
let cells = []
let width = 0
let movement = false
let possibility = true
let arrayOfFreePos = []
let arrayOfNonFreePos = []
let randomIndex = 0
let keyChoice = null
let tileA = null
let tileB = null
let score = 0
let best = 0
let allowed = true
let gameStopped = true
// * let combined = false
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
  if (width > 20) {
    alert('Practice self-control, choose a number between 4 and 20')
    return
  } else if (width < 4) {
    alert('Be more generous, chose a number between 4 and 20')
    return
  }
  switch (true) {
    case width > 4 && width <= 6: grid.style.fontSize = '45px'; break
    case width > 6 && width <= 8: grid.style.fontSize = '28px'; break
    case width > 8 && width <= 10: grid.style.fontSize = '20px'; break
    case width > 10 && width <= 20: grid.style.fontSize = '8px'; break
    default: break
  }
  // grid.style.fontSize = '60px'
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

function checkIf2048() {
  cells.forEach((cell) => {
    if (cell.innerHTML === '2048') {
      alert('Win')
      location.reload()
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

// create array with all indexes of free positions
function getFreeTileIndeces() {
  arrayOfFreePos = []
  cells.forEach((cell, index) => {
    if (!cell.classList.contains('number')) {
      arrayOfFreePos.push(index)
    }
  })
}

function getTileIndeces() {
  arrayOfNonFreePos = []
  cells.forEach((cell, index) => {
    if (cell.classList.contains('number')) {
      arrayOfNonFreePos.push(index)
    }
  })
}

function getRandomIndexFromTileCells() {
  getTileIndeces()
  randomIndex = Math.floor(Math.random() * arrayOfNonFreePos.length)
  return arrayOfNonFreePos[randomIndex]
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

function doAnimation(object) {
  object.classList.remove('zoom-in')
  object.classList.add('zoom-in')
  setTimeout(() => { object.classList.remove('zoom-in') }, 300)
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
    if ((tileA.innerHTML === tileB.innerHTML) && !(tileA.classList.contains('combined')) && !(tileB.classList.contains('combined'))) {
      // * (!combined)
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      tileA.classList.add('combined')
      // ! animation
      doAnimation(tileA)
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = ` ${score}`
      updateBest()
      movement = true
      // * combined = true
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
    if ((tileA.innerHTML === tileB.innerHTML) && !(tileA.classList.contains('combined')) && !(tileB.classList.contains('combined'))) {
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      tileA.classList.add('combined')
      doAnimation(tileA)
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = ` ${score}`
      updateBest()
      movement = true
      // * combined = true
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
    if ((tileA.innerHTML === tileB.innerHTML) && !(tileA.classList.contains('combined')) && !(tileB.classList.contains('combined'))) {
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      tileA.classList.add('combined')
      doAnimation(tileA)
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = ` ${score}`
      updateBest()
      movement = true
      // * combined = true
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
    if ((tileA.innerHTML === tileB.innerHTML) && !(tileA.classList.contains('combined')) && !(tileB.classList.contains('combined'))) {
      // remove tileB
      tileB.classList.remove('number')
      tileB.style.backgroundColor = ''
      tileB.innerHTML = ''
      // change tileA
      tileA.style.backgroundColor = colors[Number(tileA.innerHTML) * 2]
      tileA.innerHTML = `${Number(tileA.innerHTML) * 2}`
      tileA.classList.add('combined')
      doAnimation(tileA)
      score += Number(tileA.innerHTML)
      scoreScreen.innerHTML = ` ${score}`
      updateBest()
      movement = true
      // * combined = true
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
      // ! activate pacman should pulse & be able to be clicked
      // ! maybe also turned black from gray
      // ! check if pacman lives left
      if (pacmanLives > 0) {
        // ! activate pacman button visually
        pacButton.style.backgroundColor = 'black'
        pacButton.style.borderColor = 'black'
        pacLivesLeft.style.backgroundColor = 'black'
        pacLivesLeft.style.borderColor = 'black'
        doAnimation(pacButton)
        // ! activate pacman button logically
        pacmanActive = true
      } else {
        alert('Game Over! You lost all pacman lives')
        location.reload()
      }
    }
  }
  // perform tile comparison for each row/column (width times)
  for (let index = 0; index < width; index++) {
    // * combined = false
    callback(startIndex)
    startIndex += steps
  }
  checkIf2048()
}

function clearCombinedClass() {
  cells.forEach((cell) => {
    cell.classList.remove('combined')
  })
}

function addNewTileIfMovement() {
  if (movement) {
    getFreeTileIndeces()
    if (arrayOfFreePos.length !== 0) {
      for (let index = 0; index < (Math.floor(width / 2)) - 1; index++) {
        addTileRandomly(2)
      }
    }
    // reset movement
    movement = false
  } else {
    return
  }
}

function updateBest() {
  if (best < score) {
    best = score
    if (localStorage) {
      localStorage.setItem('playersBest', best)
    }
    bestScreen.innerHTML = ` ${best}`
  } else {
    return
  }
}

function createPacMan(currentCell) {
  pacman = document.createElement('div')
  currentCell.appendChild(pacman)
  pacman.setAttribute('id', 'pacman')
  pacmanEye = document.createElement('div')
  pacman.appendChild(pacmanEye)
  pacmanEye.setAttribute('id', 'pacman__eye')
  pacmanMouth = document.createElement('div')
  pacman.appendChild(pacmanMouth)
  pacmanMouth.setAttribute('id', 'pacman__mouth')
}

function deletePacMan() {
  while (pacman.firstChild) {
    pacman.removeChild(pacman.lastChild)
  }
  pacman.parentNode.removeChild(pacman)
}

// function testLimits() {
//   for (let index = 0; index < Math.floor(width / 2); index++) {
//     addTileRandomly(2 + index)
//   }
// }

// ! get playersBest from localStorage
if (localStorage) {
  best = localStorage.getItem('playersBest') ?? 0
  bestScreen.innerHTML = ` ${best}`
}

startButton.addEventListener('click', () => {
  // ! Game Start:
  // ! check if game was stopped
  if (!gameStopped) {
    alert('Please Stop Game first')
    return
  } else {
    gameStopped = false
  }
  // ! set all game values to default 
  movement = false
  possibility = true
  arrayOfFreePos = []
  randomIndex = 0
  keyChoice = null
  tileA = null
  tileB = null
  score = 0
  allowed = true
  pacmanLives = 3
  // * combined = false
  // ! remove all existing & create new grid of specified size
  buildGrid()
  // ! randomly add two tile2
  for (let index = 0; index < Math.floor(width / 2); index++) {
    addTileRandomly(2)
  }
  // ! activate eventListener to arrows
  document.addEventListener('keydown', (event) => {
    keyChoice = event.key
    if (keyChoice === 'ArrowUp') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonUp, 0, 1)
      clearCombinedClass()
      setTimeout(addNewTileIfMovement, 90)
    } else if (keyChoice === 'ArrowDown') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonDown, (width ** 2 - width), 1)
      clearCombinedClass()
      setTimeout(addNewTileIfMovement, 90)
    } else if (keyChoice === 'ArrowRight') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonRight, (width - 1), width)
      clearCombinedClass()
      setTimeout(addNewTileIfMovement, 90)
    } else if (keyChoice === 'ArrowLeft') {
      if (event.repeat != undefined) {
        allowed = !event.repeat
      }
      if (!allowed) return
      allowed = false
      move(compareTwoTilesForButtonLeft, 0, width)
      clearCombinedClass()
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

stopButton.addEventListener('click', () => {
  location.reload()
  gameStopped = true
})

// testButton.addEventListener('click', () => {
//   testLimits()
// })

pacButton.addEventListener('click', () => {

  // headline.classList.add('pac-man')
  // ! check if pacman active
  if (!pacmanActive) {
    return
  }
  if (pacmanIntervalID) {
    return
  }
  intitalDelete = false
  // randomly add 2 strawberries on tiles
  for (let index = 0; index < (width / 2); index++) {
    randomIndex = getRandomIndexFromTileCells()
    cells[randomIndex].classList.add('pac-strawberry')
    cells[0].classList.add('pac-strawberry')
  }

  // if (pacmanIntervalID) {
  //   return
  // }
  // pacIndex = 0
  // cells[pacIndex].classList.add('pac-man')
  // pacmanIntervalID = setInterval( () => {
  //   cells[pacIndex].classList.remove('pac-man')
  //   if (pacIndex === cells.length - 1) {
  //     clearInterval(pacmanIntervalID)
  //     pacmanIntervalID = null
  //   } else {
  //     pacIndex++
  //     cells[pacIndex].classList.add('pac-man')
  //     if (cells[pacIndex].classList.contains('pac-strawberry')) {
  //       cells[pacIndex].classList.remove('pac-strawberry')
  //       cells[pacIndex].classList.remove('number')
  //       cells[pacIndex].style.backgroundColor = ''
  //       cells[pacIndex].innerHTML = ''
  //     }
  //   }
  // },250)
  pacIndex = 0
  createPacMan(cells[pacIndex])
  if (cells[pacIndex].classList.contains('pac-strawberry')) {
    setTimeout(() => {
      cells[pacIndex].classList.remove('pac-strawberry')
      cells[pacIndex].classList.remove('number')
      cells[pacIndex].style.backgroundColor = ''
      cells[pacIndex].innerHTML = ''
      intitalDelete = true
    },100)
  }
  pacmanIntervalID = setInterval(() => {
    if (!intitalDelete) {
      deletePacMan()
    } else {
      intitalDelete = false
    }
    if (pacIndex === cells.length - 1) {
      clearInterval(pacmanIntervalID)
      pacmanIntervalID = null
      pacButton.style.backgroundColor = 'darkgray'
      pacButton.style.borderColor = 'darkgray'
      pacLivesLeft.style.backgroundColor = 'darkgray'
      pacLivesLeft.style.borderColor = 'darkgray'
      // headline.classList.remove('pac-man')
      lifeToReduce = document.querySelector(`#${lives[pacmanLives - 1]}`)
      lifeToReduce.remove()
      pacmanLives--
    } else {
      pacIndex++
      if (cells[pacIndex].classList.contains('pac-strawberry')) {
        cells[pacIndex].classList.remove('pac-strawberry')
        cells[pacIndex].classList.remove('number')
        cells[pacIndex].style.backgroundColor = ''
        cells[pacIndex].innerHTML = ''
      }
      createPacMan(cells[pacIndex])
    }
  }, 300)
  return
})