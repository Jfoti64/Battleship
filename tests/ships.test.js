import Ship from '../src/ships';

test('Increase hits until ship isSunk returns correct value', () => {
  const length = 1;
  const ship = new Ship(length);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Check that ship dosn't sink until hit enough times", () => {
  const length = 2;
  const ship = new Ship(length);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
