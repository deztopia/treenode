Tree Node
=========
Simple tree data structure in JS, designed specifically to organize related data in such a way that it can be consumed
by tree diagram visualizations, and so that "leaf" nodes (endpoints) can be quickly identified.

## Installation

  npm install treenode --save

## Usage
```js
  // Import the class
  var TreeNode = require('treenode').TreeNode;

  // Create a tree by adding a single node, with a data object payload.
  // This will be the root node. tree is a TreeNode object:
  // {data: {id: 0, name: 'root'}, parent: null, children: []}
  var tree = new TreeNode({id: 0, name: 'root'});

  // Add children to the root. This returns the newly created child's
  // TreeNode object.
  tree.addChild({id: 1, name: 'Node 1'});

  // Add child nodes to child nodes
  var child = tree.addChild({id: 2, name: 'Node 2'});
  child.addChild({id: 3, name: 'Node 3' });

  // Obtain the tree's leaves (end nodes), from the point of the called node.
  // Returns an array of TreeNode objects for node 1 and node 3. Node 2 is not
  // returned since it is not a leaf.
  var leaves = tree.leaves();

  // Find data in a tree
  var node = tree.addChild(someObject);
  var match = tree.findNode(someObject);  // match === node

  // Find the tree root, from any node
  var root = node.root();
```

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed
functionality. Lint and test your code.

## Release History

* 0.1.4 Better module export syntax
* 0.1.3 Updated packaging for Bower
* 0.1.2 Updated packaging
* 0.1.1 Updated packaging
* 0.1.0 Initial release
