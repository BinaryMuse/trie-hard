Match = require './match'

module.exports = class Trie
  constructor: (@matchCharacter = "\0") ->
    @data = {}

  add: (words...) =>
    @_add(word, @data) for word in words
    this

  _add: (word, trie) =>
    first = word[0]
    if word.length == 1
      if trie[first]
        trie[first][@matchCharacter] = 1
      else
        trie[first] = 1
    else
      if trie[first] == 1
        trie[first] = {}
        trie[first][@matchCharacter] = 1
        @_add(word[1...word.length], trie[first])
      else
        trie[first] ?= {}
        @_add(word[1...word.length], trie[first])

  find: (word) =>
    @_find(word, @data)

  isMatch: (word) => @find(word).isMatch()

  isPrefix: (word) => @find(word).isPrefix()

  isMatchOrPrefix: (word) => @find(word).isMatchOrPrefix()

  _find: (word, trie) =>
    first = word[0]
    if word.length == 1
      if typeof trie[first] == 'object' && trie[first][@matchCharacter]
        new Match(Match.MATCH | Match.PARTIAL_MATCH)
      else if trie[first] == 1
        new Match(Match.MATCH)
      else if typeof trie[first] == 'object'
        new Match(Match.PARTIAL_MATCH)
      else
        new Match(Match.NO_MATCH)
    else
      if trie[first]?
        @_find(word[1...word.length], trie[first])
      else
        new Match(Match.NO_MATCH)

  toObject: =>
    @data
