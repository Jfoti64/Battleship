import Gameboard from "./gameboard";

export default class Player {
  constructor (isComputer = false) {
    this.gameboard = new Gameboard()
    this.isComputer = isComputer;
  }
}

