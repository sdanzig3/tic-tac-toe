// Player names customization functionality
import { getElement, updateGameStatus } from './ui-controller.js';
import { getCurrentPlayer, isGameActive } from './game-logic.js';

// Default player names
let playerXName = 'Player X';
let playerOName = 'Player O';

// Temporary name storage for the modal
let tempPlayerXName = playerXName;
let tempPlayerOName = playerOName;

// Set up player names UI and listeners
export function setupPlayerNames() {
    const namesModal = getElement('names-modal');
    const closeNamesBtn = getElement('close-names');
    const saveNamesBtn = getElement('save-names-btn');
    const playerXNameInput = getElement('player-x-name');
    const playerONameInput = getElement('player-o-name');
    
    // Set up event listeners
    if (closeNamesBtn) {
        closeNamesBtn.addEventListener('click', closeNamesModal);
    }
    
    if (saveNamesBtn) {
        saveNamesBtn.addEventListener('click', savePlayerNames);
    }
    
    if (playerXNameInput) {
        playerXNameInput.addEventListener('input', updatePlayerXName);
    }
    
    if (playerONameInput) {
        playerONameInput.addEventListener('input', updatePlayerOName);
    }
}

// Open the player names modal
export function openNamesModal() {
    const namesModal = getElement('names-modal');
    const playerXNameInput = getElement('player-x-name');
    const playerONameInput = getElement('player-o-name');
    
    if (!namesModal) {
        console.error("Names modal element not found!");
        return;
    }
    
    // Set the inputs to current values (empty if default)
    if (playerXNameInput) playerXNameInput.value = playerXName === 'Player X' ? '' : playerXName;
    if (playerONameInput) playerONameInput.value = playerOName === 'Player O' ? '' : playerOName;
    
    // Set temp values
    tempPlayerXName = playerXName;
    tempPlayerOName = playerOName;
    
    // Display the modal
    namesModal.style.display = 'block';
}

// Close the player names modal
export function closeNamesModal() {
    const namesModal = getElement('names-modal');
    if (namesModal) {
        namesModal.style.display = 'none';
    }
}

// Update X player name (temporary)
function updatePlayerXName() {
    const playerXNameInput = getElement('player-x-name');
    if (playerXNameInput) {
        tempPlayerXName = playerXNameInput.value.trim() || 'Player X';
    }
}

// Update O player name (temporary)
function updatePlayerOName() {
    const playerONameInput = getElement('player-o-name');
    if (playerONameInput) {
        tempPlayerOName = playerONameInput.value.trim() || 'Player O';
    }
}

// Save the player name selections
function savePlayerNames() {
    // Set the names
    playerXName = tempPlayerXName;
    playerOName = tempPlayerOName;
    
    // Update the game status with current player
    if (isGameActive()) {
        const currentPlayerSymbol = getCurrentPlayer();
        const currentPlayerName = currentPlayerSymbol === 'X' ? playerXName : playerOName;
        updateGameStatus(`${currentPlayerName}'s turn`);
    }
    
    // Save to localStorage
    localStorage.setItem('playerXName', playerXName);
    localStorage.setItem('playerOName', playerOName);
    
    // Close the modal
    closeNamesModal();
}

// Get the name of a specific player by symbol
export function getPlayerName(symbol) {
    return symbol === 'X' ? playerXName : playerOName;
}

// Load saved player names
export function loadSavedNames() {
    const savedPlayerXName = localStorage.getItem('playerXName');
    const savedPlayerOName = localStorage.getItem('playerOName');
    
    if (savedPlayerXName) {
        playerXName = savedPlayerXName;
    }
    
    if (savedPlayerOName) {
        playerOName = savedPlayerOName;
    }
}