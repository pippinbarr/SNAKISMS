BasicGame.Dualism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Dualism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Dualism.prototype.constructor = BasicGame.Dualism;

BasicGame.Dualism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Dualism";

  this.createMindSnake();
};

BasicGame.Dualism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);

  if (this.dead) {
    this.mindSnakeHead.visible = this.snakeHead.visible;
  }
};

BasicGame.Dualism.prototype.createMindSnake = function () {
  this.mindSnakeHead = this.game.add.sprite(this.SNAKE_START_X*this.GRID_SIZE,this.SNAKE_START_Y*this.GRID_SIZE,'head');
  this.mindSnakeHead.alpha = 0.5;
};

BasicGame.Dualism.prototype.createControls = function () {
  var controlsStrings = [];

  if (this.game.device.desktop) {
    controlsStrings = ["ARROWS","CONTROL","SNAKE BODY"];
  }
  else {
    controlsStrings = ["SWIPES","CONTROL","SNAKE BODY"];
  }

  this.addTextToGrid(this.CONTROLS_X,this.CONTROLS_Y,controlsStrings,this.controlsGroup);
  this.controlsVisible = true;

  controlsStrings = ["MIND","CONTROLS","SNAKE MIND"];

  this.mindControlsGroup = this.game.add.group();
  this.addTextToGrid(this.CONTROLS_X,this.CONTROLS_Y+6,controlsStrings,this.mindControlsGroup);
  this.controlsVisible = true;
};

BasicGame.Dualism.prototype.die = function () {

  BasicGame.Snake.prototype.die.call(this);

  this.mindControlsGroup.forEach(function (letter) {
    letter.text = "";
  },this);
};
