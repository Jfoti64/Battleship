import Gameboard from './gameboard';
import Player from './players';
import Ship from './ships';
import { renderGameboards } from './renderDom';

function defineShipPositions(player, ships) {
  ships.forEach((ship) => {
    player.gameboard.placeShip(ship.type, ship.row, ship.column, ship.vertical);
  });
}

function attachEventListeners(player) {
  const gameboardContainer = document.getElementById(
    player.isComputer ? 'gameboard2' : 'gameboard1'
  );
  const cells = gameboardContainer.querySelectorAll('.gameboardCell');
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => handleCellClick(event, player));
  });
}

function handleCellClick(event, player) {
  const dataIndex = event.target.getAttribute('data-index');
  const parts = dataIndex.split('-');
  const row = parseInt(parts[0], 10);
  const column = parseInt(parts[1], 10);

  player.gameboard.receiveAttack(row, column, player);

  renderGameboards(player);
  attachEventListeners(player); // Re-attach event listeners after rendering
}

export default function startGame() {
  const humanPlayer = new Player(false); // Assuming false indicates a human player
  const computerPlayer = new Player(true); // True indicates AI or computer player

  function setupGame() {
    defineShipPositions(humanPlayer, [
      { type: new Ship(5, 'Carrier'), row: 0, column: 0, vertical: true },
      { type: new Ship(4, 'Battleship'), row: 2, column: 2, vertical: true },
      { type: new Ship(3, 'Destroyer'), row: 4, column: 4, vertical: false },
      { type: new Ship(3, 'Submarine'), row: 6, column: 6, vertical: false },
      { type: new Ship(2, 'PatrolBoat'), row: 9, column: 0, vertical: false },
    ]);

    defineShipPositions(computerPlayer, [
      { type: new Ship(5, 'Carrier'), row: 1, column: 1, vertical: true },
      { type: new Ship(4, 'Battleship'), row: 3, column: 3, vertical: true },
      { type: new Ship(3, 'Destroyer'), row: 5, column: 5, vertical: false },
      { type: new Ship(3, 'Submarine'), row: 7, column: 6, vertical: false },
      { type: new Ship(2, 'PatrolBoat'), row: 9, column: 3, vertical: false },
    ]);

    renderGameboards(humanPlayer);
    renderGameboards(computerPlayer);
    attachEventListeners(humanPlayer);
    attachEventListeners(computerPlayer);
  }
  setupGame();
}
