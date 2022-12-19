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
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // creates rectangle, requires xy coordinates for positioning on the canvas, width and height
  }

  update() {
    // to continuously update the player's properties and values
    this.draw(); // draw the player onto canvas
    // VERY IMPORTANT: the 2 lines below link position with velocity causing position to be affected by velocity
    this.position.y += this.velocity.y; // when update() is called, player will move down along y axis by velocity-y value
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      // include velocity-y so that player will stay one position away from bottom (in one frame per second)
      // gravity only exist while player is on canvas
      this.velocity.y += gravity; // increase velocity-y here instead of position-y because gravity is acceleration
    } else {
      // stops velocity-y once player is at bottom of canvas
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 100,
    };
    this.width = 200;
    this.height = 20;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // remember that fillRect draws out the instance onto the canvas (default color is black)
  }
}

const player = new Player();
player.draw(); // drawing player onto canvas

const platform = new Platform();

// creating player

function animate() {
  requestAnimationFrame(animate); // arguement is the function which you want to repeat, here want to repeat the animate function
  // meaning the animiate function will repeat its contents over and over again
  c.clearRect(0, 0, canvas.width, canvas.height); // to remove all the drawings in the canvas, requires starting reference point coordinates and from there how much width and height you want to remove
  player.update();
  platform.draw(); // drawing platform onto canvas

  if (
    // creating player-platform collision detection
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y && // IMPORTANT note: like in gravity need to include player.velocity.y
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  ) {
    // remember that top of canvas is lower than bottom of canvas
    player.velocity.y = 0;
  }
}

animate();

// create animation
// create gravity in update() in Player class

// function keyboardDown(e) {
//   console.log(e)  // can log this in terminal to check the keycode of each character key
// }

function keyboardDown({ keyCode }) {
  switch (keyCode) {
    case 65: // refers to A
      console.log("left");
      player.velocity.x = -5;
      break;
    case 83: // refers to S
      console.log("down");
      break;
    case 68: // refers to D
      console.log("right");
      player.velocity.x = 5;
      break;
    case 87: // refers to W
      console.log("up");
      player.velocity.y = -10; // minus to move up
      break;
  }
}

window.addEventListener("keydown", keyboardDown);

function keyboardUp({ keyCode }) {
  switch (keyCode) {
    case 65: // refers to A
      console.log("left");
      player.velocity.x = 0;
      break;
    case 83: // refers to S
      console.log("down");
      break;
    case 68: // refers to D
      console.log("right");
      player.velocity.x = 0; // when "d" key is lifted, player will stop moving to the right
      break;
    case 87: // refers to W
      console.log("up");
      player.velocity.y = 0; // although velocity-y = 0, if it is mid-air, the gravity if-else code will activate and give it a value causing player to go down
      break;
  }
}

window.addEventListener("keyup", keyboardUp);

// player movements when keydown and keyup
