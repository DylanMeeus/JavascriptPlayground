// constants
const HEIGHT = 600;
const WIDTH = 600;
const BOARD_SIZE = 3; // X by X, e.g BOARD_SIZE = 3, tiles = 9 (3x3)


// vars
var tiles = [];

// game functions




// render functions


class GameShape {
    constructor(gameLocation, shape) {
        this.gameLocation = gameLocation;
        this.shape = shape;
    }
}

function render() {
    const canvas = document.querySelector('#canvas'); 
    canvas.addEventListener('click', handleClick); 

    renderField();
}

function getContext() {
    const canvas = document.querySelector('#canvas'); 
    const ctx = canvas.getContext("2d");
    return ctx;
}


function renderField() {
    const ctx = getContext(); 

    let rectHeight = HEIGHT / BOARD_SIZE;
    let rectWidth = WIDTH / BOARD_SIZE;

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const path = new Path2D();
            path.rect(rectHeight * row, rectWidth * col, rectHeight, rectWidth);
            ctx.stroke(path);
            const g = new GameShape(row * col, path); // map 2d to 1d array
            tiles.push(g);
        }
    }
}


function handleClick(e) {
    // determine location
    // place a circle / square
    const ctx = getContext();

    const clickedTile = tiles.filter(t => ctx.isPointInPath(t.shape, e.offsetX, e.offsetY))[0];
    console.log(clickedTile);
    ctx.fillStyle = "green";
    ctx.fill(clickedTile.shape);
}


