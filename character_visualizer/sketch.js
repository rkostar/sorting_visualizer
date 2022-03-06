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
