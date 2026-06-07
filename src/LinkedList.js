import Node from "./Node.js";

class LinkedList {
  constructor() {
    this.headNode = null;
  }

  head() {
    if (this.headNode) {
      return this.headNode.value;
    } else {
      return undefined;
    }
  }

  tail() {
    if (this.headNode === null) {
      return undefined;
    }

    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }

    return current;
  }

  append(key, value) {
    const nextNode = new Node(key, value);
    if (this.headNode === null) {
      this.headNode = nextNode;
    } else {
      let current = this.headNode;
      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = nextNode;
    }
  }

  prepend(key, value) {
    const newFirstNode = new Node(key, value);
    const currentFirstNode = this.headNode;

    if (currentFirstNode !== null) {
      this.headNode = newFirstNode;
      newFirstNode.nextNode = currentFirstNode;
    } else {
      this.headNode = newFirstNode;
    }
  }

  size() {
    let size = 0;
    let current = this.headNode;

    while (current) {
      current = current.nextNode;
      size++;
    }

    return size;
  }

  at(index) {
    if (index < 0) return undefined;

    let currentNode = this.headNode;
    let counter = 0;

    while (currentNode && counter < index) {
      currentNode = currentNode.nextNode;
      counter++;
    }

    return currentNode ?? undefined;
  }

  pop() {
    if (this.headNode === null) return undefined;

    const oldHead = this.headNode;
    this.headNode = this.headNode.nextNode;

    oldHead.nextNode = null;

    return oldHead;
  }

  contains(value) {
    let currentNode = this.headNode;

    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  findNode(key) {
    let currentNode = this.headNode;

    while (currentNode) {
      if (currentNode.key === key) return currentNode;
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  findIndex(value) {
    let currentNode = this.headNode;
    let counter = 0;

    while (currentNode) {
      if (currentNode.value === value) return counter;
      counter++;
      currentNode = currentNode.nextNode;
    }

    return -1;
  }

  toString() {
    let currentNode = this.headNode;
    const parts = [];

    while (currentNode) {
      parts.push(`( ${currentNode.value} )`);
      currentNode = currentNode.nextNode;
    }

    parts.push("null");

    return parts.join(" -> ");
  }

  insertAt(index, ...values) {
    if (index < 0) throw new RangeError("Index can't be less than 0");
    if (values.length === 0) return;

    let currentNode = this.headNode;
    let previousNode = null;
    let counter = 0;

    while (currentNode && counter < index) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      counter++;
    }

    if (counter !== index) throw new RangeError("Index out of bounds");

    for (const value of values) {
      const insertNode = new Node(value);

      if (previousNode === null) {
        insertNode.nextNode = this.headNode;
        this.headNode = insertNode;
      } else {
        previousNode.nextNode = insertNode;
        insertNode.nextNode = currentNode;
      }

      previousNode = insertNode;
    }
  }

  removeAt(index) {
    if (index < 0) throw new RangeError("Index can't be less than 0");
    if (this.headNode === null) throw new RangeError("Index out of bounds");

    if (index === 0) {
      const deletedNode = this.headNode;
      this.headNode = this.headNode.nextNode;
      deletedNode.nextNode = null;
      return deletedNode;
    }

    let currentNode = this.headNode;
    let previousNode = null;
    let counter = 0;

    while (currentNode && counter < index) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      counter++;
    }

    if (currentNode === null || counter !== index)
      throw new RangeError("Index out of bounds");

    previousNode.nextNode = currentNode.nextNode;

    currentNode.nextNode = null;

    return currentNode;
  }
}

export default LinkedList;
