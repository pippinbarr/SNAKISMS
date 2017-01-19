
BasicGame.Snake = function (game) {
};



BasicGame.Snake.prototype = {

  GRID_SIZE: 20,
  NUM_ROWS: 0,
  NUM_COLS: 0,
  FONT_SIZE: 24,
  SNAKE_START_LENGTH: 4,
  SNAKE_START_X: 11,
  SNAKE_START_Y: 11,
  SNAKE_TICK: 0.15,
  NEW_BODY_PIECES_PER_APPLE: 3,
  SNAKE_FLICKER_SPEED: 0.2,
  APPLE_SCORE: 10,
  MAX_SCORE: 9999999990,
  APPLE_DELAY: 1500,
  DEATH_DELAY: 3,

  textGrid: [],

  score: 0,
  next: new Phaser.Point(0,0),
  prev: new Phaser.Point(0,0),
  bodyPiecesToAdd: 0,
  dead: false,

  snakeHead: null,
  snakeBodyGroup: null,
  wallGroup: null,
  apple: null,


  create: function () {

    this.textGrid = [];
    this.dead = false;
    this.stateName = 'Snake';
    this.inputEnabled = true;

    this.NUM_ROWS = this.game.height/this.GRID_SIZE;
    this.NUM_COLS = this.game.width/this.GRID_SIZE;
    this.CONTROLS_X = 8;
    this.CONTROLS_Y = 7;

    this.instructionsButtonGroup = this.game.add.group();

    this.createWalls();
    this.createApple();
    this.createTexts();
    this.createSnake();
    this.createInput();

    this.moveSFX = this.game.add.audio('move',0.2);
    this.hitSFX = this.game.add.audio('hit',0.2);
    this.appleSFX = this.game.add.audio('apple',0.2);

    // Set up for score
    this.score = 0;
    this.scoreX = this.NUM_COLS - 2;
    this.scoreY = 1;
    this.setScoreText(this.score.toString());

    // Set up for game over
    this.GAME_OVER_X = 4;
    this.GAME_OVER_Y = Math.floor(this.NUM_ROWS/2) - 2;

    this.appleTimer = this.game.time.create(false);

    // Create the update tick
    ticker = this.game.time.create(false);
    ticker.add(Phaser.Timer.SECOND * this.SNAKE_TICK, this.tick, this);
    ticker.start();
  },

  createWalls: function () {
    // Create the walls
    WALL_LEFT = 1;
    WALL_RIGHT = this.NUM_COLS-2;
    WALL_TOP = 3;
    WALL_BOTTOM = this.NUM_ROWS - WALL_TOP - 1;

    this.wallGroup = this.game.add.group();
    for (var y = WALL_TOP; y <= WALL_BOTTOM; y++) {
      for (var x = WALL_LEFT; x <= WALL_RIGHT; x++) {
        if (y == WALL_TOP || y == WALL_BOTTOM || x == WALL_LEFT || x == WALL_RIGHT) {
          // var wall = this.wallGroup.create(x*this.GRID_SIZE,y*this.GRID_SIZE,'wall')
          var wall = this.wallGroup.create(x*this.GRID_SIZE,y*this.GRID_SIZE,'wall')
          // this.game.physics.enable(wall, Phaser.Physics.ARCADE);
        }
      }
    }
  },

  createSnake: function () {
    this.snake = [];
    this.snakeBodyGroup = this.game.add.group();
    this.snakeHead = this.game.add.sprite(this.SNAKE_START_X*this.GRID_SIZE,this.SNAKE_START_Y*this.GRID_SIZE,'head');
    this.game.physics.enable(this.snakeHead, Phaser.Physics.ARCADE);
    this.snake.unshift(this.snakeHead);

    this.snakeBitsToAdd = 3;
  },

  createApple: function () {
    this.apple = this.game.add.sprite(-100,-100,'apple');
    this.game.physics.enable(this.apple, Phaser.Physics.ARCADE);
  },

  createInput: function () {
    if (this.game.device.desktop) {
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
      this.mKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
      this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.R)
      this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.M)
    }
    else {
      this.swipe = new Swipe(this.game);
      this.swipe.diagonalDisabled = true;
    }
    this.next = new Phaser.Point(0,0);
  },

  createTexts: function () {

    this.instructionsGroup = this.game.add.group();
    this.controlsGroup = this.game.add.group();

    this.createTextGrid();
    this.createInstructions();
    this.createControls();
  },

  createTextGrid: function () {
    this.textGroup = this.game.add.group();
    for (var y = 0; y < this.NUM_ROWS; y++) {
      this.textGrid.push([]);
      for (var x = 0; x < this.NUM_COLS; x++) {
        var char = this.game.add.bitmapText(this.GRID_SIZE*0.5 + x*this.GRID_SIZE, y*this.GRID_SIZE, 'atari','',this.FONT_SIZE,this.textGroup);
        char.anchor.x = 0.5;
        char.tint = 0xffffff;
        char.scale.y = 24/this.FONT_SIZE;
        this.textGrid[y].push(char);
      }
    }
  },

  addTextToGrid(startX,startY,text,group,buttonGroup,callback) {
    var x = startX;
    var y = startY;

    for (var i = 0; i < text.length; i++) {
      x = startX;
      for (var j = 0; j < text[i].length; j++) {
        this.textGrid[y][x].text = text[i].charAt(j);
        if (group) {
          group.add(this.textGrid[y][x]);
        }
        if (buttonGroup) {
          var sprite = buttonGroup.create(x*this.GRID_SIZE,y*this.GRID_SIZE,'black');
          sprite.inputEnabled = true;
          sprite.name = text;
          sprite.events.onInputDown.add(callback,this);
        }
        x++;
      }
      y++;
    }
  },

  createInstructions: function () {
    var instructionsY = this.NUM_ROWS - 2;
    var instructionsX = 1;

    if (this.game.device.desktop) {
      this.addTextToGrid(instructionsX,instructionsY,["R=RESTART M=MENU"],this.textGroup);
    }
    else {
      this.addTextToGrid(instructionsX,instructionsY,["RESTART"],this.textGroup,this.instructionsButtonGroup,this.restart);
      this.addTextToGrid(instructionsX+9,instructionsY,["MENU"],this.textGroup,this.instructionsButtonGroup,this.gotoMenu);
    }
  },

  createControls: function () {
    var controlsStrings = [];
    if (this.game.device.desktop) {
      controlsStrings = ["ARROWS","CONTROL","SNAKE"];
    }
    else {
      controlsStrings = ["SWIPES","CONTROL","SNAKE"];
    }

    this.addTextToGrid(this.CONTROLS_X,this.CONTROLS_Y,controlsStrings,this.controlsGroup);
    this.controlsVisible = true;
  },

  update: function () {
    if (this.game.device.desktop) {
      this.handleKeyboardInput();
    }
    else {
      this.handleTouchInput();
    }
  },

  setScoreText: function (scoreString) {
    if (scoreString.length < this.MAX_SCORE.toString().length) {
      var spacesToAdd = (this.MAX_SCORE.toString().length - scoreString.length)+1;
      scoreString = Array(spacesToAdd).join(" ") + scoreString;
    }
    this.addTextToGrid(this.scoreX-scoreString.length,this.scoreY,[scoreString]);
  },

  setGameOverText: function (gameOverString,spacing,gameOverPointsString,spacing2,gameOverResultString) {
    this.addTextToGrid(this.GAME_OVER_X,this.GAME_OVER_Y,[gameOverString,spacing,gameOverPointsString,spacing2,gameOverResultString]);
  },

  tick: function () {
    ticker.add(Phaser.Timer.SECOND * this.SNAKE_TICK, this.tick, this);

    this.prev = new Phaser.Point(this.next.x,this.next.y);

    if (this.dead) {
      this.flashSnake();
      return;
    }

    this.addSnakeBits();
    this.updateSnakePosition();
    this.checkAppleCollision();
    this.checkBodyCollision();
    this.checkWallCollision();
  },

  flashSnake: function () {
    this.snake.forEach(function (bit) {
      bit.visible = !bit.visible;
    });
  },

  addSnakeBits: function () {
    if (this.next.x == 0 && this.next.y == 0) return;

    if (this.snakeBitsToAdd > 0) {
      var bit = this.snakeBodyGroup.create(0,0,'body');
      this.game.physics.enable(bit,Phaser.Physics.ARCADE);
      this.snake.unshift(bit)
      this.snakeBitsToAdd = Math.max(0,this.snakeBitsToAdd-1);
    }
  },

  updateSnakePosition: function () {
    if (this.next.x == 0 && this.next.y == 0) {
      return;
    }

    this.moveSFX.play();

    for (var i = 0; i < this.snake.length - 1; i++) {
      this.snake[i].x = this.snake[i+1].x;
      this.snake[i].y = this.snake[i+1].y;
    }
    this.snakeHead.x += this.next.x;
    this.snakeHead.y += this.next.y;

    if (this.snakeHead.x >= this.game.width) {
      this.snakeHead.x = 0;
    }
    else if (this.snakeHead.x < 0) {
      this.snakeHead.x = this.game.width - this.GRID_SIZE;
    }
    if (this.snakeHead.y >= this.game.height) {
      this.snakeHead.y = 0;
    }
    else if (this.snakeHead.y < 0) {
      this.snakeHead.y = this.game.height - this.GRID_SIZE;
    }
  },

  checkAppleCollision: function () {
    if (this.snakeHead.position.equals(this.apple.position)) {
      this.appleSFX.play();

      this.apple.x = -1000;
      this.apple.y = -1000;
      this.apple.visible = false;
      this.startAppleTimer();
      this.snakeBitsToAdd += this.NEW_BODY_PIECES_PER_APPLE;
      this.addToScore(this.APPLE_SCORE);
    }
  },

  addToScore: function (amount) {
    this.score = Math.min(this.score + amount,this.MAX_SCORE);
    this.setScoreText(this.score.toString());
  },

  repositionApple: function (apple) {
    if (!this.apple) return;
    if (!apple) apple = this.apple;

    apple.visible = true;
    var x = this.getRandomLocationWithin(WALL_LEFT+1,WALL_RIGHT);
    var y = this.getRandomLocationWithin(WALL_TOP+1,WALL_BOTTOM);
    var collisionCount = 0;
    var foundLocation = false;
    while (!foundLocation) {
      if (this.locationHasCollisionWithGroup(x*this.GRID_SIZE,y*this.GRID_SIZE,this.snakeBodyGroup)) {
        collisionCount++;
        if (collisionCount > 5) {
          break;
        }
      }
      else {
        foundLocation = true;
        break;
      }
    }
    if (foundLocation) {
      apple.x = x*this.GRID_SIZE;
      apple.y = y*this.GRID_SIZE;
      return true;
    }
    else {
      this.appleTimer.add(this.SNAKE_TICK*Phaser.Timer.SECOND,function () {
        this.repositionApple(apple);
      },this);
      this.appleTimer.start();
      return false;
    }
  },

  locationHasCollisionWithGroup: function (x,y,group) {
    var collision = false;
    group.forEach(function (element) {
      if (element.x == x && element.y == y) {
        collision = true;
        return;
      }
    });
    return collision;
  },

  getRandomLocationWithin: function(min,max) {
    return min + (Math.floor(Math.random() * (max-min)));
  },

  checkBodyCollision: function () {
    this.snakeBodyGroup.forEach(function (bit) {
      if (this.snakeHead.position.equals(bit.position)) {
        this.die();
        return;
      }
    },this);
  },

  checkWallCollision: function () {
    this.wallGroup.forEach(function (wall) {
      if (this.snakeHead.position.equals(wall.position)) {
        this.die();
        return;
      }
    },this);
  },

  die: function () {
    this.hitSFX.play();
    this.dead = true;
    this.lastNext = new Phaser.Point(this.next.x,this.next.y);
    this.next = new Phaser.Point(0,0);
    this.game.time.events.add(Phaser.Timer.SECOND * this.DEATH_DELAY, this.gameOver, this);
  },

  gameOver: function () {
    this.setGameOverText("GAME OVER","",this.score+" POINTS","","");
  },

  gotoMenu: function () {
    this.game.state.start('Menu');
  },

  restart: function () {
    this.game.state.start(this.stateName);
  },

  handleKeyboardInput: function () {
    if (this.rKey.isDown) {
      this.restart();
    }
    else if (this.mKey.isDown) {
      this.gotoMenu();
    }

    if (this.dead) return;
    if (!this.inputEnabled) return;

    if (this.controlsVisible && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
      this.hideControls();
      this.startAppleTimer();
    }

    // Check which key is down and set the next direction appropriately
    if (this.cursors.left.isDown) {
      this.left();
    }
    else if (this.cursors.right.isDown) {
      this.right();
    }
    if (this.cursors.up.isDown) {
      this.up();
    }
    else if (this.cursors.down.isDown) {
      this.down();
    }
  },

  hideControls: function () {
    if (this.next.x == 0 && this.next.y == 0) {
      this.controlsGroup.forEach(function (letter) {
        letter.text = '';
      });
      this.controlsVisible = false;
    }
  },

  startAppleTimer: function () {
    this.appleTimer.add(this.APPLE_DELAY,this.repositionApple,this);
    this.appleTimer.start();
  },


  handleTouchInput: function () {
    if (this.dead) return;
    if (!this.inputEnabled) return;

    var d = this.swipe.check();
    if (!d) return;

    if (this.controlsVisible) {
      this.hideControls();
      this.startAppleTimer();
    }

    switch (d.direction) {
      case this.swipe.DIRECTION_LEFT:
      this.left();
      break;

      case this.swipe.DIRECTION_RIGHT:
      this.right();
      break;

      case this.swipe.DIRECTION_UP:
      this.up();
      break;

      case this.swipe.DIRECTION_DOWN:
      this.down();
      break;
    }
  },

  left: function () {
    if (this.prev.x == 0) this.next = new Phaser.Point(-this.GRID_SIZE,0);
  },

  right: function () {
    if (this.prev.x == 0) this.next = new Phaser.Point(this.GRID_SIZE,0);
  },

  up: function () {
    if (this.prev.y == 0) this.next = new Phaser.Point(0,-this.GRID_SIZE);
  },

  down: function () {
    if (this.prev.y == 0) this.next = new Phaser.Point(0,this.GRID_SIZE);
  },
};

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}
