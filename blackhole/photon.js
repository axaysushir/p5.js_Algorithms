class Photon {
    constructor (x, y) {
        this.pos = createVector(x, y)
        this.vel = createVector(-c, 0)
        this.history = []
        this.stopped = false;
        this.theta = 0.4;
    }
    stop() {
        this.stopped = true
    }

    update() {
        if (!this.stopped) {
            this.history.push(this.pos.copy());
        }
        
        const deltaV = this.vel.copy();
        deltaV.mult(dt)
        this.pos.add(deltaV)
        
        if (this.history.length > 500){
            this.history.splice(0, 1)
        }
    }

    
    show() {
        strokeWeight(4)
        stroke(25, 30, 200)
        // stroke(0, 200, 0)
        point(this.pos.x, this.pos.y)

        // stroke(0)
        strokeWeight(2)
        noFill()
        beginShape()

        for (let v of this.history) {
            vertex(v.x, v.y)
        }
        endShape()
    }
}