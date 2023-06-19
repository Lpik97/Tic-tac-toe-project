const cells = document.querySelectorAll('.cell');
const form = document.querySelector('.names-form');
const restartBtn = document.querySelector('.restart-btn');
let gameStarted = false;
let gameEnded = false;


const playerFactory = (name) => {
    return name.toString();
};