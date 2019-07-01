// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Reference to physics world
let physics;

let p1;
let p2;
let a = 0;
let frequency;

function setup() {
  let canvas = createCanvas(640, 360);
  canvas.parent('sketch-holder'); // puts the sketch in the div  
  frequency = document.getElementById("frequency");
  val_freq = document.getElementById("freq");

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set the world's bounding box
  physics.setWorldBounds(new Rect(0, 0, width, height));

  // Make two particles
  p1 = new Particle(new Vec2D(width / 2, 20));
  p2 = new Particle(new Vec2D(width / 2, 250));
  // Lock one in place
  p1.lock();

  // Make a spring connecting both Particles
  let spring = new VerletSpring2D(p1, p2, 250, 0.1);

  // Anything we make, we have to add into the physics world
  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addSpring(spring);
}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  // Draw a line between the particles
  stroke(200);
  strokeWeight(2);
  line(p1.x, p1.y, p2.x, p2.y);
  line(width/2 - 25, 20, width/2 + 25, 20);

  // Display the particles
  p1.display();
  p2.display();

  // Move the top particle

  p1.x = width/2 + 40*sin(a);
  let b = Number(frequency.value)/(10*60);
  // let b = TWO_PI/60;
  // console.log(b*60);
  a += b;

  val_freq.innerHTML = 'Velocity: ' + (60*b).toFixed(1) + ' rads/s';

  // let vel = p1.getVelocity();
  // console.log(vel);

  // let t = physics.getTimeStep();
  // console.log(getFrameRate());

  // let s = atan((p1.x-p2.x)/(p2.y-p1.y))*180/PI;
  // console.log(s.toFixed(1))
  
  //Move the second one according to the mouse
  if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0 && mouseIsPressed) {
    p2.lock();
    p2.x = mouseX;
    p2.y = mouseY;
    p2.unlock();
  }
}