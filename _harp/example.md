```javascript
// Create a new trie.
var Trie = require('trie'); // assuming Node.js-style modules
var trie = new Trie();

// Add a couple words to the trie.
trie.put('cat', 'catsup');

// Now you can search for words...
trie.find('cat').isMatch() == true;
trie.find('cat').isPrefix() == true;
trie.find('cat').isMatchOrPrefix() == true;

// ...and prefixes...
trie.find('cats').isMatch() == false;
trie.find('cats').isPrefix() == true;
trie.find('cats').isMatchOrPrefix() == true;

// ...and words that don't exist as either.
trie.find('dog').isMatch() == false;
trie.find('dog').isPrefix() == false;
trie.find('dog').isMatchOrPrefix() == false;

// You can also get the underlying data.
var data = trie.toObject();
var serialized = JSON.stringify(data);
```
