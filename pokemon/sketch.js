let screen = "intro";
let font; //font
let clouds = [];
let playerHealth = 100;
let enemyHealth = 100;
let floatOffset = 0; //character animation
let lastMousePressedTime = 0;
let selectedCharacter = null;
// Global variables at the top of your sketch
let dialogues = [//our array, add more dialogue
    "Charmander: If statements help me decide what move to use!",
  "Bulbasaur: Exactly! In p5.js, an if statement lets your sketch check if something is true, then do something based on that.",
  "Bulbasaur: It looks like this: if (condition) { /* code to run if true */ }",
  "Charmander: What’s this 'condition'?",
  "Bulbasaur: The condition is an expression that can be true or false. For example: if (mouseX > 200) { fill(255, 0, 0); }",
  "Charmander: So the code inside the {} only runs if the condition is true?",
  "Bulbasaur: Exactly! If it's false, the code inside the if block is skipped.",
  "Charmander: What if I want to do something when the condition is false?",
  "Bulbasaur: Then you add an else block! It runs if the if condition is false. Like this: if (mouseX > 200) { fill(255, 0, 0); } else { fill(0, 0, 255); }",
  "Charmander: Oh, so it’s like a fork — do this if true, otherwise do that.",
  "Bulbasaur: Exactly right!",
  "Charmander: Can I check more than one condition?",
  "Bulbasaur: You can use else if for extra checks! The program tests conditions top-down until one is true. For example: if (mouseX > 400) { fill(0, 255, 0); } else if (mouseX > 200) { fill(255, 0, 0); } else { fill(0, 0, 255); }",
  "Charmander: So if mouseX is 350, the fill becomes red, right?",
  "Bulbasaur: Exactly! Because the first condition is false, but the second is true.",
  "Charmander: What about combining conditions?",
  "Bulbasaur: Use logical operators like && (and), || (or), and ! (not). For example: if (mouseX > 100 && mouseY > 100) { fill(255); } means fill white only if both mouseX and mouseY are greater than 100.",
  "Charmander: And what does || do?",
  "Bulbasaur: It means or — if either condition is true. Like: if (mouseX < 50 || mouseY < 50) { fill(0); } fill is black if mouseX or mouseY is less than 50.",
  "Charmander: Can I put if statements inside other if statements?",
  "Bulbasaur: Yes! That’s called nesting. For example: if (mouseX > 200) { if (mouseY > 200) { fill(255, 255, 0); } }",
  "Charmander: What if the inner if is false?",
  "Bulbasaur: Then that code block is skipped, but the outer if still controls whether the inner if runs.",
  "Charmander: What about checking equality? Like if mouseX equals 300?",
  "Bulbasaur: Use the === operator to check if two things are exactly equal. For example: if (mouseX === 300) { fill(0, 255, 255); }",
  "Charmander: And for 'not equal'?",
  "Bulbasaur: Use !==. Like: if (mouseX !== 300) { fill(100); }",
  "Charmander: So to sum up, if statements check conditions, run code if true, and can have else if and else blocks for other cases?",
  "Bulbasaur: Perfect! And with logical operators and nesting, you can write really smart sketches.",
  "Charmander: Thanks, Bulbasaur! I’m gonna try coding if statements right now!"
];

let currentDialogue = 0; // keeps track of which dialogue line to show

function setup() {
  createCanvas(800, 600); // Updated canvas size
  
  for (let i = 0; i < 5; i++) {
    clouds.push({ x: random(width), y: random(50, 200), speed: random(0.2, 0.5) });
  }
}

function cloudreset() {
  for (let c of clouds) {
    c.x += c.speed;
    if (c.x > width + 100) {
      c.x = -100;
      c.y = random(50, 200);
    }
  }
}

function drawClouds() {
  noStroke();
  fill(255, 255, 255, 200);
  for (let c of clouds) {
    ellipse(c.x, c.y, 60, 40);
    ellipse(c.x + 20, c.y + 10, 50, 30);
    ellipse(c.x - 20, c.y + 10, 50, 30);
  }
}

function preload() {
  font = loadFont('PressStart2P-Regular.ttf');
}

function draw() {
  background(0, 153, 153);

  if (screen == "intro") {
    drawIntro();
  } else if (screen == "characterselect") {
    drawcharacterselect();
  } else if (screen == "game"){
    gameScreen();
  } else if (screen == "learn"){
    drawlearnScreen();
  } else if (screen == "howto"){
    drawhowtoScreen();
  } else if (screen == "ready"){
    drawreadyScreen();
  } else if (screen == "fight"){
    drawfightScreen();
  } else if (screen == "bag"){
    drawbagScreen();
  } else if (screen == "pokemon"){
    drawpokemonScreen();
  } else if (screen == "fight2"){
    drawfight2Screen();
  } else if (screen == "incorrect"){
    drawincorrectScreen();
  } else if (screen == "correct"){
    drawcorrectScreen();
  } else if (screen == "incorrect2"){
    drawincorrect2Screen();
  } else if (screen == "correct2"){
    drawcorrect2Screen();
  } else if (screen == "fight3"){
    drawfight3Screen();
  }else if (screen == "incorrect3"){
    drawincorrect3Screen();
  } else if (screen == "correct3"){
    drawcorrect3Screen();
  }else if (screen == "fight4"){
    drawfight4Screen();
  }else if (screen == "incorrect4"){
    drawincorrect4Screen();
  } else if (screen == "correct4"){
    drawcorrect4Screen();
  }else if (screen == "fight5"){
    drawfight5Screen();
  }else if (screen == "incorrect5"){
    drawincorrect5Screen();
  } else if (screen == "correct5"){
    drawcorrect5Screen();
  }else if (screen == "fight6"){
    drawfight6Screen();
  }else if (screen == "incorrect6"){
    drawincorrect6Screen();
  } else if (screen == "correct6"){
    drawcorrect6Screen();
  } else if (screen == "victory"){
    drawvictoryScreen();
  } else if (screen == "defeat"){
    drawdefeatScreen();
  }
  noStroke();
  fill(255);
  textSize(10);
  text(mouseX + "  " + mouseY, 50, 20);
}

function drawIntro() {
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  stroke(0);
  strokeWeight(5);
  textFont(font);
  text("If", width / 2, 80);
  text("Statements", width / 2, 150);

  // Sun
  noStroke();
  fill(255, 204, 50);
  ellipse(750, 20, 120, 120);

  // Clouds
  cloudreset();
  drawClouds();

  // Mountains
  fill(80, 80, 110);
  noStroke();
  beginShape();
  vertex(0, 300);
  vertex(100, 200);
  vertex(250, 280);
  vertex(400, 190);
  vertex(550, 260);
  vertex(700, 220);
  vertex(800, 300);
  vertex(800, height);
  vertex(0, height);
  endShape(CLOSE);

  // Mountains
  fill(50, 50, 80);
  beginShape();
  vertex(0, 350);
  vertex(200, 270);
  vertex(350, 350);
  vertex(500, 260);
  vertex(650, 340);
  vertex(800, 300);
  vertex(800, height);
  vertex(0, height);
  endShape(CLOSE);

  // Play Button
  textAlign(CENTER, CENTER)
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 275 && mouseX <= 525 && mouseY >= 480 && mouseY <= 525) {
    fill(150, 48, 0);
  } else {
    fill(255, 153, 51);
  }
  rect(400, 500, 250, 50);
  textSize(30);
  fill(250);
  noStroke();
  text("Play", 400, 500);
  
  //How To Button
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 275 && mouseX <= 525 && mouseY >= 540 && mouseY <= 585) {
    fill(150, 48, 0);
  } else {
    fill(255, 153, 51);
  }
  rect(400, 563, 250, 50);
  textSize(30);
  fill(250);
  noStroke();
  text("Learn", 400, 560);
}
function drawcharacterselect() {
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("Select Your Character", width / 2, 100 );

  // Back button
  rectMode(CENTER);
  stroke(0);
  strokeWeight(2);
  if (mouseX >= 40 && mouseX <= 160 && mouseY >= 510 && mouseY <= 570) {
    fill(200, 50, 50);
  } else {
    fill(255, 100, 100);
  }
  rect(100, 540, 120, 50);
  noStroke();
  fill(255);
  textSize(24);
  text("Back", 100, 539);
  
  
  //Character one
  floatOffset = sin(frameCount * 0.15) * 5;
  drawCharmander(-40, 150 + floatOffset);
  
  //Character two
  floatOffset = cos(frameCount * 0.15) * 5;
  drawBulbasaur(220, 170 + floatOffset);
  
  //character three 
  floatOffset = sin(frameCount * 0.15) * 5;
  drawSquirtle(500, 170 + floatOffset);
}
function gameScreen(){
 drawSimpleBackground();
  
      if (selectedCharacter == "character1") {
      drawCharmander(-20, 300 + floatOffset);
    } else if (selectedCharacter == "character2") {
      drawBulbasaur(-20, 300 + floatOffset);
    } else if (selectedCharacter == "character3") {
      drawSquirtle(-20, 300 + floatOffset);
  }
  
floatOffset = cos(frameCount * 0.15) * 5;
 drawEnemy(500,-30 + floatOffset);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 10 && mouseX <= 130 && mouseY >= 30 && mouseY <= 70) {
    fill(200, 50, 50);
  } else {
    fill(255, 100, 100);
  }
  rect(70,50, 120, 40);
  noStroke();
  fill(255);
  textSize(24);
  text("Back", 70,50);
  
//GAME BUTTONS
  // TOP Left
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 345 && mouseX <= 495 && mouseY >= 455 && mouseY <= 505){
    fill(230, 80, 80);
  } else { 
    fill(255, 102, 102);
  }
  rect(420, 480, 150, 50);
  
  textSize(24);
  fill(50)
  noStroke();
  text("FIGHT", 420, 480);// centered text on the button
  

  
  //TOP Right
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 505 && mouseX <= 655 && mouseY >= 455 && mouseY <= 505){
    fill(80, 230, 80);
  } else { 
    fill(102, 255, 102);
  }
  rect(580, 480, 150, 50);
  fill(255);
  textSize(24);
  fill(50)
  noStroke();
  text("Bag", 580, 480)
  
  
  //BOTTOM LEFT
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
   if (mouseX >= 354 && mouseX <= 495 && mouseY >= 515 && mouseY <= 565){
    fill(230, 230, 80);
  } else { 
    fill(255, 255, 102);
  }
  rect(420, 540, 150, 50);
  fill(255);
  textSize(20);
  fill(50)
  noStroke();
  text("Pokemon", 420, 540)
 
  
  //BOTTOM RIGHT
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 505 && mouseX <= 655 && mouseY >= 515 && mouseY <= 565){
    fill(120, 190, 190);
  } else { 
    fill(176, 216, 230);
  }
  rect(580, 540, 150, 50);
  fill(255);
  textSize(24);
  fill(50)
  noStroke();
  text("Run", 580,540)
  
}

function drawbagScreen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("you have nothing here...", 400, 100); // centered title
  
  
  //
  if (mouseX >= 240 && mouseX <= 560 && mouseY >= 230 && mouseY <= 280) {
    fill(150, 0, 0); // darker red on hover
  } else {
    fill(255, 0, 0); // normal red
  }

  rect(400, 255, 320, 50, 10);

  noStroke();
  fill(255);
  textSize(24);
  text("Back to Game", 400, 258);
  
}

