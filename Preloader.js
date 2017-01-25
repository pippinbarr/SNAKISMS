
BasicGame.Preloader = function (game) {

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		this.preloadBar.y = this.game.canvas.height/2 - this.preloadBar.height/2;
		this.load.setPreloadSprite(this.preloadBar);

		this.load.bitmapFont('atari', 'assets/fonts/atari.png', 'assets/fonts/atari.xml');

		this.load.image('head','assets/images/head.png');
		this.load.image('body','assets/images/body.png');
		this.load.image('apple','assets/images/apple.png');
		this.load.image('wall','assets/images/wall.png');
		this.load.image('black','assets/images/black.png');
		this.load.image('postapocalyptic01','assets/images/postapocalyptic01.png');
		this.load.image('postapocalyptic02','assets/images/postapocalyptic02.png');
		this.load.image('postapocalyptic03','assets/images/postapocalyptic03.png');
		this.load.image('postapocalyptic04','assets/images/postapocalyptic04.png');
		this.load.image('postapocalyptic05','assets/images/postapocalyptic05.png');

		this.load.audio('romanticmusic',['assets/sounds/romanticmusic.mp3','assets/sounds/romanticmusic.ogg']);
		this.load.audio('hit',['assets/sounds/hit.mp3','assets/sounds/hit.ogg']);
		this.load.audio('apple',['assets/sounds/apple.mp3','assets/sounds/apple.ogg']);
		this.load.audio('move',['assets/sounds/move.mp3','assets/sounds/move.ogg']);
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {

		if (this.cache.isSoundDecoded('romanticmusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('Menu');
		}

	}

};
