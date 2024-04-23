import Gameboard from './gameboard';
import Player from './players';
import Ship from './ships';
import renderGameboards from './renderDom';

export default function startGame() {
  const humanPlayer = new Player(false); // Assuming false indicates a human player
  const computerPlayer = new Player(true); // True indicates AI or computer player

  // Make sure each player has a gameboard
  humanPlayer.gameboard = new Gameboard();
  computerPlayer.gameboard = new Gameboard();

  // Now pass both players to the render function
  renderGameboards(humanPlayer, computerPlayer);
}
