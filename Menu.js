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
	"Holism",
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
	"Utilitarianism",
	"",
	"pippinbarr.com"
];

BasicGame.Menu = function (game) {
	BasicGame.Snake.call(this,game);
};

BasicGame.Menu.prototype = Object.create(BasicGame.Snake.prototype);

BasicGame.Menu.prototype.create = function () {

	this.menuButtons = this.game.add.group();
	this.menuText = this.game.add.group();

	BasicGame.Snake.prototype.create.call(this);

	this.game.input.onDown.add(function() {
		this.appleSFX.play(0); 
	},this);

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
		this.snakeHead.x = -1*this.GRID_SIZE;
	}

	this.next = new Phaser.Point(0,0);
	this.prev = new Phaser.Point(0,0);
	this.selected = undefined;
	this.selectionComplete = false;
};

BasicGame.Menu.prototype.createMenu = function () {

	var x = 2;
	var y = 2
	this.addTextToGrid(x,y,[this.TITLE]);

	var uppercaseGameNames = games.slice(0);
	uppercaseGameNames.forEach(function(element,index,array) {
		array[index] = element.toUpperCase();
	});

	menuTop = 4;
	x = 2;
	y = menuTop;

	for (var i = 0; i < uppercaseGameNames.length; i++) {
		if (uppercaseGameNames[i] != "") {
			this.addTextToGrid(x,y,[uppercaseGameNames[i]],this.menuText,this.menuButtons,this.menuItemTouched);
		}
		y++;
	}

	menuBottom = menuTop + games.length - 1;

	var instructions = "OH NO."
	if (this.game.device.desktop) {
		instructions = ["UP/DOWN=SELECT","ENTER=PLAY"];
	}
	else {
		instructions = ["TOUCH ITEM TO PLAY"];
	}
	this.addTextToGrid(x,this.NUM_ROWS - 3,instructions);
};

BasicGame.Menu.prototype.menuItemTouched = function (item) {
	this.appleSFX.play();

	if (this.selected) return;
	this.snakeHead.y = item.y;
	for (var i = 0; i < this.snake.length; i++) {
		if (this.snake[i] != this.snakeHead) this.snake[i].y = item.y;
	}
	this.selectMenuItem();
};

BasicGame.Menu.prototype.update = function () {
	BasicGame.Snake.prototype.update.call(this);
	if (this.selected && !this.selectionComplete) {
		this.checkMenuCollision();
		if (this.snake[0].x > this.game.width) {
			if (this.selected == "Post-Apocalypticism") {
				this.game.state.start("PostApocalypticism")
			}
			else if (this.selected == "pippinbarr.com") {
				window.location = "http://www.pippinbarr.com/games/";
			}
			else {
				this.game.state.start(this.selected);
			}
			this.selectionComplete = true;
		}
	}
};

BasicGame.Menu.prototype.handleKeyboardInput = function () {

	if (this.selected) return;

	if (this.upKey.downDuration(10)) {
		this.moveSFX.play();
		if (this.snakeHead.y/this.GRID_SIZE == menuTop + games.length - 1) {
			this.snakeHead.y -= 2*this.GRID_SIZE;
		}
		else if (this.snakeHead.y/this.GRID_SIZE > menuTop) {
			this.snakeHead.y -= this.GRID_SIZE;
		}
		else {
			this.snakeHead.y = (menuTop - 1)*this.GRID_SIZE + games.length*this.GRID_SIZE;
		}
	}
	else if (this.downKey.downDuration(10)) {
		this.moveSFX.play();
		if (this.snakeHead.y/this.GRID_SIZE == menuTop + games.length - 3) {
			this.snakeHead.y += 2*this.GRID_SIZE;
		}
		else if (this.snakeHead.y/this.GRID_SIZE < menuBottom) {
			this.snakeHead.y += this.GRID_SIZE;
		}
		else {
			this.snakeHead.y = menuTop*this.GRID_SIZE;
		}
	}
	else if (this.enterKey.downDuration(10)) {
		this.selectMenuItem()
	}

	for (var i = 0; i < this.snake.length; i++) {
		this.snake[i].y = this.snakeHead.y;
	}
};

BasicGame.Menu.prototype.selectMenuItem = function () {
	this.next = new Phaser.Point(this.GRID_SIZE,0);
	this.selected = games[this.snakeHead.y/this.GRID_SIZE-menuTop];
	this.appleSFX.play();
};

BasicGame.Menu.prototype.checkMenuCollision = function () {
	if (this.snakeHead.x >= this.game.width) return;
	if (this.snakeHead.x < 0) return;

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
