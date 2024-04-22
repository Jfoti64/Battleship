import Ship from './ships';

export default class Gameboard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.gameboard = this.createGameboard();
    this.missedShots = [];
    this.ships = [
      new Ship(5, 'Carrier'),
      new Ship(4, 'Battleship'),
      new Ship(3, 'Destroyer'),
      new Ship(3, 'Submarine'),
      new Ship(2, 'PatrolBoat'),
    ];
  }

  createGameboard() {
    const board = [];
    for (let i = 0; i < this.rows; i += 1) {
      board[i] = new Array(this.columns).fill(null); // Fill with null, or another default value
    }
    return board;
  }

  getGameboard() {
    return this.gameboard;
  }

  placeShip(ship, row, column, vertical = true) {
    // If ship would be out of bounds when placed, return false
    if (vertical === false) {
      if (
        row > this.gameboard.length - 1 ||
        column + ship.length > this.gameboard.length - 1 ||
        column < 0 ||
        row < 0
      ) {
        return false;
      }
    } else if (
      row + ship.length > this.gameboard.length - 1 ||
      column > this.gameboard.length - 1 ||
      column < 0 ||
      row < 0
    ) {
      return false;
    }

    if (vertical === true) {
      for (let i = 0; i < ship.getLength(); i += 1) {
        this.gameboard[row][column + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.getLength(); i += 1) {
        this.gameboard[row + i][column] = ship;
      }
    }
    return true;
  }

  receiveAttack(row, column) {
    if (this.gameboard[row][column] instanceof Ship) {
      this.gameboard[row][column].hit();
    }
    this.missedShots.push([row, column]);
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
