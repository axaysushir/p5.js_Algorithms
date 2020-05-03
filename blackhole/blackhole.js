class Blackhole {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.rs = (2 * G * this.mass) / (c * c);
  }

  pull(photon) {
    const force = p5.Vector.sub(this.pos, photon.pos);
    const r = force.mag();
    const fg = (G * this.mass) / (r * r);
    force.setMag(fg);
    photon.vel.add(force);
    photon.vel.setMag(c);

    if (r <= this.rs) {
      photon.stop();
    }
  }

  // pull(photon) {
  //     const force = p5.Vector.sub(this.pos, photon.pos)
  //     const theta = force.heading()
  //     const r = force.mag()
  //     const fg = (G * this.mass) / (r * r);
  //     let deltaTheta = -fg * (dt / c) * setInterval(photon.theta)
  //     deltaTheta /= abs(1.0 - 2.0 * G * this.mass / (r * c * c))
  //     photon.theta += deltaTheta
  //     photon.vel = p5.Vector.fromAngle(theta)
  //     photon.vel.setMag(c)

  //     if (r <= this.rs + 0.5) {
  //         photon.stop()
  //     }
  // }

  

  show() {
    ellipseMode(RADIUS);
    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rs);

    noFill();
    stroke(100, 100);
    strokeWeight(64);
    ellipse(this.pos.x, this.pos.y, this.rs * 3 + 32);

    stroke(250, 150, 0, 200);
    strokeWeight(32);
    ellipse(this.pos.x, this.pos.y, this.rs * 1.5 + 16);
  }
}
