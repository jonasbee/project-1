
### creating movement with variable width

### creating grid with variable width

for (let index = 0; index < width ** 2; index++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    div.style.width = `${100 / width}%`
    div.style.height = `${100 / width}%`
    cells.push(div)
  }

### border detection

#### button up
if ((startIndex > (width ** 2) - width - 1)) {
    return
}

#### button down
startIndex < width
if (!(startIndex > (width ** 2) - width - 1)) {
  compareTwoTilesForButtonDown(startIndex + width)
  return
  } else {
    compareTwoTilesForButtonDown(startIndex)
    return
}

#### button right
if ((startIndex % width) === 0) {
    return
}

#### button left
if ((startIndex % width) === width - 1) {
    return
}



## DO NOT THINK I NEED THIS

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