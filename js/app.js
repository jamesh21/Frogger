// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(speed, xCoordinate, yCoordinate) {
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // this.xCoordinate = (this.xCoordinate + this.speed) * dt;
        this.xCoordinate += this.speed * dt;
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get('images/enemy-bug.png'), this.xCoordinate, this.yCoordinate);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// 41, 124, 208 (83 - 41 = 42, 166 - 41 = 125, 249 - 41 = 208)
function initiateEnemyPosition () {
    const startRow = Math.floor(Math.random() * 3) + 1;
    const heightOfPlatform = 83;
    return (heightOfPlatform * startRow) - (heightOfPlatform / 2);
}

function initiateEnemySpeed () {
    var result = (Math.floor(Math.random() * 5) + 1) * 10 + 150
    console.log(result)
    return result;
}
const allEnemies = [new Enemy(300, -150, initiateEnemyPosition()),
                    new Enemy(initiateEnemySpeed(), -150, initiateEnemyPosition()),
                    new Enemy(initiateEnemySpeed(), -150, initiateEnemyPosition()),
                    new Enemy(initiateEnemySpeed(), -150, initiateEnemyPosition())];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
