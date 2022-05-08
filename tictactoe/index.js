// constants
const HEIGHT = 600;
const WIDTH = 600;
const BOARD_SIZE = 3; // X by X, e.g BOARD_SIZE = 3, tiles = 9 (3x3)

// game functions


var game = null; // Should try to avoid null here, this is a bit dirty


class Game {

    constructor(tiles){
        this.tiles = tiles;
        this.player = 0;
        this.gameField = new Map();

        this.tiles.forEach(t => this.gameField.set(t.gameLocation, -1));
    }

    handleClick(e) {
        const ctx = getContext();

        const clickedTile = this.tiles.filter(t => ctx.isPointInPath(t.shape, e.offsetX, e.offsetY))[0];
        this.addPlayer(clickedTile, this.player);
    }

    // add a player to a given tile
    addPlayer(tile, player) {
        const value = this.gameField.get(tile.gameLocation);

        const fieldTaken = value > -1;
        if (fieldTaken) {
            console.log("can't place a tile here you :(");
            return;
        }

        this.gameField.set(tile.gameLocation, player);

        const ctx = getContext()
        ctx.fillStyle = this.player == 0 ? "green" : "blue";
        ctx.fill(tile.shape);
        this.player = (this.player+1) % 2;
    }
}


// render functions
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
            const g = new GameShape(row + (col * BOARD_SIZE), path); // map 2d to 1d array
            tiles.push(g);
        }
    }

    return tiles;
}



