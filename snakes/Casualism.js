BasicGame.Casualism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Casualism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Casualism.prototype.constructor = BasicGame.Casualism;

BasicGame.Casualism.prototype.create = function () {
  this.NUM_ROWS = this.game.height/this.GRID_SIZE;
  this.NUM_COLS = this.game.width/this.GRID_SIZE;

  this.textGrid = [];
  this.createTextGrid();

  this.apples = this.createSpriteGrid('apple');
  this.walls = this.createSpriteGrid('wall');
  this.snakeHeads = this.createSpriteGrid('head');
  this.snakeBodies = this.createSpriteGrid('body');

  this.options = [0,1,2,3,4,5];
  this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  this.stateName = "Casualism";

  this.moveSFX = this.game.add.audio('move',0.2);
  this.hitSFX = this.game.add.audio('hit',0.2);
  this.appleSFX = this.game.add.audio('apple',0.2);

  ticker = this.game.time.create(false);
  ticker.add(Phaser.Timer.SECOND * this.SNAKE_TICK, this.tick, this);
  ticker.start();
};

BasicGame.Casualism.prototype.createSpriteGrid = function(spriteName) {
  var grid = new Array(this.NUM_ROWS);
  for (var y = 0; y < this.NUM_ROWS; y++) {
    grid[y] = new Array(this.NUM_COLS);
    for (var x = 0; x < grid[y].length; x++) {
      var sprite = this.game.add.sprite(x*this.GRID_SIZE,y*this.GRID_SIZE,spriteName);
      sprite.visible = false;
      grid[y][x] = sprite;
    }
  }
  return grid;
};

BasicGame.Casualism.prototype.update = function () {
};


BasicGame.Casualism.prototype.tick = function () {
  var r = Math.random();
  if (r < 0.2) {
    this.moveSFX.play();
  }
  else if (r < 0.4) {
    this.hitSFX.play();
  }
  else if (r < 0.6) {
    this.appleSFX.play();
  }

  for (var y = 0; y < this.NUM_ROWS; y++) {
    for (var x = 0; x < this.NUM_COLS; x++) {
      this.textGrid[y][x].visible = false;
      this.apples[y][x].visible = false;
      this.snakeHeads[y][x].visible = false;
      this.snakeBodies[y][x].visible = false;
      this.walls[y][x].visible = false;

      var option = this.options[Math.floor(Math.random() * this.options.length)];
      switch (option) {
        case 0:
        break;

        case 1:
        this.textGrid[y][x].visible = true;
        this.textGrid[y][x].text = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        break;

        case 2:
        this.apples[y][x].visible = true;
        break;

        case 3:
        this.snakeHeads[y][x].visible = true;
        break;

        case 4:
        this.snakeBodies[y][x].visible = true;
        break;

        case 5:
        this.walls[y][x].visible = true;
        break;
      }
    }
  }
  ticker.add(Phaser.Timer.SECOND * this.SNAKE_TICK, this.tick, this);

  if (Math.random() < 0.025) {
    this.game.state.start('Menu');
  }
};
