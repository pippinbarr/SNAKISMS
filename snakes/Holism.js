BasicGame.Holism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Holism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Holism.prototype.constructor = BasicGame.Holism;

BasicGame.Holism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.whole = this.game.add.group();

  this.whole.add(this.snakeHead);
  this.whole.add(this.snakeBodyGroup);
  this.whole.add(this.textGroup);
  this.whole.add(this.wallGroup);
  this.whole.add(this.apple);

  this.stateName = "Holism";
};

BasicGame.Holism.prototype.tick = function () {
  BasicGame.Snake.prototype.tick.call(this);

  this.whole.x += this.next.x;
  this.whole.y += this.next.y;
};
