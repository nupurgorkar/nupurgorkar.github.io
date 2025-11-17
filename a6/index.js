const BAUD_RATE = 9600; // This should match the baud rate in your Arduino sketch

let port, connectBtn; // Declare global variables
//let x = 10;
//let speed = 20;

let playerRadius = 25;
let xplayer;
let yplayer;

function setup() {
  setupSerial(); // Run our serial setup function (below)

  // Create a canvas that is the size of our browser window.
  // windowWidth and windowHeight are p5 variables
  createCanvas(windowWidth, windowHeight);
  xplayer = windowWidth / 2;
  yplayer = playerRadius;
}

function draw(){
    const portIsOpen = checkPort(); // Check whether the port is open (see checkPort function below)
    if (!portIsOpen) return; // If the port is not open, exit the draw loop

    let str = port.readUntil("\n"); // Read from the port until the newline
    if (str.length == 0) return; // If we didn't read anything, return.
    background(220);
    ellipse(xplayer, yplayer, playerRadius * 2, playerRadius * 2);
    
    let positionArray = str.trim().split(","); // Trim whitespace and split on commas

    // Convert each element from the serial communication to an integer
    const xPos = positionArray[0]
    const yPos = positionArray[1]

    //sets up control of the player based on joystick input
    if (yPos > 545) {
        yplayer += 5;
    }
    if (yPos < 400){
        yplayer -= 5;
    }

    if (xPos > 545) {
        xplayer += 5;
    }
    if (xPos < 400){
        xplayer -= 5;
    }

    //text displayed when the player reaches the bottom of the screen
    if (yplayer >= windowHeight - playerRadius) {
        text("Congrats on reaching the bottom! \nPress the space bar to light up your LED and celebrate.", windowWidth / 2, windowHeight / 2);
    }
}

function keyPressed() {
    if (key === ' ') { // Check if spacebar is pressed
        port.write('1'); // Send '1' to turn LED on
        return false; // Prevent default spacebar behavior
    }
}

function keyReleased() {
    if (key === ' ') { // Check if spacebar is released
        port.write('0'); // Send '0' to turn LED off
        return false;
    }
}

// Three helper functions for managing the serial connection.

function setupSerial() {
  port = createSerial();

  // Check to see if there are any ports we have used previously
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    // If there are ports we've used, open the first one
    port.open(usedPorts[0], BAUD_RATE);
  }

  // create a connect button
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(5, 5); // Position the button in the top left of the screen.
  connectBtn.mouseClicked(onConnectButtonClicked); // When the button is clicked, run the onConnectButtonClicked function
}

function checkPort() {
  if (!port.opened()) {
    // If the port is not open, change button text
    connectBtn.html("Connect to Arduino");
    // Set background to gray
    background("gray");
    return false;
  } else {
    // Otherwise we are connected
    connectBtn.html("Disconnect");
    return true;
  }
}

function onConnectButtonClicked() {
  // When the connect button is clicked
  if (!port.opened()) {
    // If the port is not opened, we open it
    port.open(BAUD_RATE);
  } else {
    // Otherwise, we close it!
    port.close();
  }
}
