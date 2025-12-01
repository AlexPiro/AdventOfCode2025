import fs from "fs";

const NUMBER_OF_CLICK = 100;
const part1 = (input) => {
    let dialPosition = 50;

    let numberOfZero = 0;

    for (const i of input) {
        const side = i[0] === 'R' ? 1 : -1;
        let distance = parseInt(i.substring(1));

        dialPosition += distance * side;

        dialPosition = dialPosition % NUMBER_OF_CLICK;

        // console.log('Dial position ', dialPosition);

        if (dialPosition === 0) {
            numberOfZero++;
        }

    }

    return numberOfZero;

}

const part2 = (input) => {
    let dialPosition = 50;

    let numberOfZero = 0;

    for (const i of input) {
        const side = i[0] === 'R' ? 1 : -1;
        let distance = parseInt(i.substring(1));

        numberOfZero += Math.floor(distance / NUMBER_OF_CLICK);

        dialPosition += distance * side;

        dialPosition = dialPosition % NUMBER_OF_CLICK;

        const leftDistance = distance % NUMBER_OF_CLICK;
        const distanceToZero = side > 0 ? dialPosition : (NUMBER_OF_CLICK - dialPosition) % NUMBER_OF_CLICK;

        if (distanceToZero > 0 && distanceToZero < leftDistance) {
            numberOfZero++;
        }

        // console.log('Dial position ', dialPosition);

        if (dialPosition === 0) {
            numberOfZero++;
        }

    }

    return numberOfZero;

}


const exampleInput = fs.readFileSync('Day01/example.txt', 'utf-8').split('\n');

console.assert(part1(exampleInput) === 3, 'Part 1 assertion failed');
console.assert(part2(exampleInput) === 6, 'Part 2 assertion failed');

const puzzleInput = fs.readFileSync('Day01/puzzle.txt', 'utf-8').split('\n');

console.log('Part 1 solution ', part1(puzzleInput));
console.log('Part 2 solution ', part2(puzzleInput));