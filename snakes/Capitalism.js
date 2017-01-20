BasicGame.Capitalism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Capitalism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Capitalism.prototype.constructor = BasicGame.Capitalism;

BasicGame.Capitalism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Capitalism";
  this.addToScore(50);
};

BasicGame.Capitalism.prototype.setScoreText = function (scoreString) {

  scoreString = "$" + scoreString;
  if (scoreString.length < this.MAX_SCORE.toString().length) {
    var spacesToAdd = (this.MAX_SCORE.toString().length - scoreString.length)+1;
    scoreString = Array(spacesToAdd).join(" ") + scoreString;
  }
  this.addTextToGrid(this.scoreX-scoreString.length,this.scoreY,[scoreString]);
};

BasicGame.Capitalism.prototype.checkAppleCollision = function () {
  if (this.snakeHead.position.equals(this.apple.position)) {
    if (this.score > 0) {
      this.appleSFX.play();
      this.apple.x = -1000;
      this.apple.y = -1000;
      this.startAppleTimer();
      this.snakeBitsToAdd += this.NEW_BODY_PIECES_PER_APPLE;
      this.addToScore(-this.APPLE_SCORE);
    }
    else {
      this.addTextToGrid(3,5,["YOU CAN'T AFFORD","THE APPLE"]);
      this.hitSFX.play();
      this.game.time.events.add(Phaser.Timer.SECOND * this.SNAKE_TICK * 10,function () {
        this.addTextToGrid(3,5,["                ","         "]);
      },this);
    }
  }
};

BasicGame.Capitalism.prototype.gameOver = function () {
  this.addTextToGrid(3,5,["                ","         "])
  this.setGameOverText("GAME OVER","","DIED WITH $" + this.score,"","");
};
