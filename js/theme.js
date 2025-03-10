// theme.js - Theme Manager Module
console.log("Theme manager loading");

// Initialize theme manager
export function setupTheme() {
    console.log("Setting up theme");
    
    const themeSwitch = document.getElementById('theme-switch');
    
    // Load saved theme
    loadSavedTheme();
    
    // Set up event listener
    if (themeSwitch) {
        themeSwitch.addEventListener('change', toggleTheme);
    }
}

// Toggle between light and dark themes
export function toggleTheme() {
    console.log("Toggling theme");
    
    document.body.classList.toggle('dark-mode');
    
    // Update cell colors based on new theme
    updateCellColors();
    
    // Save theme preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Update cell background colors based on current theme
export function updateCellColors() {
    const cells = document.querySelectorAll('.cell');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    cells.forEach(cell => {
        // Only update empty cells or cells that aren't part of a winning line
        // (cells with inline background colors set are likely part of a winning line)
        const hasCustomBgColor = cell.style.backgroundColor === '#ffdddd' || 
                               cell.style.backgroundColor === '#ddddff';
                               
        if (!hasCustomBgColor) {
            cell.style.backgroundColor = isDarkMode ? '#444' : 'white';
        }
    });
}

// Load saved theme preference
export function loadSavedTheme() {
    console.log("Loading saved theme");
    
    const themeSwitch = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeSwitch) {
            themeSwitch.checked = true;
        }
        
        // Make sure cells have the right color for dark mode
        setTimeout(() => updateCellColors(), 0);
    }
}