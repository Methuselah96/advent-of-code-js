function solve(input, part) {
    var solver = part === 1 ? part1Solver : part2Solver;
    return solver(input)
}

function expected(part) {
    return part == 1 ? 8892 : "zihwtxagifpbsnwleydukjmqv";
}

function part1Solver(input) {
    let twoLetterCount = 0;
    let threeLetterCount = 0;
    input.forEach(function(id) {
        let duplicates = getDuplicates(id)
        let hasTwoOccurances = false;
        let hasThreeOccurances = false;
        
        duplicates.forEach(function(letter) {
            if (getOccurances(id, letter) === 3) {
                hasThreeOccurances = true;
            }
            else if (getOccurances(id, letter) === 2) {
                hasTwoOccurances = true;
            }
        });
        if (hasTwoOccurances) twoLetterCount++;
        if (hasThreeOccurances) threeLetterCount++;

    });
    return (twoLetterCount * threeLetterCount);
}

function part2Solver(input) {
    let commonString = "";
    input.forEach(function(id1) {
        input.forEach(function(id2) {
            if (getDifference(id1, id2) == 1) {
                commonString = getCommonString(id1, id2);
            }
       });
    });
    return commonString.length > 0 ? commonString : "no correct boxes found";
}

function getDuplicates(string) {
    let sorted = [...string].slice().sort();
    let duplicates = []
    for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i + 1] == sorted[i]) {
            duplicates.push(sorted[i]);
        }
    }
    return duplicates;
}

function getOccurances(string, letter) {
    return (string.match(new RegExp(letter, "g")) || []).length;
}

function getDifference(string1, string2) {
    if (string1 === string2) {
        return 0;
    }
    if (string1.length != string2.length) {
        return false;
    }
    let diffCount = 0;
    for (let i = 0; i < string1.length; i++) {
        if (string1.charAt(i) != string2.charAt(i)) {
            diffCount++;
        }
    }
    return diffCount;
}

function getCommonString(string1, string2) {
    commonString = ""
    for (let i = 0; i < string1.length; i++) {
        if (string1.charAt(i) == string2.charAt(i)) {
            commonString += string1.charAt(i);
        }
    }
    return commonString;
}

module.exports = {solve, expected};