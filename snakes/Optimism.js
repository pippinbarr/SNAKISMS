BasicGame.Optimism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Optimism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Optimism.prototype.constructor = BasicGame.Snake;

BasicGame.Optimism.prototype.create = function () {
  this.apples = this.game.add.group();

  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Optimism";
  this.apples.add(this.apple);
};

BasicGame.Optimism.prototype.checkAppleCollision = function () {
  this.apples.forEach(function (apple) {
    if (this.snakeHead.position.equals(apple.position)) {
      apple.x = -1000;
      apple.y = -1000;
      apple.visible = false;
      this.startAppleTimer(apple);
      this.addToScore(this.APPLE_SCORE);
    }
  },this);
};

BasicGame.Optimism.prototype.hideControls = function () {
  BasicGame.Snake.prototype.hideControls.call(this);
};

BasicGame.Optimism.prototype.startAppleTimer = function (apple) {
  if (!apple) apple = this.apple;
  setTimeout(function () {
    this.repositionApple(apple);
  }.bind(this),this.APPLE_DELAY);
};

BasicGame.Optimism.prototype.repositionApple = function (apple) {
  apple.visible = true;
  apple.x = (WALL_LEFT+1)*this.GRID_SIZE + Math.floor(Math.random() * ((WALL_RIGHT - WALL_LEFT - 1))) * this.GRID_SIZE;
  apple.y = (WALL_TOP+1)*this.GRID_SIZE + Math.floor(Math.random() * (WALL_BOTTOM - WALL_TOP - 1)) * this.GRID_SIZE;

  if (this.apples.length < 300) {
    var apple = this.apples.create(-1000,-1000,'apple');
    apple.visible = false;
    this.startAppleTimer(apple);
  }
};
