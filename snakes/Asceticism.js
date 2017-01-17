BasicGame.Asceticism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Asceticism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Asceticism.prototype.constructor = BasicGame.Asceticism;

BasicGame.Asceticism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.ateApple = false;
  this.stateName = "Asceticism";
};

BasicGame.Asceticism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);
};

BasicGame.Asceticism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);

  if (!this.dead && !(this.next.x == 0 && this.next.y == 0)) {
    this.addToScore(this.APPLE_SCORE);
  }
}

BasicGame.Asceticism.prototype.checkAppleCollision = function () {
  if (this.snakeHead.position.equals(this.apple.position)) {
    this.apple.x = -1000;
    this.apple.y = -1000;
    this.ateApple = true;
    this.score = 0;
    this.setScoreText(this.score.toString());
    this.die();
  }
};

BasicGame.Asceticism.prototype.gameOver = function () {
  if (this.ateApple) {
    this.setGameOverText("GAME OVER","","YOU LOSE","","");
  }
  else {
    this.setGameOverText("GAME OVER","",this.score + " POINTS","","");
  }
};
