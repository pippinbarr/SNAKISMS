
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

		this.createTextSpace();
		this.addTitle();
		this.addGames();

	},

	update: function () {

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
		for (var i = 0; i < games.length; i++) {
			this.addGame(games[i],i);
		}
	},

	addGame: function (game,index) {
		var y = 4 + index;
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

};
