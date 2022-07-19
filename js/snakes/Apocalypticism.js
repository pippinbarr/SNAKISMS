BasicGame.Apocalypticism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Apocalypticism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Apocalypticism.prototype.constructor = BasicGame.Apocalypticism;

BasicGame.Apocalypticism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Apocalypticism";
  setTimeout(function () {
    this.wallGroup.visible = false;
    this.snakeBodyGroup.visible = false;
    this.snakeHead.visible = false;
    this.snakeHead.x = -1000;
    this.apple.visible = false;
    this.controlsGroup.visible = false;
    this.dead = true;
    this.setScoreText("");
    this.setGameOverText("GAME OVER","","","","");
  }.bind(this),Math.floor(Math.random() * 30000))
};
