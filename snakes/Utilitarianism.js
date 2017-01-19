BasicGame.Utilitarianism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Utilitarianism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Utilitarianism.prototype.constructor = BasicGame.Utilitarianism;

BasicGame.Utilitarianism.prototype.create = function () {
  this.SNAKE_START_X = 3;
  this.SNAKE_START_Y = 18;

  this.apples = this.game.add.group();

  BasicGame.Snake.prototype.create.call(this);

  this.GAME_OVER_X = 3;
  this.GAME_OVER_Y = 12;

  this.apples.add(this.apple);
  this.apple.visible = true;
  this.apple.x = 20*this.GRID_SIZE;
  this.apple.y = 18*this.GRID_SIZE;

  var applesStartX = 12*this.GRID_SIZE;
  for (var i = 0; i < 5; i++) {
    var apple = this.apples.create(applesStartX+this.GRID_SIZE*i*2,16*this.GRID_SIZE,'apple');
  }

  this.stateName = "Utilitarianism";
};

BasicGame.Utilitarianism.prototype.gameOver = function () {
  if (this.score == 50) {
    this.setGameOverText("YOU WIN","",this.score+" POINTS","","");
  }
  else {
    this.setGameOverText("YOU LOSE","",this.score+" POINTS","","");
  }
};


BasicGame.Utilitarianism.prototype.createWalls = function () {
  // Create the walls
  WALL_LEFT = 2;
  WALL_TOP = 11;

  var WALLS = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]

  this.wallGroup = this.game.add.group();
  for (var y = 0; y < WALLS.length; y++) {
    for (var x = 0; x < WALLS[y].length; x++) {
      if (WALLS[y][x]) {
        var wall = this.wallGroup.create((WALL_LEFT+x)*this.GRID_SIZE,(WALL_TOP+y)*this.GRID_SIZE,'wall')
      }
    }
  }
};

BasicGame.Utilitarianism.prototype.checkAppleCollision = function () {
  this.apples.forEach(function (apple) {
    if (this.snakeHead.position.equals(apple.position)) {
      this.appleSFX.play();
      apple.x = -1000;
      apple.y = -1000;
      apple.visible = false;
      this.snakeBitsToAdd += this.NEW_BODY_PIECES_PER_APPLE;
      this.addToScore(this.APPLE_SCORE);
    }
  },this);
};

BasicGame.Utilitarianism.prototype.repositionApple = function () {
};
