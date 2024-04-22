export default class Ship {
  constructor(length, name) {
    this.length = length;
    this.hits = 0;
    this.name = name;
  }

  getLength() {
    return this.length;
  }

  getHits() {
    return this.hits;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.hits >= this.length) {
      return true;
    }
    return false;
  }
}
