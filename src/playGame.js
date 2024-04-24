import Player from './players';
import { changeMessage, renderGameboards } from './renderDom';

function defineShipPositions(player, ships) {
  ships.forEach((ship) => {
    player.gameboard.placeShip(ship.type, ship.row, ship.column, ship.vertical);
  });
}

function setupGame(humanPlayer, computerPlayer) {
  defineShipPositions(humanPlayer, [
    { type: humanPlayer.gameboard.ships[0], row: 0, column: 0, vertical: true },
    { type: humanPlayer.gameboard.ships[1], row: 2, column: 2, vertical: true },
    { type: humanPlayer.gameboard.ships[2], row: 4, column: 4, vertical: false },
    { type: humanPlayer.gameboard.ships[3], row: 6, column: 6, vertical: false },
    { type: humanPlayer.gameboard.ships[4], row: 9, column: 0, vertical: false },
  ]);
  defineShipPositions(computerPlayer, [
    { type: computerPlayer.gameboard.ships[0], row: 1, column: 1, vertical: true },
    { type: computerPlayer.gameboard.ships[1], row: 3, column: 3, vertical: true },
    { type: computerPlayer.gameboard.ships[2], row: 5, column: 5, vertical: false },
    { type: computerPlayer.gameboard.ships[3], row: 7, column: 6, vertical: false },
    { type: computerPlayer.gameboard.ships[4], row: 9, column: 3, vertical: false },
  ]);

  renderGameboards(humanPlayer);
  renderGameboards(computerPlayer);
}

function computerCounterAttack(humanPlayer) {
  let success = false; // To keep track of whether the attack was successful

  while (!success) {
    const row = Math.floor(Math.random() * humanPlayer.gameboard.rows);
    const column = Math.floor(Math.random() * humanPlayer.gameboard.columns);

    // Attempt to attack; receiveAttack should return true if the attack was valid and processed
    success = humanPlayer.gameboard.receiveAttack(row, column, humanPlayer);
  }
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
  if (!computerPlayer.gameboard.receiveAttack(row, column, computerPlayer)) {
    return;
  }

  if (computerPlayer.gameboard.allShipsSunk()) {
    changeMessage('Player Wins!');
    renderGameboards(computerPlayer);
    return;
  }

  renderGameboards(computerPlayer);

  // Computer counterattacks
  setTimeout(() => {
    computerCounterAttack(humanPlayer);
    if (humanPlayer.gameboard.allShipsSunk()) {
      changeMessage('Computer Wins!');
      renderGameboards(humanPlayer);
      return;
    }
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
