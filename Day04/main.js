import fs from "fs";

function getAdjacentValues(grid, x, y) {
    // 0 1 2
    // 3 x 4
    // 5 6 7

    let adjacentsValues = new Array(8);
    if(y > 0) {
        adjacentsValues[1] = grid[y-1][x]; // 1

        if(x > 0) {
            adjacentsValues[3] = grid[y][x-1]; // 3
            adjacentsValues[0] = grid[y-1][x-1]; // 0

        }

        if(x < grid[y].length-1) {
            adjacentsValues[4] = grid[y][x+1]; // 4
            adjacentsValues[2] = grid[y-1][x+1]; // 2
        }
    } 

    if(y < grid.length-1) {
        adjacentsValues[6] = grid[y+1][x]; // 6

        if(x > 0) {
            adjacentsValues[3] = grid[y][x-1]; // 3
            adjacentsValues[5] = grid[y+1][x-1]; // 5

        }

        if(x < grid[y].length-1) {
            adjacentsValues[4] = grid[y][x+1]; // 4
            adjacentsValues[7] = grid[y+1][x+1]; // 7
        }
    }

    return adjacentsValues;
}

function findAndRemovePaperRolls(grid) {
    let newGrid = grid.map(x => x.slice());
    for(let i=0; i<grid.length; i++) {
        for(let j=0; j<grid[i].length; j++) {
            if(grid[i][j] === '@') {
                let values = getAdjacentValues(grid, j, i);
                if(values.filter(x => x === '@').length < 4) {
                    newGrid[i][j] = 'x';
                }
            }
        }
    }

    return newGrid;
}

function removeAllPaperRolls(grid, rollsRemoved) {
    let newGrid = grid.map(x => x.slice());
    for(let i=0; i<grid.length; i++) {
        for(let j=0; j<grid[i].length; j++) {
            if(grid[i][j] === '@') {
                let values = getAdjacentValues(grid, j, i);
                if(values.filter(x => x === '@').length < 4) {
                    newGrid[i][j] = 'x';
                }
            }
        }
    }

    let nbRolls = getNumberOfRemovedRolls(newGrid);
    if(nbRolls > 0) {
        rollsRemoved += nbRolls;
        const updatedGrid = newGrid.map(x => x.join('').replaceAll('x', '.').split(''));
        return removeAllPaperRolls(updatedGrid, rollsRemoved);
    }

    return rollsRemoved;
}

function getNumberOfRemovedRolls(grid) {
    return grid.reduce((a, b)=> a + b.filter(x => x === 'x').length, 0);
}

function part1(input){
    const grid = input.trim().split('\n').map(x => x.split(''));

    let newGrid = findAndRemovePaperRolls(grid);
    
    console.log(newGrid.map(x=> x.join('')).join('\n'));

    return getNumberOfRemovedRolls(newGrid);
}

function part2(input){
    const grid = input.trim().split('\n').map(x => x.split(''));

    return removeAllPaperRolls(grid, 0);
}


const exampleInput = fs.readFileSync('Day04/example.txt', 'utf-8');

console.assert(part1(exampleInput) === 13, 'Part 1 assertion failed');
console.assert(part2(exampleInput) === 43, 'Part 2 assertion failed');

const puzzleInput = fs.readFileSync('Day04/puzzle.txt', 'utf-8');

console.log('Part 1 solution ', part1(puzzleInput));
console.log('Part 2 solution ', part2(puzzleInput));
