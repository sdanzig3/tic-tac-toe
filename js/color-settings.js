// Player color customization functionality
import { getElement } from './ui-controller.js';

// Default colors
let xColor = '#e74c3c';
let oColor = '#3498db';
let xColorDark = '#ff6b6b';
let oColorDark = '#5dade2';

// Temporary color storage for the modal
let tempXColor = xColor;
let tempOColor = oColor;

// Set up color settings UI and listeners
export function setupColorSettings() {
    const colorModal = getElement('color-modal');
    const closeColorsBtn = getElement('close-colors');
    const saveColorsBtn = getElement('save-colors-btn');
    const xColorSelect = getElement('x-color-select');
    const oColorSelect = getElement('o-color-select');
    
    // Initialize color previews
    updateColorPreviews();
    
    // Set up event listeners
    if (closeColorsBtn) {
        closeColorsBtn.addEventListener('click', closeColorModal);
    }
    
    if (saveColorsBtn) {
        saveColorsBtn.addEventListener('click', saveColors);
    }
    
    if (xColorSelect) {
        xColorSelect.addEventListener('change', updateXColorPreview);
    }
    
    if (oColorSelect) {
        oColorSelect.addEventListener('change', updateOColorPreview);
    }
    
    // Apply default colors using CSS variables
    applyColors();
}

// Open the color settings modal
export function openColorModal() {
    const colorModal = getElement('color-modal');
    const xColorSelect = getElement('x-color-select');
    const oColorSelect = getElement('o-color-select');
    
    if (!colorModal) {
        console.error("Color modal element not found!");
        return;
    }
    
    // Set the dropdowns to current values
    if (xColorSelect) xColorSelect.value = xColor;
    if (oColorSelect) oColorSelect.value = oColor;
    
    // Update previews
    updateColorPreviews();
    
    // Set temp values
    tempXColor = xColor;
    tempOColor = oColor;
    
    // Display the modal
    colorModal.style.display = 'block';
}

// Close the color settings modal
export function closeColorModal() {
    const colorModal = getElement('color-modal');
    if (colorModal) {
        colorModal.style.display = 'none';
    }
}

// Update X player color preview
function updateXColorPreview() {
    const xColorSelect = getElement('x-color-select');
    const xColorPreview = getElement('x-color-preview');
    
    if (xColorSelect && xColorPreview) {
        tempXColor = xColorSelect.value;
        xColorPreview.style.backgroundColor = tempXColor;
    }
}

// Update O player color preview
function updateOColorPreview() {
    const oColorSelect = getElement('o-color-select');
    const oColorPreview = getElement('o-color-preview');
    
    if (oColorSelect && oColorPreview) {
        tempOColor = oColorSelect.value;
        oColorPreview.style.backgroundColor = tempOColor;
    }
}

// Update both color previews
function updateColorPreviews() {
    const xColorPreview = getElement('x-color-preview');
    const oColorPreview = getElement('o-color-preview');
    
    if (xColorPreview) {
        xColorPreview.style.backgroundColor = xColor;
    }
    
    if (oColorPreview) {
        oColorPreview.style.backgroundColor = oColor;
    }
}

// Save the color selections
function saveColors() {
    // Set the colors
    xColor = tempXColor;
    oColor = tempOColor;
    
    // Calculate darker versions for dark mode
    xColorDark = getLighterColor(xColor);
    oColorDark = getLighterColor(oColor);
    
    // Apply the colors
    applyColors();
    
    // Save preferences
    localStorage.setItem('xColor', xColor);
    localStorage.setItem('xColorDark', xColorDark);
    localStorage.setItem('oColor', oColor);
    localStorage.setItem('oColorDark', oColorDark);
    
    // Close the modal
    closeColorModal();
}

// Apply colors to the CSS variables
function applyColors() {
    document.documentElement.style.setProperty('--x-color', xColor);
    document.documentElement.style.setProperty('--x-color-dark', xColorDark);
    document.documentElement.style.setProperty('--o-color', oColor);
    document.documentElement.style.setProperty('--o-color-dark', oColorDark);
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

// Getter methods for other modules
export function getXColor() {
    return xColor;
}

export function getOColor() {
    return oColor;
}

// Load saved colors
export function loadSavedColors() {
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
    
    // Apply colors
    applyColors();
    
    // Update dropdowns if they exist
    const xColorSelect = getElement('x-color-select');
    if (xColorSelect) {
        xColorSelect.value = xColor;
    }
    
    const oColorSelect = getElement('o-color-select');
    if (oColorSelect) {
        oColorSelect.value = oColor;
    }
    
    // Update previews
    updateColorPreviews();
}