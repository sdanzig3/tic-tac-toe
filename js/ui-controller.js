// UI control and DOM manipulation
import { restartGame } from './game-logic.js';
import { toggleTheme } from './preferences.js';
import { openColorModal } from './color-settings.js';
import { openNamesModal } from './player-names.js';

// Set up all UI event listeners
export function setupUIListeners() {
    const restartButton = document.getElementById('restart');
    const themeSwitch = document.getElementById('theme-switch');
    const colorSettingsBtn = document.getElementById('color-settings-btn');
    const playerNamesBtn = document.getElementById('player-names-btn');
    
    // Game UI listeners
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
    
    if (themeSwitch) {
        themeSwitch.addEventListener('change', toggleTheme);
    }
    
    // Settings UI listeners
    if (colorSettingsBtn) {
        colorSettingsBtn.addEventListener('click', function() {
            console.log("Color settings button clicked");
            openColorModal();
        });
    }
    
    if (playerNamesBtn) {
        playerNamesBtn.addEventListener('click', function() {
            console.log("Player names button clicked");
            openNamesModal();
        });
    }
    
    // Setup modal close on outside click
    setupModalCloseEvents();
}

// Update the game status message
export function updateGameStatus(message) {
    const status = document.getElementById('status');
    if (status) {
        status.textContent = message;
    }
}

// Setup events to close modals when clicking outside
function setupModalCloseEvents() {
    const modals = document.querySelectorAll('.modal');
    
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Helper to get DOM elements
export function getElement(id) {
    return document.getElementById(id);
}