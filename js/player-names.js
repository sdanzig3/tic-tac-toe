// player-names.js - Player Names Module
import { updateGameStatus, getCurrentPlayer, isGameActive } from './game-logic.js';
import { updatePlayerNames as updateScorePlayerNames } from './score-tracker.js';

console.log("Player names loading");

// Default player names
let playerXName = 'Player X';
let playerOName = 'Player O';

// Set up player names UI and listeners
export function setupPlayerNames() {
    console.log("Setting up player names");
    
    const namesModal = document.getElementById('names-modal');
    const closeNamesBtn = document.getElementById('close-names');
    const saveNamesBtn = document.getElementById('save-names-btn');
    const playerXNameInput = document.getElementById('player-x-name');
    const playerONameInput = document.getElementById('player-o-name');
    const playerNamesBtn = document.getElementById('player-names-btn');
    
    // Load saved names
    loadSavedNames();
    
    // Set up event listeners
    if (closeNamesBtn) {
        closeNamesBtn.addEventListener('click', closeNamesModal);
    }
    
    if (saveNamesBtn) {
        saveNamesBtn.addEventListener('click', savePlayerNames);
    }
    
    if (playerNamesBtn) {
        playerNamesBtn.addEventListener('click', openNamesModal);
    }
}

// Open the player names modal
export function openNamesModal() {
    console.log("Opening player names modal");
    
    const namesModal = document.getElementById('names-modal');
    const playerXNameInput = document.getElementById('player-x-name');
    const playerONameInput = document.getElementById('player-o-name');
    
    if (!namesModal) {
        console.error("Names modal not found");
        return;
    }
    
    // Set input values (empty if default)
    if (playerXNameInput) playerXNameInput.value = playerXName === 'Player X' ? '' : playerXName;
    if (playerONameInput) playerONameInput.value = playerOName === 'Player O' ? '' : playerOName;
    
    // Show the modal
    namesModal.style.display = 'block';
}

// Close the player names modal
export function closeNamesModal() {
    const namesModal = document.getElementById('names-modal');
    if (namesModal) {
        namesModal.style.display = 'none';
    }
}

// Save player names
export function savePlayerNames() {
    console.log("Saving player names");
    
    const playerXNameInput = document.getElementById('player-x-name');
    const playerONameInput = document.getElementById('player-o-name');
    
    if (!playerXNameInput || !playerONameInput) {
        console.error("Player name inputs not found");
        return;
    }
    
    // Get input values with fallback to defaults
    playerXName = (playerXNameInput.value.trim() || 'Player X');
    playerOName = (playerONameInput.value.trim() || 'Player O');
    
    // Save to localStorage
    localStorage.setItem('playerXName', playerXName);
    localStorage.setItem('playerOName', playerOName);
    
    // Update game status if needed
    if (isGameActive()) {
        const currentPlayer = getCurrentPlayer();
        const currentPlayerName = getPlayerName(currentPlayer);
        updateGameStatus(`${currentPlayerName}'s turn`);
    }
    
    // Update score display names
    updateScorePlayerNames();
    
    // Close the modal
    closeNamesModal();
}

// Load saved player names
export function loadSavedNames() {
    console.log("Loading saved player names");
    
    const savedXName = localStorage.getItem('playerXName');
    const savedOName = localStorage.getItem('playerOName');
    
    if (savedXName) playerXName = savedXName;
    if (savedOName) playerOName = savedOName;
}

// Get player name by symbol
export function getPlayerName(symbol) {
    return symbol === 'X' ? playerXName : playerOName;
}