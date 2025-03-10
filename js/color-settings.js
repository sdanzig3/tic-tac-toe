// color-settings.js - Color Settings Module
console.log("Color settings loading");

// Default colors
let xColor = '#e74c3c'; // Default red
let oColor = '#3498db'; // Default blue
let xColorDark = '#ff6b6b';
let oColorDark = '#5dade2';

// Temporary color storage for the modal
let tempXColor = xColor;
let tempOColor = oColor;

// Set up color settings UI and listeners
export function setupColorSettings() {
    console.log("Setting up color settings");
    
    const colorSettingsBtn = document.getElementById('color-settings-btn');
    const closeColorsBtn = document.getElementById('close-colors');
    const saveColorsBtn = document.getElementById('save-colors-btn');
    
    // Load saved colors
    loadSavedColors();
    
    // Apply initial colors
    applyColors();
    
    // Set up event listeners
    if (colorSettingsBtn) {
        colorSettingsBtn.addEventListener('click', openColorModal);
    }
    
    if (closeColorsBtn) {
        closeColorsBtn.addEventListener('click', closeColorModal);
    }
    
    if (saveColorsBtn) {
        saveColorsBtn.addEventListener('click', saveColors);
    }
    
    // Set up color select listeners
    const xColorSelect = document.getElementById('x-color-select');
    const oColorSelect = document.getElementById('o-color-select');
    
    if (xColorSelect) {
        xColorSelect.addEventListener('change', updateXColorPreview);
    }
    
    if (oColorSelect) {
        oColorSelect.addEventListener('change', updateOColorPreview);
    }
}

// Open color settings modal
export function openColorModal() {
    console.log("Opening color modal");
    
    const colorModal = document.getElementById('color-modal');
    const xColorSelect = document.getElementById('x-color-select');
    const oColorSelect = document.getElementById('o-color-select');
    const xColorPreview = document.getElementById('x-color-preview');
    const oColorPreview = document.getElementById('o-color-preview');
    
    if (!colorModal) {
        console.error("Color modal not found");
        return;
    }
    
    // Set current values
    if (xColorSelect) xColorSelect.value = xColor;
    if (oColorSelect) oColorSelect.value = oColor;
    
    // Update preview colors
    if (xColorPreview) xColorPreview.style.backgroundColor = xColor;
    if (oColorPreview) oColorPreview.style.backgroundColor = oColor;
    
    // Set temporary colors
    tempXColor = xColor;
    tempOColor = oColor;
    
    // Show the modal
    colorModal.style.display = 'block';
}

// Close color settings modal
export function closeColorModal() {
    const colorModal = document.getElementById('color-modal');
    if (colorModal) {
        colorModal.style.display = 'none';
    }
}

// Update X color preview
function updateXColorPreview() {
    const xColorSelect = document.getElementById('x-color-select');
    const xColorPreview = document.getElementById('x-color-preview');
    
    if (xColorSelect && xColorPreview) {
        tempXColor = xColorSelect.value;
        xColorPreview.style.backgroundColor = tempXColor;
    }
}

// Update O color preview
function updateOColorPreview() {
    const oColorSelect = document.getElementById('o-color-select');
    const oColorPreview = document.getElementById('o-color-preview');
    
    if (oColorSelect && oColorPreview) {
        tempOColor = oColorSelect.value;
        oColorPreview.style.backgroundColor = tempOColor;
    }
}

// Save color choices
function saveColors() {
    console.log("Saving colors");
    
    // Update colors
    xColor = tempXColor;
    oColor = tempOColor;
    
    // Calculate darker versions for dark mode
    xColorDark = getLighterColor(xColor);
    oColorDark = getLighterColor(oColor);
    
    // Apply colors to CSS variables
    applyColors();
    
    // Save to localStorage
    localStorage.setItem('xColor', xColor);
    localStorage.setItem('xColorDark', xColorDark);
    localStorage.setItem('oColor', oColor);
    localStorage.setItem('oColorDark', oColorDark);
    
    // Close the modal
    closeColorModal();
}

// Apply colors to CSS variables
export function applyColors() {
    document.documentElement.style.setProperty('--x-color', xColor);
    document.documentElement.style.setProperty('--x-color-dark', xColorDark);
    document.documentElement.style.setProperty('--o-color', oColor);
    document.documentElement.style.setProperty('--o-color-dark', oColorDark);
}

// Create a lighter version of a color for dark mode
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

// Load saved colors
export function loadSavedColors() {
    console.log("Loading saved colors");
    
    const savedXColor = localStorage.getItem('xColor');
    const savedXColorDark = localStorage.getItem('xColorDark');
    const savedOColor = localStorage.getItem('oColor');
    const savedOColorDark = localStorage.getItem('oColorDark');
    
    if (savedXColor) {
        xColor = savedXColor;
        xColorDark = savedXColorDark || getLighterColor(savedXColor);
    }
    
    if (savedOColor) {
        oColor = savedOColor;
        oColorDark = savedOColorDark || getLighterColor(savedOColor);
    }
}

// Get player colors
export function getXColor() {
    return xColor;
}

export function getOColor() {
    return oColor;
}