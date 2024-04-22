import Gameboard from '../src/gameboard';
import Ship from '../src/ships';

test('Gameboard creates a 10x10 2D array', () => {
  const rows = 10;
  const columns = 10;
  const gameboard = new Gameboard(rows, columns);
  const arr = gameboard.getGameboard();
  const totalElements = arr.length * arr[1].length;
  expect(totalElements).toBe(100);
});

test('Gameboard creates a 5x5 2D array', () => {
  const rows = 5;
  const columns = 5;
  const gameboard = new Gameboard(rows, columns);
  const arr = gameboard.getGameboard();
  const totalElements = arr.length * arr[1].length;
  expect(totalElements).toBe(25);
});

test('Check gameboard to insure submarine was placed at beginning of playerGameboard', () => {
  const submarine = new Ship(3);
  const playerGameboard = new Gameboard();
  playerGameboard.placeShip(submarine, 0, 0);
  const currentPlayerGameboard = playerGameboard.getGameboard();
  expect(currentPlayerGameboard[0][0]).toBe(submarine);
});

test('Check gameboard to insure submarine was placed correctly in playerGameboard accounting for vertical length', () => {
  const submarine = new Ship(3);
  const playerGameboard = new Gameboard();
  playerGameboard.placeShip(submarine, 0, 0, true);
  const currentPlayerGameboard = playerGameboard.getGameboard();
  expect(currentPlayerGameboard[0][2]).toBe(submarine);
});

test('Check gameboard to insure submarine was placed correctly in playerGameboard accounting for horizontal length', () => {
  const submarine = new Ship(3);
  const playerGameboard = new Gameboard();
  playerGameboard.placeShip(submarine, 0, 0, false);
  const currentPlayerGameboard = playerGameboard.getGameboard();
  expect(currentPlayerGameboard[2][0]).toBe(submarine);
});

test('Confirm that location has a ship and call hit() on that ship', () => {
  const submarine = new Ship(3);
  const playerGameboard = new Gameboard();
  playerGameboard.placeShip(submarine, 0, 0, true);
  playerGameboard.receiveAttack(0, 2);
  expect(submarine.getHits()).toBe(1);
});

test('Confirm that location does not have a ship then log coordinates of the miss', () => {
  const playerGameboard = new Gameboard();
  playerGameboard.receiveAttack(0, 2);
  expect(playerGameboard.missedShots).toContainEqual([0, 2]);
});

test('Check if the ships array contains all ships', () => {
  const playerGameboard = new Gameboard();
  const shipNames = playerGameboard.ships.map((ship) => ship.name);
  expect(shipNames).toEqual(expect.arrayContaining(['Destroyer', 'Battleship', 'Destroyer', 'Submarine', 'PatrolBoat']));
});
