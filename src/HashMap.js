import LinkedList from "./LinkedList.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) {
      this.buckets[index] = new LinkedList();
    }

    const returnedNode = this.buckets[index].findNode(key);

    if (returnedNode === null) {
      this.buckets[index].append(key, value);
      this.size++;
      if (this.size > this.capacity * this.loadFactor) {
        this.resize();
      }
    } else {
      returnedNode.value = value;
    }
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;

    for (const bucket of oldBuckets) {
      if (bucket !== null) {
        let currentNode = bucket.headNode;

        while (currentNode) {
          this.set(currentNode.key, currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) return null;

    const returnedNode = this.buckets[index].findNode(key);

    if (returnedNode === null) {
      return null;
    } else {
      return returnedNode.value;
    }
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) return false;

    const returnedNode = this.buckets[index].findNode(key);

    if (returnedNode === null) {
      return false;
    } else {
      return true;
    }
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) return false;

    const deleteIndex = this.buckets[index].findIndex(key);
    if (deleteIndex !== -1) {
      this.buckets[index].removeAt(deleteIndex);
      this.size--;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets.fill(null);
    this.size = 0;
  }

  keys() {
    const allKeys = [];

    for (const bucket of this.buckets) {
      if (bucket !== null) {
        let currentNode = bucket.headNode;

        while (currentNode) {
          allKeys.push(currentNode.key);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];

    for (const bucket of this.buckets) {
      if (bucket !== null) {
        let currentNode = bucket.headNode;

        while (currentNode) {
          allValues.push(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }

    return allValues;
  }

  entries() {
    const allPairs = [];

    for (const bucket of this.buckets) {
      if (bucket !== null) {
        let currentNode = bucket.headNode;

        while (currentNode) {
          const keyValue = [currentNode.key, currentNode.value];
          allPairs.push(keyValue);
          currentNode = currentNode.nextNode;
        }
      }
    }

    return allPairs;
  }
}

export default HashMap;
