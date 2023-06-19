const cells = document.querySelectorAll('.cell');
const form = document.querySelector('.names-form');
const restartBtn = document.querySelector('.restart-btn');

const gameStates = (() => {
    let gameStarted = false;
    let gameEnded = false;
    return { gameStarted, gameEnded };
})();

const playerFactory = (name) => {
    return name.toString();
};

const gameEvents = (() => {
    function startGame (event) {
        event.preventDefault();
        gameStates.gameStarted = true;
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
            if (gameStates.gameStarted && cell.innerHTML === '' ) {
                choices.totalChoices.push('X');
                cell.innerHTML = choices.totalChoices[choices.totalChoices.length - 1].toString();
            };
            gameFunctions.checkWinner();
            aiMove.moveRandomly();
        });
    });
})();

const gameFunctions = (() => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function checkWinner() {
        winningCombinations.some(combination => {
            const [a, b, c] = combination;
            const cellA = cells[a].innerHTML;
            const cellB = cells[b].innerHTML;
            const cellC = cells[c].innerHTML;

            if (choices.totalChoices.length < 9) {
                if (cellA === 'X' && cellB === 'X' && cellC === 'X') {
                    gameStates.gameEnded = true;
                    gameStates.gameStarted = false;
                    window.alert('Congrats, you win.');
                    return true;
                } else if (cellA === 'O' && cellB === 'O' && cellC === 'O') {
                    gameStates.gameEnded = true;
                    gameStates.gameStarted = false;
                    window.alert('The opponent wins, good luck next time.');
                    return true;
                };
            } else {
                gameStates.gameEnded = true;
                gameStates.gameStarted = false;
                window.alert('It\'s a tie.');
                return true;
            };
        });
    };
    return { checkWinner };
})();

const aiMove = (() => {
    function moveRandomly() {
        if (gameStates.gameStarted) {
            if (choices.totalChoices[choices.totalChoices.length - 1] === 'X') {
                const emptyCells = Array.from(cells).filter(cell => cell.innerHTML === '');
                if (emptyCells.length > 0) {
                    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    choices.totalChoices.push('O');
                    randomCell.innerHTML = choices.totalChoices[choices.totalChoices.length - 1].toString();
                    checkWinner();
                };
            };
        };
    };
    function moveIntelligently() {
        if (gameStates.gameStarted) {
            if (choices.totalChoices[choices.totalChoices.length - 1] === 'X') {
                const emptyCells = Array.from(cells).filter(cell => cell.innerHTML === '');
                if (emptyCells.length > 0) {
                    
                };
            };
        };
    };
    return { moveRandomly, moveIntelligently };
})();