// to create canvas

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d"); // to create a 2d game

canvas.width = window.innerWidth; // to make canvas take the full width of the screen
canvas.height = window.innerHeight; // to make canvas take the full height of the screen

console.log(c);

// to create player

class Player {
  constructor() {
    this.position = {
      x: 100, // 100 units to the right
      y: 100, // 100 units downwards
    };
    this.width = 30; // charcter size
    this.height = 30;
    this.velocity = {
      x: 0,
      y: 1, // x-y velocity coordinate, y = 1 cos want gravity to bring it down
    };
  }
}
