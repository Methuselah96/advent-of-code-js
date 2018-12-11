function solve(input, part) {
    var solver = part === 1 ? part1Solver : part2Solver;
    return solver(input)
}

function expected(part) {
    return part == 1 ? 124850 : 1097;
}

function part1Solver(input) {
    let cloth = getClothFor(input);
    return cloth.getOverlap();
}

function part2Solver(input) {
    let cloth = getClothFor(input);
    this.id = -1;

    input.forEach(claim => {
        let tokens = claim.match(/\d+/g);
        let id = Number(tokens[0]);
        let x = Number(tokens[1]);
        let y = Number(tokens[2]);
        let width = Number(tokens[3]);
        let height = Number(tokens[4]);

        if (cloth.isIntact(x, y, width, height)) {
            this.id = id;
        }
    });
    return this.id;
}

function getClothFor(input) {
    let cloth = new Array2D(1000, 1000);
    input.forEach(claim => {
        let tokens = claim.match(/\d+/g);
        let x = Number(tokens[1]);
        let y = Number(tokens[2]);
        let width = Number(tokens[3]);
        let height = Number(tokens[4]);

        cloth.claimArea(x, y, width, height);
    });
    return cloth;
}

function Array2D(x, y) {
    
    this.width = x;
    this.height = y;

    let inner = new Array(this.width * this.height).fill(0);

    this.getAt = (x, y) => {
        return inner[x + (this.width * y)];
    }

    this.setAt = (x, y, value) => {
        inner[x + (this.width * y)] = value;
    }

    this.claimArea = (startX, startY, width, height) => {
        let test = this.getAt(startX, startY);
        for (let y = startY; y < startY + height; y++) {
            for (let x = startX; x < startX + width; x++) {
                this.setAt(x, y, this.getAt(x, y) + 1);
            }
        }
    }
    
    this.getOverlap = () => {
        let overlap = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.getAt(x, y) > 1) {
                    overlap++;
                }
            }
        }
        return overlap;    
    }

    this.isIntact = (startX, startY, width, height) => {
        for (let y = startY; y < startY + height; y++) {
            for (let x = startX; x < startX + width; x++) {
                if (this.getAt(x, y) > 1){
                    return false;
                }
            }
        }
        return true;
    }
}

module.exports = {solve, expected};