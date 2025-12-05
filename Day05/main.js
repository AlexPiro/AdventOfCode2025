import fs from "fs";

function part1(input) {
  const lines = input.trim().split("\n");
  let freshIngredients = 0;
  let rangeList = [];
  let ingredientRangeDone = false;
  for (const line of lines) {
    if (line === "") ingredientRangeDone = true;
    if (!ingredientRangeDone) {
      //ingredient range
      let [start, end] = line.split("-");
      rangeList.push([parseInt(start), parseInt(end)]);
    } else {
      //ingredient list
      for (const range of rangeList) {
        if (parseInt(line) >= range[0] && parseInt(line) <= range[1]) {
          freshIngredients++;
          break;
        }
      }
    }
  }

  return freshIngredients;
}

function part2(input) {
  const lines = input.trim().split("\n");
  let freshIngredients = 0;
  let rangeList = [];
  let ingredientRangeDone = false;
  for (const line of lines) {
    if (line === "") ingredientRangeDone = true;
    if (!ingredientRangeDone) {
      //ingredient range
      let [start, end] = line.split("-");
      rangeList.push([parseInt(start), parseInt(end)]);
    } else {
      //ingredient list
      break;
    }
  }
  
  //sort range by start
  rangeList.sort((a, b) => a[0] - b[0]);

  let merged = true;
  while(merged) {
    merged = false;
    for(let i=rangeList.length-1; i>0; i--) {
        const range = rangeList[i];
        if(range[0] <= rangeList[i-1][1]) {
            rangeList[i-1][0] = Math.min(rangeList[i-1][0], range[0]);
            rangeList[i-1][1] = Math.max(rangeList[i-1][1], range[1]);
            rangeList.splice(i, 1);
            merged = true;
        }
    }
  }

  for (const range of rangeList) {
    freshIngredients += parseInt(range[1]) - parseInt(range[0]) + 1;
  }

  return freshIngredients;
}

const exampleInput = fs.readFileSync("Day05/example.txt", "utf-8");

console.assert(part1(exampleInput) === 3, "Part 1 assertion failed");
console.assert(part2(exampleInput) === 14, "Part 2 assertion failed");

const puzzleInput = fs.readFileSync('Day05/puzzle.txt', 'utf-8');

console.log('Part 1 solution ', part1(puzzleInput));
console.log('Part 2 solution ', part2(puzzleInput));
