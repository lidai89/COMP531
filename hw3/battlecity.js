var SCREEN_HEIGHT=800;
var SCREEN_WIDTH=600;
var SCREEN_OFFSETX=100;
var SCREEN_OFFSETY=100;
var ctx;
var wallCtx;
var grassCtx;
var tanCtx;
var overCtx;
var Obj_img = new Image();
var tankPos=[200,200];
var tankspeed=3;
var faceAngle=0;// tank angle
var rect;
var tanksize=32;
var canvas = $("#stageCanvas");
Obj_img.src = "res/tankAll.gif";
$(document).ready(function(){
	
	initScreen();
	//initObject();
	
    setInterval(Update,40);
});

function initScreen(){
	canvas = $("#stageCanvas");
	ctx = canvas[0].getContext("2d");
	canvas.attr({"width":SCREEN_WIDTH});
	canvas.attr({"height":SCREEN_HEIGHT});
	wallCtx = $("#wallCanvas")[0].getContext("2d");
	grassCtx = $("#grassCanvas")[0].getContext("2d");
	$("#wallCanvas").attr({"width":SCREEN_WIDTH});
	$("#wallCanvas").attr({"height":SCREEN_HEIGHT});
	$("#grassCanvas").attr({"width":SCREEN_WIDTH});
	$("#grassCanvas").attr({"height":SCREEN_HEIGHT});
	tankCtx = $("#tankCanvas")[0].getContext("2d");
	$("#tankCanvas").attr({"width":SCREEN_WIDTH});
	$("#tankCanvas").attr({"height":SCREEN_HEIGHT});
	overCtx = $("#overCanvas")[0].getContext("2d");
	$("#overCanvas").attr({"width":SCREEN_WIDTH});
	$("#overCanvas").attr({"height":SCREEN_HEIGHT});
    $("#canvasDiv").css({top: SCREEN_OFFSETY, left: SCREEN_OFFSETX, position:'absolute'});
	$("#canvasDiv").css({"width":SCREEN_WIDTH});
	$("#canvasDiv").css({"height":SCREEN_HEIGHT});
	$("#canvasDiv").css({"background-color":"#27D3ED"});
    // tankCtx.save();
    // // tankCtx.translate(216,216);
    // // tankCtx.rotate(60*Math.PI/180);
    // // tankCtx.translate(-216,-216);
    // tankCtx.drawImage(Obj_img,0,0,32,32,200,200,32,32);
    // tankCtx.restore();
    tankrotate(0);
    ctx.font = "30px Arial";
    ctx.fillStyle="rgba(163, 199, 17,0.5)"
    ctx.fillText("Score:",400,50);
    //tankCtx.drawImage(Obj_img,-100,-100);
}
document.addEventListener("click",tankspin);
document.addEventListener('mousedown',tankmove);
document.addEventListener('keydown',tankstop);
//update and render game conditions
function tankrotate(angle){
    tankCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    tankCtx.save();
    tankCtx.translate(tankPos[0]+tanksize/2,tankPos[1]+tanksize/2);
    tankCtx.rotate(angle);
    tankCtx.translate(-tankPos[0]-tanksize/2,-tankPos[1]-tanksize/2);
    tankCtx.drawImage(Obj_img,0,0,tanksize,tanksize,tankPos[0],tankPos[1],tanksize,tanksize);
    tankCtx.restore();

}
var tankInterval;
function tankspin(e){
 if(e.clientX<=SCREEN_OFFSETX+SCREEN_WIDTH&&e.clientY<=SCREEN_OFFSETY+SCREEN_HEIGHT&&e.clientX>SCREEN_OFFSETX&&e.clientY>SCREEN_OFFSETY)
 {//alert("clicked!");
 //caution
 //here canvas boundry is different with client boundry
 rect = canvas[0].getBoundingClientRect();
 //rotate tank facing
 var x= (e.clientX-rect.left)/(rect.right-rect.left)*SCREEN_WIDTH;
 var y= (e.clientY-rect.top)/(rect.bottom-rect.top)*SCREEN_HEIGHT;
 faceAngle=Math.atan((y-tankPos[1])/(x-tankPos[0]))+(x<tankPos[0]?Math.PI:0);
//  console.log([x,y]);
//  console.log(faceAngle*180/Math.PI);
//  console.log([e.clientX,e.clientY]);
 tankrotate(faceAngle+0.5*Math.PI);

}
}
var tank_status='stop';
function tankmove(e){

    tank_status='move'
//    tankrotate(faceAngle+0.5*Math.PI);
}

function tankstop(e){
    if(e.keyCode==32)
    tank_status='stop'
}
function Update(){
    if(tank_status=='move'){
    tankPos[0]+=tankspeed*Math.cos(faceAngle);
    tankPos[1]+=tankspeed*Math.sin(faceAngle);
    }
    //collision
    if(tankPos[0]<10||tankPos[0]>580){
        faceAngle=Math.PI-faceAngle;

    }

    if(tankPos[1]<10||tankPos[1]>780){
        faceAngle=-faceAngle;

    }
    tankrotate(faceAngle+0.5*Math.PI);
}