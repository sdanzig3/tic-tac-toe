## How to Use

1. **Start a New Game**: The game starts automatically when the page loads. Player X goes first.
2. **Make a Move**: Click on any empty cell to place your mark (X or O).
3. **Win the Game**: Connect three of your marks horizontally, vertically, or diagonally to win.
4. **Restart**: Click the "Restart Game" button to start a new game at any time.
5. **Change Theme**: Toggle between light and dark mode using the switch in the top-right corner.
6. **Customize Colors**: Click the "Color Settings" button to open a modal where you can choose custom colors for both players.
7. **Set Player Names**: Click the "Player Names" button to customize the names of both players.

The game automatically saves your theme preference, color choices, and player names for future visits.# Tic-Tac-Toe Game

A simple, interactive Tic-Tac-Toe game built with HTML, CSS, and JavaScript.

![Tic-Tac-Toe Game Screenshot](tic-tac-toe-screenshot.png)

## Description

This project is a classic two-player Tic-Tac-Toe game implemented as a web application. Players take turns placing their marks (X or O) on a 3×3 grid. The first player to align three of their marks horizontally, vertically, or diagonally wins the game.

## Features

- Interactive game board with visual feedback
- Turn-based gameplay for two players (X and O)
- Win detection and highlighting
- Draw detection
- Game state tracking
- Restart functionality
- Responsive design
- Dark/light theme toggle with preference saving
- Customizable player colors via a modal interface
- Custom player names
- Settings persistence using localStorage

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
  - ES6 Modules
  - localStorage for data persistence
  - DOM manipulation APIs

## Project Structure

```
tic-tac-toe/
├── index.html      # Main HTML file with game structure
├── styles.css      # CSS styling for the game
├── js/             # JavaScript modules folder
│   ├── main.js            # Entry point, initializes the game
│   ├── game-logic.js      # Core game mechanics (moves, win detection)
│   ├── ui-controller.js   # DOM manipulation and event handling
│   ├── color-settings.js  # Color customization functionality
│   ├── player-names.js    # Player name customization
│   └── preferences.js     # localStorage saving/loading
└── README.md       # Project documentation
```

The project uses ES6 modules for better code organization and maintainability.

## How to Run Locally

Since this project uses ES6 modules, you need to serve it through a web server rather than opening the HTML file directly. Here are a few ways to do this:

1. **Using http-server (recommended)**:
   ```bash
   # Install http-server globally (requires Node.js)
   npm install -g http-server
   
   # Navigate to project directory
   cd path/to/tic-tac-toe
   
   # Start the server
   http-server
   
   # Access the game at http://localhost:8080 (or another port if shown)
   ```

2. **Using Python's built-in server**:
   ```bash
   # Navigate to project directory
   cd path/to/tic-tac-toe
   
   # Start the server (Python 3)
   python -m http.server
   
   # Or for Python 2
   python -m SimpleHTTPServer
   ```

3. **Using VS Code Live Server**:
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

## Future Enhancements

Potential improvements and additions to the game:

- Score tracking across multiple games
- Single-player mode with AI opponent
- Animations for game actions
- Sound effects
- Difficulty levels
- Game timer
- Alternate themes or skins
- Game history and replay feature
- Multiplayer over network
- Responsive design for mobile devices
- Local tournament mode

The modular code structure makes it easy to extend the game with these features.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Credits

Created as a portfolio project for demonstrating front-end web development skills.

## Contact

Samuel Danziger - smdanziger@gmail.com