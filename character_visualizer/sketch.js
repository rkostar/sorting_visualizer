function setup() {
	
	// Create Canvas of given size
	var cvs = createCanvas(600, 250);
	cvs.center();
}

function draw() {
	
	// Set the background color
	background('green');
	
	// Use createDiv() function to
	// create a div element
	var myDiv = createDiv('Welcome to Charactes world!!');
	
	var myDiv1 = createDiv('A world that is only made of characters');
	
	// Use child() function
	myDiv.child(myDiv1);
	
	// Set the position of div element
	myDiv.position(340, 280);
	
	myDiv.style('text-align', 'center');
	
	// Set the font-size of text
	myDiv.style('font-size', '24px');
	
	// Set the font color
	myDiv.style('color', 'white');

}





var image_to_char=document.getElementById("ImageToChar");
var video_to_char=document.getElementById("VideoToChar");

// video_to_char.addEventListener("click", ImageToChar())

var inp_string=document.getElementById('frm');



// var addBtn= document.getElementById('smit');

var density= 'jagannath  ';
let img;


inp_string.addEventListener('submit', function(event){
  console.log('hi');
  event.preventDefault();
  var val= document.getElementById("inpString").value;
  console.log(val);
  density=val;
})

// function addStringfunc(){
//   this.density=inp_string.value;
// }




// let density;
// let density;
let gloria;
let startIndex = 0;

function preload() {
  gloria = loadImage("kisspng-jagannath.png.48x48.png");
  // density = loadJSON("https://api.weather.gov/gridpoints/LWX/108,90/forecast/hourly");
}

function setup() {
  createCanvas(800, 800); 
  // console.log(this.density);
  // density = density;
  // const periods = density.properties.periods;
  // for (let p of periods) {
  //   density += `${p.temperature}°F ${p.shortForecast} ${p.windSpeed} ${p.windDirection} `;
  //   console.log(p);
  // }
    
  
 textFont("Courier-Bold");
  
}

function draw() {
  background(0);
  frameRate(10);
  
  let charIndex = startIndex;
  let w = width / gloria.width;
  let h = height / gloria.height;
  gloria.loadPixels();
    for (let j = 0; j < gloria.height; j++) {
  for (let i = 0; i < gloria.width; i++) {
      const pixelIndex = (i + j * gloria.width) * 4;
      const r = gloria.pixels[pixelIndex + 0];
      const g = gloria.pixels[pixelIndex + 1];
      const b = gloria.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(avg);      
      textSize(w*1.4);
      textAlign(CENTER, CENTER);
      
      text(density.charAt(charIndex % density.length), i * w + w * 0.5, j * h + h * 0.5);
      charIndex++;
    }
  }
  
  //startIndex++;
  
  
}



// function preload(){
//   img= loadImage('kisspng-jagannath.png.48x48.png');
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(0);
//   // image(img, -80, -40, mouseX, mouseY);
//   // image(img, 0, 0, width, height);

//   let w= width/img.width;
//   let h= height/img.height;

//   img.loadPixels();

//   for(let i=0;i<img.width;i++){
//     for(let j=0;j<img.height;j++){
//       const pixelIndex= (i+j* img.width)*4;
//       const r= img.pixels[pixelIndex+0];
//       const g= img.pixels[pixelIndex+1];
//       const b= img.pixels[pixelIndex+2];

//       const avg= (r+g+b)/3;
//       noStroke();
//       fill(255);
//       // square(i*w, j*h, w);

//       const len= density.length;
//       // const charIndex= floor(map(avg, 0, 255, 0, len));
//       const charIndex= floor(map(avg, 0, 255, len, 0));

//       textSize(w);
//       textAlign(CENTER, CENTER);
//       text(density.charAt(charIndex), i*w + w*0.5, j*h + h*0.5);
//       // text('G', i*w, j*h);
//     }
//   }
// }
