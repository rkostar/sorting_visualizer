
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
    this.highlight= function(){
      var x= this.i*w;
      var y= this.j*w;
      noStroke();
      fill(0,0,255);
      rect(x, y, w, w)
    }
  
    this.highlight_back= function(){
      var x= this.i*w;
      var y= this.j*w;
      noStroke();
      fill(255,0,0);
      rect(x, y, w, w)
    }
  
    this.show= function(){
      var x= this.i*w;
      var y= this.j*w;
      stroke(0,255,0);
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
        noStroke();
        fill(255, 0, 255);
        rect(x,y,w,w);
      }
               
    }
  }