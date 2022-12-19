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

const keys = {
    // initial state of right and left keys ie "d" and "a" which are not pressed by default
    rightKey: {
      pressed: false,
    },
    leftKey: {
      pressed: false,
    },
  };
  
  // player.update(); // player will move down 1 unit upon refresh
  // to create a NON-STOP LOOP to mimic animation instead of one time action which will keep reiterating itself like the void loop in arduino
  function animate() {
    requestAnimationFrame(animate); // this will cause the content within animate to repeat over and over again non-stop
    // console.log("go")                   // test printing "go" on console
    c.clearRect(0, 0, canvas.width, canvas.height); // without this, original player object shape will not maintain, it will just keep expanding downwards
    // .clearRect has 4 arguments, x and y coordinates (if 0 means top left corner), how much width and height you want to clear from x,y
    player.update(); // to make player to keep moving
  
    if (keys.rightKey.pressed) {
      // true or false will depend on addEventListener
      player.velocity.x = 5; // speed increases 5 units/timeframe to the right
    } else {
      player.velocity.x = 0;
    }
    if (keys.leftKey.pressed) {
      // true or false will depend on addEventListener
      player.velocity.x = -5; // speed increases 5 units/timeframe to the left
    }
  }
  
  animate();
  
  // add clicks using addEventListeners to move the player using keyboard
  
  // const keyboard = (e) => {
  //   // console.log("go");       // test to see console will print "go" when you press down any key on keyboard
  //   console.log(e);             // press a key and check keycode under console to check what is the coresponding value to its key on keyboard
  // };
  
  // this occurs when you press down a key
  const keyboardDown = ({ keyCode }) => {
    switch (keyCode) {
      case 65: // corresponds to A
        console.log("left");
        keys.leftKey.pressed = true;
        break;
      case 83: // corresponds to S
        console.log("down");
        break;
      case 68: // corresponds to D
        console.log("right");
        keys.rightKey.pressed = true;
        //   player.velocity.x = 1; // this is velocity not position so no need to += 1 as this will introducec acceleration along x-axis
        break;
      case 87: // corresponds to W
        console.log("up");
        player.velocity.y -= 20; // minus to move up
        break;
    }
  };
  
  window.addEventListener("keydown", keyboardDown);
  
  // this occurs when you lift up a key
  const keyboardUp = ({ keyCode }) => {
    switch (keyCode) {
      case 65: // corresponds to A
        keys.leftKey.pressed = false;
        console.log("left");
        break;
      case 83: // corresponds to S
        console.log("down");
        break;
      case 68: // corresponds to D
        keys.rightKey.pressed = false;
        //   player.velocity.x = 0; // remember this is velocity, not position
        break;
      case 87: // corresponds to W
        console.log("up");
        player.velocity.y -= 20; // minus to move up
        break;
    }
  };
  
  window.addEventListener("keyup", keyboardUp);
