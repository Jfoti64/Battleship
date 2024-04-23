import Ship from './ships';

function renderGameboards(humanPlayer, computerPlayer) {
  // Render human player's gameboard
  const humanGameboard = humanPlayer.gameboard.gameboard;
  const gameboard1Container = document.getElementById('gameboard1');
  gameboard1Container.innerHTML = ''; // Clear previous gameboard
  for (let i = 0; i < humanPlayer.gameboard.rows; i += 1) {
    for (let j = 0; j < humanPlayer.gameboard.columns; j += 1) {
      const gameboardCell = document.createElement('div');
      gameboardCell.classList.add('gameboardCell');
      gameboardCell.setAttribute('data-index', `${i}-${j}`);
      gameboard1Container.appendChild(gameboardCell);
      if (humanGameboard[i][j] instanceof Ship) {
        const cell = document.querySelector(`[data-index="${i}-${j}"]`);
        cell.classList.add('green');
      }
    }
  }

  // Render computer player's gameboard
  const computerGameboard = computerPlayer.gameboard.gameboard;
  const gameboard2Container = document.getElementById('gameboard2');
  gameboard2Container.innerHTML = ''; // Clear previous gameboard
  for (let i = 0; i < computerPlayer.gameboard.rows; i += 1) {
    for (let j = 0; j < computerPlayer.gameboard.columns; j += 1) {
      const gameboardCell = document.createElement('div');
      gameboardCell.classList.add('gameboardCell');
      gameboardCell.setAttribute('data-index', `${i}-${j}`);

      // Apply styles directly instead of querying the DOM again
      if (computerGameboard[i][j] instanceof Ship) {
        gameboardCell.classList.add('red');
      }

      gameboard2Container.appendChild(gameboardCell);
    }
  }
}

function changeMessage(message) {
  const messageDisplay = document.getElementById('messages');

  messageDisplay.innerHTML = message;
}

export { renderGameboards, changeMessage };
