// Core game mechanics for Tic-Tac-Toe
import { updateGameStatus } from './ui-controller.js';
import { getPlayerName } from './player-names.js';

// Game state variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Constants
const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
];

// Initialize the game
export function initializeGame() {
    const cells = document.querySelectorAll('.cell');
    
    // Add click listeners to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Set initial game status
    updateGameStatus(getPlayerName('X') + "'s turn");
}

// Handle player move
export function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));
    
    // Check if cell is already filled or game is not active
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Update game state and UI
    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    
    // Check for win or draw
    checkResult();
}

// Check if current player has won or game is a draw
function checkResult() {
    const cells = document.querySelectorAll('.cell');
    let roundWon = false;
    let winningLine = null;
    
    // Check each winning condition
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (
            gameState[a] !== '' &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }
    
    if (roundWon) {
        // Use player name instead of default "Player X/O"
        const winnerName = getPlayerName(currentPlayer);
        updateGameStatus(`${winnerName} wins!`);
        gameActive = false;
        
        // Highlight winning cells
        winningLine.forEach(index => {
            cells[index].style.backgroundColor = currentPlayer === 'X' ? '#ffdddd' : '#ddddff';
        });
        
        return;
    }
    
    // Check for draw
    const isDraw = !gameState.includes('');
    if (isDraw) {
        updateGameStatus('Game ended in a draw!');
        gameActive = false;
        return;
    }
    
    // Game continues - switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const currentPlayerName = getPlayerName(currentPlayer);
    updateGameStatus(`${currentPlayerName}'s turn`);
}

// Restart the game
export function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    const cells = document.querySelectorAll('.cell');
    
    // Reset the board
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = 'white';
    });
    
    // Update status with current player
    const currentPlayerName = getPlayerName('X');
    updateGameStatus(`${currentPlayerName}'s turn`);
}

// Expose game state for other modules
export function getCurrentPlayer() {
    return currentPlayer;
}

export function isGameActive() {
    return gameActive;
}