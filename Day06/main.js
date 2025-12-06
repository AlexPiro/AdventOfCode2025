import fs from "fs";

function part1(input) {
  let result = 0;
  const lines = input.trim().split("\n");
  const table = lines.map(l => l.trim().split(' ').filter(x => x !== ''));

  for(let i=0; i<table[0].length; i++) {
    const operator = table[table.length-1][i];
    let calc = parseInt(table[0][i]);
    for(let j=1; j<table.length -1; j++) {
      const value = parseInt(table[j][i]);
      switch(operator) {
        case '*':
          calc *= value;
          break;
        case '+':
          calc += value;
          break;
      }
    }
    
    result += calc;
  }

  return result;
}

function part2(input) {
  let result = 0;
  const lines = input.trim().split("\n");

  let numbers = [];
  for(let i=lines[0].length-1; i>=0; i--){
    let currentNumber = '';
    for(let j=0; j<lines.length-1; j++){
      currentNumber += lines[j][i];
    }

    if(currentNumber.trim() === '') continue;
    
    numbers.push(parseInt(currentNumber));

    const operator = lines[lines.length-1][i];
    if(operator && operator.trim() !== '') {
      let calc = 0;
      switch(operator.trim()) {
        case '*':
          calc = numbers.reduce((a, b)=> a * b, 1);
          break;
        case '+':
          calc = numbers.reduce((a, b)=> a + b, 0);
          break;
      }

      result += calc;
      numbers = [];
    }
    
  }  

  return result;
}

const exampleInput = fs.readFileSync("Day06/example.txt", "utf-8");

console.assert(part1(exampleInput) === 4277556, "Part 1 assertion failed");
console.assert(part2(exampleInput) === 3263827, "Part 2 assertion failed");

const puzzleInput = fs.readFileSync('Day06/puzzle.txt', 'utf-8');

console.log('Part 1 solution ', part1(puzzleInput));
console.log('Part 2 solution ', part2(puzzleInput));
