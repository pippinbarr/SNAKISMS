BasicGame.Positivism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Positivism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Positivism.prototype.constructor = BasicGame.Positivism;

BasicGame.Positivism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Positivism";

  // this.snakeBitsToAdd = 3;

  this.flashVisible = true;

  this.visibles = [];
  this.visibles.push(this.apple);
  this.textGroup.forEach(function (text) {
    this.visibles.push(text);
  },this);
  this.wallGroup.forEach(function (wall) {
    this.visibles.push(wall);
  },this);
  this.snakeBodyGroup.forEach(function (bit) {
    this.visibles.push(bit);
  },this);
};

BasicGame.Positivism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);
};

BasicGame.Positivism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);

  if (!this.dead) {
    this.visibles.forEach(function (object) {
      this.setVisibility(object,this.next,true);
    },this);
  }
};

BasicGame.Positivism.prototype.flashSnake = function () {
  this.snakeBodyGroup.forEach(function (object) {
    this.setVisibility(object,this.lastNext,this.flashVisible);
  },this);
  this.snakeHead.visible = this.flashVisible;
  this.flashVisible = !this.flashVisible;
};

BasicGame.Positivism.prototype.addSnakeBits = function () {
  if (this.next.x == 0 && this.next.y == 0) return;

  if (this.snakeBitsToAdd > 0) {
    var bit = this.snakeBodyGroup.create(0,0,'body');
    this.game.physics.enable(bit,Phaser.Physics.ARCADE);
    this.snake.unshift(bit)
    this.snakeBitsToAdd = Math.max(0,this.snakeBitsToAdd-1);
    this.visibles.push(bit);
    this.setVisibility(bit,this.next,true);
  }
},

BasicGame.Positivism.prototype.setVisibility = function (object,next,visibility) {
  var angle = this.game.physics.arcade.angleBetween(this.snakeHead, object);
  if (next.x > 0) {
    if (angle < Math.PI/4 && angle > -Math.PI/4) {
      object.visible = visibility;
    }
    else {
      object.visible = false;
    }
  }
  else if (next.x < 0) {
    if (angle > 3*Math.PI/4 || angle < -3*Math.PI/4) {
      object.visible = visibility;
    }
    else {
      object.visible = false;
    }
  }
  else if (next.y > 0) {
    if (angle > Math.PI/4 && angle < 3*Math.PI/4) {
      object.visible = visibility;
    }
    else {
      object.visible = false;
    }
  }
  else if (next.y < 0) {
    if (angle < -Math.PI/4 && angle > -3*Math.PI/4) {
      object.visible = visibility;
    }
    else {
      object.visible = false;
    }
  }
};

BasicGame.Positivism.prototype.repositionApple = function () {

  var positioned = BasicGame.Snake.prototype.repositionApple.call(this);

  // this.apple.x = (WALL_LEFT+1)*this.GRID_SIZE + Math.floor(Math.random() * ((WALL_RIGHT - WALL_LEFT - 1))) * this.GRID_SIZE;
  // this.apple.y = (WALL_TOP+1)*this.GRID_SIZE + Math.floor(Math.random() * (WALL_BOTTOM - WALL_TOP - 1)) * this.GRID_SIZE;

  if (positioned) {
    this.setVisibility(this.apple,this.next,true);
  }
};
