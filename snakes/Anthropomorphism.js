BasicGame.Anthropomorphism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Anthropomorphism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Anthropomorphism.prototype.constructor = BasicGame.Anthropomorphism;

BasicGame.Anthropomorphism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.appleNext = new Phaser.Point(0,0);
  this.stateName = 'Anthropomorphism';
};

BasicGame.Anthropomorphism.prototype.tick = function () {
  this.updateApple();

  BasicGame.Snake.prototype.tick.call(this);
};

BasicGame.Anthropomorphism.prototype.updateApple = function () {
  if (!this.apple.visible) return;

  var xDist = Math.abs(this.apple.x - this.snakeHead.x);
  var yDist = Math.abs(this.apple.y - this.snakeHead.y);
  if ((xDist == this.GRID_SIZE && yDist == 0) || (yDist ==this.GRID_SIZE && xDist == 0)) {
    return;
  }

  this.getAppleNext();

  var nextApplePos = new Phaser.Point(this.apple.x+this.appleNext.x,this.apple.y+this.appleNext.y);
  var hitWall = false;
  this.wallGroup.forEach(function (wall) {
    if (nextApplePos.equals(wall.position)) {
      hitWall = true;
      return;
    }
  },this);

  if (hitWall) return;

  var hitBody = false;
  this.snakeBodyGroup.forEach(function (bit) {
    if (nextApplePos.equals(bit.position)) {
      hitBody = true;
      return;
    }
  },this);

  if (hitBody) return;

  this.apple.x += this.appleNext.x;
  this.apple.y += this.appleNext.y;
};

BasicGame.Anthropomorphism.prototype.getAppleNext = function () {
  var appleDirs = ["LEFT","RIGHT","UP","DOWN"];
  if (this.apple.visible) {
    if (Math.random() < 0.25) {
      var dir = appleDirs[Math.floor(Math.random() * appleDirs.length)];
      // Change direction
      switch (dir) {
        case "LEFT":
        this.appleNext = new Phaser.Point(-this.GRID_SIZE,0);
        break;

        case "RIGHT":
        this.appleNext = new Phaser.Point(this.GRID_SIZE,0);
        break;

        case "UP":
        this.appleNext = new Phaser.Point(0,-this.GRID_SIZE);
        break;

        case "DOWN":
        this.appleNext = new Phaser.Point(0,this.GRID_SIZE);
        break;
      }
    }
  }
};
