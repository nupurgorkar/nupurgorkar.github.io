//referenced https://www.youtube.com/watch?v=9z5FsTzYWE4 to set up joystick

//pin that connects to VRx
int xPin = A0;
//pin that connects to VRy
int yPin = A1;
//pin that connects to SW for the button
int buttonPin = 2;
//pin that connects to LED
int ledPin = 13;

//x position
int xVal;
//y position
int yVal;
//checks if the button is on or off 
int buttonState;

//sets up serial communication with the x and y positions and button and LED
void setup() {
  Serial.begin(9600);
  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

//reads the x, y, and button state values
void loop() {
  xVal = analogRead(xPin);
  yVal = analogRead(yPin);
  buttonState = digitalRead(buttonPin);

//Serial Communication separated by comma
  Serial.print(xVal);
  Serial.print(",");
  Serial.print(yVal);
  Serial.print(",");
  Serial.println(buttonState);

//serial communication for the LED output
  if (Serial.available() > 0) {
    char command = Serial.read();
    if (command == '1') {
      digitalWrite(ledPin, HIGH); // Turns LED on
    } else if (command == '0') {
      digitalWrite(ledPin, LOW); // Turns LED off
    }
  }

  delay(75); //delays the reading of the next input 

  
}
