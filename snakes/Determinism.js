BasicGame.Determinism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Determinism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Determinism.prototype.constructor = BasicGame.Determinism;

var L = 0;
var R = 1;
var U = 2;
var D = 3;

BasicGame.Determinism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Determinism";
  this.inputEnabled = false;

  this.moves = [1,1,1,1,1,1,3,3,3,3,3,3,0,0,2,2,2,2,2,2,2,0,0,0,0,0,3,3,1,1,1,3,3,3,3,3,3,3,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,3,3,3,3,3,3,3,1,1,3,3,3,0,0,0,0,0,0,0,2,2,2,2,2,2,1,1,1,1,3,3,3,3,1,1,3,3,3,3,0,0,3,3,3,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,3,3,3,3,3,0,2,2,0,0,0,0,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,2,1,1,1,1,2,0,0,2,1,1,1,1,1,1,1,1,1,3,3,1,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,0,2,2,2,2,2,2,2,2,2,1,1,1,2,2,0,0,0,0,2,1,1,1,1,1,3,3,3,1,3,3,3,1,1,3,0,0,0,0,0,3,3,3,3,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,3,3,1,3,3,3,3,1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,3,3,3,3,1,1,1,1,3,0,0,0,0,0,0,2,0];
  this.moveIndex = 0;
  this.applePositions = [
    {x: 10, y: 10},
    {x: 10, y: 5},
    {x: 5, y: 9},
    {x: 9, y: 20},
    {x: 18, y: 6},
    {x: 17, y: 10},
    {x: 4, y: 12},
    {x: 12, y: 12},
    {x: 17, y: 11},
    {x: 6, y: 6},
    {x: 8, y: 18},
    {x: 9, y: 7},
    {x: 15, y: 12},
    {x: 14, y: 8},
    {x: 5, y: 20},
    {x: 10, y: 10}
  ];
  this.applePositionsIndex = 0;

  this.startAppleTimer();
};

BasicGame.Determinism.prototype.repositionApple = function () {
  this.apple.x = this.applePositions[this.applePositionsIndex].x*this.GRID_SIZE;
  this.apple.y = this.applePositions[this.applePositionsIndex].y*this.GRID_SIZE;
  this.applePositionsIndex++;
  this.apple.visible = true;
};

BasicGame.Determinism.prototype.createControls = function () {
};

BasicGame.Determinism.prototype.tick = function () {

  switch (this.moves[this.moveIndex]) {
    case R:
    this.right();
    break;

    case L:
    this.left();
    break;

    case U:
    this.up();
    break;

    case D:
    this.down();
    break;
  }
  this.moveIndex++;

  BasicGame.Snake.prototype.tick.call(this);
};
