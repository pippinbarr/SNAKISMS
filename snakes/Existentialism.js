BasicGame.Existentialism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Existentialism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Existentialism.prototype.constructor = BasicGame.Existentialism;

BasicGame.Existentialism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Existentialism";

  this.wallGroup.removeAll();
  this.textGroup.removeAll();
  this.controlsGroup.removeAll();
  this.setScoreText("");
  this.snakeBitsToAdd += 2;
};

BasicGame.Existentialism.prototype.repositionApple = function () {
};

BasicGame.Existentialism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);
};

BasicGame.Existentialism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);
}

BasicGame.Existentialism.prototype.gameOver = function () {
};
