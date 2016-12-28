
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
var SNAKE_TICK = 0.05;
var next;

BasicGame.Snake.prototype = {

  create: function () {
    head = this.game.add.sprite(0,0,'apple');
    snake = [];
    snake.unshift(head);

    for (var i = 0; i < SNAKE_START_LENGTH; i++) {
      snake.unshift(this.game.add.sprite(-GRID_SIZE - i*GRID_SIZE,0,'body'));
    }

    cursors = this.game.input.keyboard.createCursorKeys();
    next = new Phaser.Point(GRID_SIZE,0);

    this.ticker = this.game.time.create(false);
    this.ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);
    this.ticker.start();

    console.log(snake);
  },

  update: function () {
    this.handleInput();
  },

  tick: function () {
    for (var i = 0; i < snake.length - 1; i++) {
      snake[i].x = snake[i+1].x;
      snake[i].y = snake[i+1].y;
    }
    head.position.x += next.x;
    head.position.y += next.y;

    this.ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);
  },

  handleInput: function () {
    if (cursors.left.isDown) {
      next = new Phaser.Point(-GRID_SIZE,0);
    }
    else if (cursors.right.isDown) {
      next = new Phaser.Point(GRID_SIZE,0);
    }
    else if (cursors.up.isDown) {
      next = new Phaser.Point(0,-GRID_SIZE);
    }
    else if (cursors.down.isDown) {
      next = new Phaser.Point(0,GRID_SIZE);
    }

  }

};
