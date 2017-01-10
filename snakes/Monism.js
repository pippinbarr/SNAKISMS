BasicGame.Monism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Monism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Monism.prototype.constructor = BasicGame.Snake;

BasicGame.Monism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);
};

BasicGame.Monism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);

  if (!this.dead) {
    this.checkEdibleCollision();
  }
};

BasicGame.Monism.prototype.checkEdibleCollision = function () {
  var toRemove = [];
  this.textGroup.forEach(function (edible) {
    if (this.snakeHead.x + this.GRID_SIZE/2 == edible.x && this.snakeHead.y == edible.y) {
      if (edible.text != '') {
        this.textGroup.remove(edible);
        this.snakeBitsToAdd = this.NEW_BODY_PIECES_PER_APPLE;
        this.score += this.APPLE_SCORE;
        this.setScoreText(this.score.toString());
      }
    }
  },this);

  this.wallGroup.forEach(function (edible) {
    if (this.snakeHead.position.equals(edible.position)) {
      this.wallGroup.remove(edible);
      this.snakeBitsToAdd = this.NEW_BODY_PIECES_PER_APPLE;
      this.score += this.APPLE_SCORE;
      this.setScoreText(this.score.toString());
    }
  },this);


};

BasicGame.Monism.prototype.checkWallCollision = function () {
  // No death on wall
};
