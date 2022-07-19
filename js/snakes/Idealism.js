BasicGame.Idealism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Idealism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Idealism.prototype.constructor = BasicGame.Idealism;

BasicGame.Idealism.prototype.create = function () {
  this.stateName = "Idealism";

  this.textGrid = [];

  this.NUM_ROWS = this.game.height/this.GRID_SIZE;
  this.NUM_COLS = this.game.width/this.GRID_SIZE;

  this.createTextGrid();
  this.createInput();
  this.createInstructions();
  this.dead = true;

  this.addTextToGrid(1,14,["IMAGINE YOU ARE", "PLAYING A GAME", "OF SNAKE"]);
};
