# Tic-Tac-Toe

A modern, feature-rich implementation of the classic Tic-Tac-Toe game built with HTML, CSS, and JavaScript using ES6 modules.

![Tic-Tac-Toe Game Screenshot](tic-tac-toe-screenshot.png)

## Features

- 🎮 Interactive game board with visual feedback
- 🏆 Score tracking that persists across sessions
- 🌓 Light and dark theme modes with auto-save preference
- 🎨 Customizable player colors
- 👤 Custom player names
- 📱 Responsive design for desktop and mobile
- 💾 Game state and preferences saved in local storage

## Live Demo

[Play Tic-Tac-Toe Online](https://sdanzig3.github.io/tic-tac-toe/)

## How to Play

1. **Start a New Game**: The game starts automatically when the page loads. Player X goes first.
2. **Make a Move**: Click on any empty cell to place your mark (X or O).
3. **Win the Game**: Connect three of your marks horizontally, vertically, or diagonally to win.
4. **Restart**: Click the "Restart Game" button to start a new game at any time.
5. **Change Theme**: Toggle between light and dark mode using the switch in the top-right corner.
6. **Customize Colors**: Click the "Color Settings" button to choose custom colors for each player.
7. **Set Player Names**: Click the "Player Names" button to customize player names.
8. **Track Scores**: View the running score that persists across multiple games.
9. **Reset Scores**: Click the "Reset Scores" button to set all scores back to zero.

## Project Structure

```
tic-tac-toe/
├── index.html      # Main HTML file with game structure
├── styles.css      # CSS styling for the game
└── js/             # JavaScript modules folder
    ├── main.js            # Entry point, initializes the game
    ├── game-logic.js      # Core game mechanics (moves, win detection)
    ├── ui-controller.js   # DOM manipulation and event handling
    ├── score-tracker.js   # Score tracking across games
    ├── player-names.js    # Player name customization
    ├── color-settings.js  # Color customization functionality
    ├── theme.js           # Theme toggle functionality
    └── preferences.js     # localStorage saving/loading
```

## Technical Details

- **ES6 Modules**: The project uses modern JavaScript modules for better code organization and maintainability
- **Local Storage**: Game preferences and scores are saved to the browser's localStorage
- **CSS Variables**: Dynamic styling using CSS custom properties
- **Responsive Design**: Works on both desktop and mobile devices
- **No Dependencies**: Built with vanilla JavaScript without external libraries

## Installation and Local Development

Since this project uses ES6 modules, you need to serve it through a web server instead of opening the HTML file directly.

### Using npm's http-server (recommended)

```bash
# Install http-server globally if you don't have it
npm install -g http-server

# Navigate to the project directory
cd path/to/tic-tac-toe

# Start the server
http-server

# Access the game at http://localhost:8080
```

### Using Python's built-in server

```bash
# Navigate to the project directory
cd path/to/tic-tac-toe

# Start the server (Python 3)
python -m http.server

# Or for Python 2
python -m SimpleHTTPServer
```

### Using VS Code Live Server

If you're using Visual Studio Code:
1. Install the "Live Server" extension
2. Right-click on `index.html` and select "Open with Live Server"

## Future Enhancements

Potential improvements for future versions:

- Single-player mode with AI opponent
- Animations for game actions
- Sound effects
- Online multiplayer functionality
- Game history and replay feature
- Undo/redo functionality
- Difficulty levels for AI
- Local tournament mode

## License

[MIT License](LICENSE)

## Acknowledgments

- This project was created as a portfolio piece to demonstrate front-end development skills
- Special thanks to the web development community for resources and inspiration
## Contact

Samuel Danziger - smdanziger@gmail.com