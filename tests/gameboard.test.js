import Gameboard from "../src/gameboard";

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
