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

  draw() {
    // function within class
    c.fillStyle = "red"; // make character red, need to style first before creating the character using .fillRect
    // to draw the player
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // input parameters as the coordinates of the player
  }

  update() {
    this.position.y += this.velocity.y; // need to update y-coordinates first before draw() to work
    this.position.x += this.velocity.x; // why need this for keydown right to work? this is called by animate() which will keep iterating
    this.draw();
    // this.velocity.y += gravity; // to create acceleration along y axis

    // to stop player from dropping below the screen
    if (this.position.y + this.height <= canvas.height) {
      // need to plus this.height so that object will stop falling one "object-height" away from canvas bottom
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

// end of player creation

const player = new Player();
player.draw();
