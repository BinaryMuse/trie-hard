API
---

### Trie

#### `new Trie(matchCharacter = "\0")`

The `Trie` constructor creates a brand new trie with no words in it. `matchCharacter` is the character used by the trie to mark word matches; this defaults to the null character, but can be any string that does not appear in any words in your trie's data set

#### `Trie#add(word[, word[, word ...]])`

Add one or more words to the trie. Returns the trie.

#### `Trie#find(word)`

Try to find the word in the trie. Returns a `Match` object, not a boolean.

#### `Trie#isMatch(word)`

Shortcut for `Trie#find(word).isMatch()`

#### `Trie#isPrefix(word)`

Shortcut for `Trie#find(word).isPrefix()`

#### `Trie#isMatchOrPrefix(word)`

Shortcut for `Trie#find(word).isMatchOrPrefix()`

### Match

#### `Match#isMatch()`

Whether or not the search matched a complete word in the trie.

#### `Match#isPrefix()`

Whether or not the search matched a prefix in the trie (the word could also have been a full match).

#### `Match#isMatchOrPrefix()`

Whether or not the word was in the trie at all, either as an complete word or as a prefix.
