var Tank = function(){
	this.x = 0;
	this.y = 0;
	this.size = 32;//坦克的大小
	this.dir = UP;//方向0：上 1：下 2：左3：右
	this.speed = 1;//坦克的速度
	this.frame = 0;//控制敌方坦克切换方向的时间
	this.hit = false; //是否碰到墙或者坦克
	this.isAI = false; //是否自动
	this.isShooting = false;//子弹是否在运行中
	this.bullet = null;//子弹
	this.shootRate = 0.6;//射击的概率
	this.isDestroyed = false;
	this.tempX = 0;
	this.tempY = 0;
	
	this.move = function(){
		//如果是AI坦克，在一定时间或者碰撞之后切换方法
		
		if(this.isAI && emenyStopTime > 0 ){
			return;
		}

		this.tempX = this.x;
		this.tempY = this.y;
		
		if(this.isAI){
			this.frame ++;
			if(this.frame % 100 == 0 || this.hit){
				this.dir = parseInt(Math.random()*4);//随机一个方向
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
	
	/**
	 * 碰撞检测
	 */
	this.isHit = function(){
		//临界检测
		if(this.dir == LEFT){
			if(this.x <= map.offsetX){
				this.x = map.offsetX;
				this.hit = true;
			}
		}else if(this.dir == RIGHT){
			if(this.x >= map.offsetX + map.mapWidth - this.size){
				this.x = map.offsetX + map.mapWidth - this.size;
				this.hit = true;
			}
		}else if(this.dir == UP ){
			if(this.y <= map.offsetY){
				this.y = map.offsetY;
				this.hit = true;
			}
		}else if(this.dir == DOWN){
			if(this.y >= map.offsetY + map.mapHeight - this.size){
				this.y = map.offsetY + map.mapHeight - this.size;
				this.hit = true;
			}
		}
		if(!this.hit){
			//地图检测
			if(tankMapCollision(this,map)){
				this.hit = true;
			}
		}
		//坦克检测
		/*if(enemyArray != null && enemyArray.length >0){
			var enemySize = enemyArray.length;
			for(var i=0;i<enemySize;i++){
				if(enemyArray[i] != this && CheckIntersect(enemyArray[i],this,0)){
					this.hit = true;
					break;
				}
			}
		}*/
	};
	
	/**
	 * 是否被击中
	 */
	this.isShot = function(){
		
	};
	/**
	 * 射击
	 */ 
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
			if(!this.isAI){
				ATTACK_AUDIO.play();
			}
			this.bullet.draw();
			//将子弹加入的子弹数组中
			bulletArray.push(this.bullet);
			this.isShooting = true;
		}
	};
	
	/**
	 * 坦克被击毁
	 */
	this.distroy = function(){
		this.isDestroyed = true;
		crackArray.push(new CrackAnimation(CRACK_TYPE_TANK,this.ctx,this));
		TANK_DESTROY_AUDIO.play();
	};
	
	
	
};