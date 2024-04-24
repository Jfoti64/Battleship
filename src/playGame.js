import Player from './players';
import { changeMessage, renderGameboards } from './renderDom';

function randomShipPosition(player) {
  const row = Math.floor(Math.random() * player.gameboard.rows);
  const column = Math.floor(Math.random() * player.gameboard.columns);
  const vertical = Math.random() > 0.5; // Randomly decide if the ship should be vertical

  return { row, column, vertical };
}

function defineShipPositions(player, ships) {
  ships.forEach((ship) => {
    let position;
    do {
      position = randomShipPosition(player, ship.type.length);
    } while (
      !player.gameboard.placeShip(ship.type, position.row, position.column, position.vertical)
    );
  });
}

function setupGame(humanPlayer, computerPlayer) {
  defineShipPositions(humanPlayer, [
    { type: humanPlayer.gameboard.ships[0] },
    { type: humanPlayer.gameboard.ships[1] },
    { type: humanPlayer.gameboard.ships[2] },
    { type: humanPlayer.gameboard.ships[3] },
    { type: humanPlayer.gameboard.ships[4] },
  ]);
  defineShipPositions(computerPlayer, [
    { type: computerPlayer.gameboard.ships[0] },
    { type: computerPlayer.gameboard.ships[1] },
    { type: computerPlayer.gameboard.ships[2] },
    { type: computerPlayer.gameboard.ships[3] },
    { type: computerPlayer.gameboard.ships[4] },
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
  const placeShipsBtn = document.getElementById('placeShips');

  placeShipsBtn.disabled = true; // disable the button

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

  const placeShipsBtn = document.getElementById('placeShips');

  // Improved button event handling to prevent duplicate event listeners
  placeShipsBtn.onclick = () => {
    // Using .onclick to automatically handle removing old listeners
    startGame();
  };

  setupGame(humanPlayer, computerPlayer); // Initialize the game setup
  attachEventListeners(humanPlayer, computerPlayer); // Attach game interaction listeners
}

export default startGame;
