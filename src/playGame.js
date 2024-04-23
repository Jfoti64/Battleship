import Gameboard from './gameboard';
import Player from './players';
import Ship from './ships';

import { renderGameboards } from './renderDom';

export default function startGame() {
  const humanPlayer = new Player(false); // Assuming false indicates a human player
  const computerPlayer = new Player(true); // True indicates AI or computer player

  // Define ship positions for human player
  const humanShips = [
    { type: new Ship(5, 'Carrier'), row: 0, column: 0, vertical: true },
    { type: new Ship(4, 'Battleship'), row: 2, column: 2, vertical: true },
    { type: new Ship(3, 'Destroyer'), row: 4, column: 4, vertical: false },
    { type: new Ship(3, 'Submarine'), row: 6, column: 6, vertical: false },
    { type: new Ship(2, 'PatrolBoat'), row: 9, column: 0, vertical: false },
  ];

  // Place ships on human player's gameboard
  humanShips.forEach((ship) => {
    humanPlayer.gameboard.placeShip(ship.type, ship.row, ship.column, ship.vertical);
  });

  // Define ship positions for computer player
  const computerShips = [
    { type: new Ship(5, 'Carrier'), row: 1, column: 1, vertical: true },
    { type: new Ship(4, 'Battleship'), row: 3, column: 3, vertical: true },
    { type: new Ship(3, 'Destroyer'), row: 5, column: 5, vertical: false },
    { type: new Ship(3, 'Submarine'), row: 7, column: 7, vertical: false },
    { type: new Ship(2, 'PatrolBoat'), row: 9, column: 9, vertical: true },
  ];

  // Place ships on computer player's gameboard
  computerShips.forEach((ship) => {
    computerPlayer.gameboard.placeShip(ship.type, ship.row, ship.column, ship.vertical);
  });

  // Now pass both players to the render function
  renderGameboards(humanPlayer, computerPlayer);
}
