# Farkle Game - Online Multiplayer PWA

A Progressive Web App (PWA) version of the classic Farkle dice game with both solo and multiplayer modes.

## Features

- 🎲 **Solo Mode**: Play Farkle against yourself
- 👥 **Multiplayer Mode**: Play with 2-6 players locally
- 📱 **PWA Support**: Install as an app on any device
- 🎨 **Beautiful UI**: Modern, responsive design with gradient backgrounds
- 🎯 **Score Tracking**: Visual scoreboard with checkboxes for each player
- 🔄 **Offline Support**: Play even without internet connection
- 🎮 **Farkle Rules**: Complete implementation of traditional Farkle scoring

## Game Rules

Farkle is a dice game where players roll six dice and score points based on combinations:

### Scoring
- Single 1: 100 points
- Single 5: 50 points
- Three 1s: 1000 points
- Three 2s: 200 points
- Three 3s: 300 points
- Three 4s: 400 points
- Three 5s: 500 points
- Three 6s: 600 points
- Four of a kind: Triple the three-of-a-kind score
- Five of a kind: Double the four-of-a-kind score
- Six of a kind: Double the five-of-a-kind score
- Three pairs: 1500 points
- Straight (1-6): 1500 points

### How to Play
1. Roll all six dice
2. Set aside scoring dice
3. Either:
   - Roll remaining dice to add to your turn score
   - Bank your points and end your turn
4. **Farkle**: If you roll and have no scoring dice, you lose all points for that turn
5. **Hot Dice**: If you score with all six dice, you can roll all six again!
6. First player to reach 10,000 points wins!

## Deployment on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ray-seal/Farkle)

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the app:
   ```bash
   cd /path/to/Farkle
   vercel
   ```

3. Follow the prompts to complete deployment

4. Your app will be live at a Vercel URL (e.g., `your-app.vercel.app`)

### Vercel Configuration

The project includes a `vercel.json` file that configures:
- Static file serving
- Service worker headers for PWA support
- Proper caching policies

## Local Development

To run locally, simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## PWA Installation

### On Mobile (iOS/Android)
1. Open the game in Safari (iOS) or Chrome (Android)
2. Tap the Share button (iOS) or Menu (Android)
3. Select "Add to Home Screen"
4. The game will install as a standalone app

### On Desktop (Chrome/Edge)
1. Open the game in Chrome or Edge
2. Look for the install icon in the address bar
3. Click "Install" to add it as a desktop app

## Files Structure

```
Farkle/
├── index.html          # Main HTML file
├── style.css           # Styles and layout
├── script.js           # Game logic and PWA support
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── vercel.json        # Vercel deployment configuration
├── icons/             # App icons in multiple sizes
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with gradients, flexbox, and grid
- **JavaScript**: Game logic and interactivity
- **Service Workers**: Offline functionality
- **Web App Manifest**: PWA configuration
- **Vercel**: Deployment platform

## Browser Support

- Chrome/Edge (recommended)
- Safari
- Firefox
- Opera

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.