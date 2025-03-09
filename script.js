document.addEventListener('DOMContentLoaded', () => {
    // Get all DOM elements
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const themeSwitch = document.getElementById('theme-switch');
    const colorSettingsBtn = document.getElementById('color-settings-btn');
    const colorModal = document.getElementById('color-modal');
    const closeModalBtn = document.querySelector('.close');
    const saveColorsBtn = document.getElementById('save-colors-btn');
    const xColorSelect = document.getElementById('x-color-select');
    const oColorSelect = document.getElementById('o-color-select');
    const xColorPreview = document.getElementById('x-color-preview');
    const oColorPreview = document.getElementById('o-color-preview');
    
    // Log elements for debugging
    console.log("Elements loaded:", {
        colorSettingsBtn,
        colorModal,
        closeModalBtn,
        saveColorsBtn,
        xColorSelect,
        oColorSelect
    });
    
    // Default colors
    let xColor = '#e74c3c';
    let oColor = '#3498db';
    let xColorDark = '#ff6b6b';
    let oColorDark = '#5dade2';
    
    // Temporary color storage for the modal
    let tempXColor = xColor;
    let tempOColor = oColor;
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
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
    
    // Cell click handler
    function handleCellClick(e) {
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
            status.textContent = `Player ${currentPlayer} wins!`;
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
            status.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }
        
        // Game continues - switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    // Restart game
    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        
        // Reset the board
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.style.backgroundColor = 'white';
        });
    }
    
    // Handle color selection for X player in the modal
    function updateXColorPreview() {
        const color = xColorSelect.value;
        tempXColor = color;
        xColorPreview.style.backgroundColor = color;
    }
    
    // Handle color selection for O player in the modal
    function updateOColorPreview() {
        const color = oColorSelect.value;
        tempOColor = color;
        oColorPreview.style.backgroundColor = color;
    }
    
    // Save the colors from the modal
    function saveColors() {
        console.log("Saving colors");
        // Set the colors
        xColor = tempXColor;
        oColor = tempOColor;
        
        // Calculate darker versions for dark mode
        xColorDark = getLighterColor(xColor);
        oColorDark = getLighterColor(oColor);
        
        // Apply the colors with CSS variables
        document.documentElement.style.setProperty('--x-color', xColor);
        document.documentElement.style.setProperty('--x-color-dark', xColorDark);
        document.documentElement.style.setProperty('--o-color', oColor);
        document.documentElement.style.setProperty('--o-color-dark', oColorDark);
        
        // Save preferences
        localStorage.setItem('xColor', xColor);
        localStorage.setItem('xColorDark', xColorDark);
        localStorage.setItem('oColor', oColor);
        localStorage.setItem('oColorDark', oColorDark);
        
        // Close the modal
        closeModal();
    }
    
    // Helper function to create a lighter version of a color for dark mode
    function getLighterColor(hexColor) {
        // Convert hex to RGB
        let r = parseInt(hexColor.slice(1, 3), 16);
        let g = parseInt(hexColor.slice(3, 5), 16);
        let b = parseInt(hexColor.slice(5, 7), 16);
        
        // Make it lighter
        r = Math.min(255, r + 40);
        g = Math.min(255, g + 40);
        b = Math.min(255, b + 40);
        
        // Convert back to hex
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    // Handle theme switching
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Load saved preferences
    function loadPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeSwitch) {
                themeSwitch.checked = true;
            }
        }
        
        // Load X color
        const savedXColor = localStorage.getItem('xColor');
        const savedXColorDark = localStorage.getItem('xColorDark');
        if (savedXColor) {
            xColor = savedXColor;
            xColorDark = savedXColorDark || getLighterColor(savedXColor);
            document.documentElement.style.setProperty('--x-color', xColor);
            document.documentElement.style.setProperty('--x-color-dark', xColorDark);
            
            // Set dropdown to saved value if element exists
            if (xColorSelect) {
                xColorSelect.value = xColor;
                if (xColorPreview) {
                    xColorPreview.style.backgroundColor = xColor;
                }
            }
        } else if (xColorPreview) {
            // Set default color preview
            xColorPreview.style.backgroundColor = xColor;
        }
        
        // Load O color
        const savedOColor = localStorage.getItem('oColor');
        const savedOColorDark = localStorage.getItem('oColorDark');
        if (savedOColor) {
            oColor = savedOColor;
            oColorDark = savedOColorDark || getLighterColor(savedOColor);
            document.documentElement.style.setProperty('--o-color', oColor);
            document.documentElement.style.setProperty('--o-color-dark', oColorDark);
            
            // Set dropdown to saved value if element exists
            if (oColorSelect) {
                oColorSelect.value = oColor;
                if (oColorPreview) {
                    oColorPreview.style.backgroundColor = oColor;
                }
            }
        } else if (oColorPreview) {
            // Set default color preview
            oColorPreview.style.backgroundColor = oColor;
        }
    }
    
    // Modal functions
    function openModal() {
        console.log("Opening modal");
        
        if (!colorModal) {
            console.error("Modal element not found!");
            return;
        }
        
        // Set the dropdowns to current values
        if (xColorSelect) xColorSelect.value = xColor;
        if (oColorSelect) oColorSelect.value = oColor;
        
        // Set the preview colors
        if (xColorPreview) xColorPreview.style.backgroundColor = xColor;
        if (oColorPreview) oColorPreview.style.backgroundColor = oColor;
        
        // Set temp values
        tempXColor = xColor;
        tempOColor = oColor;
        
        // Display the modal
        colorModal.style.display = 'block';
        
        console.log("Modal should be visible now");
    }
    
    function closeModal() {
        if (colorModal) {
            colorModal.style.display = 'none';
        }
    }
    
    // Close the modal if clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === colorModal) {
            closeModal();
        }
    });
    
    // Set up event listeners
    console.log("Setting up event listeners");
    
    // Game event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
    
    if (themeSwitch) {
        themeSwitch.addEventListener('change', toggleTheme);
    }
    
    // Modal event listeners
    if (colorSettingsBtn) {
        console.log("Adding click listener to settings button");
        colorSettingsBtn.addEventListener('click', function() {
            console.log("Settings button clicked");
            openModal();
        });
    } else {
        console.error("Color settings button not found!");
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    } else {
        console.error("Close modal button not found!");
    }
    
    if (saveColorsBtn) {
        saveColorsBtn.addEventListener('click', saveColors);
    } else {
        console.error("Save colors button not found!");
    }
    
    // Color selection event listeners
    if (xColorSelect) {
        xColorSelect.addEventListener('change', updateXColorPreview);
    }
    
    if (oColorSelect) {
        oColorSelect.addEventListener('change', updateOColorPreview);
    }
    
    // Apply default colors using CSS variables
    document.documentElement.style.setProperty('--x-color', xColor);
    document.documentElement.style.setProperty('--x-color-dark', xColorDark);
    document.documentElement.style.setProperty('--o-color', oColor);
    document.documentElement.style.setProperty('--o-color-dark', oColorDark);
    
    // Load saved preferences on initial page load
    loadPreferences();
});