var circleRight  = []
var circleTop    = []
var circleLeft   = []
var circleBottom = []
var bigRadius    = 100
var centerPoint  = {x: 0, y: 0}
var smallRadius = 8

var square = {
  right: [],
  top: [],
  left: [],
  bottom: []
}

var halfSide = 30

var counter = 0

function addVectors(v1, v2) {
  return {x: v1.x + v2.x, y: v1.y + v2.y}
}

function rotateVector(v, angle) {
  return {x: v.x*cos(angle) + v.y*sin(angle), y: -v.x*sin(angle) + v.y*cos(angle)}
}

function setup() {
  createCanvas(600, 600)

  centerPoint.x = width/2
  centerPoint.y = height/2
  bigRadius = min(height, width)*2.0/6.0
  halfSide  = bigRadius/3
  smallRadius = bigRadius/15
  fill(255, 121, 12)
  //build initial circle
  for(var i=0; i<10; ++i) {
    angleOffset = i*PI/(2*10);

    angle = 0;
    circleRight.push( {x: cos(angle + angleOffset)*bigRadius + centerPoint.x,
      y: sin(angle + angleOffset)*bigRadius + centerPoint.y} )

    angle = PI/2;
    circleTop.push( {x: cos(angle + angleOffset)*bigRadius + centerPoint.x,
      y: sin(angle + angleOffset)*bigRadius + centerPoint.y} )

    angle = PI;
    circleLeft.push( {x: cos(angle + angleOffset)*bigRadius + centerPoint.x,
      y: sin(angle + angleOffset)*bigRadius + centerPoint.y} )

    angle = 3*PI/2
    circleBottom.push( {x: cos(angle + angleOffset)*bigRadius + centerPoint.x,
       y: sin(angle + angleOffset)*bigRadius + centerPoint.y} )
  }

  //build initial square
  for(var i=0; i<10; ++i) {
    var sideOffset = i*2*halfSide/10;

    var corner = {x: centerPoint.x + halfSide, y: centerPoint.y + halfSide}
    square.right.push( {x: corner.x, y: corner.y - sideOffset})

    var corner = {x: centerPoint.x + halfSide, y: centerPoint.y - halfSide}
    square.top.push( {x: corner.x - sideOffset, y: corner.y})

    var corner = {x: centerPoint.x - halfSide, y: centerPoint.y - halfSide}
    square.left.push( {x: corner.x, y: corner.y + sideOffset})

    var corner = {x: centerPoint.x - halfSide, y: centerPoint.y + halfSide}
    square.bottom.push( {x: corner.x + sideOffset, y: corner.y})
  }
}

function draw() {
  background(18, 3, 79) //dark blue
  var t = frameRate()/3000;
  //draw circle
  noStroke()
  for(var i=0; i<10; ++i) {
    ellipse(circleRight[i].x, circleRight[i].y, smallRadius)
    ellipse(circleTop[i].x, circleTop[i].y, smallRadius)
    ellipse(circleLeft[i].x, circleLeft[i].y, smallRadius)
    ellipse(circleBottom[i].x, circleBottom[i].y, smallRadius)
  }

  //draw square
  for(var i=0; i<10; ++i) {
    square.right[i] = addVectors(
        rotateVector(addVectors(
          square.right[i],
          {x: -centerPoint.x, y: -centerPoint.y}
        ), t),
        centerPoint
      )
    ellipse(square.right[i].x, square.right[i].y, smallRadius/2)

    square.top[i] = addVectors(
        rotateVector(addVectors(
          square.top[i],
          {x: -centerPoint.x, y: -centerPoint.y}
        ), t),
        centerPoint
      )
    ellipse(square.top[i].x, square.top[i].y, smallRadius/2)

    square.left[i] = addVectors(
        rotateVector(addVectors(
          square.left[i],
          {x: -centerPoint.x, y: -centerPoint.y}
        ), t),
        centerPoint
      )
    ellipse(square.left[i].x, square.left[i].y, smallRadius/2)

    square.bottom[i] = addVectors(
        rotateVector(addVectors(
          square.bottom[i],
          {x: -centerPoint.x, y: -centerPoint.y}
        ), t),
        centerPoint
      )
    ellipse(square.bottom[i].x, square.bottom[i].y, smallRadius/2)
  }

  //draw lines
  stroke(217, 217, 255)
  strokeWeight(3)
  for(var i=0; i<10; ++i) {
    line(circleRight[i].x, circleRight[i].y, square.bottom[i].x, square.bottom[i].y)
    line(circleTop[i].x, circleTop[i].y, square.left[i].x, square.left[i].y)
    line(circleLeft[i].x, circleLeft[i].y, square.top[i].x, square.top[i].y)
    line(circleBottom[i].x, circleBottom[i].y, square.right[i].x, square.right[i].y)
  }

  counter += 1
}
