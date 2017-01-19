BasicGame.Narcissism = function (game) {
  BasicGame.Snake.call(this,game);
};

BasicGame.Narcissism.prototype = Object.create(BasicGame.Snake.prototype);
BasicGame.Narcissism.prototype.constructor = BasicGame.Narcissism;

BasicGame.Narcissism.prototype.create = function () {
  BasicGame.Snake.prototype.create.call(this);

  this.stateName = "Narcissism";
};

BasicGame.Narcissism.prototype.die = function (edible) {
  BasicGame.Snake.prototype.die.call(this);
  window.location = 'mailto:pippin.barr@gmail.com?subject=I love your work!&body=I wanted to take a couple of minutes to write you an email about how much I respect and appreciate your work...';
};
