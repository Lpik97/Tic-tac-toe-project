const cells = document.querySelectorAll('.cell');
const form = document.querySelector('.names-form');
const restartBtn = document.querySelector('.restart-btn');
let gameStarted = false;
let gameEnded = false;

const playerFactory = (name) => {
    return name.toString();
};

const gameActions = (() => {
    function startGame (event) {
        event.preventDefault();
        gameStarted = true;
        form.style.display= 'none';
        let playerName = playerFactory(document.getElementById('player-name').value);
        let opponentName = playerFactory(document.getElementById('opponent-name').value);
        restartBtn.style.display='initial';
        return { playerName, opponentName };
    };
    function restartGame () {
        cells.forEach((cell) => {
            cell.innerHTML = '';
        });
        choices.totalChoices = [];
        restartBtn.style.display='none';
        form.style.display='initial';
    };
    return {startGame, restartGame };
})();

const choices = (() => {
    let totalChoices = [];
    return { totalChoices };
})();

const renderChoice = (() => {
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (gameStarted && cell.innerHTML === '' ) {
                choices.totalChoices.push('X');
                cell.innerHTML = choices.totalChoices[choices.totalChoices.length - 1].toString();
            };
            checkWinner();
            aiMove.moveRandomly();
        });
    });
})();