const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d"); // to create a 2d canvas

canvas.width = window.innerWidth; // making canvas to take he full height and width of the window
canvas.height = window.innerHeight;

// creating canvas for 2d platform

class Player {
  constructor() {
    // creating properties for Player class
    this.position = {
      // xy position on canvas with 0,0 being at top left corner
      x: 100,
      y: 100,
    };
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";    // making player red
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // creates rectangle, requires xy positions, width and height
  }
}

const player = new Player();
player.draw();

// creating player
