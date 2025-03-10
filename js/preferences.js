// preferences.js - Preferences Management Module
import { getElement } from './ui-controller.js';
import { updateGameStatus, getCurrentPlayer, isGameActive } from './game-logic.js';
import { loadSavedColors } from './color-settings.js';
import { loadSavedNames, getPlayerName } from './player-names.js';

// Toggle dark/light theme
export function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Load all saved preferences
export function loadPreferences() {
    // Load theme preference
    loadTheme();
    
    // Load color preferences
    loadSavedColors();
    
    // Load player names
    loadSavedNames();
    
    // Update game status with player name
    if (isGameActive()) {
        const currentPlayer = getCurrentPlayer();
        const currentPlayerName = getPlayerName(currentPlayer);
        updateGameStatus(`${currentPlayerName}'s turn`);
    }
}

// Load theme preference
function loadTheme() {
    const themeSwitch = getElement('theme-switch');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeSwitch) {
            themeSwitch.checked = true;
        }
    }
}