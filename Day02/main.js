import fs from "fs";

function part1(input) {
    let result = 0;
    const rangeIDs = input.split(',');

    for(const range of rangeIDs) {
        const [start, end] = range.split('-').map(Number);
        
        for(let i=start; i<=end; i++) {
            const str = i.toString();
            if(str.length % 2 !== 0) continue;
            const left = str.substring(0, str.length/2);
            const right = str.substring(str.length/2);
            if(left === right) {
                result += i;
            }
        }
    }

    return result;
}



function part2(input) {
    let result = 0;
    const rangeIDs = input.split(',');

    for(const range of rangeIDs) {
        const [start, end] = range.split('-').map(Number);
        
        for(let i=start; i<=end; i++) {
            const str = i.toString();
            if(str.length % 2 !== 0) continue;

            const firstChar = str[0];

            const parts = str.split(firstChar);

            if( (str.length === 2 && str[0] === str[1]) || parts.every(val => val === parts[0])) {
                result += i;
            }
            // let currentText = str.slice();
            // for(let j=0; j<str.length; j++) {
            //     currentText = currentText.substring(1);
            //     if(currentText.includes(str[j])) {
            //         currentText = currentText.replace(str[j], '');
            //         if(currentText.length === 0) {
            //             console.log(i);
            //             result += i;
            //         }
            //     } else {
            //         break;
            //     }
            // }
        }
    }

    return result;
}

const exampleInput = fs.readFileSync('Day02/example.txt', 'utf-8');

console.assert(part1(exampleInput) === 1227775554, 'Part 1 assertion failed');
console.assert(part2(exampleInput) === 4174379265, 'Part 2 assertion failed');

const puzzleInput = fs.readFileSync('Day02/puzzle.txt', 'utf-8');

console.log('Part 1 solution ', part1(puzzleInput));
console.log('Part 2 solution ', part2(puzzleInput));