
BasicGame.Snake = function (game) {

  //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

  this.game;      //  a reference to the currently running game (Phaser.Game)
  this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
  this.camera;    //  a reference to the game camera (Phaser.Camera)
  this.cache;     //  the game cache (Phaser.Cache)
  this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
  this.load;      //  for preloading assets (Phaser.Loader)
  this.math;      //  lots of useful common math operations (Phaser.Math)
  this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
  this.stage;     //  the game stage (Phaser.Stage)
  this.time;      //  the clock (Phaser.Time)
  this.tweens;    //  the tween manager (Phaser.TweenManager)
  this.state;     //  the state manager (Phaser.StateManager)
  this.world;     //  the game world (Phaser.World)
  this.particles; //  the particle manager (Phaser.Particles)
  this.physics;   //  the physics manager (Phaser.Physics)
  this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

  //  You can use any of these from any function within this State.
  //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

// var Swipe = require('phaser-swipe');

var GRID_SIZE = 20;
var SNAKE_START_LENGTH = 4;
var SNAKE_TICK = 0.15;//0.075;
var NEW_BODY_PIECES_PER_APPLE = 3;
var SNAKE_FLICKER_SPEED = 0.2;
var APPLE_SCORE = 10;
var MAX_SCORE_LENGTH = 10;
var APPLE_DELAY = 1500;

var next;
var bodyPiecesToAdd = 0;

var score = 0;
var dead = false;

BasicGame.Snake.prototype = {

  create: function () {

    NUM_ROWS = this.game.height/GRID_SIZE;
    NUM_COLS = this.game.width/GRID_SIZE;
    SNAKE_TICK = 0.15;

    dead = false;
    next = new Phaser.Point(0,0);
    prev = new Phaser.Point(0,0);
    score = 0;

    this.createWalls();
    this.createSnake();
    this.createApple();
    this.createInput();
    instructionsGroup = this.game.add.group();
    controlsGroup = this.game.add.group();
    this.createText();
    this.createInstructions();
    this.createControls();

    // Set up for score
    scoreX = NUM_COLS - 2;
    scoreY = 1;
    this.setScoreText(score.toString());

    // Set up for game over
    gameOverX = 4;
    gameOverY = Math.floor(NUM_ROWS/2) - 2;
    gameOverPointsX = gameOverX;
    gameOverPointsY = gameOverY + 2;
    gameOverResultX = 10;
    gameOverResultY = gameOverPointsY + 2;

    // Create the update tick
    ticker = this.game.time.create(false);
    ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);
    ticker.start();
  },

  createWalls: function () {
    // Create the walls
    WALL_LEFT = 1;
    WALL_RIGHT = NUM_COLS-2;
    WALL_TOP = 3;
    WALL_BOTTOM = NUM_ROWS - WALL_TOP - 1;

    walls = new Array(NUM_ROWS);
    wallGroup = this.game.add.group();
    for (var y = WALL_TOP; y <= WALL_BOTTOM; y++) {
      walls[y] = new Array(NUM_COLS);
      for (var x = WALL_LEFT; x <= WALL_RIGHT; x++) {
        if (y == WALL_TOP || y == WALL_BOTTOM || x == WALL_LEFT || x == WALL_RIGHT) {
          walls[y].push(wallGroup.create(x*GRID_SIZE,y*GRID_SIZE,'wall'));
        }
      }
    }
  },

  createSnake: function () {
    // Create the snake
    snake = [];
    snakeGroup = this.game.add.group();

    head = this.game.add.sprite(11*GRID_SIZE,11*GRID_SIZE,'head',snakeGroup);
    snake.unshift(head);

    bodyPiecesToAdd = 3;

    // for (var i = 0; i < SNAKE_START_LENGTH; i++) {
    //   var snakeBit = snakeGroup.create(-(i+1)*GRID_SIZE,0,'body');
    //   snake.unshift(snakeBit);
    // }
  },

  createApple: function () {
    apple = this.game.add.sprite(-10*GRID_SIZE,-10*GRID_SIZE,'apple');
  },

  createInput: function () {
    if (this.game.device.desktop) {
      cursors = this.game.input.keyboard.createCursorKeys();
      this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
      this.mKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
      this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.R)
      this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.M)
    }
    else {
      swipe = new Swipe(this.game);
      swipe.diagonalDisabled = true;
    }
  },

  createText: function () {
    text = [];
    textGroup = this.game.add.group();
    for (var y = 0; y < NUM_ROWS; y++) {
      text.push([]);
      for (var x = 0; x < NUM_COLS; x++) {
        var charSize = 24;
        var char = this.game.add.bitmapText(GRID_SIZE/2 + x*GRID_SIZE, y*GRID_SIZE, 'atari','',charSize,textGroup);
        char.anchor.x = 0.5;
        char.tint = 0xffffff;
        char.scale.y = 24/charSize;
        text[y].push(char);
      }
    }
  },

  createInstructions: function () {
    var restartString = "R=RESTART";
    var menuString = "M=MENU"
    if (!this.game.device.desktop) {
      restartString = "RESTART";
      menuString = "MENU";
    }
    var instructionsY = NUM_ROWS - 2;
    var instructionsX = 1;
    var x = instructionsX;
    for (var i = 0; i < restartString.length; i++) {
      text[instructionsY][x].text = restartString.charAt(i);
      var sprite = instructionsGroup.create(x*GRID_SIZE,instructionsY*GRID_SIZE,'black');
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(this.restart,this);
      x++;
    }
    x++;
    for (var i = 0; i < menuString.length; i++) {
      text[instructionsY][x].text = menuString.charAt(i);
      var sprite = instructionsGroup.create(x*GRID_SIZE,instructionsY*GRID_SIZE,'black');
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(this.gotoMenu,this);
      x++;
    }
  },

  createControls: function () {
    var controls = [];
    if (this.game.device.desktop) {
      controls = ["ARROWS","CONTROL","SNAKE"];
    }
    else {
      controls = ["SWIPES","CONTROL","SNAKE"];
    }
    var controlsStartX = 8;
    var y = 7;
    var x = controlsStartX;
    for (var i = 0; i < controls.length; i++) {
      for (var j = 0; j < controls[i].length; j++) {
        text[y][x].text = controls[i].charAt(j);
        controlsGroup.add(text[y][x]);
        x++;
      }
      y++;
      x = controlsStartX;

    }
  },

  update: function () {
    if (this.game.device.desktop) {
      this.handleKeyboardInput();
    }
    else {
      this.handleTouchInput();
    }
  },

  setScoreText: function (scoreString) {
    var loc = scoreX;
    for (var i = scoreString.length - 1; i >= 0; i--) {
      var scoreNum = scoreString.charAt(i);
      text[scoreY][loc].text = scoreNum;
      loc--;
    }
  },

  setGameOverText: function (gameOverString,gameOverPointsString,gameOverResultString) {
    var loc = gameOverX;
    for (var i = 0; i < gameOverString.length; i++) {
      text[gameOverY][loc].text = gameOverString[i];
      loc++;
    }
    loc = gameOverPointsX;
    for (var i = 0; i < gameOverPointsString.length; i++) {
      text[gameOverPointsY][loc].text = gameOverPointsString[i];
      loc++;
    }
    loc = gameOverResultX;
    for (var i = 0; i < gameOverResultString.length; i++) {
      text[gameOverResultY][loc].text = gameOverResultString[i];
      loc++;
    }
  },

  tick: function () {
    ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);

    prev = new Phaser.Point(next.x,next.y);

    if (dead) {
      snake.forEach(function (bit) {
        bit.visible = !bit.visible;
      });
      return;
    }

    this.addBodyPieces();
    this.updateSnakePosition();
    this.checkAppleCollision();
    this.checkBodyCollision();
    this.checkWallCollision();
  },

  addBodyPieces: function () {
    if (next.x == 0 && next.y == 0) return;
    if (bodyPiecesToAdd > 0) {
      snake.unshift(snakeGroup.create(0,0,'body'))
      bodyPiecesToAdd = Math.max(0,bodyPiecesToAdd-1);
    }
  },

  updateSnakePosition: function () {
    for (var i = 0; i < snake.length - 1; i++) {
      snake[i].x = snake[i+1].x;
      snake[i].y = snake[i+1].y;
    }
    head.x += next.x;
    head.y += next.y;
  },

  checkAppleCollision: function () {
    if (head.position.equals(apple.position)) {
      apple.x = -1000;
      apple.y = -1000;
      this.startAppleTimer();
      bodyPiecesToAdd += NEW_BODY_PIECES_PER_APPLE;
      score += APPLE_SCORE;
      this.setScoreText(score.toString());
    }
  },

  repositionApple: function () {
    apple.x = (WALL_LEFT+1)*GRID_SIZE + Math.floor(Math.random() * ((WALL_RIGHT - WALL_LEFT - 1))) * GRID_SIZE;
    apple.y = (WALL_TOP+1)*GRID_SIZE + Math.floor(Math.random() * (WALL_BOTTOM - WALL_TOP - 1)) * GRID_SIZE;
  },

  checkBodyCollision: function () {
    for (var i = 0; i < snake.length - 1; i++) {
      if (head.position.equals(snake[i].position)) {
        this.die();
      }
    }
  },

  checkWallCollision: function () {
    wallGroup.forEach(function (wall) {
      if (head.x == wall.x && head.y == wall.y) {
        this.die();
      }
    },this);
  },

  die: function () {
    dead = true;
    next = new Phaser.Point(0,0);
    this.game.time.events.add(Phaser.Timer.SECOND * SNAKE_TICK * 30, this.gameOver, this);
  },

  gameOver: function () {
    this.setGameOverText("GAME OVER",score.toString()+" POINTS","");
    // this.game.time.events.add(Phaser.Timer.SECOND * SNAKE_TICK * 30, this.gotoMenu, this);
  },

  gotoMenu: function () {
    this.game.state.start('Menu');
  },

  restart: function () {
    this.game.state.start('Snake');
  },



  handleKeyboardInput: function () {

    if (this.rKey.isDown) {
      this.restart();
    }
    else if (this.mKey.isDown) {
      this.gotoMenu();
    }

    if (dead) return;


    if (controlsGroup.visible && (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown)) {
      this.hideControls();
      this.startAppleTimer();
    }

    // Check which key is down and set the next direction appropriately
    if (cursors.left.isDown) {
      this.left();
    }
    else if (cursors.right.isDown) {
      this.right();
    }
    if (cursors.up.isDown) {
      this.up();
    }
    else if (cursors.down.isDown) {
      this.down();
    }
  },

  hideControls: function () {
    if (next.x == 0 && next.y == 0) {
      controlsGroup.forEach(function (letter) {
        letter.text = '';
      });
      controlsGroup.visible = false;
    }
  },

  startAppleTimer: function () {
    setTimeout(function () {
      this.repositionApple();
    }.bind(this),APPLE_DELAY);
  },


  handleTouchInput: function () {
    if (dead) return;

    // Check which for swipes and set the next direction appropriately
    var d = swipe.check();
    if (!d) return;

    if (controlsGroup.visible) {
      this.hideControls();
      this.startAppleTimer();
    }

    switch (d.direction) {
      case swipe.DIRECTION_LEFT:
      this.left();
      break;

      case swipe.DIRECTION_RIGHT:
      this.right();
      break;

      case swipe.DIRECTION_UP:
      this.up();
      break;

      case swipe.DIRECTION_DOWN:
      this.down();
      break;
    }
  },

  left: function () {
    if (prev.x == 0) next = new Phaser.Point(-GRID_SIZE,0);
  },

  right: function () {
    if (prev.x == 0) next = new Phaser.Point(GRID_SIZE,0);
  },

  up: function () {
    if (prev.y == 0) next = new Phaser.Point(0,-GRID_SIZE);
  },

  down: function () {
    if (prev.y == 0) next = new Phaser.Point(0,GRID_SIZE);
  },
};

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}
