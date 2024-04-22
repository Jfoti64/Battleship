export default class Gameboard {
  constructor(rows = 10, columns = 10) {
    this.gameboard = this.createGameboard(rows, columns);
  }

  createGameboard(rows, columns) {
    const twoDimensionalArray = [];
    for (let i = 0; i < rows; i += 1) {
      twoDimensionalArray[i] = [];
      for (let j = 0; j < columns; j += 1) {
        twoDimensionalArray[i][j] = j;
      }
    }
    return twoDimensionalArray;
  }

  getGameboard() {
    return this.gameboard;
  }
}
