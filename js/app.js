// Initializes the constant variables of the game.
const scoreBoard = document.querySelector('#game-score');
const enemyXStartPosition = -200;
const blockWidth = 100;
const blockHeight = 83;
const playerXStartPosition = blockWidth * 2;
const playerYStartPosition = blockHeight * 5;
const playerMoveAmount = blockWidth;
const topOfTheMap = 0;
const bottomOfTheMap = blockHeight * 6;
const leftOfTheMap = 0;
const rightOfTheMap = blockWidth * 5;

// Enemy Class
class Enemy {

    // Constructore for the enemy object.
    constructor (speed, xCoordinate, yCoordinate) {
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    // Method checks if an enemy has collided with the player and have the
    // enemy wrap around if it goes out of bounds.
    update (dt) {
        if (this.xCoordinate > 505) {
          this.xCoordinate = enemyXStartPosition;
        }
        this.xCoordinate += this.speed * dt;
        if (this.checkCollisions()) {
            let currentScore = Number(scoreBoard.innerHTML);
            if (currentScore - 50 <= 0) {
                currentScore = 0;
            } else {
                currentScore -= 50;
            }
            scoreBoard.innerHTML = currentScore;
            player.resetPlayer();
        }
    }

    // Helper method to check collision with a player. Check if the player
    // overlaps with any of the enemies.
    checkCollisions () {
        if (this.xCoordinate + 70 > player.xCoordinate && this.xCoordinate < player.xCoordinate + 70
                && this.yCoordinate + 60 > player.yCoordinate && this.yCoordinate < player.yCoordinate + 60) {
            return true;
        } else {
            return false;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get('images/enemy-bug.png'), this.xCoordinate, this.yCoordinate);
    }
}


// Player Class
class Player {

  // Constructor for player.
  constructor (xCoordinate, yCoordinate) {
      this.sprite = 'images/char-boy.png';
      this.xCoordinate = xCoordinate;
      this.yCoordinate = yCoordinate;
  }

  // Checks to see if the player crosses the water and limit their movement from
  // going off screen
  update () {
      if (this.yCoordinate < topOfTheMap) {
          scoreBoard.innerHTML = Number(scoreBoard.innerHTML) + 100;
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

  // Draw player
  render () {
      ctx.drawImage(Resources.get('images/char-boy.png'), this.xCoordinate, this.yCoordinate);
  }

  // Handles the input of the player and updates the x or y coordinates.
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

  // Resets player to their original spot.
  resetPlayer () {
      this.xCoordinate = playerXStartPosition;
      this.yCoordinate = playerYStartPosition;
  }
}

// Randomly Initializes the enemies Y position
function initiateEnemyYPosition (startSpot) {
    const startRow = startSpot == null ? Math.floor(Math.random() * 3) + 1 : startSpot;
    const heightOfPlatform = 83;
    return (heightOfPlatform * startRow) - (heightOfPlatform / 2);
}

// Randomly Initializes the enemies X position
function initiateEnemyXPosition () {
    return (Math.floor(Math.random() * 10) + 8) * 25 + enemyXStartPosition;
}

// Randomly Initializes the enemies speed.
function initiateEnemySpeed () {
    var result = (Math.floor(Math.random() * 10) + 5) * 11 + 150;
    return result;
}

// Initializes all the enemies in the game.
const allEnemies = [new Enemy(initiateEnemySpeed(), initiateEnemyXPosition(), initiateEnemyYPosition(1)),
                    new Enemy(initiateEnemySpeed(), initiateEnemyXPosition(), initiateEnemyYPosition(2)),
                    new Enemy(initiateEnemySpeed(), initiateEnemyXPosition(), initiateEnemyYPosition(3)),
                    new Enemy(initiateEnemySpeed(), initiateEnemyXPosition(), initiateEnemyYPosition()),
                    new Enemy(initiateEnemySpeed(), initiateEnemyXPosition(), initiateEnemyYPosition()),
                    new Enemy(initiateEnemySpeed(), initiateEnemyXPosition(), initiateEnemyYPosition())];

// Initializes the player.
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
