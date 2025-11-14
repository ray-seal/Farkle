// Game State
let gameState = {
    mode: 'solo', // 'solo' or 'multiplayer'
    players: [],
    currentPlayerIndex: 0,
    dice: [1, 1, 1, 1, 1, 1],
    selectedDice: [],
    heldDice: [],
    turnScore: 0,
    rollCount: 0,
    gameOver: false
};

// Farkle scoring categories
const SCORE_CATEGORIES = [
    { name: 'Ones', value: 100 },
    { name: 'Twos', value: 200 },
    { name: 'Threes', value: 300 },
    { name: 'Fours', value: 400 },
    { name: 'Fives', value: 500 },
    { name: 'Sixes', value: 600 },
    { name: 'Three Pairs', value: 1500 },
    { name: 'Straight (1-6)', value: 1500 },
    { name: 'Three of a Kind', value: 0 },
    { name: 'Four of a Kind', value: 1000 },
    { name: 'Five of a Kind', value: 2000 },
    { name: 'Six of a Kind', value: 3000 }
];

// Initialize the game
function init() {
    showModeSelection();
}

function showModeSelection() {
    document.getElementById('modeSelection').style.display = 'block';
    document.getElementById('playerSelection').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'none';
}

function backToModeSelection() {
    gameState = {
        mode: 'solo',
        players: [],
        currentPlayerIndex: 0,
        dice: [1, 1, 1, 1, 1, 1],
        selectedDice: [],
        heldDice: [],
        turnScore: 0,
        rollCount: 0,
        gameOver: false
    };
    showModeSelection();
}

function showPlayerSelection() {
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('playerSelection').style.display = 'block';
}

function startSoloGame() {
    gameState.mode = 'solo';
    gameState.players = [
        { name: 'Player 1', scores: {}, total: 0 }
    ];
    initializeGame();
}

function startMultiplayerGame() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    if (numPlayers < 2 || numPlayers > 6) {
        alert('Please select between 2 and 6 players');
        return;
    }
    
    gameState.mode = 'multiplayer';
    gameState.players = [];
    for (let i = 0; i < numPlayers; i++) {
        gameState.players.push({
            name: `Player ${i + 1}`,
            scores: {},
            total: 0
        });
    }
    initializeGame();
}

function initializeGame() {
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('playerSelection').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    
    createScoreTable();
    updateCurrentPlayerDisplay();
    resetTurn();
}

function createScoreTable() {
    const scoreTable = document.getElementById('scoreTable');
    scoreTable.innerHTML = '';
    
    // Create header row
    const headerRow = document.createElement('div');
    headerRow.className = 'score-row score-header';
    headerRow.style.gridTemplateColumns = `2fr repeat(${gameState.players.length}, 1fr)`;
    
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'score-cell category';
    categoryHeader.textContent = 'Category';
    headerRow.appendChild(categoryHeader);
    
    gameState.players.forEach(player => {
        const playerHeader = document.createElement('div');
        playerHeader.className = 'score-cell';
        playerHeader.textContent = player.name;
        headerRow.appendChild(playerHeader);
    });
    
    scoreTable.appendChild(headerRow);
    
    // Create category rows
    SCORE_CATEGORIES.forEach((category, index) => {
        const row = document.createElement('div');
        row.className = 'score-row';
        row.style.gridTemplateColumns = `2fr repeat(${gameState.players.length}, 1fr)`;
        
        const categoryCell = document.createElement('div');
        categoryCell.className = 'score-cell category';
        categoryCell.textContent = category.name;
        row.appendChild(categoryCell);
        
        gameState.players.forEach((player, playerIndex) => {
            const scoreCell = document.createElement('div');
            scoreCell.className = 'score-cell';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `score-${playerIndex}-${index}`;
            checkbox.disabled = true;
            
            scoreCell.appendChild(checkbox);
            row.appendChild(scoreCell);
        });
        
        scoreTable.appendChild(row);
    });
    
    // Create total row
    const totalRow = document.createElement('div');
    totalRow.className = 'score-row';
    totalRow.style.gridTemplateColumns = `2fr repeat(${gameState.players.length}, 1fr)`;
    
    const totalLabel = document.createElement('div');
    totalLabel.className = 'score-cell category total';
    totalLabel.textContent = 'TOTAL';
    totalRow.appendChild(totalLabel);
    
    gameState.players.forEach((player, playerIndex) => {
        const totalCell = document.createElement('div');
        totalCell.className = 'score-cell total';
        totalCell.id = `total-${playerIndex}`;
        totalCell.textContent = '0';
        totalRow.appendChild(totalCell);
    });
    
    scoreTable.appendChild(totalRow);
}

