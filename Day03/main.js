import fs from "fs";

function part1(input){
    let result = 0;
    const lines = input.trim().split('\n');
    
    for(const line of lines) {
        let maxNumber = 0;
        for(let i=0; i<line.length-1; i++) {
            for(let j=i+1; j<line.length; j++) {
                let newNumber = parseInt(line[i]+line[j]);
                maxNumber = Math.max(maxNumber, newNumber);
            }

            //avoid useless search if we already have the max
            if(line[i] == 9) break;
        }

        result += maxNumber;
    }

    return result;
}

function part2(input){
    let result = 0;
    const lines = input.trim().split('\n');
    
    for(const line of lines) {
        let maxNumber = 0;
        for(let i=0; i<line.length-11; i++) {
            if(line[i] < maxNumber.toString()[0]) continue;

            let selectedNumbers = [line[i]];
            let j=i+1;
            if(line[j] == 9) {
                selectedNumbers.push(line[j]);
                j++;
            };
            while(selectedNumbers.length < 12) {
                const remainingDigits = 12-selectedNumbers.length;
                let foundBigger = false;
                for(let k=j; k<=line.length-remainingDigits; k++) {
                    if(line[k] > line[j]) {
                        j=k;
                        foundBigger = true;
                        break;
                    }
                }
                if(!foundBigger) {
                    selectedNumbers.push(line[j]);
                    j++;
                }

            }

            // console.log(selectedNumbers.join(''))
   
            let newNumber = parseInt(selectedNumbers.join(''));
            maxNumber = Math.max(maxNumber, newNumber);

            //avoid useless search if we already have the max
            if(line[i] == 9) break;
        }

        result += maxNumber;
    }

    return result;
}




const exampleInput = fs.readFileSync('Day03/example.txt', 'utf-8');

console.assert(part1(exampleInput) === 357, 'Part 1 assertion failed');
console.assert(part2(exampleInput) === 3121910778619, 'Part 2 assertion failed');

const puzzleInput = fs.readFileSync('Day03/puzzle.txt', 'utf-8');

console.log('Part 1 solution ', part1(puzzleInput));
console.log('Part 2 solution ', part2(puzzleInput));