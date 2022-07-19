BasicGame.Monism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Monism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Monism.prototype.constructor = BasicGame.Monism;

BasicGame.Monism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.edibles = this.game.add.group();
  this.stateName = "Monism";
};

BasicGame.Monism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);

  if (!this.dead) {
    this.checkEdibleCollision();
  }
};

BasicGame.Monism.prototype.checkEdibleCollision = function () {
  this.edibles.forEach(function (edible) {
    if (edible.text && edible.text != '') {
      if (this.snakeHead.x + this.GRID_SIZE/2 == edible.x && this.snakeHead.y == edible.y) {
        this.edibles.remove(edible);
        this.eat(edible);
      }
    }
    else {
      if (this.snakeHead.position.equals(edible.position)) {
        this.edibles.remove(edible);
        this.eat(edible);
      }
    }
  },this);

  this.textGroup.forEach(function (edible) {
    if (this.snakeHead.x + this.GRID_SIZE/2 == edible.x && this.snakeHead.y == edible.y) {
      if (edible.text != '') {
        this.eat(edible);
      }
    }
  },this);

  this.wallGroup.forEach(function (edible) {
    if (this.snakeHead.position.equals(edible.position)) {
      this.wallGroup.remove(edible);
      this.eat(edible);
    }
  },this);

  for (var i = 0; i < this.snake.length - 1; i++) {
    if (this.snakeHead.position.equals(this.snake[i].position)) {
      this.snakeBodyGroup.remove(this.snake[i]);
      this.eat(this.snake[i]);

      var remove = this.snake.slice(0,i);
      this.snake = this.snake.slice(i+1);
      for (var j = 0; j < remove.length; j++) {
        var bodyBit = remove[j];
        this.snakeBodyGroup.remove(bodyBit);
        this.edibles.add(bodyBit);
      }
      break;
    }
  }
};

BasicGame.Monism.prototype.startEdibleTimer = function (edible) {
};

BasicGame.Monism.prototype.repositionEdible = function (edible) {

};

BasicGame.Monism.prototype.eat = function (edible) {

  this.appleSFX.play();

  this.snakeBitsToAdd = this.NEW_BODY_PIECES_PER_APPLE;
  this.addToScore(this.APPLE_SCORE);

  if (edible.text && edible.text != '') {
    edible.eatenText = edible.text;
    edible.text = '';
    edible.eatenX = edible.x;
    edible.eatenY = edible.y;
  }

  // Move it off screen
  edible.x = -1000;
  edible.y = -1000;

  this.edibles.add(edible);

  this.appleTimer.add(this.APPLE_DELAY,function () {
    if (edible.eatenText && edible.eatenText != '') {
      var x = (WALL_LEFT+1) + Math.floor(Math.random() * ((WALL_RIGHT - WALL_LEFT - 1)));
      var y = (WALL_TOP+1) + Math.floor(Math.random() * (WALL_BOTTOM - WALL_TOP - 1));
      edible.x = this.textGrid[y][x].x;
      edible.y = this.textGrid[y][x].y;
      this.textGrid[y][x].x = edible.eatenX;
      this.textGrid[y][x].y = edible.eatenY;
      edible.text = edible.eatenText;
      edible.eatenText = '';
    }
    else {
      edible.x = (WALL_LEFT+1)*this.GRID_SIZE + Math.floor(Math.random() * ((WALL_RIGHT - WALL_LEFT - 1))) * this.GRID_SIZE;
      edible.y = (WALL_TOP+1)*this.GRID_SIZE + Math.floor(Math.random() * (WALL_BOTTOM - WALL_TOP - 1)) * this.GRID_SIZE;
    }
  },this);
  this.appleTimer.start();

  // setTimeout(function () {
  //   if (edible.eatenText && edible.eatenText != '') {
  //     var x = (WALL_LEFT+1) + Math.floor(Math.random() * ((WALL_RIGHT - WALL_LEFT - 1)));
  //     var y = (WALL_TOP+1) + Math.floor(Math.random() * (WALL_BOTTOM - WALL_TOP - 1));
  //     edible.x = this.textGrid[y][x].x;
  //     edible.y = this.textGrid[y][x].y;
  //     this.textGrid[y][x].x = edible.eatenX;
  //     this.textGrid[y][x].y = edible.eatenY;
  //     edible.text = edible.eatenText;
  //     edible.eatenText = '';
  //   }
  //   else {
  //     edible.x = (WALL_LEFT+1)*this.GRID_SIZE + Math.floor(Math.random() * ((WALL_RIGHT - WALL_LEFT - 1))) * this.GRID_SIZE;
  //     edible.y = (WALL_TOP+1)*this.GRID_SIZE + Math.floor(Math.random() * (WALL_BOTTOM - WALL_TOP - 1)) * this.GRID_SIZE;
  //   }
  // }.bind(this),this.APPLE_DELAY);
}

BasicGame.Monism.prototype.checkBodyCollision = function () {
  // No death on body
};


BasicGame.Monism.prototype.checkWallCollision = function () {
  // No death on wall
};
