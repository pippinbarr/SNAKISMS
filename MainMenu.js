
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.stage.backgroundColor = "#ccc";
		this.setScoreText(score.toString());

	},

	update: function () {

	},

};
