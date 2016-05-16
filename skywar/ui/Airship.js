/**
 * 太空飞船
 * User: ningxiao
 * Date: 14-6-17
 * Time: 上午8:19
 */
flash.utils.provide("skywar.ui.Airship");
flash.utils.require("flash.display.Sprite");
flash.utils.require("flash.display.MovieClip");
flash.utils.require("flash.display.BitmapData");
flash.utils.require("flash.display.DisplayObject");
skywar.ui.Airship = function(x, y, bitmapData,index){
	flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.airship_img = skywar.config.bitmaps["airship"];  
    this.width = skywar.config.airship_width;
    this.height = skywar.config.airship_height;
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标	
    this.explosion_img = skywar.config.bitmaps["airexp"];
    this.explosionw = skywar.config.airexpw;
    this.explosionh = skywar.config.airexph;
    this.explosionx = (this.width - this.explosionw)/2;
    this.explosiony = (this.height - this.explosionh)/2;      
    this.life = skywar.config.airship_life;//飞船生命值
    this.isdeath = false;
    this.swarm = new flash.display.Sprite(0,0,new flash.display.BitmapData(this.width,this.height,0,0, this.airship_img));
    this.explosion = new flash.display.MovieClip(this.explosionx, this.explosiony, new flash.display.BitmapData(this.explosionw, this.explosionh,0, 0, this.explosion_img), 2, null);
    for (var i = 1; i < 71; i++) {
        this.explosion.addFrame(new flash.display.BitmapData(this.explosionw, this.explosionh, 0, i*this.explosionh, this.explosion_img), null);
    }
    this.explosion.addFrame(new flash.display.BitmapData(this.explosionw, this.explosionh, 0, i*this.explosionh, this.explosion_img), null,flash.utils.bind(function(){
        this.removeChild(this.explosion);
        this.parent.removeChild(this);
    },this));
    this.addChild(this.swarm); 
}
flash.utils.inherits(skywar.ui.Airship,flash.display.DisplayObject);
skywar.ui.Airship.prototype.cutlife = function(){
	this.life--;
}
skywar.ui.Airship.prototype.death = function(){
    if(this.life <= 0){
        this.isdeath = true;
        this.removeChild(this.swarm);
        this.addChild(this.explosion);
    }
}