function drawpokemonScreen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(20);
  text("you dont have any other pokemon ...", 400, 100); // centered title
  
    if (mouseX >= 240 && mouseX <= 560 && mouseY >= 230 && mouseY <= 280) {
    fill(150, 0, 0); // darker red on hover
  } else {
    fill(255, 0, 0); // normal red
  }

  rect(400, 255, 320, 50, 10);

  noStroke();
  fill(255);
  textSize(24);
  text("Back to Game", 400, 258);
}

function drawreadyScreen() {
  background(0);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("You are now ready,", 400, 120);
  text("go back and press play!", 400, 170);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  
  if (mouseX >= 240 && mouseX <= 560 && mouseY >= 230 && mouseY <= 280) {
    fill(150, 0, 0); // darker red on hover
  } else {
    fill(255, 0, 0); // normal red
  }

  rect(400, 255, 320, 50, 10);

  noStroke();
  fill(255);
  textSize(24);
  text("Exit to Menu", 400, 258); 
}

function drawHealthBars(playerHealth, enemyHealth) {
  // Player Box & Bar
  stroke(0);
  strokeWeight(3);
  fill(230);
  rect(120, 50, 200, 50, 10); // player health box

  noStroke();
  fill(150);
  rect(120, 40, 160, 16, 5); // Health bar background

  let playerHealthPercent = playerHealth / 100;
  let playerBarWidth = 160 * playerHealthPercent;
  fill(0, 255, 0);
  rect(120 - (160 - playerBarWidth) / 2, 40, playerBarWidth, 16, 5);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(13);
  text("Player HP: " + playerHealth, 120, 62); // Player HP text

  // Enemy Box & Bar
  stroke(0);
  strokeWeight(3);
  fill(230);
  rect(680, 50, 200, 50, 10); // enemy health box

  noStroke();
  fill(150);
  rect(680, 40, 160, 16, 5); // Background bar

  let enemyHealthPercent = enemyHealth / 100;
  let enemyBarWidth = 160 * enemyHealthPercent;
  fill(255, 0, 0);
  rect(680 - (160 - enemyBarWidth) / 2, 40, enemyBarWidth, 16, 5);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(13);
  text("Enemy HP: " + enemyHealth, 680, 62); // Enemy HP text
}


function drawfightScreen(){

  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(16);
  text("To check if Pikachu’s move is ", 400, 100);
  text("Thunderbolt in an if statement, which", 400, 120);
  text("symbol should you use to compare the moves name", 400, 140)

  rectMode(CENTER);
  textSize(24);
  stroke(0);
  strokeWeight(3);

  // Top Left (===)
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 240, 300, 150);
  fill(0);
  noStroke();
  text("===", 200, 240);

  // Top Right (==)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 240, 300, 150);
  fill(0);
  noStroke();
  text("==", 600, 240);

  // Bottom Left (=)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 450, 300, 150);
  fill(0);
  noStroke();
  text("=", 200, 450);

  // Bottom Right (!=)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 450, 300, 150);
  fill(0);
  noStroke();
  text("!=", 600, 450);
  
  drawHealthBars(playerHealth, enemyHealth);
}

function drawfight2Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(16);
  text("Pikachu's speed is greater than 90. How do we", 400, 100); // centered title'
  text("write that in an if statement?", 400, 120);
  
  rectMode(CENTER);
  textSize(24);
  stroke(0);
  strokeWeight(3);

  // Top Left (===)
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(14)
  text("if(speed = 90)", 200, 240);

  // Top Right (==)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(14)
  text("if (speed > 90)", 600, 240);

  // Bottom Left (=)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(14)
  text("if speed > 90", 200, 450);

  // Bottom Right (!=)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(14)
  text("if speed => 90", 600, 450);
  
  drawHealthBars(playerHealth, enemyHealth);
}

function drawincorrectScreen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("INCORRECT", 400, 100); // centered title
  
  
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  
  if (mouseX >= 400 && mouseX <= 400 + 320 && mouseY >= 500 && mouseY <= 500 + 50) {
    fill(150, 0, 0); // darker red on hover
  } else {
    fill(255, 0, 0); // normal red
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500);
}

function drawcorrectScreen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("CORRECT", 400, 100); // centered title
  
  
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  
  if (mouseX >= 400 && mouseX <= 400 + 320 && mouseY >= 500 && mouseY <= 500 + 50) {
    fill(150, 0, 0); // darker red on hover
  } else {
    fill(255, 0, 0); // normal red
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500); 
}

function drawcorrect2Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("CORRECT", 400, 100); // centered title
  
  
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  
  if (mouseX >= 400 && mouseX <= 400 + 320 && mouseY >= 500 && mouseY <= 500 + 50) {
    fill(150, 0, 0); // darker red on hover
  } else {
    fill(255, 0, 0); // normal red
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500); 
}

function drawincorrect2Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("INCORRECT", 400, 100); // centered title
  
  
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  
  if (mouseX >= 400 && mouseX <= 400 + 320 && mouseY >= 500 && mouseY <= 500 + 50) {
    fill(150, 0, 0); // darker red on hover
  } else {
    fill(255, 0, 0); // normal red
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500);
}

function drawfight3Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(16);
  text("Charmander wants to use Flamethrower", 400, 100);
  text("if it's his turn", 400, 120)
  text("Which line is correct?", 400, 140);

  rectMode(CENTER);
  textSize(14);
  stroke(0);
  strokeWeight(3);

  // Top Left (A)
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(12);
  text("if (turn == charmander)", 200, 240);
  text("{ useMove(); }", 200, 260)

  // Top Right (B)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(12);
  text("if turn = charmander", 600, 240);
  text("then useMove();", 600, 260)

  // Bottom Left (C)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(12);
  text("turn == charmander", 200, 450);
  text("{useMove(); }", 200, 490)

  // Bottom Right (D)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(11);
  text("if (useMove == charmander)", 600, 450);

  drawHealthBars(playerHealth, enemyHealth);
}

function drawincorrect3Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("INCORRECT", 400, 100); // centered title

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 475 && mouseY <= 525) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(560, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 560, 500);
}

function drawcorrect3Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("CORRECT", 400, 100); // centered title

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 475 && mouseY <= 525) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(560, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 560, 500);
}

function drawfight4Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(12);
  text("Ash is battling Team Rocket and needs to check if Pikachu’s", 400, 100);
  text("power level is NOT EQUAL to Meowth’s. Which symbol should", 400, 120);
  text("Ash use in his if statement to check for 'not equal'?", 400, 140);

  rectMode(CENTER);
  textSize(18);
  stroke(0);
  strokeWeight(3);

  // Top Left (==!)
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(12)
  text("==! (2xThunderbolt)", 200, 240);

  // Top Right (!==)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(12)
  text("!== (3xPoké Ball)", 600, 240);

  // Bottom Left (!=) ✅ correct
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(12)
  text("!= (Light Tail)", 200, 450);

  // Bottom Right (<>)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(12)
  text("<> (Badge)", 600, 450);

  drawHealthBars(playerHealth, enemyHealth);
}

function drawcorrect4Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("CORRECT", 400, 100); // centered title

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500); 
}

function drawincorrect4Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("INCORRECT", 400, 100); // centered title

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500); 
}

function drawfight5Screen() {
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(16);
  text("Bulbasaur only attacks if his HP is above 0.", 400, 100);
  text("What's the right condition?", 400, 120);

  rectMode(CENTER);
  textSize(18);
  stroke(0);
  strokeWeight(3);

  // Top Left (A: if (HP > 0)) ✅ correct
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 240, 300, 150);
  fill(0);
  noStroke();
  text("if (HP > 0)", 200, 240);

  // Top Right (B: if HP above 0)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 240, 300, 150);
  fill(0);
  noStroke();
  text("if HP above 0", 600, 240);

  // Bottom Left (C: if (HP => 0))
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 450, 300, 150);
  fill(0);
  noStroke();
  text("if (HP => 0)", 200, 450);

  // Bottom Right (D: HP > 0 then attack();)
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 450, 300, 150);
  fill(0);
  noStroke();
  text("HP > 0 then", 600, 450);
  text("attack();", 600, 470)

  drawHealthBars(playerHealth, enemyHealth);
}

function drawcorrect5Screen() {
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("CORRECT", 400, 100);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500);
}

function drawincorrect5Screen() {
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("INCORRECT", 400, 100);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500);
}

function drawfight6Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(16);
  text("Ash wants to check if a Pokeball is Ultra.", 400, 100);
  text("Which line works?", 400, 120);

  rectMode(CENTER);
  textSize(18);
  stroke(0);
  strokeWeight(3);

  // Top Left (A: if (HP > 0)) - correct
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(12);
  text("if (pokeball = )", 200, 240);
  text('Ultra Ball', 200, 260)

  // Top Right (B: if HP above 0) - incorrect
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 240, 300, 150);
  fill(0);
  noStroke();
  textSize(12);
  text("if pokeball == ", 600, 240);
  text("Ultra Ball", 600, 260)

  // Bottom Left (C: if (HP => 0)) - incorrect
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(200, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(12);
  text("if (pokeball == )", 200, 450);
  text("'Ultra Ball'",200, 470 )

  // Bottom Right (D: HP > 0 then attack();) - incorrect
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    fill(200);
  } else {
    fill(255);
  }
  rect(600, 450, 300, 150);
  fill(0);
  noStroke();
  textSize(12);
  text("if 'Ultra Ball'", 600, 450);
  text(" == pokeball then", 600, 470)
  //text("attack();", 600, 470)

  drawHealthBars(playerHealth, enemyHealth);
}

function drawcorrect6Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("CORRECT", 400, 100);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500);
}

function drawincorrect6Screen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("INCORRECT", 400, 100);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);

  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    fill(150, 0, 0);
  } else {
    fill(255, 0, 0);
  }

  rect(400, 500, 320, 50);

  noStroke();
  fill(255);
  textSize(24);
  text("Next Question", 400, 500);
}

function drawvictoryScreen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("Victory!", 400, 100); // centered title
  
  drawHealthBars(playerHealth, enemyHealth);
}

function drawdefeatScreen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("defeat", 400, 100); // centered title
  
  drawHealthBars(playerHealth, enemyHealth);
}


function drawhowtoScreen(){
  background(0, 154, 154);
  fill(255);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  text("Learning If Statements", 400, 100); // centered title

  drawCharmander(-35, 250 + floatOffset);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  if (mouseX >= 670 && mouseX <= 790 && mouseY >= 550 && mouseY <= 590) {
    fill(200, 50, 50);
  } else {
    fill(255, 100, 100);
  }
  rect(730, 570, 120, 40); // Exit button
  noStroke();
  fill(255);
  textSize(24);
  text("Exit", 730, 570);

  //  PLAYER BOX & BAR
  stroke(0);
  strokeWeight(3);
  fill(230);
  rect(120, 50, 200, 50, 10); // player health box

  // Health bar background 
  noStroke();
  fill(150);
  rect(120, 40, 160, 16, 5); // Centered bar inside box

  // Health fill — manual percentage (e.g. 100% of 160 = 160)
  let playerHealthPercent = playerHealth / 100;
  let playerBarWidth = 160 * playerHealthPercent;
  fill(0, 255, 0);
  rect(120 - (160 - playerBarWidth) / 2, 40, playerBarWidth, 16, 5);

  // Player HP Text
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(13);
  text("Player HP: " + playerHealth, 120, 62); // Text lower in box

  // ENEMY BOX & BAR
  stroke(0);
  strokeWeight(3);
  fill(230);
  rect(680, 50, 200, 50, 10); // Enemy box at top right

  noStroke();
  fill(150);
  rect(680, 40, 160, 16, 5); // Background bar

  let enemyHealthPercent = enemyHealth / 100;
  let enemyBarWidth = 160 * enemyHealthPercent;
  fill(255, 0, 0);
  rect(680 - (160 - enemyBarWidth) / 2, 40, enemyBarWidth, 16, 5);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(13);
  text("Enemy HP: " + enemyHealth, 680, 62); // Text below bar
  
  floatOffset = cos(frameCount * 0.15) * 5;
  drawBulbasaur(450, 110 + floatOffset);
  
  
//  Dialogue Box
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(520, 485, 530, 115); // Smaller and higher

// Dialogue Text
  text(dialogues[currentDialogue], 505, 470, 460, 80);

// Next Button 
  rectMode(CENTER);
  stroke(0);
  strokeWeight(2);
  if (mouseX >= 658 && mouseX <= 758 && mouseY >= 502 && mouseY <= 532) {
  fill(150);  // darker color on hover
  } else {
  fill(200);  // normal color
  }rect(708, 517, 100, 30); 
  fill(0);
  noStroke();
  textSize(16);
  text("Next", 709, 519);
  
  //Back Button
  rectMode(CENTER);
  stroke(0);
  strokeWeight(2);
  if (mouseX >= 558 && mouseX <= 658 && mouseY >= 502 && mouseY <= 532) {
  fill(150);  // darker color on hover
  } else {
  fill(200);  // normal color
  }
  rect(608, 517, 100, 30); 
  fill(0);
  noStroke();
  textSize(16);
  text("Back", 608, 519);

  
}


