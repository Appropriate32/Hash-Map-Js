import "./styles.css";
import LinkedList from "./LinkedList.js";
import Node from "./Node.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
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
    } else {
      returnedNode.value = value;
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
      return true;
    } else {
      return false;
    }
  }
}
