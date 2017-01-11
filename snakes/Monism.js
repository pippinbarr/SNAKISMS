BasicGame.Monism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Monism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Monism.prototype.constructor = BasicGame.Snake;

BasicGame.Monism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.snakeStaticBitsGroup = this.game.add.group();
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
        this.eat();
      }
    }
  },this);

  this.wallGroup.forEach(function (edible) {
    if (this.snakeHead.position.equals(edible.position)) {
      this.wallGroup.remove(edible);
      this.eat();
    }
  },this);

  this.snakeStaticBitsGroup.forEach(function (bit) {
    if (this.snakeHead.position.equals(bit.position)) {
      this.snakeStaticBitsGroup.remove(bit);
      this.eat();
    }
  },this);

  for (var i = 0; i < this.snake.length - 1; i++) {
    if (this.snakeHead.position.equals(this.snake[i].position)) {
      this.snakeBodyGroup.remove(this.snake[i]);
      // Need to add this to a "randomly reposition timer"
      var remove = this.snake.slice(0,i);
      this.snake = this.snake.slice(i+1);
      for (var j = 0; j < remove.length; j++) {
        var bodyBit = remove[j];
        this.snakeBodyGroup.remove(bodyBit);
        this.snakeStaticBitsGroup.add(bodyBit);
      }
      this.eat();
      break;
    }
  }


};

BasicGame.Monism.prototype.eat = function () {
  this.snakeBitsToAdd = this.NEW_BODY_PIECES_PER_APPLE;
  this.score += this.APPLE_SCORE;
  this.setScoreText(this.score.toString());
}

BasicGame.Monism.prototype.checkBodyCollision = function () {
  // No death on body
};


BasicGame.Monism.prototype.checkWallCollision = function () {
  // No death on wall
};
