
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

var GRID_SIZE = 20;
var SNAKE_START_LENGTH = 4;
var SNAKE_TICK = 0.075;
var NEW_BODY_PIECES_PER_APPLE = 3;
var SNAKE_FLICKER_SPEED = 0.2;

var next;
var bodyPiecesToAdd = 0;

var score = 0;
var dead = false;

BasicGame.Snake.prototype = {

  create: function () {

    // Create the snake
    snake = [];

    head = this.game.add.sprite(0,0,'head');
    snake.unshift(head);

    for (var i = 0; i < SNAKE_START_LENGTH; i++) {
      snake.unshift(this.game.add.sprite(-(i+1)*GRID_SIZE,0,'body'));
    }

    walls = [];

    // Create the apple
    apple = this.game.add.sprite(10*GRID_SIZE,10*GRID_SIZE,'apple');

    // Set up for input
    cursors = this.game.input.keyboard.createCursorKeys();
    next = new Phaser.Point(GRID_SIZE,0);

    // Create the update tick
    ticker = this.game.time.create(false);
    ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);
    ticker.start();
  },

  update: function () {
    this.handleInput();
  },

  tick: function () {

    // Call next tick
    ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);

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
  },

  addBodyPieces: function () {
    if (bodyPiecesToAdd > 0) {
      snake.unshift(this.game.add.sprite(0,0,'body'))
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
      apple.x = Math.floor(Math.random() * (this.game.width/GRID_SIZE)) * GRID_SIZE;
      apple.y = Math.floor(Math.random() * (this.game.height/GRID_SIZE)) * GRID_SIZE;
      bodyPiecesToAdd += NEW_BODY_PIECES_PER_APPLE;
    }
  },

  checkBodyCollision: function () {
    for (var i = 0; i < snake.length - 1; i++) {
      if (head.position.equals(snake[i].position)) {
        this.die();
      }
    }
  },

  die: function () {
    dead = true;
    next = new Phaser.Point(0,0);
  },

  handleInput: function () {
    if (dead) return;

    // Check which key is down and set the next direction appropriately
    if (cursors.left.isDown && next.x == 0) {
      next = new Phaser.Point(-GRID_SIZE,0);
    }
    else if (cursors.right.isDown && next.x == 0) {
      next = new Phaser.Point(GRID_SIZE,0);
    }
    else if (cursors.up.isDown && next.y == 0) {
      next = new Phaser.Point(0,-GRID_SIZE);
    }
    else if (cursors.down.isDown && next.y == 0) {
      next = new Phaser.Point(0,GRID_SIZE);
    }
  },
};
