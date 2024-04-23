import Ship from './ships';
import { renderGameboards, addShipToGameboard, changeMessage } from './renderDom';

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
    // If ship would overlap with another ship, return false
    if (vertical === false) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.gameboard[row][column + i] instanceof Ship) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.gameboard[row + i][column] instanceof Ship) {
          return false;
        }
      }
    }
    // Place ship
    if (vertical) {
      for (let i = 0; i < ship.length; i += 1) {
        this.gameboard[row + i][column] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        this.gameboard[row][column + i] = ship;
      }
    }
    return true;
  }

  receiveAttack(row, column, player) {
    if (this.gameboard[row][column] instanceof Ship) {
      const ship = this.gameboard[row][column];
      ship.hit();

      // Check if the ship is sunk and provide feedback
      if (ship.isSunk()) {
        const message = player.isComputer
          ? `Your ${ship.name} has been sunk!`
          : `You have sunk the enemy ${ship.name}!`;
        changeMessage(message);
      }

      // Optionally update the cell state to 'hit' for visual feedback
      this.gameboard[row][column] = 'hit';
    } else {
      // Mark the cell as 'miss' if there is no ship
      this.gameboard[row][column] = 'miss';
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
