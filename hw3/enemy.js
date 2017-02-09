var Tank = function(){
	this.x = 0;
	this.y = 0;
	this.size = 32;
	this.dir = UP;
	this.speed = 1;
	this.frame = 0;
	this.hit = false; 
	this.isAI = false; 
	this.isShooting = false;
	this.bullet = null;
	this.shootRate = 0.6;
	this.isDestroyed = false;
	this.tempX = 0;
	this.tempY = 0;
	
	this.move = function(){
		
		
		if(this.isAI && emenyStopTime > 0 ){
			return;
		}

		this.tempX = this.x;
		this.tempY = this.y;
		
		if(this.isAI){
			this.frame ++;
			if(this.frame % 100 == 0 || this.hit){
				this.dir = parseInt(Math.random()*4);
				this.hit = false;
				this.frame = 0;
			}
		}
		if(this.dir == UP){
			this.tempY -= this.speed;
		}else if(this.dir == DOWN){
			this.tempY += this.speed;
		}else if(this.dir == RIGHT){
			this.tempX += this.speed;
		}else if(this.dir == LEFT){
			this.tempX -= this.speed;
		}
		this.isHit();
		if(!this.hit){
			this.x = this.tempX;
			this.y = this.tempY;
		}
	};
	

	this.isHit = function(){
		
		if(this.dir == LEFT){
			if(this.x <= SCREEN_OFFSETX){
				this.x = SCREEN_OFFSETX;
				this.hit = true;
			}
		}else if(this.dir == RIGHT){
			if(this.x >= SCREEN_WIDTH - this.size){
				this.x =  SCREEN_WIDTH - this.size;
				this.hit = true;
			}
		}else if(this.dir == UP ){
			if(this.y <= SCREEN_OFFSETY){
				this.y = SCREEN_OFFSETY;
				this.hit = true;
			}
		}else if(this.dir == DOWN){
			if(this.y >= SCREEN_HEIGHT - this.size){
				this.y = SCREEN_HEIGHT - this.size;
				this.hit = true;
			}
		}
		// if(!this.hit){
		// 	
		// 	if(tankMapCollision(this,map)){
		// 		this.hit = true;
		// 	}
		// }

	};
	

	this.isShot = function(){
		
	};

	this.shoot = function(type){
		if(this.isAI && emenyStopTime > 0 ){
			return;
		}
		if(this.isShooting){
			return ;
		}else{
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

			this.bullet.draw();
			
			bulletArray.push(this.bullet);
			this.isShooting = true;
		}
	};
	

	this.destroy = function(){
		this.isDestroyed = true;
		crackArray.push(new CrackAnimation(CRACK_TYPE_TANK,this.ctx,this));
	};
	
	
	
};


var EnemyOne = function(context){
	this.ctx = context;
	this.isAppear = false;
	this.times = 0;
	this.lives = 1;
	this.isAI = true;
	this.speed = 1.5;
	
	this.draw = function(){
		this.times ++;
		if(!this.isAppear){
			var temp = parseInt(this.times/5)%7;
			this.ctx.drawImage(Obj_img,256+temp*32,32,32,32,this.x,this.y,32,32);
			if(this.times == 34){
				this.isAppear = true;
				this.times = 0;
				this.shoot(2);
			}
		}else{
			this.ctx.drawImage(Obj_img,this.dir*this.size,32,32,32,this.x,this.y,32,32);
			
			
			if(this.times %50 ==0){
				var ra = Math.random();
				if(ra < this.shootRate){
					this.shoot(2);
				}
				this.times = 0;
			}
			this.move();
			
			
		}
		
	};
	
};
EnemyOne.prototype = new Tank();