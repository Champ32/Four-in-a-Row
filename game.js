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
var piece;
var timeout = 0;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('red', 'assets/red2.png');
    this.load.image('yellow', 'assets/yellow2.png');
}

function initBoard() {  // initalize the board coordinates.
    for (var i = 0; i < 6; i++) {
        board[i] = [0, 0, 0, 0, 0, 0, 0];
    }
}

function create() {
    initBoard();
    bg = this.add.sprite(325, 275, 'background');
}

function update() {
    var pieceColor;
    var playerValue;
    game.canvas.style.cursor = "default";
    timeout--;
    if (enemyTurn) {
        pieceColor = 'yellow';
        playerValue = 2;
    } else {
        pieceColor = 'red';
        playerValue = 1;
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
    }
}