### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# Project 1: Building a game in JavaScript

by [Jonas Bolduan](https://github.com/jonasbee)

## Overview

For my first project on the Software Engineering course at General Assembly London, I chose to build the game 2048. This was an individual project and we were given one week to apply what we had learnt in the first three weeks of the course in order to build a fully functioning game using HTML, CSS and JavaScript. 

[Take a look on GitHub Pages.](https://jonasbee.github.io/project-1/)

[Check out the GitHub Repo here.](https://github.com/jonasbee/project-1)

## Brief

The project brief:

- Render a game in the browser
- Use Javascript for DOM manipulation
- Design logic for winning & visually display when the player has won
- Include separate HTML / CSS / JavaScript files
- Deploy the game on github pages

### Game Specifications

2048 is a game where you join tiles by moving them left/right/up/down to get to 2048.

[Check out the original game here](https://play2048.co)

## Technologies Used

- HTML
- CSS
- JavaScript (ES6)
- Git and GitHub

## Approach

### Setting the foundations

screen options
- Start/Stop button
- Adjustable grid-size

creating the grid
- wipe out everything
- create grid based on width

adding tiles to start with
- randomly add tiles on free cells

### Functionality

#### Moving the tiles, merge equal ones

based on which arrow key is pressed, computer should compare the cells and if their value is equal merge them, if there is space for them to move, move them

```
function compareTwoTilesForButtonUp(startIndex)

function move(callback, startIndex, steps)

```

#### Check if player has won or is "Game Over"

the player has won when he got to 2048, so the computer needs to check after every move, whether a tile got to 2048

to be Game Over there needs to be no option left for the 

````
function seeIfThereArePossibilities()

````


#### Score board with localStorage

#### Pac-Man mode

when stuck, get Pac-Man to help you out

### Potential future features

### Lessons Learned