function drawSimpleBackground() {
  // Sky gradient
  for (let i = 0; i < height; i++) {
    let alpha = map(i, 0, height, 0, 1);
    let r = lerp(135, 255, alpha);
    let g = lerp(206, 182, alpha);
    let b = lerp(250, 193, alpha);
    stroke(r, g, b);
    line(0, i, width, i);
  }
  
  // Moving clouds
  fill(255, 255, 255, 150);
  noStroke();
  
  let cloud1X = (frameCount * 0.5) % (width + 100);
  ellipse(cloud1X - 50, 80, 60, 40);
  ellipse(cloud1X - 70, 80, 40, 30);
  ellipse(cloud1X - 30, 80, 40, 30);
  
  let cloud2X = (frameCount * 0.3) % (width + 100);
  ellipse(cloud2X - 50, 140, 50, 35);
  ellipse(cloud2X - 65, 140, 35, 25);
  ellipse(cloud2X - 35, 140, 35, 25);
  
drawEnergyOrbs();

}
function drawEnergyOrbs() {
  // Floating energy orbs
  for (let i = 0; i < 8; i++) {
    let orbX = sin(frameCount * 0.02 + i * 0.8) * 50 + width * (i / 8);
    let orbY = cos(frameCount * 0.03 + i * 1.2) * 30 + height * 0.3;
    let orbSize = sin(frameCount * 0.05 + i) * 5 + 15;
    
    // Outer glow
    for (let j = 0; j < 3; j++) {
      fill(100, 150, 255, 30 - j * 10);
      noStroke();
      ellipse(orbX, orbY, orbSize + j * 8, orbSize + j * 8);
    }
    
    // Inner core
    fill(150, 200, 255, 200);
    ellipse(orbX, orbY, orbSize, orbSize);
    
    // Bright center
    fill(255, 255, 255, 150);
    ellipse(orbX, orbY, orbSize * 0.3, orbSize * 0.3);
  }
}
function drawCharmander (x,y){
noStroke();
  
fill(247,24,24); 
rect(x+287.5,y+125, 12.5, 12.5); 
rect(x+287.5,y+112.5, 12.5, 12.5); 
rect(x+287.5,y+100, 12.5, 12.5); 
rect(x+275,y+87.5, 12.5, 12.5); 
rect(x+275,y+75, 12.5, 12.5); 
rect(x+262.5,y+87.5, 12.5, 12.5); 
rect(x+262.5,y+75, 12.5, 12.5); 
rect(x+262.5,y+62.5, 12.5, 12.5); 
rect(x+262.5,y+100, 12.5, 12.5); 
rect(x+250,y+125, 12.5, 12.5); 
rect(x+250,y+112.5, 12.5, 12.5); 
rect(x+250,y+100, 12.5, 12.5); 
fill(247, 239, 24); 
rect(x+275,y+125, 12.5, 12.5); 
rect(x+275,y+112.5, 12.5, 12.5); 
rect(x+262.5,y+137.5, 12.5, 12.5); 
rect(x+262.5,y+125, 12.5, 12.5); 
rect(x+162.5,y+225, 12.5, 12.5); 
rect(x+162.5,y+212.5, 12.5, 12.5); 
rect(x+150,y+225, 12.5, 12.5); 
rect(x+150,y+212.5, 12.5, 12.5); 
rect(x+150,y+200, 12.5, 12.5); 
rect(x+137.5,y+212.5, 12.5, 12.5); 
rect(x+137.5,y+200, 12.5, 12.5); 
rect(x+137.5,y+187.5, 12.5, 12.5); 
rect(x+125,y+200, 12.5, 12.5); 
rect(x+125,y+187.5, 12.5, 12.5); 
fill(228, 119, 17); 
rect(x+87.5,y+87.5, 12.5, 12.5); 
rect(x+87.5,y+75, 12.5, 12.5); 
rect(x+87.5,y+150, 12.5, 12.5); 
rect(x+87.5,y+137.5, 12.5, 12.5); 
rect(x+87.5,y+125, 12.5, 12.5); 
rect(x+87.5,y+112.5, 12.5, 12.5); 
rect(x+87.5,y+100, 12.5, 12.5); 
rect(x+75,y+150, 12.5, 12.5); 
rect(x+75,y+137.5, 12.5, 12.5); 
rect(x+75,y+125, 12.5, 12.5); 
rect(x+75,y+112.5, 12.5, 12.5); 
rect(x+75,y+100, 12.5, 12.5); 
rect(x+62.5,y+137.5, 12.5, 12.5); 
rect(x+62.5,y+125, 12.5, 12.5); 
rect(x+62.5,y+112.5, 12.5, 12.5); 
rect(x+275,y+100, 12.5, 12.5); 
rect(x+262.5,y+162.5, 12.5, 12.5); 
rect(x+262.5,y+150, 12.5, 12.5); 
rect(x+262.5,y+112.5, 12.5, 12.5); 
rect(x+250,y+187.5, 12.5, 12.5); 
rect(x+250,y+175, 12.5, 12.5); 
rect(x+250,y+162.5, 12.5, 12.5); 
rect(x+237.5,y+200, 12.5, 12.5); 
rect(x+237.5,y+187.5, 12.5, 12.5); 
rect(x+237.5,y+175, 12.5, 12.5); 
rect(x+212.5,y+212.5, 12.5, 12.5); 
rect(x+212.5,y+200, 12.5, 12.5); 
rect(x+212.5,y+187.5, 12.5, 12.5); 
rect(x+200,y+225, 12.5, 12.5); 
rect(x+200,y+212.5, 12.5, 12.5); 
rect(x+200,y+200, 12.5, 12.5); 
rect(x+200,y+187.5, 12.5, 12.5); 
rect(x+200,y+175, 12.5, 12.5); 
rect(x+200,y+162.5, 12.5, 12.5); 
rect(x+187.5,y+250, 12.5, 12.5); 
rect(x+187.5,y+237.5, 12.5, 12.5); 
rect(x+187.5,y+225, 12.5, 12.5); 
rect(x+187.5,y+212.5, 12.5, 12.5); 
rect(x+187.5,y+200, 12.5, 12.5); 
rect(x+187.5,y+187.5, 12.5, 12.5); 
rect(x+187.5,y+175, 12.5, 12.5); 
rect(x+187.5,y+162.5, 12.5, 12.5); 
rect(x+187.5,y+150, 12.5, 12.5); 
rect(x+175,y+225, 12.5, 12.5); 
rect(x+175,y+212.5, 12.5, 12.5); 
rect(x+175,y+187.5, 12.5, 12.5); 
rect(x+175,y+175, 12.5, 12.5); 
rect(x+175,y+162.5, 12.5, 12.5); 
rect(x+175,y+150, 12.5, 12.5); 
rect(x+175,y+137.5, 12.5, 12.5); 
rect(x+175,y+125, 12.5, 12.5); 
rect(x+162.5,y+187.5, 12.5, 12.5); 
rect(x+162.5,y+162.5, 12.5, 12.5); 
rect(x+162.5,y+150, 12.5, 12.5); 
rect(x+162.5,y+137.5, 12.5, 12.5); 
rect(x+162.5,y+125, 12.5, 12.5); 
rect(x+162.5,y+112.5, 12.5, 12.5); 
rect(x+162.5,y+100, 12.5, 12.5); 
rect(x+150,y+87.5, 12.5, 12.5); 
rect(x+150,y+75, 12.5, 12.5); 
rect(x+150,y+175, 12.5, 12.5); 
rect(x+150,y+162.5, 12.5, 12.5); 
rect(x+150,y+150, 12.5, 12.5); 
rect(x+150,y+137.5, 12.5, 12.5); 
rect(x+150,y+125, 12.5, 12.5); 
rect(x+150,y+112.5, 12.5, 12.5); 
rect(x+150,y+100, 12.5, 12.5); 
rect(x+137.5,y+87.5, 12.5, 12.5); 
rect(x+137.5,y+75, 12.5, 12.5); 
rect(x+137.5,y+62.5, 12.5, 12.5); 
rect(x+137.5,y+175, 12.5, 12.5); 
rect(x+137.5,y+162.5, 12.5, 12.5); 
rect(x+137.5,y+150, 12.5, 12.5); 
rect(x+137.5,y+137.5, 12.5, 12.5); 
rect(x+137.5,y+125, 12.5, 12.5); 
rect(x+137.5,y+112.5, 12.5, 12.5); 
rect(x+137.5,y+100, 12.5, 12.5); 
rect(x+125,y+87.5, 12.5, 12.5); 
rect(x+125,y+75, 12.5, 12.5); 
rect(x+125,y+62.5, 12.5, 12.5); 
rect(x+125,y+162.5, 12.5, 12.5); 
rect(x+125,y+150, 12.5, 12.5); 
rect(x+125,y+100, 12.5, 12.5); 
rect(x+112.5,y+87.5, 12.5, 12.5); 
rect(x+112.5,y+75, 12.5, 12.5); 
rect(x+112.5,y+62.5, 12.5, 12.5); 
rect(x+112.5,y+162.5, 12.5, 12.5); 
rect(x+112.5,y+150, 12.5, 12.5); 
rect(x+112.5,y+100, 12.5, 12.5); 
rect(x+100,y+87.5, 12.5, 12.5); 
rect(x+100,y+75, 12.5, 12.5); 
rect(x+100,y+62.5, 12.5, 12.5); 
rect(x+100,y+162.5, 12.5, 12.5); 
rect(x+100,y+150, 12.5, 12.5); 
rect(x+100,y+137.5, 12.5, 12.5); 
rect(x+100,y+125, 12.5, 12.5); 
rect(x+100,y+112.5, 12.5, 12.5); 
rect(x+100,y+100, 12.5, 12.5); 
fill(0, 0, 0); 
rect(x+87.5,y+62.5, 12.5, 12.5); 
rect(x+87.5,y+162.5, 12.5, 12.5); 
rect(x+75,y+87.5, 12.5, 12.5); 
rect(x+75,y+75, 12.5, 12.5); 
rect(x+75,y+162.5, 12.5, 12.5); 
rect(x+62.5,y+150, 12.5, 12.5); 
rect(x+62.5,y+100, 12.5, 12.5); 
rect(x+50,y+137.5, 12.5, 12.5); 
rect(x+50,y+125, 12.5, 12.5); 
rect(x+50,y+112.5, 12.5, 12.5); 
rect(x+300,y+125, 12.5, 12.5); 
rect(x+300,y+112.5, 12.5, 12.5); 
rect(x+300,y+100, 12.5, 12.5); 
rect(x+287.5,y+87.5, 12.5, 12.5); 
rect(x+287.5,y+75, 12.5, 12.5); 
rect(x+287.5,y+137.5, 12.5, 12.5); 
rect(x+275,y+62.5, 12.5, 12.5); 
rect(x+275,y+162.5, 12.5, 12.5); 
rect(x+275,y+150, 12.5, 12.5); 
rect(x+275,y+137.5, 12.5, 12.5); 
rect(x+262.5,y+50, 12.5, 12.5); 
rect(x+262.5,y+187.5, 12.5, 12.5); 
rect(x+262.5,y+175, 12.5, 12.5); 
rect(x+250,y+87.5, 12.5, 12.5); 
rect(x+250,y+75, 12.5, 12.5); 
rect(x+250,y+62.5, 12.5, 12.5); 
rect(x+250,y+200, 12.5, 12.5); 
rect(x+250,y+150, 12.5, 12.5); 
rect(x+250,y+137.5, 12.5, 12.5); 
rect(x+237.5,y+212.5, 12.5, 12.5); 
rect(x+237.5,y+162.5, 12.5, 12.5); 
rect(x+237.5,y+125, 12.5, 12.5); 
rect(x+237.5,y+112.5, 12.5, 12.5); 
rect(x+237.5,y+100, 12.5, 12.5); 
rect(x+225,y+225, 12.5, 12.5); 
rect(x+225,y+212.5, 12.5, 12.5); 
rect(x+225,y+200, 12.5, 12.5); 
rect(x+225,y+187.5, 12.5, 12.5); 
rect(x+225,y+175, 12.5, 12.5); 
rect(x+212.5,y+250, 12.5, 12.5); 
rect(x+212.5,y+237.5, 12.5, 12.5); 
rect(x+212.5,y+225, 12.5, 12.5); 
rect(x+212.5,y+175, 12.5, 12.5); 
rect(x+212.5,y+162.5, 12.5, 12.5); 
rect(x+200,y+262.5, 12.5, 12.5); 
rect(x+200,y+237.5, 12.5, 12.5); 
rect(x+200,y+150, 12.5, 12.5); 
rect(x+187.5,y+262.5, 12.5, 12.5); 
rect(x+187.5,y+137.5, 12.5, 12.5); 
rect(x+187.5,y+125, 12.5, 12.5); 
rect(x+175,y+262.5, 12.5, 12.5); 
rect(x+175,y+237.5, 12.5, 12.5); 
rect(x+175,y+200, 12.5, 12.5); 
rect(x+175,y+112.5, 12.5, 12.5); 
rect(x+175,y+100, 12.5, 12.5); 
rect(x+162.5,y+87.5, 12.5, 12.5); 
rect(x+162.5,y+75, 12.5, 12.5); 
rect(x+162.5,y+250, 12.5, 12.5); 
rect(x+162.5,y+237.5, 12.5, 12.5); 
rect(x+162.5,y+200, 12.5, 12.5); 
rect(x+162.5,y+175, 12.5, 12.5); 
rect(x+150,y+62.5, 12.5, 12.5); 
rect(x+150,y+237.5, 12.5, 12.5); 
rect(x+150,y+187.5, 12.5, 12.5); 
rect(x+137.5,y+50, 12.5, 12.5); 
rect(x+137.5,y+225, 12.5, 12.5); 
rect(x+125,y+50, 12.5, 12.5); 
rect(x+125,y+225, 12.5, 12.5); 
rect(x+125,y+212.5, 12.5, 12.5); 
rect(x+125,y+175, 12.5, 12.5); 
rect(x+125,y+137.5, 12.5, 12.5); 
rect(x+125,y+125, 12.5, 12.5); 
rect(x+125,y+112.5, 12.5, 12.5); 
rect(x+112.5,y+50, 12.5, 12.5); 
rect(x+112.5,y+225, 12.5, 12.5); 
rect(x+112.5,y+200, 12.5, 12.5); 
rect(x+112.5,y+187.5, 12.5, 12.5); 
rect(x+112.5,y+175, 12.5, 12.5); 
rect(x+112.5,y+137.5, 12.5, 12.5); 
rect(x+112.5,y+125, 12.5, 12.5); 
rect(x+100,y+50,12.5, 12.5);  
    
  }
