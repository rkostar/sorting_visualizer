var image_to_char=document.getElementById("ImageToChar");
var video_to_char=document.getElementById("VideoToChar");

// video_to_char.addEventListener("click", ImageToChar())

var inp_string=document.getElementById('frm');



// var addBtn= document.getElementById('smit');

var density = '       .:-i|=+%O#@a'


inp_string.addEventListener('submit', function(event){
  event.preventDefault();
  var val= document.getElementById("inpString").value;
  console.log(val);
  density=val;
})

let video;
let asciiDiv;



function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(80, 37);
  //capture.hide();
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}