export default function renderGameboards(humanPlayer, computerPlayer) {
  // Render human player's gameboard
  const gameboard1Container = document.getElementById('gameboard1');
  gameboard1Container.innerHTML = ''; // Clear previous gameboard
  for (let i = 0; i < humanPlayer.gameboard.rows; i += 1) {
    for (let j = 0; j < humanPlayer.gameboard.columns; j += 1) {
      const gameboardCell = document.createElement('div');
      gameboardCell.classList.add('gameboardCell');
      gameboard1Container.appendChild(gameboardCell);
    }
  }

  // Render computer player's gameboard
  const gameboard2Container = document.getElementById('gameboard2');
  gameboard2Container.innerHTML = ''; // Clear previous gameboard
  for (let i = 0; i < computerPlayer.gameboard.rows; i += 1) {
    for (let j = 0; j < computerPlayer.gameboard.columns; j += 1) {
      const gameboardCell = document.createElement('div');
      gameboardCell.classList.add('gameboardCell');
      gameboard2Container.appendChild(gameboardCell);
    }
  }
}
