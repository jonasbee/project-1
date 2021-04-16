const grid = document.querySelector('.grid')
const width = 4
const cells = []

for (let index = 0; index < width ** 2; index++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  // show index in cells of grid
  div.innerHTML = index
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  cells.push(div)
}

// const startButton = document.querySelector(‘#start’)
// startButton.addEventListener(‘click’, => {
// <all code needed to run game>
// })

// function seeIfThereArePossibilities()
// for loop 4 times // for each key, change function (up, down, left, right)
// for loop 4 times // for each column/row
// arrayOfFunctions[index]
// return possibility 

// function checkIf2048()
// cells.forEach( (cell) => {
// if cell.classList.contains(‘#2048’) {
// alert(Win)} 
// })

// // create array with all indexes of free positions
// function getFreeTileIndexes()
// arrayOfFreePos = cells.filter( (cell) =>  {
// !(cell.classList.contains(‘number’))
// })

// function findSecondRandom(firstRandom) {
// secondRandom = random()*cells.length
// if (secondRandom === firstRandom) {
// findSecondRandom(firstRandom)
// return
// } else { return secondRandom }

// randomIndex = random()*cells.length
// cells[randomIndex].classList.add(‘number’)  number class should have value (for 2,4,8,16,32,64,128,256,512,1024,2048)
// cells[randomIndex].innerHTML = 2
// randomIndex2 = findSecondRandom(randomIndex)
// cells[randomIndex2].classList.add(‘number’)
// cells[randomIndex2].innerHTML = 2

// let movement = false
// let arrayOfFreePos = []

// document.addEventListener('keydown', (event) => {
// const key = event.key
// if (key === 'up’) {
// -------------- inside foor-loop
// for-loop (repeating width times)
//  Indexes 0,1,2,3
// compareTwoTilesForButtonUp(index)

// function compareTwoTilesForButtonUp(startIndex)

// check if border reached
// if ( !(startIndex > (width ** 2) – width - 1) )
// return

// if (index0 true && index+4 true)

// if (number.innerHTML of index+4 with index0 are same)
// put together: remove index4 number class and change index0 number class (id++, innerHTML*2)(innerHTML*2)  can be linked to number class? “class / HTML presets?“
// movement = true
// return compareTwoTiles(startIndex)
// else: return compareTwoTile(startIndex+=4) // (two different numbers), continue
// else if (index0 false && index+4 true)
// remove index+4 number class, save its value (valueNo), add to index0 number class with value valueNo
// movement = true
// if ( !(startIndex < width) )
// return compareTwoTile(startIndex-=4)
// else return compareTwoTile(startIndex+=4) 

// // ! code below can be reduced to
// // * else return compareTwoTile(startIndex+=4)

// // else if (index0 true && index+4 false)
// // return compareTwoTile(startIndex++)

// // else if (index0 false && index+4 false) 
// // return return compareTwoTile(startIndex++) 
// -------------- out of foor-loop

// checkIf2048()

// if (movement) // check if there was movement (class Adding / Removing) over all columns getFreeTileIndexes()
// if (arrayOfFreePos.length !== 0) // if arrayOfFreePos is not empty
// randomIndex = arrayOfFreePos[random()] // Randomly pick one of the index elements within arrayOfFreePos
// cells[randomIndex].classList.add(‘number’)
// cells[randomIndex].innerHTML = 2
// movement = false // reset movement
// else // no movement
// if (possibility === true)
// Return
// Else // possibility false
// Alert(gameover)
