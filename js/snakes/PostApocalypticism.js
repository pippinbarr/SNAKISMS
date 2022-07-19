BasicGame.PostApocalypticism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.PostApocalypticism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.PostApocalypticism.prototype.constructor = BasicGame.PostApocalypticism;

BasicGame.PostApocalypticism.prototype.create = function () {

  this.landGroup = this.game.add.group();

  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "PostApocalypticism";

  this.wallGroup.removeAll();
  for (var y = 0; y < this.NUM_ROWS; y++) {
    for (var x = 0; x < this.NUM_COLS; x++) {
      if (Math.random() < 0.1 && !(x*this.GRID_SIZE == this.snakeHead.x && y*this.GRID_SIZE == this.snakeHead.y)) {
        var wall = this.game.add.sprite(x*this.GRID_SIZE,y*this.GRID_SIZE,'wall');
        this.wallGroup.add(wall);
      }
      else {
        var landType = Math.floor(Math.random() * 5) + 1;
        var land = this.game.add.sprite(x*this.GRID_SIZE,y*this.GRID_SIZE,'postapocalyptic0'+landType);
        this.landGroup.add(land);
      }
    }
  }

  this.game.camera.follow(this.snakeHead);
};



BasicGame.PostApocalypticism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);
};

BasicGame.PostApocalypticism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);
};

BasicGame.PostApocalypticism.prototype.startAppleTimer = function () {
};
