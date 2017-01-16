BasicGame.Narcissism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Narcissism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Narcissism.prototype.constructor = BasicGame.Snake;

BasicGame.Narcissism.prototype.create = function () {
  this.currentTexts = this.game.add.group();

  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Narcissism";

  // Maximum chars per line is 18
  this.TEXTS_X = WALL_LEFT + 2;
  this.TEXTS_TOP = WALL_TOP + 2;
  this.TEXTS_BOTTOM = WALL_BOTTOM - 2;
  this.texts = [
    [
      "I KNEW PIPPIN",
      "BARR'S WORK WAS",
      "GOOD STUFF, BUT",
      "THIS MIGHT BE HIS",
      "MOST IMPORTANT YET"
    ],
    [
      "I REALLY LIKE THIS.",
      "I THINK IT'S YOUR",
      "BEST WORK."
    ],
    [
      "THIS REMINDED ME",
      "OF A DICE ROLL",
      "WILL NEVER ABOLISH",
      "CHANCE BY STEPHANE",
      "MALLARME WHICH IS",
      "HIGH FUCKING",
      "PRAISE"
    ],
    [
      "DOESN'T MATTER IF",
      "YOU WANT TO MAKE",
      "GAMES, A LOT OF",
      "THESE ARE GENIUS",
      "AND SAD AND",
      "@PIPPINBARR IS",
      "AMAZING"
    ],
    [
      "I'M IN LOVE WITH",
      "@PIPPINBARR"
    ],
    [
      "I HADN'T GOT",
      "AROUND TO TELLING",
      "YOU YET HOW GREAT",
      "I THINK THIS",
      "VIDEOGAME IS"
    ],
    [
      "SUCH A NICE IMAGE:",
      "EVERYONE KNEELS IN",
      "FRONT OF",
      "@PIPPINBARR WHILE",
      "ANSWERING HIS",
      "QUESTIONS"
    ],
    [
      "IT IS HONESTLY SO",
      "EXCELLENT & I FEEL",
      "SO BLESSED TO HAVE",
      "HELPED INSPIRE IT"
    ],
    [
      "I LOVE YOU & YOUR",
      "STUFF SO MUCH"
    ],
    [
      "THE QUINTESSENTIAL",
      "DEVELOPER IN THE",
      "CURRENT ART/NON-",
      "GAME SCENE"
    ],
    [
      "CAN I PLEASE HAVE",
      "YOUR BRAIN I WOULD",
      "LOVE TO BE ABLE TO",
      "COME UP WITH",
      "AWESOME IDEAS"
    ],
    [
      "STUNNING! THIS IS",
      "GREAT, AND YOU",
      "SIMPLY MUST PLAY",
      "IT. BRAVO!"
    ],
    [
      "META & SELF-",
      "REFERENCE IN",
      "@PIPPINBARR'S",
      "GAMES AKA WHY",
      "@PIPPINBARR IS A",
      "FREAKING GENIUS"
    ],
    [
      "THAT'S IT,",
      "@PIPPINBARR IS",
      "NOW OFFICIALLY THE",
      "CLEVEREST GAME",
      "DEVELOPER OUT",
      "THERE"
    ],
    [
      "ALL OF YOUR GAME",
      "IDEAS SPEAK TO ME",
      "DEEPLY"
    ]
  ];
  this.addingNewText = true;
};

BasicGame.Narcissism.prototype.hideControls = function () {
  BasicGame.Snake.prototype.hideControls.call(this);

  this.startNewTextTimer();
};


BasicGame.Narcissism.prototype.addNewText = function () {
  var text = this.texts[Math.floor(Math.random() * this.texts.length)];
  var startY = this.TEXTS_TOP + Math.floor(Math.random() * (this.TEXTS_BOTTOM - this.TEXTS_TOP - text.length + 2));
  this.addTextToGrid(this.TEXTS_X,startY,text,this.currentTexts);
  var toRemove = [];
  this.currentTexts.forEach(function (t) {
    if (t.text == ' ') {
      toRemove.push(t);
    }
  },this);
  toRemove.forEach(function (t) {
    this.currentTexts.remove(t);
  },this);
};

BasicGame.Narcissism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);

  this.checkEdibleCollision();
};

BasicGame.Narcissism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);
}

BasicGame.Narcissism.prototype.startNewTextTimer = function () {
  this.addingNewText = true;
  setTimeout(function () {
    this.addNewText();
    this.addingNewText = false;
  }.bind(this),this.APPLE_DELAY);
};

BasicGame.Narcissism.prototype.startAppleTimer = function () {
};

BasicGame.Narcissism.prototype.checkEdibleCollision = function () {

  if (this.currentTexts.length == 0 && !this.addingNewText) {
    this.snakeBitsToAdd = this.NEW_BODY_PIECES_PER_APPLE;
    this.startNewTextTimer();
    return;
  }

  this.currentTexts.forEach(function (edible) {
    if (this.snakeHead.x + this.GRID_SIZE/2 == edible.x && this.snakeHead.y == edible.y) {
      if (edible.text != '') {
        this.eat(edible);
        this.currentTexts.remove(edible);
        return;
      }
    }
  },this);
};

BasicGame.Narcissism.prototype.eat = function (edible) {
  this.addToScore(this.APPLE_SCORE);
  edible.text = '';
};

// BasicGame.Narcissism.prototype.gameOver = function () {
//   BasicGame.Snake.prototype.tick.call(this);
// };
