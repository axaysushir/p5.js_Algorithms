function setup() {
    createCanvas(400, 400)
    angleMode(DEGREES)
}

function draw(){
    background(0)
    translate(200, 200)
    rotate(-90)

    let hr = hour()
    let min = minute()
    let sc = second()

    
    strokeWeight(8)
    stroke(180, 100, 255)
    noFill()
    let secondAngle = map(sc, 0, 60, 0, 360)
    arc(0, 0, 300, 300, 0, secondAngle)

    stroke(0, 20, 255)
    let minAngle = map(min, 0, 60, 0, 360)
    arc(0, 0, 280, 280, 0, minAngle)

    stroke(200, 255, 0)
    let hourAngle = map(hr % 12, 0, 12, 0, 360)
    arc(0, 0, 260, 260, 0, hourAngle)

    push()
    rotate(secondAngle)
    stroke(100, 255, 150)
    line(0, 0, 100, 0)
    pop()

    push()
    rotate(minAngle)
    stroke(0, 20, 255)
    line(0, 0, 75, 0)
    pop()

    push()
    rotate(hourAngle)
    stroke(200, 255, 0)
    line(0, 0, 50, 0)
    pop()

    stroke(255)
    point(0, 0)
}
