function Match(match) {
  this.match = match;
}

Match.prototype.isMatch = function() {
  return (this.match & Match.MATCH) !== 0;
};

Match.prototype.isPrefix = function() {
  return (this.match & Match.PARTIAL_MATCH) !== 0;
};

Match.prototype.isMatchOrPrefix = function() {
  return this.isMatch() || this.isPrefix();
};

Match.MATCH = 1;
Match.PARTIAL_MATCH = 2;

module.exports = Match;
