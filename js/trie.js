var Match, Trie,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

Match = (function() {
  Match.NO_MATCH = 0;

  Match.MATCH = 1;

  Match.PARTIAL_MATCH = 2;

  function Match(match) {
    this.match = match;
    this.isMatchOrPrefix = __bind(this.isMatchOrPrefix, this);
    this.isPrefix = __bind(this.isPrefix, this);
    this.isMatch = __bind(this.isMatch, this);
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

  return Match;

})();

Trie = (function() {
  function Trie(matchCharacter) {
    this.matchCharacter = matchCharacter != null ? matchCharacter : "\0";
    this.toObject = __bind(this.toObject, this);
    this._find = __bind(this._find, this);
    this.isMatchOrPrefix = __bind(this.isMatchOrPrefix, this);
    this.isPrefix = __bind(this.isPrefix, this);
    this.isMatch = __bind(this.isMatch, this);
    this.find = __bind(this.find, this);
    this._add = __bind(this._add, this);
    this.add = __bind(this.add, this);
    this.data = {};
  }

  Trie.prototype.add = function() {
    var word, words, _i, _len;
    words = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = words.length; _i < _len; _i++) {
      word = words[_i];
      this._add(word, this.data);
    }
    return this;
  };

  Trie.prototype._add = function(word, trie) {
    var first;
    first = word[0];
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
        return this._add(word.slice(1, word.length), trie[first]);
      } else {
        if (trie[first] == null) {
          trie[first] = {};
        }
        return this._add(word.slice(1, word.length), trie[first]);
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
    var first;
    first = word[0];
    if (word.length === 1) {
      if (typeof trie[first] === 'object' && trie[first][this.matchCharacter]) {
        return new Match(Match.MATCH | Match.PARTIAL_MATCH);
      } else if (trie[first] === 1) {
        return new Match(Match.MATCH);
      } else if (typeof trie[first] === 'object') {
        return new Match(Match.PARTIAL_MATCH);
      } else {
        return new Match(Match.NO_MATCH);
      }
    } else {
      if (trie[first] != null) {
        return this._find(word.slice(1, word.length), trie[first]);
      } else {
        return new Match(Match.NO_MATCH);
      }
    }
  };

  Trie.prototype.toObject = function() {
    return this.data;
  };

  return Trie;

})();
