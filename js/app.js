const enemyXStartPosition = -150;
const blockWidth = 100;
const blockHeight = 83;
const playerXStartPosition = blockWidth * 2;
const playerYStartPosition = blockHeight * 5;
const playerMoveAmount = blockWidth;
const topOfTheMap = 0;
const bottomOfTheMap = blockHeight * 6;
const leftOfTheMap = 0;
const rightOfTheMap = blockWidth * 5;

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor (speed, xCoordinate, yCoordinate) {
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.xCoordinate > 505) {
          this.xCoordinate = enemyXStartPosition;
        }
        this.xCoordinate += this.speed * dt;
        if (this.checkCollisions()) {
            player.resetPlayer();
        }
    }

    checkCollisions () {
        if (this.xCoordinate + 70 > player.xCoordinate && this.xCoordinate < player.xCoordinate + 70
                && this.yCoordinate + 60 > player.yCoordinate && this.yCoordinate < player.yCoordinate + 60) {
            return true;
        // console.log("enemy x = " + this.xCoordinate + " y = " + this.yCoordinate);
        // console.log("player x = " + player.xCoordinate + "y = " + player.yCoordinate);
        // if (this.xCoordinate == player.xCoordinate && this.yCoordinate == player.yCoordinate) {
        //     return true;

        } else {
            return false;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get('images/enemy-bug.png'), this.xCoordinate, this.yCoordinate);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

  constructor (xCoordinate, yCoordinate) {
      this.sprite = 'images/char-boy.png';
      this.xCoordinate = xCoordinate;
      this.yCoordinate = yCoordinate;
  }

  update () {
      if (this.yCoordinate < topOfTheMap) {
          this.resetPlayer();
      }
      if (this.yCoordinate > bottomOfTheMap) {
          this.yCoordinate -= playerMoveAmount;
      }
      if (this.xCoordinate < rightOfTheMap) {
          this.xCoordinate += playerMoveAmount;
      }
      if (this.xCoordinate > leftOfTheMap) {
          this.xCoordinate -= playerMoveAmount;
      }
  }

  render () {
      ctx.drawImage(Resources.get('images/char-boy.png'), this.xCoordinate, this.yCoordinate);
  }

  handleInput (keyPressed) {
      switch (keyPressed) {
        case 'left':
            this.xCoordinate -= playerMoveAmount;
            break;
        case 'up':
            this.yCoordinate -= playerMoveAmount;
            break;
        case 'right':
            this.xCoordinate += playerMoveAmount;
            break;
        case 'down':
            this.yCoordinate += playerMoveAmount;
            break;
      }
  }

  resetPlayer () {
      this.xCoordinate = playerXStartPosition;
      this.yCoordinate = playerYStartPosition;
  }
}


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
    return result;
}
const allEnemies = [new Enemy(initiateEnemySpeed(), enemyXStartPosition, initiateEnemyPosition()),
                    new Enemy(initiateEnemySpeed(), enemyXStartPosition, initiateEnemyPosition()),
                    new Enemy(initiateEnemySpeed(), enemyXStartPosition, initiateEnemyPosition()),
                    new Enemy(initiateEnemySpeed(), enemyXStartPosition, initiateEnemyPosition())];
// const allEnemies = [new Enemy(initiateEnemySpeed(), enemyXStartPosition, initiateEnemyPosition())];


const player = new Player(playerXStartPosition, playerYStartPosition);


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
