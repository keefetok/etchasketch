const DEFAULT_SIZE = 16;
let color = "black";
let click = true;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(color){
    currentColor = color;
}
const colorPicker = document.getElementById('colorPicker');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);

function setCurrentSize(newSize) {
    currentSize = newSize;
}

const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function changeSize(value){
    if (value >= 2 && value <=100){
        populateBoard(value);
    } else {
        console.log("too many squares");
    }
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

populateBoard(16);

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    resetBoard();
    setupGrid(currentSize);
}

function populateBoard(size){
    let board = document.querySelector(".board");
    let squares = board.querySelectorAll("div");
    squares.forEach((div) => div.remove());
    board.style.gridTemplateColumns = `repeat(${size} , 1fr)`;
    board.style.gridTemplateRows = `repeat(${size} , 1fr)`;

    let amount = size*size;
    for (let i = 0; i < amount; i++) { 
        let square = document.createElement('div');
        square.addEventListener('mouseover', colorSquare);
        square.style.backgroundColor = 'white';
        board.insertAdjacentElement("beforeend", square);
    }
}

function colorSquare() {
    if (click){
        if (color === 'random'){
            this.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        } else if (color === 'black') {
            this.style.backgroundColor = currentColor;
        } else {
            this.style.backgroundColor = color;
        }
    }

}

function changeColor(choice) {
    color = choice;
}

function resetBoard(){
    let board = document.querySelector(".board");
    let squares = board.querySelectorAll("div");
    squares.forEach((div) => div.style.backgroundColor = 'white');
}

document.querySelector('body').addEventListener('click', (e)=>{
    if(e.target.tagName != 'BUTTON'){
        click = !click;
        if(click){
            document.querySelector(".mode").textContent = 'Currently: Drawing!';
        } else {
            document.querySelector(".mode").textContent = 'Currently: Not Drawing!';
        }
    }
})





