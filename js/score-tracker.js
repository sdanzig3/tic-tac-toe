// score-tracker.js - Score Tracking Module
import { getPlayerName } from './player-names.js';

console.log("Score tracker loading");

// Score state
let playerXScore = 0;
let playerOScore = 0;
let drawScore = 0;

// Initialize the score tracker
export function initializeScoreTracker() {
    console.log("Initializing score tracker");
    loadSavedScores();
    updateScoreDisplay();
    
    // NOTE: Reset button event listener is now handled in ui-controller.js
    // to prevent duplicate listeners and dialog issues
}

// Update the score display
export function updateScoreDisplay() {
    console.log("Updating score display");
    
    const xScoreValue = document.querySelector('#x-score .score-value');
    const drawScoreValue = document.querySelector('#draw-score .score-value');
    const oScoreValue = document.querySelector('#o-score .score-value');
    
    if (xScoreValue) xScoreValue.textContent = playerXScore;
    if (drawScoreValue) drawScoreValue.textContent = drawScore;
    if (oScoreValue) oScoreValue.textContent = playerOScore;
    
    console.log("Scores updated:", { playerXScore, drawScore, playerOScore });
}

// Update player names in score display
export function updatePlayerNames() {
    const xNameElement = document.querySelector('#x-score .player-name');
    const oNameElement = document.querySelector('#o-score .player-name');
    
    if (xNameElement) {
        xNameElement.textContent = getPlayerName('X');
    }
    
    if (oNameElement) {
        oNameElement.textContent = getPlayerName('O');
    }
}

// Increment score
export function incrementScore(winner) {
    console.log(`Incrementing score for: ${winner}`);
    
    if (winner === 'X') {
        playerXScore++;
    } else if (winner === 'O') {
        playerOScore++;
    } else if (winner === 'draw') {
        drawScore++;
    }
    
    updateScoreDisplay();
    saveScores();
}

// Reset scores
export function resetScores() {
    console.log("Resetting scores");
    
    // Clear scores
    playerXScore = 0;
    playerOScore = 0;
    drawScore = 0;
    
    // Update UI
    updateScoreDisplay();
    
    // Save to localStorage
    saveScores();
    
    // Visual confirmation that scores were reset
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        // Brief visual feedback
        scoreDisplay.style.transition = 'background-color 0.5s';
        scoreDisplay.style.backgroundColor = 'rgba(144, 238, 144, 0.3)';
        
        // Return to normal after a short delay
        setTimeout(() => {
            scoreDisplay.style.backgroundColor = '';
        }, 1000);
    }
}

// Save scores
function saveScores() {
    localStorage.setItem('playerXScore', playerXScore.toString());
    localStorage.setItem('playerOScore', playerOScore.toString());
    localStorage.setItem('drawScore', drawScore.toString());
}

// Load scores
export function loadSavedScores() {
    const savedXScore = localStorage.getItem('playerXScore');
    const savedOScore = localStorage.getItem('playerOScore');
    const savedDrawScore = localStorage.getItem('drawScore');
    
    if (savedXScore) playerXScore = parseInt(savedXScore);
    if (savedOScore) playerOScore = parseInt(savedOScore);
    if (savedDrawScore) drawScore = parseInt(savedDrawScore);
}