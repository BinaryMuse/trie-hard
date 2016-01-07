var Trie = require('../');

exports.trieText = {
  'it builds a JavaScript object': function(test) {
    var trie = new Trie().add('cat', 'catsup', 'can', 'dog', 'dogs');
    test.deepEqual(trie.toObject(), {
      c: {
        a: {
          n: 1,
          t: {
            "\0": 1,
            s: {
              u: {
                p: 1
              }
            }
          }
        }
      },
      d: {
        o: {
          g: {
            "\0": 1,
            s: 1
          }
        }
      }
    });
    test.done();
  },

  'it builds a JavaScript object with an alternative match character': function(test) {
    var trie = new Trie('$').add('cat', 'catsup', 'can', 'dog', 'dogs');
    test.deepEqual(trie.toObject(), {
      c: {
        a: {
          n: 1,
          t: {
            $: 1,
            s: {
              u: {
                p: 1
              }
            }
          }
        }
      },
      d: {
        o: {
          g: {
            $: 1,
            s: 1
          }
        }
      }
    });
    test.done();
  },

  'it reports exact matches': function(test) {
    var trie = new Trie().add('cat', 'catsup');
    test.strictEqual(trie.isMatch('cat'), true);
    test.strictEqual(trie.find('cat').isMatch(), true);
    test.strictEqual(trie.find('catsup').isMatch(), true);
    test.strictEqual(trie.find('cats').isMatch(), false);
    test.done();
  },

  'it reports partial matches': function(test) {
    var trie = new Trie().add('cat', 'catsup');
    test.strictEqual(trie.isPrefix('cat'), true);
    test.strictEqual(trie.find('cat').isPrefix(), true);
    test.strictEqual(trie.find('catsup').isPrefix(), false);
    test.strictEqual(trie.find('cats').isPrefix(), true);
    test.done();
  },

  'it reports either exact or partial matches': function(test) {
    var trie = new Trie().add('cat', 'catsup');
    test.strictEqual(trie.isMatchOrPrefix('cat'), true);
    test.strictEqual(trie.find('cat').isMatchOrPrefix(), true);
    test.strictEqual(trie.find('catsup').isMatchOrPrefix(), true);
    test.strictEqual(trie.find('cats').isMatchOrPrefix(), true);
    test.done();
  },

  'it reports non-matches': function(test) {
    var trie = new Trie().add('cat', 'catsup');
    test.strictEqual(trie.find('dog').isMatch(), false);
    test.strictEqual(trie.find('dog').isPrefix(), false);
    test.strictEqual(trie.find('dog').isMatchOrPrefix(), false);
    test.done();
  }
};
