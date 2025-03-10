// main.js - Main Entry Point for the Tic-Tac-Toe Game
import { initializeGame } from './game-logic.js';
import { setupUIListeners } from './ui-controller.js';
import { loadPreferences } from './preferences.js';
import { setupColorSettings } from './color-settings.js';
import { setupPlayerNames } from './player-names.js';
import { initializeScoreTracker } from './score-tracker.js';
import { setupTheme } from './theme.js';

console.log("Main module initializing");

// When the DOM is loaded, initialize the game
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    
    // First set up the theme (prevent flash of wrong theme)
    setupTheme();
    
    // Load saved preferences (colors, names)
    loadPreferences();
    
    // Initialize the score tracker
    initializeScoreTracker();
    
    // Initialize the game state and board
    initializeGame();
    
    // Set up all UI event listeners - this must come after other initializations
    // to make sure we don't have duplicate event listeners
    setupUIListeners();
    
    // Set up color customization
    setupColorSettings();
    
    // Set up player names customization
    setupPlayerNames();
    
    console.log('Game initialization complete');
});