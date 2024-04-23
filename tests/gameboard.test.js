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
  expect(currentPlayerGameboard[1][0]).toBe(submarine);
});

test('Check gameboard to insure submarine was placed correctly in playerGameboard accounting for horizontal length', () => {
  const submarine = new Ship(3);
  const playerGameboard = new Gameboard();
  playerGameboard.placeShip(submarine, 0, 0, false);
  const currentPlayerGameboard = playerGameboard.getGameboard();
  expect(currentPlayerGameboard[0][2]).toBe(submarine);
});

test('If any part of the ship is out of bounds when placed horizontally, return false', () => {
  const playerGameboard = new Gameboard();
  const submarine = new Ship(3);
  expect(playerGameboard.placeShip(submarine, 0, 9, false)).toBe(false);
});

test('If any part of the ship is out of bounds when placed vertically, return false', () => {
  const playerGameboard = new Gameboard();
  const submarine = new Ship(3);
  expect(playerGameboard.placeShip(submarine, 9, 0, true)).toBe(false);
});

test('If any part of the ship would overlap with another ship horizontally, return false', () => {
  const playerGameboard = new Gameboard();
  const submarine = new Ship(3);
  const destroyer = new Ship(3);
  playerGameboard.placeShip(submarine, 0, 0, false);
  expect(playerGameboard.placeShip(destroyer, 0, 1, false)).toBe(false);
});

test('If any part of the ship would overlap with another ship vertically, return false', () => {
  const playerGameboard = new Gameboard();
  const submarine = new Ship(3);
  const destroyer = new Ship(3);
  playerGameboard.placeShip(submarine, 0, 1, true);
  expect(playerGameboard.placeShip(destroyer, 2, 1, true)).toBe(false);
});

test('Confirm that location has a ship and call hit() on that ship', () => {
  const submarine = new Ship(3);
  const playerGameboard = new Gameboard();
  playerGameboard.placeShip(submarine, 0, 0, true);
  playerGameboard.receiveAttack(2, 0);
  expect(submarine.getHits()).toBe(1);
});

test('Confirm that location does not have a ship then log coordinates of the miss', () => {
  const playerGameboard = new Gameboard();
  playerGameboard.receiveAttack(0, 2);
  expect(playerGameboard[0][2]).toBe('miss');
});

test('Check if the ships array contains all ships', () => {
  const playerGameboard = new Gameboard();
  const shipNames = playerGameboard.ships.map((ship) => ship.name);
  expect(shipNames).toEqual(
    expect.arrayContaining(['Destroyer', 'Battleship', 'Destroyer', 'Submarine', 'PatrolBoat'])
  );
});

test('If all ships on board are sunk return true', () => {
  const playerGameboard = new Gameboard();
  playerGameboard.ships.forEach((ship) => {
    for (let i = 0; i < ship.length; i += 1) {
      ship.hit();
    }
  });
  expect(playerGameboard.allShipsSunk()).toBe(true);
});

test('If all ships on board are not sunk return false', () => {
  const playerGameboard = new Gameboard();
  expect(playerGameboard.allShipsSunk()).toBe(false);
});
