BasicGame.Extensionism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Extensionism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Extensionism.prototype.constructor = BasicGame.Snake;

BasicGame.Extensionism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);
};

BasicGame.Extensionism.prototype.update = function () {
  BasicGame.Snake.prototype.update.call(this);
};
