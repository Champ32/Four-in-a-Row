const turnText = document.getElementById(`playerTurn`);

var config = {
    width: 650,
    height: 550,
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var board = new Array(6); // Board variable to keep track of available slots.
var xList = [31, 115, 199, 283, 367, 451, 535];
var yList = [23, 107, 191, 275, 359, 443];
var enemyTurn = false;
var gameDone = false;
var piece;
var timeout = 0;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('bg-color', 'assets/bg_color.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('red', 'assets/red2.png');
    this.load.image('yellow', 'assets/yellow2.png');
}

function initBoard() {  // initalize the board coordinates.
    for (var i = 0; i < 6; i++) {
        board[i] = [0, 0, 0, 0, 0, 0, 0];
    }
}

function getSections(board) {
    var sections = new Array();
    // horizontal sections
    for (var j = 0; j < 4; j++){
        for (var i = 0; i<6; i++) {
            sections.push([board[i][j], board[i][j+1], board[i][j+2], board[i][j+3]]);
        }
    }
    // vertical sections
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 7; j++) {
            sections.push([board[i][j], board[i+1][j], board[i+2][j], board[i+3][j]]);
        }
    }
    // forward-diagonal
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            sections.push([board[i][j], board[i+1][j+1], board[i+2][j+2], board[i+3][j+3]]);
        }
    }
    // backward-diagonal
    for (var i = 3; i < 6; i++) {
        for (var j = 0; j < 4; j++) {
            sections.push([board[i][j], board[i-1][j+1], board[i-2][j+2], board[i-3][j+3]]);
        }
    }

    return sections; 
}

function isWinner(board, player) {
    var sections = getSections(board);
    for (i = 0; i < sections.length; i++) {
        var possible = true;
        for (j = 0; j < 4; j++) {
            if (sections[i][j] != player) {
                possible = false;
            }
        }
        if (possible) return true;
    }
    return false;
}

function boardFull(board) {
    for (var j = 0; j < 7; j++) {
        if (board[0][j] == 0) return false;
    }
    return true;
}

function create() {
    initBoard();
    bg_color = this.add.sprite(0, 0, 'bg-color').setOrigin(0,0); 
    bg = this.add.sprite(325, 275, 'background'); 
}

function update() {
    var pieceColor;
    var playerValue;
    game.canvas.style.cursor = "default";
    timeout--;

    if (gameDone) return;

    if (enemyTurn) {
        pieceColor = 'yellow';
        playerValue = 2;
        turnText.textContent = "Player 2's Turn";
    } else {
        pieceColor = 'red';
        playerValue = 1;
        turnText.textContent = "Player 1's Turn";
    }

    if (timeout <= 0) {
        // finding the player's cursor
        var mouse = this.input.activePointer;
        var column = -1;
        var xpos = mouse.worldX;
        var ypos = mouse.worldY;
        for (var i = 0; i < 7; i++) {
            var dist = xpos - xList[i];
            if (0 <= dist && dist <= 83 && 23 <= ypos && ypos <= 527) {
                game.canvas.style.cursor = "pointer";
                column = i;
                break;
            }
        }

        if (column != -1 && mouse.primaryDown) {
            for (i = 5; i >= 0; i--) {
                if (board[i][column] == 0) {
                    board[i][column] = playerValue;
                    piece = this.add.sprite(xList[column], yList[i], pieceColor).setOrigin(0,0);
                    timeout = 35;
                    enemyTurn = !enemyTurn;
                    console.log(`${enemyTurn}, ${pieceColor}, ${playerValue}`);
                    break;
                }
            }
        }

        if (isWinner(board, playerValue)) {
            turnText.textContent = `Player ${playerValue} is the Winner!!`;
            gameDone = true;
        } else if (boardFull(board)) {
            turnText.textContent = `Draw!`;
            gameDone = true;
        }
    }
}