const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

// class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  add(data) {
    const newNode = { data: data, left: null, right: null };

    if (this.tree === null) {
      this.tree = newNode;
    } else {
      this.insertNode(this.tree, newNode);
    }
  }

  has(data) {
    // throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    return !!this.find(data)
  }

  find(data) {
    function f(node) {
      if (node === null) {
        return null;
      }
      if (node.data === data) {
        return node;
      }

      if (data < node.data) return f(node.left);
      else return f(node.right);
    }

    return f(this.tree);
  }

  remove(data) {
    const removeNode = function(node, data) {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        // node has no children 
        if (node.left === null && node.right === null) {
          return null;
        }
        // node has no left child 
        if (node.left === null) {
          return node.right;
        }
        // node has no right child 
        if (node.right === null) {
          return node.left;
        }
        // node has two children 
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.tree = removeNode(this.tree, data);
  }

  min() {
    let node = this.tree

    while(node.left !== null){
      node = node.left
    }
    return node? node.data : null
  }

  max() {
    let max = null

    function f(node){
      if(node.data > max){
        max = node.data
      }
      if(node.right != null){
        return f(node.right)
      }
      return max
    }
    return f(this.tree)
  }
}

module.exports = {
  BinarySearchTree,
};
