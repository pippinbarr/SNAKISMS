BasicGame.Romanticism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Romanticism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Romanticism.prototype.constructor = BasicGame.Romanticism;

BasicGame.Romanticism.prototype.create = function () {

  this.TITLE_DISPLAY_TIME = 5;
  this.MUSIC_FADE_TIME = 10;

  this.titleTimer = this.game.time.create(false);

  BasicGame.Snake.prototype.create.call(this);

  // this.moveSFX = this.game.add.audio('move',0.0);

  this.createTitleGrid();

  this.stateName = "Romanticism";

  this.displayingTitle = false;

  this.music = this.game.add.audio('romanticmusic',0.2,true);
  this.music.loop = true;
  this.music.loops = true;

  appleTexts.shuffle();
  this.appleIndex = 0;
};

BasicGame.Romanticism.prototype.createTitleGrid = function () {
  this.titleGrid = [];
  this.titleBG = this.game.add.sprite(0,0,'black');
  this.titleBG.width = this.game.width;
  this.titleBG.height = this.game.height;
  this.titleGroup = this.game.add.group();
  for (var y = 0; y < this.NUM_ROWS; y++) {
    this.titleGrid.push([]);
    for (var x = 0; x < this.NUM_COLS; x++) {
      var char = this.game.add.bitmapText(this.GRID_SIZE*0.5 + x*this.GRID_SIZE, y*this.GRID_SIZE, 'atari','',this.FONT_SIZE,this.textGroup);
      char.anchor.x = 0.5;
      char.tint = 0xffffff;
      char.scale.y = 24/this.FONT_SIZE;
      this.titleGrid[y].push(char);
      this.titleGroup.add(char);
    }
  }

  this.titleBG.visible = false;
  this.titleGroup.visible = false;
}

BasicGame.Romanticism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);
};

BasicGame.Romanticism.prototype.tick = function () {
  if (this.displayingTitle) {
    ticker.add(Phaser.Timer.SECOND * this.SNAKE_TICK, this.tick, this);
    return;
  }
  BasicGame.Snake.prototype.tick.call(this);
};

BasicGame.Romanticism.prototype.hideTitle = function () {
  this.titleBG.visible = false;
  this.titleGroup.visible = false;

  this.clearTitle();

  if (this.dead) {
    this.music.fadeOut(this.MUSIC_FADE_TIME * Phaser.Timer.SECOND);
  }

  this.inputEnabled = true;
  this.titleTimer.add(Phaser.Timer.SECOND * 1,this.restartTick,this);
  this.titleTimer.start();
};

BasicGame.Romanticism.prototype.restartTick = function () {
  this.displayingTitle = false;
  this.appleTimer.resume();
};

BasicGame.Romanticism.prototype.clearTitle = function () {
  for (var y = 0; y < this.NUM_ROWS; y++) {
    for (var x = 0; x < this.NUM_COLS; x++) {
      this.titleGrid[y][x].text = "";
    }
  }
};

BasicGame.Romanticism.prototype.displayTitle = function (text) {
  this.appleTimer.pause();
  this.inputEnabled = false;

  this.titleBG.visible = true;
  this.titleGroup.visible = true;

  this.addTitleToGrid(text);
  this.displayingTitle = true;
};

BasicGame.Romanticism.prototype.addTitleToGrid = function(text) {
  var theText = text.slice(0);

  theText.unshift("");
  theText.unshift("");
  theText.unshift("------------");
  theText.push("");
  theText.push("");
  theText.push("------------");

  var x;
  var y = Math.floor(this.NUM_ROWS/2) - Math.floor(theText.length/2);

  for (var i = 0; i < theText.length; i++) {
    x = Math.floor((this.NUM_COLS/2 - theText[i].length/2));
    for (var j = 0; j < theText[i].length; j++) {
      this.titleGrid[y][x].text = theText[i].charAt(j);
      x++;
    }
    y++;
  }
};

BasicGame.Romanticism.prototype.hideControls = function () {
  BasicGame.Snake.prototype.hideControls.call(this);

  this.music.loopFull();
};

BasicGame.Romanticism.prototype.checkAppleCollision = function () {

  if (this.snakeHead.position.equals(this.apple.position)) {
    this.displayTitle(appleTexts[this.appleIndex]);
    this.appleIndex++;
    if (this.appleIndex == appleTexts.length) {
      appleTexts.shuffle();
      this.appleIndex = 0;
    }
    this.titleTimer.add(Phaser.Timer.SECOND * this.TITLE_DISPLAY_TIME, this.hideTitle, this);
    this.titleTimer.start();
  }

  BasicGame.Snake.prototype.checkAppleCollision.call(this);
};

BasicGame.Romanticism.prototype.die = function () {
  BasicGame.Snake.prototype.die.call(this);

  var index = Math.floor(Math.random() * deathTexts.length);
  this.displayTitle(deathTexts[index]);

  this.titleTimer.add(Phaser.Timer.SECOND * this.TITLE_DISPLAY_TIME, this.hideTitle, this);
  this.titleTimer.start();
};

BasicGame.Romanticism.prototype.restart = function () {
  this.music.stop();
  BasicGame.Snake.prototype.restart.call(this);
};

BasicGame.Romanticism.prototype.gotoMenu = function () {
  this.music.stop();
  BasicGame.Snake.prototype.gotoMenu.call(this);
};




var deathTexts = [
  ["NOW I HAVE FOUND YOU","","MY SWEET OBLIVION"],
  ["NOW I AM WITH YOU","","MY LOVE"],
  ["NOW WE CAN BE","","TOGETHER AT LAST"],
  ["THE MERCY OF THIS","","SUDDEN SILENCE"],
  ["YOU ARE WITH ME NOW","","MY ANGEL"],
  ["THIS FINAL DARKNESS","","SUCH SWEET SOLACE"],
  ["I SEE A LIGHT","","AND KNOW YOU ARE THERE"],
  ["I AM COMING TO YOU NOW","","MY DARLING"],
  ["NOW WE WILL ALWAYS","","BE AS ONE"]
];

var appleTexts = [
  ["I THINK OF YOU","","EVERY MOMENT"],
  ["THE PLEASURES OF EARTH","","ARE EMPTY","","WITHOUT YOUR GRACE"],
  ["THERE WAS NO","","SWEETER APPLE","","THAN YOU, MY LOVE"],
  ["WHAT JOY IS EATING","","WITHOUT YOU","","TO SHARE IT WITH?"],
  ["FOOD IS LIKE ASHES","","KNOWING YOU ARE GONE"],
  ["I MISS YOUR","","MYSTERIOUS SMILE","","SO MUCH"],
  ["LIFE WITHOUT YOU","","IS BARELY LIVING","","AT ALL"],
  ["I CAN BARELY EAT","","KNOWING I CANNOT","","SEE YOU AGAIN"],
  ["WHY DID YOU LEAVE ME?","","I CANNOT STAND","","THIS EMPTY LIFE"],
  ["THE DISTRACTIONS OF","","FOOD AND WINE","","ARE NOTHING TO ME"],
  ["HOW CAN YOU","","BE GONE","","WHEN I NEED YOU","","WITH ME?"],
  ["OH THAT THIS APPLE","","COULD MAKE ME SLEEP","","FOREVER"]
];

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}
