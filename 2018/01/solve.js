function solve(input, part) {
    var solver = part === 1 ? part1Solver : part2Solver;
    return solver(input)
}

function expected(part) {
    return part == 1 ? 543 : 621;
}

function part1Solver(input) {
    return input.map(Number).reduce((a, b) => a + b, 0);
}

function part2Solver(input) {
    let values = input.map(Number);
    let pastFrequencies = [];
    let currentFrequency = 0;
    let i = 0;
    while (true) {
        currentFrequency += values[i % values.length];

        if (pastFrequencies.includes(currentFrequency)) {
            return currentFrequency;
        }

        pastFrequencies.push(currentFrequency);
        i++;
    }
}

module.exports = {solve, expected};