games = [
	"Anthropomorphism",
	"Apocalypticism",
	"Asceticism",
	"Capitalism",
	"Casualism",
	"Conservatism",
	"Determinism",
	"Dualism",
	"Existentialism",
	"Holisticism",
	"Idealism",
	"Monism",
	"Narcissism",
	"Nihilism",
	"Optimism",
	"Pessimism",
	"Positivism",
	"Post-Apocalypticism",
	"Romanticism",
	"Stoicism",
	"Subjectivism",
	"Utilitarianism",
];

BasicGame.Menu = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Menu.prototype = Object.create(BasicGame.Snake.prototype);

BasicGame.Menu.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.TITLE = "SNAKISMS";
  this.SNAKE_TICK = 0.02;

  this.createMenu();

  this.snakeHead.y = menuTop*this.GRID_SIZE;
  if (this.game.device.desktop) {
    this.snakeHead.x = 0;
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }
  else {
    this.snakeHead.x = -1*GRID_SIZE;
  }

  this.next = new Phaser.Point(0,0);
  this.prev = new Phaser.Point(0,0);
  this.selected = undefined;
};

BasicGame.Menu.prototype.createMenu = function () {

  var y = 2
  var x = 2;

  this.addTextToGrid(x,y,[this.TITLE]);

  var uppercaseGameNames = games.slice(0);
  uppercaseGameNames.forEach(function(element,index,array) {
    array[index] = element.toUpperCase();
  });

  menuTop = 4;
  x = 2;
  y = menuTop;

  this.addTextToGrid(x,y,uppercaseGameNames);

  menuBottom = menuTop + games.length - 1;
};

BasicGame.Menu.prototype.menuItemTouched = function (item) {
  if (selected) return;
  head.y = item.y;
  for (var i = 0; i < snake.length; i++) {
    if (snake[i] != head) snake[i].y = item.y;
  }
  this.selectMenuItem();
};

BasicGame.Menu.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);
  if (this.selected) {
    this.checkMenuCollision();
    if (this.snake[0].x > this.game.width) {
			if (this.selected == "Post-Apocalypticism") {
				this.game.state.start("PostApocalypticism")
			}
			else {
      	this.game.state.start(this.selected);
			}
    }
  }
};

BasicGame.Menu.prototype.handleKeyboardInput = function () {
  if (this.selected) return;
  if (this.upKey.downDuration(10)) {
    if (this.snakeHead.y/this.GRID_SIZE > menuTop) {
      this.snakeHead.y -= this.GRID_SIZE;
      for (var i = 0; i < this.snake.length; i++) {
        if (this.snake[i] != this.snakeHead) this.snake[i].y -= this.GRID_SIZE;
      }
    }
  }
  else if (this.downKey.downDuration(10)) {
    if (this.snakeHead.y/this.GRID_SIZE < menuBottom) {
      this.snakeHead.y += this.GRID_SIZE;
      for (var i = 0; i < this.snake.length; i++) {
        if (this.snake[i] != this.snakeHead) this.snake[i].y += this.GRID_SIZE;
      }
    }
  }
  else if (this.enterKey.downDuration(10)) {
    this.selectMenuItem()
  }
};

BasicGame.Menu.prototype.selectMenuItem = function () {
    this.next = new Phaser.Point(this.GRID_SIZE,0);
    this.selected = games[this.snakeHead.y/this.GRID_SIZE-menuTop];
		this.appleSFX.play();
};

BasicGame.Menu.prototype.checkMenuCollision = function () {
  if (this.snakeHead.x >= this.game.width) return;
  var x = this.snakeHead.x/this.GRID_SIZE;
  var y = this.snakeHead.y/this.GRID_SIZE;
  if (this.textGrid[y][x].text != '') {
    this.textGrid[y][x].text = '';
    this.snakeBitsToAdd += 1;
  }
};

BasicGame.Menu.prototype.updateSnakePosition = function () {
	for (var i = 0; i < this.snake.length - 1; i++) {
		this.snake[i].x = this.snake[i+1].x;
		this.snake[i].y = this.snake[i+1].y;
	}
	this.snakeHead.x += this.next.x;
	this.snakeHead.y += this.next.y;
};

BasicGame.Menu.prototype.createInput = function () {
};

BasicGame.Menu.prototype.createApple = function () {
};

BasicGame.Menu.prototype.createInstructions = function () {
};

BasicGame.Menu.prototype.createControls = function () {
};

BasicGame.Menu.prototype.handleTouchInput = function () {
};

BasicGame.Menu.prototype.checkAppleCollision = function () {
};

BasicGame.Menu.prototype.createWalls = function () {
};

BasicGame.Menu.prototype.checkWallCollision = function () {
};

BasicGame.Menu.prototype.checkBodyCollision = function () {
};

BasicGame.Menu.prototype.setScoreText = function () {
};

BasicGame.Menu.prototype.constructor = BasicGame.Snake;
