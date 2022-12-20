const platformImage = document.getElementById("platform-image");
const catImage = document.getElementById("cat-image");
const wolfImage = document.getElementById("wolf-image");

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d"); // to create a 2d canvas

canvas.width = window.innerWidth; // making canvas to take the full height and width of the window
canvas.height = window.innerHeight;
const gravity = 0.5;
let scrollDistance = 0; // to measure how much the player has travelled
const home = 20000; // this is the end goal

// creating canvas for 2d platform

class Player {
  constructor(image) {
    // creating properties for Player class
    this.position = {
      // xy position on canvas with 0,0 being at top left corner
      x: 100,
      y: 100,
    };
    this.width = 50;
    this.height = 50;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;
  }

  draw() {
    // c.fillStyle = "yellow"; // making player red
    // c.fillRect(this.position.x, this.position.y, this.width, this.height); // creates rectangle, requires xy coordinates for positioning on the canvas, width and height
    c.drawImage(
      catImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
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
  constructor(x, y, image) {
    this.position = {
      //   x: 200,    // dont use given values to create multiple instances of class, otherwise all the platforms will just overlap
      //   y: 100,
      x: x, // this is like this.x = x as learned previously but no need to write this.x as here it is already this.position.x
      y: y,
    };
    this.width = 200;
    this.height = 20;
    this.image = image;
  }

  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height); // remember that fillRect draws out the instance onto the canvas (default color is black)
    c.drawImage(
      platformImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Enemy {
  constructor(x, image) {
    this.position = {
      x: x,
      y: canvas.height - 50,
    };
    this.width = 50;
    this.height = 46;
    this.image = image;
  }

  draw() {
    c.drawImage(
      wolfImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const player = new Player();
player.draw(); // drawing player onto canvas
// creating player

// const platform = new Platform(); // creating one platform
const platforms = [
  // to create multiple instances of platform using array, now need to do forEach to convert each platform into platforms
  // but if platform.position.x and .y are given values during class creation, then theese 2 plaform instances will overlap
  new Platform(400, 400),
  new Platform(1000, 400),
  new Platform(1200, 300),
  // 2 enemies here
  new Platform(2000, 400),
];

const enemies = [new Enemy(500), new Enemy(1300)];

function animate() {
  requestAnimationFrame(animate); // arguement is the function which you want to repeat, here want to repeat the animate function
  // meaning the animiate function will repeat its contents over and over again
  c.clearRect(0, 0, canvas.width, canvas.height); // to remove all the drawings in the canvas, requires starting reference point coordinates and from there how much width and height you want to remove

  platforms.forEach((platform) => platform.draw());
  //   platform.draw(); // drawing platform onto canvas
  player.update(); // player.draw() below platform.draw() so that on live server, player wont be behing platform when they overlap
  enemies.forEach((enemy) => enemy.draw());

  platforms.forEach((platform) => {
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
  });

  enemies.forEach((enemy) => {
    if (
      // creating player-enemy collision detection
      player.position.y + player.height - 10 >= enemy.position.y && // somehow need -10 to ensure player is in contact with enemy from the top
      player.position.x + player.width - 4 >= enemy.position.x &&
      player.position.x + 10 <= enemy.position.x + enemy.width
    )
      alert("Game Over! You are dead");
  });
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
      if (player.position.x >= 100) {
        player.velocity.x = -7;
        scrollDistance -= 7;
      } else {
        player.velocity.x = 0;
        platforms.forEach((platform) => {
          platform.position.x += 7;
          scrollDistance = -7;
          // moving the platform RIGHT instead of the player by 5 when you keep moving left
          // this is to scroll the platform to the left
        });
        enemies.forEach((enemy) => {
          enemy.position.x += 7;
          // scrolls enemy to the right
        });
      }
      break;
    case 83: // refers to S
      console.log("down");
      break;
    case 68: // refers to D
      console.log("right");
      if (player.position.x <= 400) {
        player.velocity.x = 7;
        scrollDistance += 7;
      } else {
        player.velocity.x = 0;
        platforms.forEach((platform) => {
          platform.position.x -= 7;
          scrollDistance += 7;
          // 5 because you want it to move LEFT at the same rate as the player.velocity.x
          // scrolls platform to the right
        });
        enemies.forEach((enemy) => {
          enemy.position.x -= 7;
          // scrolls enemy to the right
        });
      }
      break;
    case 87: // refers to W
      console.log("up");
      player.velocity.y = -10; // minus to move up
      break;
  }

  // Winning Scenario
  if (scrollDistance >= home) {
    alert("Congrats! The Cat has returned home!");
  }
  console.log(scrollDistance);
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
