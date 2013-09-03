var app;

app = angular.module('trie-hard', []);

app.controller('DemoController', function($scope) {
  $scope.trie = new Trie('_');
  $scope.newWord = "";
  $scope.checkWord = "";
  $scope.invalidWord = function() {
    return $scope.newWord.length === 0 || $scope.newWord.indexOf("_") !== -1;
  };
  $scope.addWord = function() {
    if ($scope.invalidWord()) {
      return;
    }
    $scope.trie.add($scope.newWord);
    return $scope.newWord = "";
  };
  return $scope.wordCheckResult = function() {
    var match;
    if ($scope.checkWord.length === 0) {
      return;
    }
    match = $scope.trie.find($scope.checkWord);
    if (match.isMatch() && match.isPrefix()) {
      return "Word, Prefix";
    } else if (match.isMatch()) {
      return "Word";
    } else if (match.isPrefix()) {
      return "Prefix";
    } else {
      return "Not Found";
    }
  };
});
