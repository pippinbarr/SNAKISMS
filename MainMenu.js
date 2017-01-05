
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

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

BasicGame.MainMenu.prototype = {

	create: function () {

		NUM_ROWS = this.game.height/GRID_SIZE;
    NUM_COLS = this.game.width/GRID_SIZE;

		if (this.game.device.desktop) {
			console.log("Keyboard setup...");
			this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
			this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
			this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

		this.createTextSpace();
		this.addTitle();
		this.addGames();
		this.createSnake();

	},

	update: function () {
		if (this.game.device.desktop) {
			this.handleKeyboardInput();
		}
	},

	addTitle: function() {
		var title = "SNAKISMS";
		var y = 2
		var x = 2;
		for (var i = 0; i < title.length; i++) {
			text[y][x].text = title.charAt(i);
			x++;
		}
	},

	addGames: function () {
		menuTop = 4;
		for (var i = 0; i < games.length; i++) {
			this.addGame(games[i],i);
		}
		menuBottom = menuTop + games.length - 1;
	},

	addGame: function (game,index) {
		var y = menuTop + index;
		var x = 2;
		var gameName = game.toUpperCase();
		for (var i = 0; i < gameName.length; i++) {
			text[y][x].text = gameName.charAt(i);
			text[y][x].name = game;
			text[y][x].inputEnabled = true;
			text[y][x].events.onInputDown.add(this.menuItemSelected,this);
			x++;
		}
	},

	menuItemSelected: function (item) {
		this.game.state.start(item.name);
	},

	createTextSpace: function () {
    text = [];
    textGroup = this.game.add.group();
    for (var y = 0; y < NUM_ROWS; y++) {
      text.push([]);
      for (var x = 0; x < NUM_COLS; x++) {
        var charSize = 24;
        var char = this.game.add.bitmapText(GRID_SIZE/2 + x*GRID_SIZE, y*GRID_SIZE, 'atari','',charSize,textGroup);
        char.anchor.x = 0.5;
        char.tint = 0xffffff;
        char.scale.y = 24/charSize;
        text[y].push(char);
      }
    }
	},

	createSnake: function () {
		// Create the snake
		snake = [];
		snakeGroup = this.game.add.group();

		var headX = 0;
		if (!this.game.device.desktop) {
			headX = -1*GRID_SIZE;
		}

		head = this.game.add.sprite(headX,4*GRID_SIZE,'head',snakeGroup);
		snake.unshift(head);

		for (var i = 0; i < SNAKE_START_LENGTH; i++) {
			var snakeBit = snakeGroup.create(-(i+1)*GRID_SIZE,0,'body');
			snake.unshift(snakeBit);
		}
	},

	handleKeyboardInput: function (event) {
		if (this.upKey.downDuration(10)) {
			if (head.y/GRID_SIZE > menuTop) head.y -= GRID_SIZE;
		}
		else if (this.downKey.downDuration(10)) {
			if (head.y/GRID_SIZE < menuBottom) head.y += GRID_SIZE;
		}
		else if (this.enterKey.downDuration(10)) {
			this.selectMenuItem(head.y)
		}
	},

	selectMenuItem: function (y) {
		this.game.state.start(games[head.y/GRID_SIZE-menuTop])
	},


};
