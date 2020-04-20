//web mercator  && PeriodicWave

var mapimg;
var clat = 0; //x
var clon = 0; //y

//var lat = 22.3072;
//var lon = 73.1812;
zoom = 1;
var earthquakes;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage(
    "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0/1024x512?access_token=YOUR_ACCESS_TOKEN"
   
  );
//   earthquakes = loadStrings(
//     "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv"
//   );
    earthquakes = loadStrings(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
    );
    //last 7 days
    // earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv")
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  let = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = PI / 4 + lat / 2;
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (let i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/); //regex
    //   console.log(data);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4]
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;

    // mag = pow(10, mag);
    // mag = sqrt(mag);

    mag = pow( 10, mag / 2 );

    var magmax = sqrt(pow(10, 10))

    var d = map(mag, 0, magmax, 0, 180)
    stroke(255, 0, 255) 

    fill(255, 0, 0, 200);
    ellipse(x, y, d, d);
  }
}

function draw() {}
