var rsize=document.getElementById('row');
var csize=document.getElementById('col');

var grid_width= document.getElementById('grid');
var gen=document.getElementById("a_generate");

var solve=document.getElementById("solve");
// grid_width.addEventListener('input', increase_grid);
// console.log(grid_width.value);

var grid_size=grid_width.value;
var col_length=csize.value;
var row_length=rsize.value;

var cols, rows;
// var w=grid_size;
var w=15;
var grid=[];        //will act as 2d array
var current;

var maze=[];

var stack=[];
// function increase_grid(){     doubt
//   w=grid_width.value;
// }

csize.addEventListener("input",update_canvas);
rsize.addEventListener("input",update_canvas);
gen.addEventListener("click",generate);
solve.addEventListener("click",solver);

function generate(){
  // w=grid_width.value;
  grid=[];
  console.log(col_length/w);
  console.log(row_length/w);

  setup();
  // func();
}

function func(){
  console.log(grid);
}

function solver(){
  maze=[];
  for(var i=0;i<parseInt(row_length/w);i++){
    var temp=[];
    for(var j=0;j<parseInt(col_length/w);j++){
      temp.push(grid[getIndex(j, i)].walls);
    }
    maze.push(temp);
  }
  // for(var i=0;i<parseInt(row_length/w);i++){
  //   for(var j=0;j<parseInt(col_length/w);j++){
  //     console.log(maze[i][j]);
  //   }
  // }
  
  // console.log(parseInt(col_length/w));
  // console.log(parseInt(row_length/w));
  // console.log(maze[1][1][1]);
  solve_func(maze,0,0);
}

function solve_func(maze, i, j){
  console.log(maze);
  console.log(maze.length);
  console.log(maze[0].length);
  this.i=i;
  this.j=j;
  console.log(this.i);
  console.log(this.j);
  this.visited=true;
  if(i==maze.length-1 && j==maze[0].length-1){
    this.visited=false;
    path_show(visited);
    console.log("hurray");
    return;
  }
  // solve_func(maze, i+1,j+1)

  
    for(var k=0;k<4;k++){
      if(maze[j][i][k]==false){
        this.visited=false;
        path_show(this.visited)
        maze[j][i][k]=true;
        if(k==0){
          solve_func(maze, i, j-1);
        }
        if(k==1){
          solve_func(maze, i+1, j);
        }
        if(k==2){
          solve_func(maze, i, j+1);
        }
        if(k==3){
          solve_func(maze, i-1, j); 
        } 
        maze[j][i][k]=false;
      }
    }
}

function path_show(visited){    // highlight the path
  if(!this.visited){
    var x= this.i*w;
    var y= this.j*w;
    console.log("h1");
    frameRate(0);
    noStroke();
    fill(255, 0, 0);
    rect(x,y,w,w);
  }
}


function setup() {
  createCanvas(col_length, row_length);
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

function draw() {      // background grid
  background(100);
  for(var i=0;i<grid.length;i++){
    grid[i].show();
  }
  current.visited=true;
  current.highlight();
  // marked as visited   step-1
  var next= current.checkNeighbours();

  if(next){
    //step-2
    stack.push(current);

    //we will be stucked if there is no unvisited neighbor

    next.visited=true;
    //step 3
    removeWalls(current, next);
    //setting next   step-4
    current=next;
  }
  else if(stack.length>0){
    var cell=stack.pop();
    current = cell;
    current.highlight_back();
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
  this.highlight= function(){   //head
    var x= this.i*w;
    var y= this.j*w;
    noStroke();
    fill(0,0,255);
    rect(x, y, w, w)
  }

  this.highlight_back= function(){    // way_back_after stack
    var x= this.i*w;
    var y= this.j*w;
    noStroke();
    fill(255,0,0);
    rect(x, y, w, w)
  }

  this.show= function(){
    var x= this.i*w;
    var y= this.j*w;
    stroke(0,255,0);            // lines color
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

    if(this.visited){  // creating maze
      noStroke();
      fill(245,0, 250);
      rect(x,y,w,w);
    }
             
  }
}

function removeWalls(a, b){
  // console.log("hi");
  var dis_x= a.i-b.i;
  // console.log(dis_x);
  if(dis_x===1){
    a.walls[3]= false;
    b.walls[1]=false;
  }
  else if(dis_x===-1){
    a.walls[1]= false;
    b.walls[3]=false;
  }

  var dis_y=a.j- b.j;
  if(dis_y===1){
    a.walls[0]= false;
    b.walls[2]=false;
  }
  else if(dis_y===-1){
    a.walls[2]= false;
    b.walls[0]=false;
  }
}

function update_canvas()
{
    col_length=csize.value;
    row_length=rsize.value;
    setup();
}


