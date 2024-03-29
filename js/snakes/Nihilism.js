BasicGame.Nihilism = function (game) {
  BasicGame.Snake.call(this, game);
};

BasicGame.Nihilism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Nihilism.prototype.constructor = BasicGame.Nihilism;

BasicGame.Nihilism.prototype.create = function () {
  this.mKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
};

BasicGame.Nihilism.prototype.update = function () {
  if (this.mKey.isDown) {
    this.gotoMenu();
  }
};
