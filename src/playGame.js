import Player from './players';
import Ship from './ships';
import { renderGameboards } from './renderDom';

function defineShipPositions(player, ships) {
  ships.forEach((ship) => {
    player.gameboard.placeShip(ship.type, ship.row, ship.column, ship.vertical);
  });
}

function setupGame(humanPlayer, computerPlayer) {
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
}

function computerCounterAttack(humanPlayer) {
  const row = Math.floor(Math.random() * humanPlayer.gameboard.rows);
  const column = Math.floor(Math.random() * humanPlayer.gameboard.columns);
  humanPlayer.gameboard.receiveAttack(row, column, humanPlayer);
}

function attachEventListeners(humanPlayer, computerPlayer) {
  const gameboardContainer = document.getElementById('gameboard2');
  const cells = gameboardContainer.querySelectorAll('.gameboardCell');
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => handleCellClick(event, humanPlayer, computerPlayer));
  });
}

function handleCellClick(event, humanPlayer, computerPlayer) {
  const dataIndex = event.target.getAttribute('data-index');
  const parts = dataIndex.split('-');
  const row = parseInt(parts[0], 10);
  const column = parseInt(parts[1], 10);

  // Player attacks computer
  computerPlayer.gameboard.receiveAttack(row, column, computerPlayer);
  renderGameboards(computerPlayer);

  // Computer counterattacks
  setTimeout(() => {
    computerCounterAttack(humanPlayer);
    renderGameboards(humanPlayer); // Assuming you want to update human's board to show hits/misses
    attachEventListeners(humanPlayer, computerPlayer);
  }, 600); // Delay to simulate think time
}

function startGame() {
  const humanPlayer = new Player(false);
  const computerPlayer = new Player(true);

  setupGame(humanPlayer, computerPlayer);
  attachEventListeners(humanPlayer, computerPlayer);
}

export default startGame;
