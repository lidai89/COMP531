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
var enemyCtx;
var enemyArray=[];
var bulletArray=[];
var crackArray=[];
var ENEMY_LOCATION = [192,0,384];// enemy birth place
var UP = 0;//enemy direction
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var emenyStopTime = 0;
var BULLET_TYPE_PLAYER = 1;
var BULLET_TYPE_ENEMY = 2;
var CRACK_TYPE_TANK = "tank";
var CRACK_TYPE_BULLET = "bullet";
var POS=new Array();
POS["tankBomb"] = [0,160];
POS["bulletBomb"] = [320,0];
var score=0;
var player_proto=function(ctx){
    this.ctx =ctx
    this.x=0;
    this.y=0;
    this.z=0;
    this.lives=1;
    this.dir=0;
    this.shoot = function(type){

			var tempX = this.x;
			var tempY = this.y;
			this.bullet = new Bullet(this.ctx,this,type,this.dir);
			if(this.dir == UP){
				tempX = this.x + parseInt(this.size/2) - parseInt(this.bullet.size/2);
				tempY = this.y - this.bullet.size;
			}else if(this.dir == DOWN){
				tempX = this.x + parseInt(this.size/2) - parseInt(this.bullet.size/2);
				tempY = this.y + this.size;
			}else if(this.dir == LEFT){
				tempX = this.x - this.bullet.size;
				tempY = this.y + parseInt(this.size/2) - parseInt(this.bullet.size/2);
			}else if(this.dir == RIGHT){
				tempX = this.x + this.size;
				tempY = this.y + parseInt(this.size/2) - parseInt(this.bullet.size/2);
			}
			this.bullet.x = tempX;
			this.bullet.y = tempY;
            this.bullet.speed=6;
			this.bullet.draw();
			bulletArray.push(this.bullet);
            console.log(this.bullet.x,this.bullet.y);

            
    }};
var player;
Obj_img.src = "res/tankAll.gif";
$(document).ready(function(){
	
	initScreen();
	//initObject();
	
    setInterval(Update,40);
});
document.addEventListener("click",tankspin);
document.addEventListener('mousedown',tankmove);
document.addEventListener('keydown',tankstop);
document.addEventListener('contextmenu',playershoot);
function initScreen(){
	canvas = $("#stageCanvas");
	ctx = canvas[0].getContext("2d");
	canvas.attr({"width":SCREEN_WIDTH});
	canvas.attr({"height":SCREEN_HEIGHT});
	wallCtx = $("#wallCanvas")[0].getContext("2d");
	enemyCtx = $("#enemyCanvas")[0].getContext("2d");
	$("#wallCanvas").attr({"width":SCREEN_WIDTH});
	$("#wallCanvas").attr({"height":SCREEN_HEIGHT});
	$("#enemyCanvas").attr({"width":SCREEN_WIDTH});
	$("#enemyCanvas").attr({"height":SCREEN_HEIGHT});
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
    player=new player_proto($("#tankCanvas")[0].getContext("2d"));
    // tankCtx.save();
    // // tankCtx.translate(216,216);
    // // tankCtx.rotate(60*Math.PI/180);
    // // tankCtx.translate(-216,-216);
    // tankCtx.drawImage(Obj_img,0,0,32,32,200,200,32,32);
    // tankCtx.restore();
    tankrotate(0);
    ctx.font = "30px Arial";
    ctx.fillStyle="rgba(163, 199, 17,0.5)"
    ctx.fillText("Score:"+score,400,50);
    player.size=32;
    player.x=tankPos[0];
    player.y=tankPos[1];
    for(i=0;i<10;i++){
    var obj = null;
    obj = new EnemyOne(enemyCtx);
    obj.x = ENEMY_LOCATION[parseInt(Math.random()*3)] + SCREEN_OFFSETX;
	obj.y = SCREEN_OFFSETY;	
	obj.dir = DOWN;
	enemyArray[enemyArray.length] = obj;}
    //tankCtx.drawImage(Obj_img,-100,-100);
}

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
    tank_status='stop';
    var obj = null;
    obj = new EnemyOne(enemyCtx);
    obj.x = ENEMY_LOCATION[parseInt(Math.random()*3)] + SCREEN_OFFSETX;
	obj.y = SCREEN_OFFSETY;	
	obj.dir = DOWN;
	enemyArray[enemyArray.length] = obj;
}
function playershoot(e){
    player.shoot(BULLET_TYPE_PLAYER);
}

function Update(){
    if(score>=3){alert('You Win!');
    score=0;
    initScreen();}
    else{
    if(tank_status=='move'){
    tankPos[0]+=tankspeed*Math.cos(faceAngle);
    tankPos[1]+=tankspeed*Math.sin(faceAngle);
    player.x=tankPos[0];
    player.y=tankPos[1];
    }
    //collision
    if(tankPos[0]<10||tankPos[0]>580){
        faceAngle=Math.PI-faceAngle;

    }

    if(tankPos[1]<10||tankPos[1]>780){
        faceAngle=-faceAngle;

    }
    tankrotate(faceAngle+0.5*Math.PI);
    player.dir=faceAngle;
    enemyCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    if(enemyArray != null && enemyArray.length > 0){
		for(var i=0;i<enemyArray.length;i++){
			var enemyObj = enemyArray[i];
			if(enemyObj.isDestroyed){
				enemyArray.splice(i,1);
                score++
				i--;
			}else{
				enemyObj.draw();
			}
		}
	}
    if(bulletArray != null && bulletArray.length > 0){
		for(var i=0;i<bulletArray.length;i++){
			var bulletObj = bulletArray[i];
			if(bulletObj.isDestroyed){
				bulletObj.owner.isShooting = false;
				bulletArray.splice(i,1);
				i--;
			}else{
				bulletObj.draw();
			}
		}
	}
    if(crackArray != null && crackArray.length > 0){
		for(var i=0;i<crackArray.length;i++){
			var crackObj = crackArray[i];
			if(crackObj.isOver){
				crackArray.splice(i,1);
				i--;
			    }else{
				crackObj.draw();
			}
		}
	}
    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    ctx.fillStyle="rgba(163, 199, 17,0.5)"
    ctx.fillText("Score:"+score,400,50);
    }
}