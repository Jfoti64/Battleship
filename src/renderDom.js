import Ship from './ships';

function renderGameboards(player) {
  // Get the appropriate gameboard and container based on player type
  const { gameboard } = player.gameboard;
  const gameboardContainerId = player.isComputer ? 'gameboard2' : 'gameboard1';
  const gameboardContainer = document.getElementById(gameboardContainerId);

  // Clear previous gameboard content
  gameboardContainer.innerHTML = '';

  // Iterate through each cell in the gameboard
  for (let i = 0; i < player.gameboard.rows; i += 1) {
    for (let j = 0; j < player.gameboard.columns; j += 1) {
      const gameboardCell = document.createElement('div');
      gameboardCell.classList.add('gameboardCell');
      gameboardCell.setAttribute('data-index', `${i}-${j}`);

      // Check the status of each cell and apply the appropriate class
      if (gameboard[i][j] instanceof Ship) {
        // Color cells containing ships differently based on player type
        if (!player.isComputer) {
          gameboardCell.classList.add('green');
        }
      } else if (gameboard[i][j] === 'miss') {
        gameboardCell.classList.add('miss');
      } else if (gameboard[i][j] === 'hit') {
        gameboardCell.classList.add('hit');
      }

      // Append the cell to the container
      gameboardContainer.appendChild(gameboardCell);
    }
  }
}

function changeMessage(message) {
  const messageDisplay = document.getElementById('messages');

  messageDisplay.innerHTML = message;
}

export { renderGameboards, changeMessage };
