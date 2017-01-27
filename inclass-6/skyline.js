'use strict'


function createbuilding(x0,height,width,color){
	this.x0=x0;
	this.height=height;
	this.width=width;
	this.color=color;
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3
	var canvas= document.querySelector("canvas");
	var c = canvas.getContext("2d");
	var floor = canvas.height/2;
	this.grow=function(){
		var c = document.querySelector("canvas").getContext("2d");
		c.fillStyle=this.color;
		var newheight=Math.random()*this.height
		c.fillRect(x0, newheight, width, floor-newheight);
		c.fillStyle="yellow";
		for (var y = floor; y > newheight+floorSpacing; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < width - windowWidth; x += windowSpacing + windowWidth) {
				
				if(Math.random()>0.5){
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight);	
				}
			}
		}
		this.height=newheight;
}
this.redraw=function(){
		var c = document.querySelector("canvas").getContext("2d");
		c.fillStyle=this.color;
		var newheight=this.height;
		c.fillRect(x0, newheight, width, floor-newheight);
		c.fillStyle="yellow";
		for (var y = floor; y > newheight+floorSpacing; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < width - windowWidth; x += windowSpacing + windowWidth) {
				
				if(Math.random()>0.5){
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight);	
				}
			}
		}
		this.height=newheight;
}
}
var buildings=new Array();
var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*(canvas.width-50);
		var blgWidth = (windowWidth+windowSpacing) * (Math.floor(Math.random()*10)+1)
		var blgHeight = Math.random()*canvas.height/2;
		console.log(x0);
		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		var col=c.fillStyle
		buildings.push(new createbuilding(x0,floor - blgHeight,blgWidth,col));
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y >= floor - blgHeight+windowHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				
				if(Math.random()>0.5){
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight);	
				}
			}
		}
	}
	var sun_x=0;
	var sun_y=30;

	function update(){
	c.clearRect(0,0,canvas.width,canvas.height);
	c.beginPath();
	c.arc(sun_x,sun_y,10,0,2*Math.PI);
	c.fillStyle='red';
	c.fill();
	sun_x+=10;
	sun_y+=Math.random()*10-5;
	buildings.forEach(function(element){
		element.redraw();
	})
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height);
	c.drawImage(img,sun_x,400,50,50);
	}
	setInterval(update,1000);
	return {
		build: build
	}
}
window.addEventListener('click',growbuilding);
function growbuilding(e){
	console.log(e.clientX);
	buildings.forEach(function(element){
		
		if(e.clientX>element.x0&&e.clientX<=element.x0+element.width&&e.clientY>element.height&&e.clientY<document.querySelector("canvas").height){
			element.grow();
		}
		
	})
}
var img=new Image();
img.src="https://cdn.pixabay.com/photo/2015/09/12/21/31/car-937414_960_720.png";
window.onload = function() {
	var app = createApp(document.querySelector("canvas"));
	document.getElementById("build").onclick = app.build;
}


