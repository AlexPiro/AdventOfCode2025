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
        
        // brute force approach
        for(let i=start; i<=end; i++) {
            const str = i.toString();
            let search = str[0];
            for(let j=0; j<str.length; j++) {
                const re = new RegExp(String.raw`${search}`, "g");
                if(str.match(re).length > 1 && str.replace(re, "").length === 0) {
                    result += i;
                    break;
                }
                search += str[j+1];
            }
        }
    }

    return result;
}

const exampleInput = fs.readFileSync('Day02/example.txt', 'utf-8');

// console.assert(part1(exampleInput) === 1227775554, 'Part 1 assertion failed');
// console.assert(part2(exampleInput) === 4174379265, 'Part 2 assertion failed');

const puzzleInput = fs.readFileSync('Day02/puzzle.txt', 'utf-8');

// console.log('Part 1 solution ', part1(puzzleInput));
console.log('Part 2 solution ', part2(puzzleInput));