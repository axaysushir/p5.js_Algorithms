function Flower(x, y) {
  this.x = x;
  this.y = y;
  this.r = 30;
  this.xdir = 1;
//   this.toDelete = false;

  this.grow = function () {
    this.r = this.r - 2;
  };
  this.shiftDown = function () {
    this.xdir *= -1;
    this.y += this.r; 
  };
  this.move = function () {
    this.x = this.x + this.xdir;
    // this.y = this.y + this.ydir;
  };

//   this.stop = function() {
//       this.toDelete = true
//   }

  this.show = function () {
    noStroke();
    fill(5, 0, 200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };
}
