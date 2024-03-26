const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const gameContainer = document.getElementById('game-container');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const checkWin = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }

    if (!gameState.includes('')) return 'draw';
    return null;
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        if (winner === 'draw') {
            showModal("It's a draw!");
        } else {
            showModal({winner}+' won the game!');
        }
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const handleRestartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resultModal.style.display = 'none';
    gameContainer.classList.remove('game-over');
};

const handleNewGame = () => {
    handleRestartGame();
};

const showModal = (message) => {
    resultText.textContent = message;
    resultModal.style.display = 'block';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
newGameButton.addEventListener('click', handleNewGame);