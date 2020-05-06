let cols = 25;
let rows = 25;
let grid = new Array(cols);
let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;
let path = [];


// delete element form array
function removeFromArray(arr, elt) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

// make guess for how far it is between two points..
function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    // var d = abs(a.i - b.i) + abs(a.j - b.j)
    return d;
}

function Spot(i, j) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
    // obstacle
    if (random(1) < 0.3) {
        this.wall = true;
    }

    this.show = function(col) {
        if (this.wall) {
            fill(0);
            noStroke();
            rect(this.i * w , this.j * h, w-1, h-1)
        } else if (col) {
            fill(col);
            rect(this.i * w, this.j * h, w, h);
        }       
    }
    this.addNeighbors = function(grid) {
        var i = this.i;
        var j  = this.j;
        if (i < cols -1) {
            this.neighbors.push(grid[i+1] [j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i-1] [j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i] [j+1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i] [j-1]);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i-1] [j-1]);
        }
        if (i < cols -1 && j > 0) {
            this.neighbors.push(grid[i+1] [j-1]);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i-1] [j+1]);
        }
        if (i < cols -1 && j < rows -1) {
            this.neighbors.push(grid[i+1] [j+1]);
        }
    }
}

function setup() {
    createCanvas(400, 400);
    console.log('A*');  

    w = width / cols;
    h = height / rows;

    // Make 2D Array
    for (let i=0; i < cols; i++) {
        grid[i] = new Array(rows);    
    }

    for (let i=0; i < cols; i++) {
       for (let j=0; j < rows; j++) {
           grid[i][j] = new Spot(i, j);
       }   
    }
    // All neighbors
    for (let i=0; i < cols; i++) {
        for (let j=0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }   
     }
     // start and end
    start = grid[0] [0];
    end = grid[cols - 1] [rows -1];
    // if there is end of waall
    start.wall = false;
    end.wall = false;
    /// open set start with beginning only
    openSet.push(start)
     console.log(grid);
}

function draw() {
    if (openSet.length > 0) {
        // we keeep go
        let winner = 0;
        for (let i=0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        } 

        let current = openSet[winner];

        if (current === end) {  
        //     path = []; // start with emp list if this is one winner
        //     var temp = current; // while tepm has previ. push
        //     path.push(temp);
        //     while (temp.previous) {
        //     path.push(temp.previous);
        //     temp =  temp.previous;
        // }         
            noLoop();
            console.log('Done!!!');  
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.wall) {
               var tempG = current.g + 1;
            // var tempG = current.g + heuristic(neighbor, current);

               var newPath = false;
               if (openSet.includes(neighbor)) {
                   if (tempG < neighbor.g) {
                       neighbor.g = tempG;
                       newPath = true;
                   }
               } else {
                   neighbor.g = tempG;
                   newPath = true;
                   openSet.push(neighbor);
               }
               if (newPath) {
               neighbor.h = heuristic(neighbor, end);
               neighbor.f = neighbor.g + neighbor.h;
               neighbor.previous = current;
               }
            }
        }

    } else {
        // no solution
        console.log('No Solution');
        noLoop();
        return;
        
    }

    background(0);

    for (let i=0; i < cols; i++) {
        for (let j=0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    for (let i=0; i< closedSet.length; i++){
        closedSet[i].show(color(255, 0, 0));
    }
    for (let i=0; i< openSet.length; i++){
        openSet[i].show(color(0, 255, 0));
    }

    let winner = 0
    let current = openSet[winner]
    
        path = []; // start with emp list if this is one winner
        var temp = current; // while tepm has previ. push
        path.push(temp);
        while (temp.previous) {
        path.push(temp.previous);
        temp =  temp.previous;
    } 


    for (let i=0; i < path.length; i++) {
        path[i].show(color(0, 0, 255))
    }
    noFill();
    stroke(255);
    beginShape();
    for (var i =0; i < path.length; i++) {
        vertex(path[i].i * w + w/2, path[i].j * h + h/2)
    }
    endShape();
}