
BasicGame.Preloader = function (game) {

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
		this.load.bitmapFont('atari', 'assets/fonts/atari.png', 'assets/fonts/atari.xml');

		this.load.image('head','assets/images/head.png');
		this.load.image('body','assets/images/body.png');
		this.load.image('apple','assets/images/apple.png');
		this.load.image('wall','assets/images/wall.png');
	},

	create: function () {

	},

	update: function () {

		if (this.ready == false)
		{
			this.ready = true;
			this.state.start('Extensionism');
		}

	}

};
