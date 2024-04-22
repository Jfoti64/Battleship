import Ship from './ships';

export default class Gameboard {
  constructor(rows = 10, columns = 10) {
    this.gameboard = this.createGameboard(rows, columns);
    this.missedShots = [];
    this.ships = this.createShips();
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

  placeShip(ship, row, column, vertical = true) {
    if (vertical === true) {
      for (let i = 0; i < ship.getLength(); i += 1) {
        this.gameboard[row][column + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.getLength(); i += 1) {
        this.gameboard[row + i][column] = ship;
      }
    }
  }

  receiveAttack(row, column) {
    if (this.gameboard[row][column] instanceof Ship) {
      this.gameboard[row][column].hit();
    }
    this.missedShots.push([row, column]);
  }

  createShips() {
    const carrier = new Ship(5, 'Carrier');
    const Battleship = new Ship(4, 'Battleship');
    const Destroyer = new Ship(3, 'Destroyer');
    const Submarine = new Ship(3, 'Submarine');
    const PatrolBoat = new Ship(2, 'PatrolBoat');

    return [carrier, Battleship, Destroyer, Submarine, PatrolBoat]
  }
}