function drawBulbasaur (x,y){
  
fill(56, 133, 69); 
rect(x+87.5,y+137.5, 12.5, 12.5); 
rect(x+75,y+125, 12.5, 12.5); 
rect(x+212.5,y+87.5, 12.5, 12.5); 
rect(x+212.5,y+100, 12.5, 12.5); 
rect(x+200,y+112.5, 12.5, 12.5); 
rect(x+187.5,y+125, 12.5, 12.5); 
rect(x+187.5,y+112.5, 12.5, 12.5); 
rect(x+187.5,y+100, 12.5, 12.5); 
rect(x+175,y+87.5, 12.5, 12.5); 
rect(x+175,y+125, 12.5, 12.5); 
rect(x+175,y+112.5, 12.5, 12.5); 
rect(x+162.5,y+87.5, 12.5, 12.5); 
rect(x+162.5,y+75, 12.5, 12.5); 
rect(x+162.5,y+100, 12.5, 12.5); 
rect(x+150,y+150, 12.5, 12.5); 
rect(x+150,y+137.5, 12.5, 12.5); 
rect(x+137.5,y+150, 12.5, 12.5); 
rect(x+125,y+87.5, 12.5, 12.5); 
rect(x+125,y+75, 12.5, 12.5); 
rect(x+112.5,y+100, 12.5, 12.5); 
rect(x+100,y+137.5, 12.5, 12.5); 
rect(x+100,y+125, 12.5, 12.5); 
rect(x+100,y+112.5, 12.5, 12.5); 
fill(55, 149, 138); 
rect(x+87.5,y+162.5, 12.5, 12.5); 
rect(x+275,y+162.5, 12.5, 12.5); 
rect(x+275,y+150, 12.5, 12.5); 
rect(x+250,y+212.5, 12.5, 12.5); 
rect(x+250,y+137.5, 12.5, 12.5); 
rect(x+237.5,y+212.5, 12.5, 12.5); 
rect(x+237.5,y+200, 12.5, 12.5); 
rect(x+237.5,y+175, 12.5, 12.5); 
rect(x+225,y+212.5, 12.5, 12.5); 
rect(x+225,y+162.5, 12.5, 12.5); 
rect(x+225,y+137.5, 12.5, 12.5); 
rect(x+212.5,y+212.5, 12.5, 12.5); 
rect(x+212.5,y+137.5, 12.5, 12.5); 
rect(x+212.5,y+125, 12.5, 12.5); 
rect(x+200,y+212.5, 12.5, 12.5); 
rect(x+187.5,y+212.5, 12.5, 12.5); 
rect(x+187.5,y+200, 12.5, 12.5); 
rect(x+175,y+200, 12.5, 12.5); 
rect(x+175,y+187.5, 12.5, 12.5); 
rect(x+175,y+175, 12.5, 12.5); 
rect(x+162.5,y+212.5, 12.5, 12.5); 
rect(x+162.5,y+187.5, 12.5, 12.5); 
rect(x+162.5,y+175, 12.5, 12.5); 
rect(x+162.5,y+162.5, 12.5, 12.5); 
rect(x+150,y+225, 12.5, 12.5); 
rect(x+150,y+212.5, 12.5, 12.5); 
rect(x+150,y+200, 12.5, 12.5); 
rect(x+150,y+175, 12.5, 12.5); 
rect(x+137.5,y+212.5, 12.5, 12.5); 
rect(x+137.5,y+200, 12.5, 12.5); 
rect(x+137.5,y+187.5, 12.5, 12.5); 
rect(x+137.5,y+175, 12.5, 12.5); 
rect(x+125,y+187.5, 12.5, 12.5); 
rect(x+125,y+175, 12.5, 12.5); 
rect(x+112.5,y+162.5, 12.5, 12.5); 
rect(x+100,y+175, 12.5, 12.5); 
rect(x+100,y+162.5, 12.5, 12.5); 
fill(50, 201, 74); 
rect(x+162.5,y+125, 12.5, 12.5); 
rect(x+162.5,y+112.5, 12.5, 12.5); 
rect(x+150,y+125, 12.5, 12.5); 
rect(x+150,y+112.5, 12.5, 12.5); 
rect(x+150,y+100, 12.5, 12.5); 
rect(x+137.5,y+125, 12.5, 12.5); 
rect(x+137.5,y+112.5, 12.5, 12.5); 
rect(x+137.5,y+100, 12.5, 12.5); 
rect(x+125,y+125, 12.5, 12.5); 
rect(x+125,y+112.5, 12.5, 12.5); 
rect(x+125,y+100, 12.5, 12.5); 
rect(x+112.5,y+125, 12.5, 12.5); 
rect(x+112.5,y+112.5, 12.5, 12.5); 
fill(49, 201, 74); 
rect(x+87.5,y+87.5, 12.5, 12.5); 
rect(x+87.5,y+125, 12.5, 12.5); 
rect(x+87.5,y+112.5, 12.5, 12.5); 
rect(x+87.5,y+100, 12.5, 12.5); 
rect(x+75,y+112.5, 12.5, 12.5); 
rect(x+75,y+100, 12.5, 12.5); 
rect(x+200,y+87.5, 12.5, 12.5); 
rect(x+200,y+100, 12.5, 12.5); 
rect(x+187.5,y+87.5, 12.5, 12.5); 
rect(x+187.5,y+75, 12.5, 12.5); 
rect(x+175,y+75, 12.5, 12.5); 
rect(x+175,y+100, 12.5, 12.5); 
rect(x+150,y+87.5, 12.5, 12.5); 
rect(x+150,y+75, 12.5, 12.5); 
rect(x+150,y+62.5, 12.5, 12.5); 
rect(x+150,y+50, 12.5, 12.5); 
rect(x+137.5,y+87.5, 12.5, 12.5); 
rect(x+137.5,y+75, 12.5, 12.5); 
rect(x+137.5,y+62.5, 12.5, 12.5); 
rect(x+137.5,y+50, 12.5, 12.5); 
rect(x+137.5,y+137.5, 12.5, 12.5); 
rect(x+125,y+62.5, 12.5, 12.5); 
rect(x+125,y+50, 12.5, 12.5); 
rect(x+125,y+150, 12.5, 12.5); 
rect(x+125,y+137.5, 12.5, 12.5); 
rect(x+112.5,y+87.5, 12.5, 12.5); 
rect(x+112.5,y+75, 12.5, 12.5); 
rect(x+112.5,y+137.5, 12.5, 12.5); 
rect(x+100,y+87.5, 12.5, 12.5); 
rect(x+100,y+100, 12.5, 12.5); 
fill(33, 160, 192); 
rect(x+287.5,y+187.5, 12.5, 12.5); 
rect(x+287.5,y+175, 12.5, 12.5); 
rect(x+275,y+200, 12.5, 12.5); 
rect(x+275,y+187.5, 12.5, 12.5); 
rect(x+275,y+175, 12.5, 12.5); 
rect(x+275,y+137.5, 12.5, 12.5); 
rect(x+262.5,y+200, 12.5, 12.5); 
rect(x+262.5,y+187.5, 12.5, 12.5); 
rect(x+262.5,y+175, 12.5, 12.5); 
rect(x+262.5,y+162.5, 12.5, 12.5); 
rect(x+262.5,y+150, 12.5, 12.5); 
rect(x+262.5,y+137.5, 12.5, 12.5); 
rect(x+262.5,y+125, 12.5, 12.5); 
rect(x+262.5,y+112.5, 12.5, 12.5); 
rect(x+262.5,y+100, 12.5, 12.5); 
rect(x+250,y+200, 12.5, 12.5); 
rect(x+250,y+187.5, 12.5, 12.5); 
rect(x+250,y+175, 12.5, 12.5); 
rect(x+250,y+162.5, 12.5, 12.5); 
rect(x+250,y+150, 12.5, 12.5); 
rect(x+250,y+125, 12.5, 12.5); 
rect(x+250,y+112.5, 12.5, 12.5); 
rect(x+237.5,y+187.5, 12.5, 12.5); 
rect(x+237.5,y+162.5, 12.5, 12.5); 
rect(x+237.5,y+150, 12.5, 12.5); 
rect(x+237.5,y+137.5, 12.5, 12.5); 
rect(x+237.5,y+125, 12.5, 12.5); 
rect(x+237.5,y+112.5, 12.5, 12.5); 
rect(x+225,y+150, 12.5, 12.5); 
rect(x+225,y+125, 12.5, 12.5); 
rect(x+212.5,y+162.5, 12.5, 12.5); 
rect(x+212.5,y+150, 12.5, 12.5); 
rect(x+200,y+162.5, 12.5, 12.5); 
rect(x+200,y+150, 12.5, 12.5); 
rect(x+200,y+137.5, 12.5, 12.5); 
rect(x+187.5,y+162.5, 12.5, 12.5); 
rect(x+187.5,y+150, 12.5, 12.5); 
rect(x+175,y+150, 12.5, 12.5); 
fill(31, 160, 193); 
rect(x+225,y+175, 12.5, 12.5); 
rect(x+187.5,y+175, 12.5, 12.5);  
fill(217, 232, 219); 
rect(x+87.5,y+175, 12.5, 12.5); 
rect(x+200,y+200, 12.5, 12.5); 
rect(x+200,y+187.5, 12.5, 12.5); 
rect(x+187.5,y+187.5, 12.5, 12.5); 
rect(x+162.5,y+225, 12.5, 12.5); 
rect(x+137.5,y+225, 12.5, 12.5); 
fill(217, 23, 23); 
rect(x+212.5,y+200, 12.5, 12.5); 
rect(x+212.5,y+187.5, 12.5, 12.5); 
fill(0, 0, 0); 
rect(x+87.5,y+75, 12.5, 12.5); 
rect(x+87.5,y+187.5, 12.5, 12.5); 
rect(x+87.5,y+150, 12.5, 12.5); 
rect(x+75,y+87.5, 12.5, 12.5); 
rect(x+75,y+175, 12.5, 12.5); 
rect(x+75,y+162.5, 12.5, 12.5); 
rect(x+75,y+150, 12.5, 12.5); 
rect(x+75,y+137.5, 12.5, 12.5); 
rect(x+62.5,y+125, 12.5, 12.5); 
rect(x+62.5,y+112.5, 12.5, 12.5); 
rect(x+62.5,y+100, 12.5, 12.5); 
rect(x+300,y+187.5, 12.5, 12.5); 
rect(x+300,y+175, 12.5, 12.5); 
rect(x+300,y+162.5, 12.5, 12.5); 
rect(x+300,y+150, 12.5, 12.5); 
rect(x+287.5,y+200, 12.5, 12.5); 
rect(x+287.5,y+162.5, 12.5, 12.5); 
rect(x+287.5,y+150, 12.5, 12.5); 
rect(x+287.5,y+137.5, 12.5, 12.5); 
rect(x+275,y+212.5, 12.5, 12.5); 
rect(x+87.5,y+125, 12.5, 12.5); 
rect(x+275,y+112.5, 12.5, 12.5); 
rect(x+275,y+100, 12.5, 12.5); 
rect(x+262.5,y+87.5, 12.5, 12.5); 
rect(x+262.5,y+212.5, 12.5, 12.5); 
rect(x+250,y+225, 12.5, 12.5); 
rect(x+250,y+100, 12.5, 12.5); 
rect(x+237.5,y+225, 12.5, 12.5); 
rect(x+237.5,y+100, 12.5, 12.5); 
rect(x+225,y+87.5, 12.5, 12.5); 
rect(x+225,y+225, 12.5, 12.5); 
rect(x+225,y+200, 12.5, 12.5); 
rect(x+225,y+187.5, 12.5, 12.5); 
rect(x+225,y+112.5, 12.5, 12.5); 
rect(x+225,y+100, 12.5, 12.5); 
rect(x+212.5,y+75, 12.5, 12.5); 
rect(x+212.5,y+225, 12.5, 12.5); 
rect(x+212.5,y+175, 12.5, 12.5); 
rect(x+212.5,y+112.5, 12.5, 12.5); 
rect(x+200,y+75, 12.5, 12.5); 
rect(x+200,y+225, 12.5, 12.5); 
rect(x+200,y+175, 12.5, 12.5); 
rect(x+200,y+125, 12.5, 12.5); 
rect(x+187.5,y+62.5, 12.5, 12.5); 
rect(x+187.5,y+225, 12.5, 12.5); 
rect(x+187.5,y+137.5, 12.5, 12.5); 
rect(x+175,y+62.5, 12.5, 12.5); 
rect(x+175,y+225, 12.5, 12.5); 
rect(x+175,y+212.5, 12.5, 12.5); 
rect(x+175,y+162.5, 12.5, 12.5); 
rect(x+175,y+137.5, 12.5, 12.5); 
rect(x+162.5,y+62.5, 12.5, 12.5); 
rect(x+162.5,y+50, 12.5, 12.5); 
rect(x+162.5,y+237.5, 12.5, 12.5); 
rect(x+162.5,y+200, 12.5, 12.5); 
rect(x+162.5,y+150, 12.5, 12.5); 
rect(x+162.5,y+137.5, 12.5, 12.5); 
rect(x+150,y+37.5, 12.5, 12.5); 
rect(x+150,y+237.5, 12.5, 12.5); 
rect(x+150,y+187.5, 12.5, 12.5); 
rect(x+150,y+162.5, 12.5, 12.5); 
rect(x+137.5,y+37.5, 12.5, 12.5); 
rect(x+137.5,y+237.5, 12.5, 12.5); 
rect(x+137.5,y+162.5, 12.5, 12.5); 
rect(x+125,y+37.5, 12.5, 12.5); 
rect(x+125,y+225, 12.5, 12.5); 
rect(x+125,y+212.5, 12.5, 12.5); 
rect(x+125,y+200, 12.5, 12.5); 
rect(x+125,y+162.5, 12.5, 12.5); 
rect(x+112.5,y+62.5, 12.5, 12.5); 
rect(x+112.5,y+50, 12.5, 12.5); 
rect(x+112.5,y+187.5, 12.5, 12.5); 
rect(x+112.5,y+175, 12.5, 12.5);
}
function drawSquirtle (x,y) {
fill(38, 154, 242); 
rect(x+87.5,y+87.5, 12.5, 12.5); 
rect(x+87.5,y+75, 12.5, 12.5); 
rect(x+87.5,y+175, 12.5, 12.5); 
rect(x+87.5,y+150, 12.5, 12.5); 
rect(x+87.5,y+137.5, 12.5, 12.5); 
rect(x+87.5,y+125, 12.5, 12.5); 
rect(x+87.5,y+112.5, 12.5, 12.5); 
rect(x+87.5,y+100, 12.5, 12.5); 
rect(x+75,y+87.5, 12.5, 12.5); 
rect(x+75,y+150, 12.5, 12.5); 
rect(x+75,y+137.5, 12.5, 12.5); 
rect(x+75,y+125, 12.5, 12.5); 
rect(x+75,y+112.5, 12.5, 12.5); 
rect(x+75,y+100, 12.5, 12.5); 
rect(x+62.5,y+137.5, 12.5, 12.5); 
rect(x+62.5,y+125, 12.5, 12.5); 
rect(x+287.5,y+87.5, 12.5, 12.5); 
rect(x+287.5,y+112.5, 12.5, 12.5); 
rect(x+287.5,y+100, 12.5, 12.5); 
rect(x+275,y+87.5, 12.5, 12.5); 
rect(x+275,y+75, 12.5, 12.5); 
rect(x+275,y+125, 12.5, 12.5); 
rect(x+275,y+112.5, 12.5, 12.5); 
rect(x+262.5,y+87.5, 12.5, 12.5); 
rect(x+262.5,y+75, 12.5, 12.5); 
rect(x+262.5,y+100, 12.5, 12.5); 
rect(x+250,y+87.5, 12.5, 12.5); 
rect(x+250,y+75, 12.5, 12.5); 
rect(x+250,y+125, 12.5, 12.5); 
rect(x+250,y+112.5, 12.5, 12.5); 
rect(x+250,y+100, 12.5, 12.5); 
rect(x+237.5,y+87.5, 12.5, 12.5); 
rect(x+237.5,y+137.5, 12.5, 12.5); 
rect(x+237.5,y+125, 12.5, 12.5); 
rect(x+237.5,y+112.5, 12.5, 12.5); 
rect(x+237.5,y+100, 12.5, 12.5); 
rect(x+225,y+112.5, 12.5, 12.5); 
rect(x+200,y+250, 12.5, 12.5); 
rect(x+187.5,y+250, 12.5, 12.5); 
rect(x+187.5,y+237.5, 12.5, 12.5); 
rect(x+187.5,y+225, 12.5, 12.5); 
rect(x+187.5,y+175, 12.5, 12.5); 
rect(x+187.5,y+162.5, 12.5, 12.5); 
rect(x+175,y+250, 12.5, 12.5); 
rect(x+175,y+187.5, 12.5, 12.5); 
rect(x+175,y+175, 12.5, 12.5); 
rect(x+175,y+162.5, 12.5, 12.5); 
rect(x+162.5,y+187.5, 12.5, 12.5); 
rect(x+162.5,y+175, 12.5, 12.5); 
rect(x+162.5,y+150, 12.5, 12.5); 
rect(x+162.5,y+137.5, 12.5, 12.5); 
rect(x+162.5,y+125, 12.5, 12.5); 
rect(x+162.5,y+112.5, 12.5, 12.5); 
rect(x+150,y+87.5, 12.5, 12.5); 
rect(x+150,y+187.5, 12.5, 12.5); 
rect(x+150,y+175, 12.5, 12.5); 
rect(x+150,y+150, 12.5, 12.5); 
rect(x+150,y+137.5, 12.5, 12.5); 
rect(x+150,y+125, 12.5, 12.5); 
rect(x+150,y+112.5, 12.5, 12.5); 
rect(x+150,y+100, 12.5, 12.5); 
rect(x+137.5,y+87.5, 12.5, 12.5); 
rect(x+137.5,y+162.5, 12.5, 12.5); 
rect(x+137.5,y+150, 12.5, 12.5); 
rect(x+137.5,y+137.5, 12.5, 12.5); 
rect(x+137.5,y+125, 12.5, 12.5); 
rect(x+137.5,y+112.5, 12.5, 12.5); 
rect(x+137.5,y+100, 12.5, 12.5); 
rect(x+125,y+87.5, 12.5, 12.5); 
rect(x+125,y+75, 12.5, 12.5); 
rect(x+125,y+162.5, 12.5, 12.5); 
rect(x+125,y+112.5, 12.5, 12.5); 
rect(x+125,y+100, 12.5, 12.5); 
rect(x+112.5,y+87.5, 12.5, 12.5); 
rect(x+112.5,y+75, 12.5, 12.5); 
rect(x+112.5,y+212.5, 12.5, 12.5); 
rect(x+112.5,y+162.5, 12.5, 12.5); 
rect(x+112.5,y+112.5, 12.5, 12.5); 
rect(x+112.5,y+100, 12.5, 12.5); 
rect(x+100,y+87.5, 12.5, 12.5); 
rect(x+100,y+75, 12.5, 12.5); 
rect(x+100,y+162.5, 12.5, 12.5); 
rect(x+100,y+150, 12.5, 12.5); 
rect(x+100,y+137.5, 12.5, 12.5); 
rect(x+100,y+125, 12.5, 12.5); 
rect(x+100,y+112.5, 12.5, 12.5); 
rect(x+100,y+100, 12.5, 12.5); 
fill(241, 245, 56); 
rect(x+187.5,y+212.5, 12.5, 12.5); 
rect(x+175,y+225, 12.5, 12.5); 
rect(x+175,y+212.5, 12.5, 12.5); 
rect(x+162.5,y+225, 12.5, 12.5); 
rect(x+162.5,y+212.5, 12.5, 12.5); 
rect(x+150,y+212.5, 12.5, 12.5); 
rect(x+137.5,y+212.5, 12.5, 12.5); 
rect(x+137.5,y+200, 12.5, 12.5); 
rect(x+125,y+200, 12.5, 12.5); 
rect(x+125,y+187.5, 12.5, 12.5); 
rect(x+112.5,y+187.5, 12.5, 12.5); 
fill(237,233, 233); 
rect(x+212.5,y+225, 12.5, 12.5); 
rect(x+212.5,y+212.5, 12.5, 12.5); 
rect(x+200,y+200, 12.5, 12.5); 
rect(x+200,y+187.5, 12.5, 12.5); 
rect(x+200,y+175, 12.5, 12.5); 
rect(x+200,y+162.5, 12.5, 12.5); 
rect(x+187.5,y+150, 12.5, 12.5); 
rect(x+175,y+137.5, 12.5, 12.5); 
rect(x+175,y+125, 12.5, 12.5); 
rect(x+112.5,y+125, 12.5, 12.5); 
fill(150, 75, 0); 
rect(x+62.5,y+112.5, 12.5, 12.5); 
rect(x+225,y+200, 12.5, 12.5); 
rect(x+225,y+187.5, 12.5, 12.5); 
rect(x+225,y+175, 12.5, 12.5); 
rect(x+225,y+162.5, 12.5, 12.5); 
rect(x+225,y+150, 12.5, 12.5); 
rect(x+212.5,y+200, 12.5, 12.5); 
rect(x+212.5,y+187.5, 12.5, 12.5); 
rect(x+212.5,y+175, 12.5, 12.5); 
rect(x+212.5,y+162.5, 12.5, 12.5); 
rect(x+212.5,y+150, 12.5, 12.5); 
rect(x+212.5,y+137.5, 12.5, 12.5); 
rect(x+212.5,y+125, 12.5, 12.5); 
rect(x+200,y+150, 12.5, 12.5); 
rect(x+200,y+137.5, 12.5, 12.5); 
rect(x+200,y+125, 12.5, 12.5); 
rect(x+200,y+112.5, 12.5, 12.5); 
rect(x+187.5,y+137.5, 12.5, 12.5); 
rect(x+187.5,y+125, 12.5, 12.5); 
rect(x+187.5,y+112.5, 12.5, 12.5); 
rect(x+175,y+112.5, 12.5, 12.5); 
rect(x+175,y+100, 12.5, 12.5); 
rect(x+125,y+150, 12.5, 12.5); 
rect(x+125,y+137.5, 12.5, 12.5); 
fill(0, 0, 0); 
rect(x+87.5,y+62.5, 12.5, 12.5); 
rect(x+87.5,y+187.5, 12.5, 12.5); 
rect(x+87.5,y+162.5, 12.5, 12.5); 
rect(x+75,y+75, 12.5, 12.5); 
rect(x+75,y+175, 12.5, 12.5); 
rect(x+75,y+162.5, 12.5, 12.5); 
rect(x+62.5,y+87.5, 12.5, 12.5); 
rect(x+62.5,y+150, 12.5, 12.5); 
rect(x+62.5,y+100, 12.5, 12.5); 
rect(x+50,y+137.5, 12.5, 12.5); 
rect(x+50,y+125, 12.5, 12.5); 
rect(x+50,y+112.5, 12.5, 12.5); 
rect(x+300,y+87.5, 12.5, 12.5); 
rect(x+300,y+112.5, 12.5, 12.5); 
rect(x+300,y+100, 12.5, 12.5); 
rect(x+287.5,y+75, 12.5, 12.5); 
rect(x+287.5,y+125, 12.5, 12.5); 
rect(x+275,y+62.5, 12.5, 12.5); 
rect(x+275,y+137.5, 12.5, 12.5); 
rect(x+275,y+100, 12.5, 12.5); 
rect(x+262.5,y+62.5, 12.5, 12.5); 
rect(x+262.5,y+137.5, 12.5, 12.5); 
rect(x+262.5,y+125, 12.5, 12.5); 
rect(x+262.5,y+112.5, 12.5, 12.5); 
rect(x+250,y+62.5, 12.5, 12.5); 
rect(x+250,y+150, 12.5, 12.5); 
rect(x+250,y+137.5, 12.5, 12.5); 
rect(x+237.5,y+75, 12.5, 12.5); 
rect(x+237.5,y+200, 12.5, 12.5); 
rect(x+237.5,y+187.5, 12.5, 12.5); 
rect(x+237.5,y+175, 12.5, 12.5); 
rect(x+237.5,y+162.5, 12.5, 12.5); 
rect(x+237.5,y+150, 12.5, 12.5); 
rect(x+225,y+87.5, 12.5, 12.5); 
rect(x+225,y+225, 12.5, 12.5); 
rect(x+225,y+212.5, 12.5, 12.5); 
rect(x+225,y+137.5, 12.5, 12.5); 
rect(x+225,y+125, 12.5, 12.5); 
rect(x+225,y+100, 12.5, 12.5); 
rect(x+212.5,y+250, 12.5, 12.5); 
rect(x+212.5,y+237.5, 12.5, 12.5); 
rect(x+212.5,y+112.5, 12.5, 12.5); 
rect(x+200,y+262.5, 12.5, 12.5); 
rect(x+200,y+237.5, 12.5, 12.5); 
rect(x+200,y+225, 12.5, 12.5); 
rect(x+200,y+212.5, 12.5, 12.5); 
rect(x+200,y+100, 12.5, 12.5); 
rect(x+187.5,y+262.5, 12.5, 12.5); 
rect(x+187.5,y+200, 12.5, 12.5); 
rect(x+187.5,y+187.5, 12.5, 12.5); 
rect(x+187.5,y+100, 12.5, 12.5); 
rect(x+175,y+87.5, 12.5, 12.5); 
rect(x+175,y+262.5, 12.5, 12.5); 
rect(x+175,y+237.5, 12.5, 12.5); 
rect(x+175,y+200, 12.5, 12.5); 
rect(x+175,y+150, 12.5, 12.5); 
rect(x+162.5,y+87.5, 12.5, 12.5); 
rect(x+162.5,y+250, 12.5, 12.5); 
rect(x+162.5,y+237.5, 12.5, 12.5); 
rect(x+162.5,y+200, 12.5, 12.5); 
rect(x+162.5,y+162.5, 12.5, 12.5); 
rect(x+162.5,y+100, 12.5, 12.5); 
rect(x+150,y+75, 12.5, 12.5); 
rect(x+150,y+237.5, 12.5, 12.5); 
rect(x+150,y+225, 12.5, 12.5); 
rect(x+150,y+200, 12.5, 12.5); 
rect(x+150,y+162.5, 12.5, 12.5); 
rect(x+137.5,y+75, 12.5, 12.5); 
rect(x+137.5,y+225, 12.5, 12.5); 
rect(x+137.5,y+187.5, 12.5, 12.5); 
rect(x+137.5,y+175, 12.5, 12.5); 
rect(x+125,y+62.5, 12.5, 12.5); 
rect(x+125,y+225, 12.5, 12.5); 
rect(x+125,y+212.5, 12.5, 12.5); 
rect(x+125,y+175, 12.5, 12.5); 
rect(x+125,y+125, 12.5, 12.5); 
rect(x+112.5,y+62.5, 12.5, 12.5); 
rect(x+112.5,y+225, 12.5, 12.5); 
rect(x+112.5,y+200, 12.5, 12.5); 
rect(x+112.5,y+175, 12.5, 12.5); 
rect(x+112.5,y+150, 12.5, 12.5); 
rect(x+112.5,y+137.5, 12.5, 12.5); 
rect(x+100,y+62.5, 12.5, 12.5); 
rect(x+100,y+212.5, 12.5, 12.5); 
rect(x+100,y+187.5, 12.5, 12.5); 
rect(x+100,y+175, 12.5, 12.5); 
}
function drawEnemy (x,y){
  fill(88, 55, 179); 
rect(x+75,y+237.5, 12.5, 12.5); 
rect(x+62.5,y+250, 12.5, 12.5); 
rect(x+62.5,y+237.5, 12.5, 12.5); 
rect(x+62.5,y+212.5, 12.5, 12.5); 
rect(x+50,y+250, 12.5, 12.5); 
rect(x+50,y+237.5, 12.5, 12.5); 
rect(x+50,y+200, 12.5, 12.5); 
rect(x+37.5,y+250, 12.5, 12.5); 

fill(222, 222, 222); 
rect(x+87.5,y+87.5, 12.5, 12.5); 
rect(x+75,y+87.5, 12.5, 12.5); 
rect(x+75,y+112.5, 12.5, 12.5); 
rect(x+75,y+100, 12.5, 12.5); 
rect(x+62.5,y+75, 12.5, 12.5); 
rect(x+62.5,y+137.5, 12.5, 12.5); 
rect(x+62.5,y+125, 12.5, 12.5); 
rect(x+62.5,y+112.5, 12.5, 12.5); 
rect(x+62.5,y+100, 12.5, 12.5); 
rect(x+50,y+150, 12.5, 12.5); 
rect(x+50,y+137.5, 12.5, 12.5); 
rect(x+50,y+125, 12.5, 12.5); 
rect(x+37.5,y+150, 12.5, 12.5); 
rect(x+37.5,y+137.5, 12.5, 12.5); 
rect(x+225,y+112.5, 12.5, 12.5); 
rect(x+212.5,y+125, 12.5, 12.5); 
rect(x+175,y+287.5, 12.5, 12.5); 
rect(x+162.5,y+287.5, 12.5, 12.5); 
rect(x+137.5,y+75, 12.5, 12.5); 
rect(x+125,y+87.5, 12.5, 12.5); 
rect(x+12.5,y+187.5, 12.5, 12.5); 
rect(x+112.5,y+137.5, 12.5, 12.5); 

fill(186, 110, 221); 
rect(x+87.5,y+225, 12.5, 12.5); 
rect(x+250,y+125, 12.5, 12.5); 
rect(x+250,y+112.5, 12.5, 12.5); 
rect(x+237.5,y+137.5, 12.5, 12.5); 
rect(x+237.5,y+125, 12.5, 12.5); 
rect(x+225,y+137.5, 12.5, 12.5); 
rect(x+212.5,y+150, 12.5, 12.5); 
rect(x+200,y+175, 12.5, 12.5); 
rect(x+200,y+162.5, 12.5, 12.5); 
rect(x+200,y+150, 12.5, 12.5); 
rect(x+125,y+237.5, 12.5, 12.5); 
rect(x+112.5,y+237.5, 12.5, 12.5); 
rect(x+112.5,y+225, 12.5, 12.5); 
rect(x+112.5,y+212.5, 12.5, 12.5); 
rect(x+100,y+237.5, 12.5, 12.5); 
rect(x+100,y+225, 12.5, 12.5); 
rect(x+100,y+212.5, 12.5, 12.5); 
rect(x+100,y+150, 12.5, 12.5); 

fill(139, 77, 255); 
rect(x+87.5,y+212.5, 12.5, 12.5); 
rect(x+87.5,y+187.5, 12.5, 12.5); 
rect(x+87.5,y+162.5, 12.5, 12.5); 
rect(x+87.5,y+137.5, 12.5, 12.5); 
rect(x+87.5,y+125, 12.5, 12.5); 
rect(x+87.5,y+112.5, 12.5, 12.5); 
rect(x+87.5,y+100, 12.5, 12.5); 
rect(x+75,y+200, 12.5, 12.5); 
rect(x+75,y+187.5, 12.5, 12.5); 
rect(x+75,y+162.5, 12.5, 12.5); 
rect(x+75,y+150, 12.5, 12.5); 
rect(x+75,y+137.5, 12.5, 12.5); 
rect(x+75,y+125, 12.5, 12.5); 
rect(x+62.5,y+162.5, 12.5, 12.5); 
rect(x+62.5,y+150, 12.5, 12.5); 
rect(x+50,y+162.5, 12.5, 12.5); 
rect(x+37.5,y+187.5, 12.5, 12.5); 
rect(x+37.5,y+175, 12.5, 12.5); 
rect(x+25,y+200, 12.5, 12.5); 
rect(x+25,y+187.5, 12.5, 12.5); 
rect(x+237.5,y+112.5, 12.5, 12.5); 
rect(x+225,y+125, 12.5, 12.5); 
rect(x+212.5,y+212.5, 12.5, 12.5); 
rect(x+212.5,y+200, 12.5, 12.5); 
rect(x+212.5,y+137.5, 12.5, 12.5); 
rect(x+200,y+287.5, 12.5, 12.5); 
rect(x+200,y+212.5, 12.5, 12.5); 
rect(x+200,y+200, 12.5, 12.5); 
rect(x+187.5,y+287.5, 12.5, 12.5); 
rect(x+187.5,y+275, 12.5, 12.5); 
rect(x+187.5,y+200, 12.5, 12.5); 
rect(x+187.5,y+187.5, 12.5, 12.5); 
rect(x+175,y+275, 12.5, 12.5); 
rect(x+175,y+262.5, 12.5, 12.5); 
rect(x+175,y+237.5, 12.5, 12.5); 
rect(x+175,y+225, 12.5, 12.5); 
rect(x+175,y+212.5, 12.5, 12.5); 
rect(x+175,y+187.5, 12.5, 12.5); 
rect(x+162.5,y+275, 12.5, 12.5); 
rect(x+162.5,y+262.5, 12.5, 12.5); 
rect(x+162.5,y+250, 12.5, 12.5); 
rect(x+162.5,y+237.5, 12.5, 12.5); 
rect(x+162.5,y+225, 12.5, 12.5); 
rect(x+162.5,y+212.5, 12.5, 12.5); 
rect(x+162.5,y+200, 12.5, 12.5); 
rect(x+162.5,y+175, 12.5, 12.5); 
rect(x+150,y+87.5, 12.5, 12.5); 
rect(x+150,y+75, 12.5, 12.5); 
rect(x+150,y+275, 12.5, 12.5); 
rect(x+150,y+237.5, 12.5, 12.5); 
rect(x+150,y+225, 12.5, 12.5); 
rect(x+150,y+212.5, 12.5, 12.5); 
rect(x+150,y+200, 12.5, 12.5); 
rect(x+150,y+175, 12.5, 12.5); 
rect(x+137.5,y+87.5, 12.5, 12.5); 
rect(x+137.5,y+225, 12.5, 12.5); 
rect(x+137.5,y+212.5, 12.5, 12.5); 
rect(x+137.5,y+175, 12.5, 12.5); 
rect(x+137.5,y+162.5, 12.5, 12.5); 
rect(x+137.5,y+137.5, 12.5, 12.5); 
rect(x+137.5,y+125, 12.5, 12.5); 
rect(x+137.5,y+112.5, 12.5, 12.5); 
rect(x+137.5,y+100, 12.5, 12.5); 
rect(x+125,y+200, 12.5, 12.5); 
rect(x+125,y+187.5, 12.5, 12.5); 
rect(x+125,y+150, 12.5, 12.5); 
rect(x+125,y+137.5, 12.5, 12.5); 
rect(x+125,y+125, 12.5, 12.5); 
rect(x+125,y+112.5, 12.5, 12.5); 
rect(x+125,y+100, 12.5, 12.5); 
rect(x+12.5,y+200, 12.5, 12.5); 
rect(x+112.5,y+187.5, 12.5, 12.5); 
rect(x+112.5,y+175, 12.5, 12.5); 
rect(x+112.5,y+150, 12.5, 12.5); 
rect(x+112.5,y+112.5, 12.5, 12.5); 
rect(x+112.5,y+100, 12.5, 12.5); 
rect(x+100,y+87.5, 12.5, 12.5); 
rect(x+100,y+187.5, 12.5, 12.5); 
rect(x+100,y+175, 12.5, 12.5); 
rect(x+100,y+125, 12.5, 12.5); 
rect(x+100,y+112.5, 12.5, 12.5); 
rect(x+100,y+100, 12.5, 12.5); 

fill(0, 0, 0); 
rect(x+87.5,y+75, 12.5, 12.5); 
rect(x+87.5,y+237.5, 12.5, 12.5); 
rect(x+87.5,y+200, 12.5, 12.5); 
rect(x+87.5,y+175, 12.5, 12.5); 
rect(x+87.5,y+150, 12.5, 12.5); 
rect(x+75,y+75, 12.5, 12.5); 
rect(x+75,y+62.5, 12.5, 12.5); 
rect(x+75,y+250, 12.5, 12.5); 
rect(x+75,y+225, 12.5, 12.5); 
rect(x+75,y+212.5, 12.5, 12.5); 
rect(x+75,y+175, 12.5, 12.5); 
rect(x+62.5,y+87.5, 12.5, 12.5); 
rect(x+62.5,y+62.5, 12.5, 12.5); 
rect(x+62.5,y+262.5, 12.5, 12.5); 
rect(x+62.5,y+225, 12.5, 12.5); 
rect(x+62.5,y+200, 12.5, 12.5); 
rect(x+62.5,y+187.5, 12.5, 12.5); 
rect(x+62.5,y+175, 12.5, 12.5); 
rect(x+50,y+87.5, 12.5, 12.5); 
rect(x+50,y+75, 12.5, 12.5); 
rect(x+50,y+262.5, 12.5, 12.5); 
rect(x+50,y+225, 12.5, 12.5); 
rect(x+50,y+212.5, 12.5, 12.5); 
rect(x+50,y+187.5, 12.5, 12.5); 
rect(x+50,y+175, 12.5, 12.5); 
rect(x+50,y+112.5, 12.5, 12.5); 
rect(x+50,y+100, 12.5, 12.5); 
rect(x+37.5,y+262.5, 12.5, 12.5); 
rect(x+37.5,y+237.5, 12.5, 12.5); 
rect(x+37.5,y+200, 12.5, 12.5); 
rect(x+37.5,y+162.5, 12.5, 12.5); 
rect(x+37.5,y+125, 12.5, 12.5); 
rect(x+262.5,y+125, 12.5, 12.5); 
rect(x+262.5,y+112.5, 12.5, 12.5); 
rect(x+250,y+137.5, 12.5, 12.5); 
rect(x+250,y+100, 12.5, 12.5); 
rect(x+25,y+250, 12.5, 12.5); 
rect(x+25,y+212.5, 12.5, 12.5); 
rect(x+25,y+175, 12.5, 12.5); 
rect(x+25,y+150, 12.5, 12.5); 
rect(x+25,y+137.5, 12.5, 12.5); 
rect(x+237.5,y+150, 12.5, 12.5); 
rect(x+237.5,y+100, 12.5, 12.5); 
rect(x+225,y+212.5, 12.5, 12.5); 
rect(x+225,y+200, 12.5, 12.5); 
rect(x+225,y+150, 12.5, 12.5); 
rect(x+225,y+100, 12.5, 12.5); 
rect(x+212.5,y+287.5, 12.5, 12.5); 
rect(x+212.5,y+225, 12.5, 12.5); 
rect(x+212.5,y+187.5, 12.5, 12.5); 
rect(x+212.5,y+175, 12.5, 12.5); 
rect(x+212.5,y+162.5, 12.5, 12.5); 
rect(x+212.5,y+112.5, 12.5, 12.5); 
rect(x+200,y+300, 12.5, 12.5); 
rect(x+200,y+275, 12.5, 12.5); 
rect(x+200,y+225, 12.5, 12.5); 
rect(x+200,y+187.5, 12.5, 12.5); 
rect(x+200,y+137.5, 12.5, 12.5); 
rect(x+200,y+125, 12.5, 12.5); 
rect(x+187.5,y+300, 12.5, 12.5); 
rect(x+187.5,y+262.5, 12.5, 12.5); 
rect(x+187.5,y+237.5, 12.5, 12.5); 
rect(x+187.5,y+225, 12.5, 12.5); 
rect(x+187.5,y+212.5, 12.5, 12.5); 
rect(x+187.5,y+175, 12.5, 12.5); 
rect(x+187.5,y+162.5, 12.5, 12.5); 
rect(x+187.5,y+150, 12.5, 12.5); 
rect(x+175,y+300, 12.5, 12.5); 
rect(x+175,y+250, 12.5, 12.5); 
rect(x+175,y+200, 12.5, 12.5); 
rect(x+175,y+175, 12.5, 12.5); 
rect(x+162.5,y+87.5, 12.5, 12.5); 
rect(x+162.5,y+75, 12.5, 12.5); 
rect(x+162.5,y+300, 12.5, 12.5); 
rect(x+162.5,y+187.5, 12.5, 12.5); 
rect(x+162.5,y+162.5, 12.5, 12.5); 
rect(x+150,y+62.5, 12.5, 12.5); 
rect(x+150,y+287.5, 12.5, 12.5); 
rect(x+150,y+262.5, 12.5, 12.5); 
rect(x+150,y+250, 12.5, 12.5); 
rect(x+150,y+187.5, 12.5, 12.5); 
rect(x+150,y+162.5, 12.5, 12.5); 
rect(x+150,y+137.5, 12.5, 12.5); 
rect(x+150,y+125, 12.5, 12.5); 
rect(x+150,y+112.5, 12.5, 12.5); 
rect(x+150,y+100, 12.5, 12.5); 
rect(x+137.5,y+62.5, 12.5, 12.5); 
rect(x+137.5,y+275, 12.5, 12.5); 
rect(x+137.5,y+250, 12.5, 12.5); 
rect(x+137.5,y+237.5, 12.5, 12.5); 
rect(x+137.5,y+200, 12.5, 12.5); 
rect(x+137.5,y+187.5, 12.5, 12.5); 
rect(x+137.5,y+150, 12.5, 12.5); 
rect(x+125,y+75, 12.5, 12.5); 
rect(x+125,y+250, 12.5, 12.5); 
rect(x+125,y+225, 12.5, 12.5); 
rect(x+125,y+212.5, 12.5, 12.5); 
rect(x+125,y+175, 12.5, 12.5); 
rect(x+125,y+162.5, 12.5, 12.5); 
rect(x+12.5,y+212.5, 12.5, 12.5); 
rect(x+12.5,y+175, 12.5, 12.5); 
rect(x+112.5,y+87.5, 12.5, 12.5); 
rect(x+112.5,y+75, 12.5, 12.5); 
rect(x+112.5,y+250, 12.5, 12.5); 
rect(x+112.5,y+200, 12.5, 12.5); 
rect(x+112.5,y+162.5, 12.5, 12.5); 
rect(x+112.5,y+125, 12.5, 12.5); 
rect(x+100,y+75, 12.5, 12.5); 
rect(x+100,y+250, 12.5, 12.5); 
rect(x+100,y+200, 12.5, 12.5); 
rect(x+100,y+162.5, 12.5, 12.5); 
rect(x+100,y+137.5, 12.5, 12.5); 
rect(x+0,y+200, 12.5, 12.5);
}
 

