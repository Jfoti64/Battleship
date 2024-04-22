import Ship from '../src/ships.js'

test('Increase hits until ship isSunk returns true', () => {
  const length = 1;
  const ship = new Ship(length);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
