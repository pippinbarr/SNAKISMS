BasicGame.Pessimism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Pessimism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Pessimism.prototype.constructor = BasicGame.Pessimism;

BasicGame.Pessimism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);
  this.stateName = "Pessimism";

  this.GAME_OVER_X = 7;
  this.GAME_OVER_Y = Math.floor(this.NUM_ROWS/2) - 2;
};

BasicGame.Pessimism.prototype.createControls = function () {
  this.CONTROLS_X = 8;
  this.CONTROLS_Y = 13;

  BasicGame.Snake.prototype.createControls.call(this);
};

BasicGame.Pessimism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);
};

BasicGame.Pessimism.prototype.createWalls = function () {
  // Create the walls
  WALL_LEFT = 5;
  WALL_RIGHT = this.NUM_COLS-6;
  WALL_TOP = 8;
  WALL_BOTTOM = this.NUM_ROWS - WALL_TOP - 1;

  this.wallGroup = this.game.add.group();
  for (var y = WALL_TOP; y <= WALL_BOTTOM; y++) {
    for (var x = WALL_LEFT; x <= WALL_RIGHT; x++) {
      if (y == WALL_TOP || y == WALL_BOTTOM || x == WALL_LEFT || x == WALL_RIGHT) {
        var wall = this.wallGroup.create(x*this.GRID_SIZE,y*this.GRID_SIZE,'wall')
      }
    }
  }
};

BasicGame.Pessimism.prototype.repositionApple = function () {
  var x = (WALL_LEFT+1);
  var y = (WALL_TOP+1);
  while (x >= WALL_LEFT && x <= WALL_RIGHT && y >= WALL_TOP && y <= WALL_BOTTOM) {
    x = Math.floor(Math.random() * this.NUM_COLS);
    y = 2+Math.floor(Math.random() * (this.NUM_ROWS-4));
  }
  this.apple.x = x*this.GRID_SIZE;
  this.apple.y = y*this.GRID_SIZE;
};
