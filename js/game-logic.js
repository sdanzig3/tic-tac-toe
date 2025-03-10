// game-logic.js - Game Logic Module
import { getPlayerName } from './player-names.js';
import { incrementScore } from './score-tracker.js';

console.log("Game logic loading");

// Game state variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning conditions
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
    console.log("Initializing game");
    
    // Add event listeners to cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Initialize game status text
    updateGameStatus(`${getPlayerName('X')}'s turn`);
}

// Handle player move
export function handleCellClick(e) {
    console.log("Cell clicked");
    
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
        // Get player name
        const winnerName = getPlayerName(currentPlayer);
        updateGameStatus(`${winnerName} wins!`);
        gameActive = false;
        
        console.log(`Game won by ${currentPlayer}, updating score...`);
        
        // Update score for winner
        incrementScore(currentPlayer);
        
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
        
        console.log('Game ended in draw, updating score...');
        
        // Update score for draw
        incrementScore('draw');
        
        return;
    }
    
    // Game continues - switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const currentPlayerName = getPlayerName(currentPlayer);
    updateGameStatus(`${currentPlayerName}'s turn`);
}

// Restart the game
export function restartGame() {
    console.log("Restarting game");
    
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    // Reset the board
    const cells = document.querySelectorAll('.cell');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        
        // Set appropriate background color based on current theme
        if (isDarkMode) {
            cell.style.backgroundColor = '#444'; // Dark mode cell color
        } else {
            cell.style.backgroundColor = 'white'; // Light mode cell color
        }
    });
    
    // Update game status
    const currentPlayerName = getPlayerName('X');
    updateGameStatus(`${currentPlayerName}'s turn`);
}

// Update game status text
export function updateGameStatus(message) {
    const status = document.getElementById('status');
    if (status) {
        status.textContent = message;
    }
}

// Getters for game state
export function getCurrentPlayer() {
    return currentPlayer;
}

export function isGameActive() {
    return gameActive;
}