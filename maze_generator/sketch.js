var rsize=document.getElementById('row');
var csize=document.getElementById('col');


var col_length=csize.value;
var row_length=rsize.value;

var cols, rows;
var w=40;
var grid=[];        //will act as 2d array
var current;


csize.addEventListener("input",update_canvas);
rsize.addEventListener("input",update_canvas);

function setup() {
  var canvas= createCanvas(col_length, row_length);
  // canvas.center();
  cols=floor(width/w);
  rows=floor(height/w);
  frameRate(5);

  for(var i=0;i<rows;i++){
    for(var j=0;j<cols;j++){
      var cell= new Cell(j, i);
      grid.push(cell);
    }
  }
  current=grid[0];
}

function draw() {
  background(100);
  for(var i=0;i<grid.length;i++){
    grid[i].show();
  }
  current.visited=true;
  var next= current.checkNeighbours();

  if(next){
    next.visited=true;
    current=next;
  }
}

function getIndex(i, j){
  if(i<0 || j<0 || i>cols-1 || j>rows-1)
    return -1;
  return i+j*cols;
}

function Cell(i, j){      // creating cell
  this.i= i;
  this.j= j;
  this.walls=[true, true, true, true];    // top, right, bottom, left
  this.visited=false;

  this.checkNeighbours=function(){
    var neighbours=[];

    var top= grid[getIndex(i, j-1)];
    var right= grid[getIndex(i+1, j)];
    var bottom= grid[getIndex(i, j+1)];
    var left= grid[getIndex(i-1, j)];

    if(top && !top.visited){
      neighbours.push(top);
    }
    if(right && !right.visited){
      neighbours.push(right);
    }
    if(bottom && !bottom.visited){
      neighbours.push(bottom);
    }
    if(left && !left.visited){
      neighbours.push(left);
    }
    if(neighbours.length>0){
      var r=floor(random(0, neighbours.length));
      return neighbours[r];
    }
    else
      return undefined;
    
  }

  this.show= function(){
    var x= this.i*w;
    var y= this.j*w;
    stroke(255);
    if(this.walls[0]){
      line(x,y,x+w,y);          // top
    }
    if(this.walls[1]){
      line(x+w,y,x+w,y+w);      //right
    }
    if(this.walls[2]){
      line(x+w,y+w,x,y+w);      //bottom
    }
    if(this.walls[3]){
      line(x,y+w,x,y);          //left
    }

    if(this.visited){
      fill(255, 0, 255);
      rect(x,y,w,w);
    }
             
  }
}

function update_canvas()
{
    col_length=csize.value;
    row_length=rsize.value;
    setup();
}