function mousePressed() {
  let now = millis(); // current time in ms

  // Ignore mouse press if less than 250ms since last press (to prevent double-click interference)
  if (now - lastMousePressedTime < 250) {
    return; // exit early and ignore this press
  }
  lastMousePressedTime = now;
  // INTRO screen logic
  if (screen == "intro") {
    if (mouseX >= 275 && mouseX <= 525 && mouseY >= 480 && mouseY <= 525) {
      screen = "characterselect";
    } else if (mouseX >= 275 && mouseX <= 525 && mouseY >= 540 && mouseY <= 585) {
      screen = "howto";
    }
  }

  // CHARACTER SELECT screen logic
  else if (screen == "characterselect") {
    if (mouseX >= 40 && mouseX <= 160 && mouseY >= 510 && mouseY <= 570) {
      screen = "intro";
    } else if (mouseX >= 40 && mouseX <= 220 && mouseY >= 200 && mouseY <= 420) {
      selectedCharacter = "character1";
      screen = "game";
    } else if (mouseX >= 290 && mouseX <= 470 && mouseY >= 200 && mouseY <= 420) {
      selectedCharacter = "character2";
      screen = "game";
    } else if (mouseX >= 540 && mouseX <= 720 && mouseY >= 200 && mouseY <= 420) {
      selectedCharacter = "character3";
      screen = "game";
    }
  }

  // HOW TO screen logic
  else if (screen == "howto") {
    if (mouseX >= 670 && mouseX <= 790 && mouseY >= 550 && mouseY <= 590) {
      screen = "intro";
    }

    // Next dialogue
    if (mouseX >= 658 && mouseX <= 758 && mouseY >= 502 && mouseY <= 532) {
      if (currentDialogue < dialogues.length - 1) {
        currentDialogue++;
      } else {
        currentDialogue = 0;
        screen = "ready";
      }
    }

    // Back dialogue
    if (mouseX >= 558 && mouseX <= 658 && mouseY >= 502 && mouseY <= 532) {
      if (currentDialogue > 0) {
        currentDialogue--;
      }
    }
  }

  // GAME screen logic
  else if (screen == "game") {
    if (mouseX >= 10 && mouseX <= 130 && mouseY >= 30 && mouseY <= 70) {
      screen = "characterselect";
    }
    else if (mouseX >= 505 && mouseX <= 655 && mouseY >= 515 && mouseY <= 565){
             screen = "intro";
             }
    else if (mouseX >= 505 && mouseX <= 655 && mouseY >= 455 && mouseY <= 505){
      screen = "bag";
    }
    // FIGHT Button - shrunk hitbox
    else if (mouseX >= 360 && mouseX <= 480 && mouseY >= 455 && mouseY <= 505) {
      screen = "fight";
    }
    //pokemon screen
    else if (mouseX >= 354 && mouseX <= 495 && mouseY >= 515 && mouseY <= 565){
      screen = "pokemon";
    }
  }

  // READY screen logic
  else if (screen == "ready") {
    if (mouseX >= 240 && mouseX <= 560 && mouseY >= 230 && mouseY <= 280) {
      screen = "intro";
    }
  }
  //bag screen
  if (screen == "bag"){
    if(mouseX >= 240 && mouseX <= 560 && mouseY >= 230 && mouseY <= 280){
      screen = "game"
    }
  }//pokemon screen
  if (screen == "pokemon"){
    if(mouseX >= 240 && mouseX <= 560 && mouseY >= 230 && mouseY <= 280){
      screen = "game"
    }
  }//fight screen
  if (screen == "fight"){
    // Top Left (===)
    if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
      playerHealth -= 17;
      screen = "incorrect";
    }
    // Top Right (==) - correct answer
    else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
      enemyHealth -= 17;
      screen = "correct";
    }
    // Bottom Left (=) - shrunk hitbox to avoid fight button
    else if (mouseX >= 50 && mouseX <= 340 && mouseY >= 375 && mouseY <= 505) {
      playerHealth -= 17;
      screen = "incorrect";
    }
    // Bottom Right (!=) - shrunk hitbox to avoid fight button and pad by 15 px
    else if (mouseX >= 480 && mouseX <= 700 && mouseY >= 375 && mouseY <= 505) {
      playerHealth -= 17;
      screen = "incorrect";
    }
  } 

  if (screen == "correct"){
    // Next Question button shrunk hitbox to avoid interference
    if(mouseX >= 400 && mouseX <= 700 && mouseY >= 475 && mouseY <= 525){
      screen = "fight2";
    }
  }

  if (screen == "incorrect"){
    // Next Question button shrunk hitbox to avoid interference
    if(mouseX >= 400 && mouseX <= 700 && mouseY >= 475 && mouseY <= 525){
      screen = "fight2";
    }
  } else if (screen == "fight2") {
    // Top Left (===) - incorrect
    if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
      playerHealth -= 17;
      screen = "incorrect2";
    }
    // Top Right (==) - correct
    else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
      enemyHealth -= 17;
      screen = "correct2";
    }
    // Bottom Left (=) - shrunk hitbox to avoid fight button
    else if (mouseX >= 50 && mouseX <= 340 && mouseY >= 375 && mouseY <= 505) {
      playerHealth -= 17;
      screen = "incorrect2";
    }
    // Bottom Right (!=) - shrunk hitbox to avoid fight button
    else if (mouseX >= 480 && mouseX <= 700 && mouseY >= 375 && mouseY <= 505) {
      playerHealth -= 17;
      screen = "incorrect2";
    }
  } if (screen == "incorrect2"){
    if(mouseX >= 400 && mouseX <= 400 + 320 && mouseY >= 500 && mouseY <= 500 + 50){
      screen = "fight3"
    }
  }if (screen == "correct2"){
    if(mouseX >= 400 && mouseX <= 400 + 320 && mouseY >= 500 && mouseY <= 500 + 50){
      screen = "fight3"
    }
}if (screen == "fight3") {
  // Top Left (A) - correct
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    enemyHealth -= 17;
    screen = "correct3";
  }
  // Top Right (B) - incorrect
  else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    playerHealth -= 17;
    screen = "incorrect3";
  }
  // Bottom Left (C) - incorrect
  else if (mouseX >= 50 && mouseX <= 340 && mouseY >= 375 && mouseY <= 505) {
    playerHealth -= 17;
    screen = "incorrect3";
  }
  // Bottom Right (D) - incorrect
  else if (mouseX >= 480 && mouseX <= 700 && mouseY >= 375 && mouseY <= 505) {
    playerHealth -= 17;
    screen = "incorrect3";
  }
}if (screen == "correct3") {
  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    screen = "fight4";
  }
}if (screen == "incorrect3") {
  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    screen = "fight4";
  }
}if (screen == "fight4") {
  // A: ==! (Double Thunderbolt) - incorrect
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    playerHealth -= 17;
    screen = "incorrect4";
  }
  // B: !== (Triple Poké Ball) - incorrect
  else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    playerHealth -= 17;
    screen = "incorrect4";
  }
  // C: != (Lightning Tail) - correct
  else if (mouseX >= 50 && mouseX <= 340 && mouseY >= 375 && mouseY <= 505) {
    enemyHealth -= 17;
    screen = "correct4";
  }
  // D: <> (Mystery Badge) - incorrect
  else if (mouseX >= 480 && mouseX <= 700 && mouseY >= 375 && mouseY <= 505) {
    playerHealth -= 17;
    screen = "incorrect4";
  }
}

