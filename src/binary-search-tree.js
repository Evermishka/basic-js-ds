const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.start = null;
  }

  root() {
    return this.start;
  }

  add( data ) {
    function addNewDataToTheTree(node, data) {
      if (!node) {
        return new Node(data);
      } else if (node.data === data) {
          return node;
      } else {
          if (data > node.data) {
            node.right = addNewDataToTheTree(node.right, data);
          } else {
            node.left = addNewDataToTheTree(node.left, data);
          }
          return node;
      }    
    }
    this.start = addNewDataToTheTree(this.start, data);
    return this.start;
  }

  has(data) {
    const node = this.find(data);
    return !!node;
  }

  find(data) {
    function findDataInTree(node, data) {
      if (!node) {
        return null;
      } else if (data === node.data) {
        return node;
      } else {
          if (data > node.data) {
            return findDataInTree(node.right, data);
          } else {
            return findDataInTree(node.left, data);
        } 
      }
    }
    let node = findDataInTree(this.start, data);
    return node;
  }

  remove(data) {
    function removeDataFromTree(node, data) {
      if (!node) return;
      if (data > node.data) {
        node.right = removeDataFromTree(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = removeDataFromTree(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let maxFromLeft = node.left;
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;
        node.left = removeDataFromTree(node.left, maxFromLeft.data);
        
        return node;
      }  
    }
    this.start = removeDataFromTree(this.start, data);
  }

  min() {
    let curr = this.start;  
    if (!curr) return null;
    
    while (curr.left) {
      curr = curr.left;
    }
    return curr.data;
  }

  max() {
    let curr = this.start; 
    if (!curr) return null;
    
    while (curr.right) {
      curr = curr.right;
    }
    return curr.data; 
  }
}

module.exports = {
  BinarySearchTree
};