function updateCurrentPlayerDisplay() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('currentPlayerDisplay').textContent = 
        `Current Turn: ${currentPlayer.name}`;
}

function rollDice() {
    if (gameState.gameOver) return;
    
    gameState.rollCount++;
    const numDiceToRoll = 6 - gameState.heldDice.length;
    
    if (numDiceToRoll === 0) {
        // Hot dice - all dice scored, get all 6 back
        gameState.heldDice = [];
    }
    
    const availableDiceCount = 6 - gameState.heldDice.length;
    gameState.dice = [];
    
    for (let i = 0; i < availableDiceCount; i++) {
        gameState.dice.push(Math.floor(Math.random() * 6) + 1);
    }
    
    gameState.selectedDice = [];
    renderDice();
    
    // Check for Farkle (no scoring dice)
    if (!hasValidScore(gameState.dice)) {
        showMessage('FARKLE! No scoring dice. Turn ends.', 'error');
        setTimeout(() => {
            endTurn();
        }, 2000);
        document.getElementById('rollButton').disabled = true;
        return;
    }
    
    document.getElementById('rollButton').disabled = true;
    showMessage('Select scoring dice, then roll again or bank your points', 'info');
    updateTurnInfo();
}

function renderDice() {
    const container = document.getElementById('diceContainer');
    container.innerHTML = '';
    
    // Show held dice
    gameState.heldDice.forEach((value, index) => {
        const die = createDieElement(value, index, true);
        container.appendChild(die);
    });
    
    // Show current roll
    gameState.dice.forEach((value, index) => {
        const die = createDieElement(value, index, false);
        container.appendChild(die);
    });
}

function createDieElement(value, index, isHeld) {
    const die = document.createElement('div');
    die.className = 'die';
    if (isHeld) {
        die.classList.add('held');
    }
    die.textContent = getDieFace(value);
    
    if (!isHeld) {
        die.onclick = () => toggleDieSelection(index);
        if (gameState.selectedDice.includes(index)) {
            die.classList.add('selected');
        }
    }
    
    return die;
}

function getDieFace(value) {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return faces[value - 1];
}

function toggleDieSelection(index) {
    if (gameState.selectedDice.includes(index)) {
        gameState.selectedDice = gameState.selectedDice.filter(i => i !== index);
    } else {
        gameState.selectedDice.push(index);
    }
    renderDice();
    
    // Enable bank button if valid selection
    const selectedValues = gameState.selectedDice.map(i => gameState.dice[i]);
    const score = calculateScore(selectedValues);
    
    if (score > 0) {
        document.getElementById('bankButton').disabled = false;
        document.getElementById('rollButton').disabled = false;
    } else {
        document.getElementById('bankButton').disabled = true;
        document.getElementById('rollButton').disabled = true;
    }
}

function hasValidScore(dice) {
    // Check for 1s and 5s
    if (dice.includes(1) || dice.includes(5)) return true;
    
    // Check for three of a kind or better
    const counts = {};
    dice.forEach(d => counts[d] = (counts[d] || 0) + 1);
    if (Object.values(counts).some(count => count >= 3)) return true;
    
    // Check for three pairs
    const pairs = Object.values(counts).filter(count => count === 2);
    if (pairs.length === 3) return true;
    
    // Check for straight
    const sorted = [...new Set(dice)].sort();
    if (sorted.length === 6 && sorted[0] === 1 && sorted[5] === 6) return true;
    
    return false;
}

