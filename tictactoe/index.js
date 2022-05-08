// constants
const HEIGHT = 600;
const WIDTH = 600;

// game functions




// render functions
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
    // renders the lines

    const ctx = getContext(); 

    let rectHeight = HEIGHT / 3;
    let rectWidth = WIDTH / 3;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const path = new Path2D();
            path.rect(rectHeight * row, rectWidth * col, rectHeight, rectWidth);
            ctx.stroke(path);
        }
    }


}


function handleClick(e) {
    // determine location
    // place a circle / square
}


