BasicGame.Stoicism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Stoicism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Stoicism.prototype.constructor = BasicGame.Stoicism;

BasicGame.Stoicism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Stoicism";
};

BasicGame.Stoicism.prototype.tick = function () {
  ticker.add(Phaser.Timer.SECOND * this.SNAKE_TICK, this.tick, this);

  this.prev = new Phaser.Point(this.next.x,this.next.y);

  if (this.dead) {
    this.snake.forEach(function (bit) {
      bit.visible = !bit.visible;
    });
    return;
  }

  this.addSnakeBits();
  this.checkBodyCollision();
  this.checkWallCollision();
  this.updateSnakePosition();
  this.checkAppleCollision();
  this.checkBodyCollision();
  this.checkWallCollision();
};

BasicGame.Stoicism.prototype.checkBodyCollision = function () {
  var nextPos = new Phaser.Point(this.snakeHead.x + this.next.x,this.snakeHead.y + this.next.y);
  this.snakeBodyGroup.forEach(function (bit) {
    if (nextPos.equals(bit.position)) {
      this.die();
      return;
    }
  },this);
};

BasicGame.Stoicism.prototype.checkWallCollision = function () {
  var nextPos = new Phaser.Point(this.snakeHead.x + this.next.x,this.snakeHead.y + this.next.y);
  this.wallGroup.forEach(function (bit) {
    if (nextPos.equals(bit.position)) {
      this.die();
      return;
    }
  },this);
};

BasicGame.Stoicism.prototype.die = function () {
  this.next = new Phaser.Point(0,0);
  this.hitSFX.play();
};

BasicGame.Stoicism.prototype.updateSnakePosition = function () {
  if (this.next.x == 0 && this.next.y == 0) return;

  BasicGame.Snake.prototype.updateSnakePosition.call(this);
};
