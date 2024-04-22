import Gameboard from './gameboard';
import Player from './players';
import Ship from './ships';

const humanPlayer = new Player();
const computerPlayer = new Player(true);

(function placeAllShips() {
  humanPlayer.gameboard.ships.forEach((ship) => humanPlayer.gameboard.placeShip(ship));
  computerPlayer.gameboard.ships.forEach((ship) => computerPlayer.gameboard.placeShip(ship));
})();