if (screen == "correct4") {
  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    screen = "fight5";  // or whatever screen comes next
  }
}

if (screen == "incorrect4") {
  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    screen = "fight5";  // same here
  }
}if (screen == "fight5") {
  // Top Left (if (HP > 0)) - correct
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    enemyHealth -= 17;
    screen = "correct5";
  }
  // Top Right (if HP above 0) - incorrect
  else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    playerHealth -= 17;
    screen = "incorrect5";
  }
  // Bottom Left (if (HP => 0)) - incorrect
  else if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    playerHealth -= 17;
    screen = "incorrect5";
  }
  // Bottom Right (HP > 0 then attack();) - incorrect
  else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    playerHealth -= 17;
    screen = "incorrect5";
  }
}

if (screen == "correct5") {
  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    screen = "fight6"; // replace 'nextScreen' with whatever comes after fight5
  }
}

if (screen == "incorrect5") {
  if (mouseX >= 400 && mouseX <= 720 && mouseY >= 500 && mouseY <= 550) {
    screen = "fight6"; // retry fight5 on incorrect
  }
}if (screen == "fight6") {
  // Top Left (A) - correct
  if (mouseX >= 50 && mouseX <= 350 && mouseY >= 165 && mouseY <= 315) {
    enemyHealth -= 17;
    screen = "correct6";
  }
  // Top Right (B) - incorrect
  else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 165 && mouseY <= 315) {
    playerHealth -= 17;
    screen = "incorrect6";
  }
  // Bottom Left (C) - incorrect
  else if (mouseX >= 50 && mouseX <= 350 && mouseY >= 375 && mouseY <= 525) {
    playerHealth -= 17;
    screen = "incorrect6";
  }
  // Bottom Right (D) - incorrect
  else if (mouseX >= 450 && mouseX <= 750 && mouseY >= 375 && mouseY <= 525) {
    playerHealth -= 17;
    screen = "incorrect6";
  }
}if (screen == "correct6") {
  if(mouseX >= 400 && mouseX <= 700 && mouseY >= 475 && mouseY <= 525){
    if (playerHealth <= 0) {
      screen = "defeat";
    } else if (enemyHealth <= 0) {
      screen = "victory";
    } else {
      // if both still alive after last question, force an ending
      screen = "victory";
    }
  }
}

if (screen == "incorrect6") {
  if(mouseX >= 400 && mouseX <= 700 && mouseY >= 475 && mouseY <= 525){
    if (playerHealth <= 0) {
      screen = "defeat";
    } else if (enemyHealth <= 0) {
      screen = "victory";
    } else {
      // if both still alive after wrong answer on last question, force defeat
      screen = "defeat";
    }
  }
}
}