function calculateScore(dice) {
    if (dice.length === 0) return 0;
    
    let score = 0;
    const counts = {};
    dice.forEach(d => counts[d] = (counts[d] || 0) + 1);
    
    // Check for straight (1-6)
    const sorted = [...new Set(dice)].sort();
    if (sorted.length === 6 && sorted[0] === 1 && sorted[5] === 6) {
        return 1500;
    }
    
    // Check for three pairs
    const pairs = Object.entries(counts).filter(([_, count]) => count === 2);
    if (pairs.length === 3) {
        return 1500;
    }
    
    // Check for multiples of same number
    for (let num = 1; num <= 6; num++) {
        const count = counts[num] || 0;
        
        if (count >= 3) {
            if (num === 1) {
                score += 1000 * Math.pow(2, count - 3);
            } else {
                score += num * 100 * Math.pow(2, count - 3);
            }
        } else {
            // Individual 1s and 5s
            if (num === 1) {
                score += count * 100;
            } else if (num === 5) {
                score += count * 50;
            }
        }
    }
    
    return score;
}

function bankPoints() {
    const selectedValues = gameState.selectedDice.map(i => gameState.dice[i]);
    const score = calculateScore(selectedValues);
    
    if (score === 0) {
        showMessage('Invalid selection! Select scoring dice.', 'error');
        return;
    }
    
    // Move selected dice to held
    selectedValues.forEach(value => gameState.heldDice.push(value));
    
    // Remove selected dice from current roll
    gameState.selectedDice.sort((a, b) => b - a);
    gameState.selectedDice.forEach(index => {
        gameState.dice.splice(index, 1);
    });
    gameState.selectedDice = [];
    
    gameState.turnScore += score;
    
    // Check if all dice are held (hot dice)
    if (gameState.heldDice.length === 6) {
        showMessage(`Hot dice! All dice scored. You earned ${score} points. Roll all 6 dice again!`, 'success');
        gameState.heldDice = [];
    } else {
        showMessage(`You scored ${score} points! Roll remaining dice or bank your turn total.`, 'success');
    }
    
    renderDice();
    updateTurnInfo();
    
    document.getElementById('rollButton').disabled = false;
    document.getElementById('bankButton').disabled = true;
    
    // Add end turn button option
    if (gameState.heldDice.length < 6) {
        document.getElementById('bankButton').textContent = 'End Turn & Save';
        document.getElementById('bankButton').onclick = endTurnWithSave;
        document.getElementById('bankButton').disabled = false;
    }
}

function endTurnWithSave() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    currentPlayer.total += gameState.turnScore;
    
    showMessage(`${currentPlayer.name} banked ${gameState.turnScore} points! Total: ${currentPlayer.total}`, 'success');
    
    updateScoreDisplay();
    
    setTimeout(() => {
        nextPlayer();
    }, 2000);
}

function endTurn() {
    gameState.turnScore = 0;
    nextPlayer();
}

function nextPlayer() {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    
    // Check for winner
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (currentPlayer.total >= 10000) {
        gameState.gameOver = true;
        showMessage(`🎉 ${currentPlayer.name} WINS with ${currentPlayer.total} points! 🎉`, 'winner');
        document.getElementById('rollButton').disabled = true;
        document.getElementById('bankButton').disabled = true;
        return;
    }
    
    resetTurn();
}

function resetTurn() {
    gameState.dice = [];
    gameState.selectedDice = [];
    gameState.heldDice = [];
    gameState.turnScore = 0;
    gameState.rollCount = 0;
    
    renderDice();
    updateCurrentPlayerDisplay();
    updateTurnInfo();
    
    document.getElementById('rollButton').disabled = false;
    document.getElementById('bankButton').disabled = true;
    document.getElementById('bankButton').textContent = 'Bank Points';
    document.getElementById('bankButton').onclick = bankPoints;
    
    showMessage('Roll the dice to start your turn!', 'info');
}

function updateTurnInfo() {
    document.getElementById('turnScore').textContent = gameState.turnScore;
    document.getElementById('rollCount').textContent = gameState.rollCount;
}

function updateScoreDisplay() {
    gameState.players.forEach((player, playerIndex) => {
        document.getElementById(`total-${playerIndex}`).textContent = player.total;
    });
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('gameMessage');
    messageDiv.textContent = message;
    messageDiv.className = `game-message ${type}`;
}

// PWA Install Support
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
});

function showInstallButton() {
    const installBtn = document.createElement('button');
    installBtn.className = 'install-button show';
    installBtn.textContent = '📱 Install App';
    installBtn.onclick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                installBtn.remove();
            }
            deferredPrompt = null;
        }
    };
    document.body.appendChild(installBtn);
}

// Initialize on load
window.addEventListener('load', () => {
    init();
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Service Worker registration failed', err));
    }
});
