BasicGame.Menu = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Menu.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Menu.prototype.constructor = BasicGame.Snake;


BasicGame.Menu.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  SNAKE_TICK = 0.02;

  this.createMenu();

  head.y = menuTop*GRID_SIZE;
  if (this.game.device.desktop) {
    head.x = 0;
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }
  else {
    head.x = -1*GRID_SIZE;
  }

  next = new Phaser.Point(0,0);
  prev = new Phaser.Point(0,0);
  selected = undefined;
};

games = [
	"Snake",
	"Anthropomorphicism",
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
	"Nihilism",
	"Optimism",
	"Pessimism",
	"Positivism",
	"Post-apocalypticism",
	"Romanticism",
	"Stoicism",
	"Subjectivism",
	"Utilitarianism",
];


BasicGame.Menu.prototype.createMenu = function () {
  menuTop = 4;
  for (var i = 0; i < games.length; i++) {
    var y = menuTop + i;
		var x = 2;
		var gameName = games[i].toUpperCase();
		for (var j = 0; j < gameName.length; j++) {
			text[y][x].text = gameName.charAt(j);
			text[y][x].name = games[i];
			text[y][x].inputEnabled = true;
			text[y][x].events.onInputDown.add(this.menuItemTouched,this);
			x++;
		}
  }
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
  if (selected) {
    this.checkMenuCollision();
    if (snake[0].x > this.game.width) {
      this.game.state.start(selected);
    }
  }
};

BasicGame.Menu.prototype.handleKeyboardInput = function () {
  if (selected) return;
  if (this.upKey.downDuration(10)) {
    if (head.y/GRID_SIZE > menuTop) {
      head.y -= GRID_SIZE;
      for (var i = 0; i < snake.length; i++) {
        if (snake[i] != head) snake[i].y -= GRID_SIZE;
      }
    }
  }
  else if (this.downKey.downDuration(10)) {
    if (head.y/GRID_SIZE < menuBottom) {
      head.y += GRID_SIZE;
      for (var i = 0; i < snake.length; i++) {
        if (snake[i] != head) snake[i].y += GRID_SIZE;
      }
    }
  }
  else if (this.enterKey.downDuration(10)) {
    this.selectMenuItem()
  }
};

BasicGame.Menu.prototype.selectMenuItem = function () {
    next = new Phaser.Point(GRID_SIZE,0);
    selected = games[head.y/GRID_SIZE-menuTop];
};

BasicGame.Menu.prototype.checkMenuCollision = function () {
  if (head.x >= this.game.width) return;
  if (text[head.y/GRID_SIZE][head.x/GRID_SIZE].text != '') {
    text[head.y/GRID_SIZE][head.x/GRID_SIZE].text = '';
    bodyPiecesToAdd += 1;
  }
};

BasicGame.Menu.prototype.createInput = function () {
};

BasicGame.Menu.prototype.createApple = function () {
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
