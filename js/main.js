// Main entry point for the Tic-Tac-Toe game
import { initializeGame, handleCellClick, restartGame } from './game-logic.js';
import { setupUIListeners } from './ui-controller.js';
import { loadPreferences } from './preferences.js';
import { setupColorSettings } from './color-settings.js';
import { setupPlayerNames } from './player-names.js';

// When the DOM is loaded, initialize the game
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Tic-Tac-Toe game...');
    
    // Initialize the game state and board
    initializeGame();
    
    // Set up all event listeners
    setupUIListeners();
    
    // Set up color customization
    setupColorSettings();
    
    // Set up player names customization
    setupPlayerNames();
    
    // Load saved preferences
    loadPreferences();
    
    console.log('Game initialization complete');
});