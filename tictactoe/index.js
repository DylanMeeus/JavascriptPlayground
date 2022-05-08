// constants
const HEIGHT = 600;
const WIDTH = 600;
const BOARD_SIZE = 3; // X by X, e.g BOARD_SIZE = 3, tiles = 9 (3x3)

// game functions


var game = null; // Should try to avoid null here, this is a bit dirty


// render functions

class Game {

    constructor(tiles){
        this.tiles = tiles;
    }

    handleClick(e) {
        // determine location
        // place a circle / square
        const ctx = getContext();

        const clickedTile = this.tiles.filter(t => ctx.isPointInPath(t.shape, e.offsetX, e.offsetY))[0];
        ctx.fillStyle = "green";
        ctx.fill(clickedTile.shape);
    }

}


class GameShape {
    constructor(gameLocation, shape) {
        this.gameLocation = gameLocation;
        this.shape = shape;
    }
}

function start() {
    const canvas = document.querySelector('#canvas'); 

    let tiles = createField();
    game = new Game(tiles);

    canvas.addEventListener('click', (e) =>  game.handleClick(e) ); 
}

function getContext() {
    const canvas = document.querySelector('#canvas'); 
    const ctx = canvas.getContext("2d");
    return ctx;
}


function createField() {
    const ctx = getContext(); 

    let rectHeight = HEIGHT / BOARD_SIZE;
    let rectWidth = WIDTH / BOARD_SIZE;
    const tiles = []

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const path = new Path2D();
            path.rect(rectHeight * row, rectWidth * col, rectHeight, rectWidth);
            ctx.stroke(path);
            const g = new GameShape(row * col, path); // map 2d to 1d array
            tiles.push(g);
        }
    }

    return tiles;
}



