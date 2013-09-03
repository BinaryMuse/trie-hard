module.exports = class Match
  @NO_MATCH = 0
  @MATCH = 1
  @PARTIAL_MATCH = 2

  constructor: (@match) ->

  isMatch: => (@match & Match.MATCH) != 0
  isPrefix: => (@match & Match.PARTIAL_MATCH) != 0
  isMatchOrPrefix: => @isMatch() || @isPrefix()
