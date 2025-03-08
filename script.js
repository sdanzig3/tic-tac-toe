document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    
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
    
    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    restartButton.addEventListener('click', restartGame);
});