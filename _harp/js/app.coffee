app = angular.module 'trie-hard', []

app.controller 'DemoController', ($scope) ->
  $scope.trie = new Trie('_')
  $scope.newWord = ""
  $scope.checkWord = ""

  $scope.invalidWord = ->
    $scope.newWord.length == 0 || $scope.newWord.indexOf("_") != -1

  $scope.addWord = ->
    return if $scope.invalidWord()
    $scope.trie.add($scope.newWord)
    $scope.newWord = ""

  $scope.wordCheckResult = ->
    return if $scope.checkWord.length == 0
    match = $scope.trie.find($scope.checkWord)
    if match.isMatch() && match.isPrefix()
      "Word, Prefix"
    else if match.isMatch()
      "Word"
    else if match.isPrefix()
      "Prefix"
    else
      "Not Found"
