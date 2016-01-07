var Match = require("./match");

function Trie(matchCharacter) {
  this.matchCharacter = matchCharacter || "\0";
  this.data = {};
}

Trie.prototype.add = function() {
  var words = Array.prototype.slice.call(arguments);
  for (var i = 0; i < words.length; i++) {
    this._add(words[i], this.data);
  }
  return this;
};

Trie.prototype._add = function(word, trie) {
  var first = word[0];
  if (word.length === 1) {
    if (trie[first]) {
      return trie[first][this.matchCharacter] = 1;
    } else {
      return trie[first] = 1;
    }
  } else {
    if (trie[first] === 1) {
      trie[first] = {};
      trie[first][this.matchCharacter] = 1;
      return this._add(word.slice(1), trie[first]);
    } else {
      trie[first] = trie[first] || {};
      return this._add(word.slice(1), trie[first]);
    }
  }
};

Trie.prototype.find = function(word) {
  return this._find(word, this.data);
};

Trie.prototype.isMatch = function(word) {
  return this.find(word).isMatch();
};

Trie.prototype.isPrefix = function(word) {
  return this.find(word).isPrefix();
};
Trie.prototype.isMatchOrPrefix = function(word) {
  return this.find(word).isMatchOrPrefix();
};

Trie.prototype._find = function(word, trie) {
  var first = word[0];
  if (word.length === 1) {
    if (typeof trie[first] === 'object' && trie[first][this.matchCharacter])
      return new Match(Match.MATCH | Match.PARTIAL_MATCH)
    else if (trie[first] === 1)
      return new Match(Match.MATCH)
    else if (typeof trie[first] === 'object')
      return new Match(Match.PARTIAL_MATCH)
    else
      return new Match(Match.NO_MATCH)
  } else {
    if (!!trie[first])
      return this._find(word.slice(1), trie[first])
    else
      return new Match(Match.NO_MATCH)
  }
};


Trie.prototype.toObject = function() {
  return this.data;
};

module.exports = Trie;
