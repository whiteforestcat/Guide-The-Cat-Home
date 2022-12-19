const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d"); // to create a 2d canvas

canvas.width = window.innerWidth; // making canvas to take the full height and width of the window
canvas.height = window.innerHeight;
const gravity = 0.5;


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
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    c.fillStyle = "red"; // making player red
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // creates rectangle, requires xy positions, width and height
  }

  update() {
    // to continuously update the player's properties and values
    this.draw(); // draw the player onto canvas
    this.position.y += this.velocity.y; // when update() is called, player will move down along y axis by velocity-y value
    
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {  // gravity only exist while player is on canvas
        this.velocity.y += gravity  // increase velocity-y here instead of position-y because gravity is acceleration
    } else {    // stops velocity-y once player is at bottom of canvas
        this.velocity.y = 0;
    }
    
  }
}

const player = new Player();
player.draw(); // drawing player onto canvas

// creating player

function animate() {
  requestAnimationFrame(animate); // arguement is the function which you want to repeat, here want to repeat the animate function
  // meaning the animiate function will repeat its contents over and over again
  c.clearRect(0,0, canvas.width, canvas.height) // to remove all the drawings in the canvas, requires starting reference point coordinates and from there how much width and height you want to remove
  player.update()
}

animate();

// create animation
// create gravity in update()
