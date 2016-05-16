/**
 * 小蜜蜂
 * User: ningxiao
 * Date: 14-6-17
 * Time: 上午8:19
 */
flash.utils.provide("skywar.ui.Swarm");
flash.utils.require("flash.display.Sprite");
flash.utils.require("flash.display.MovieClip");
flash.utils.require("flash.display.BitmapData");
flash.utils.require("flash.display.DisplayObject");
skywar.ui.Swarm = function(x, y, bitmapData,index){
	flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.swarm_img = skywar.config.bitmaps["bee"];
    this.explosion_img = skywar.config.bitmaps["beeexp"];
    this.width = skywar.config.bee_width;
    this.height = skywar.config.bee_height;
    this.explosionw = skywar.config.beeexpw;
    this.explosionh = skywar.config.beeexph;
    this.explosionx = (this.width - this.explosionw)/2;
    this.explosiony = (this.height - this.explosionh)/2;
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标	
    this.isdeath = false;
    this.swarm = new flash.display.Sprite(0,0,new flash.display.BitmapData(this.width,this.height,0,0, this.swarm_img));
    this.explosion = new flash.display.MovieClip(this.explosionx, this.explosiony, new flash.display.BitmapData(this.explosionw, this.explosionh,0, 0, this.explosion_img), 2, null);
    for (var i = 1; i < 71; i++) {
        this.explosion.addFrame(new flash.display.BitmapData(this.explosionw, this.explosionh, 0, i*this.explosionh, this.explosion_img), null);
    }
    this.explosion.addFrame(new flash.display.BitmapData(this.explosionw, this.explosionh, 0, i*this.explosionh, this.explosion_img), null,flash.utils.bind(function(){
        this.removeChild(this.explosion);
        this.parent.removeChild(this);
        this.isdeath = true;
    },this));
    this.addChild(this.swarm);
}
flash.utils.inherits(skywar.ui.Swarm,flash.display.DisplayObject);
skywar.ui.Swarm.prototype.death = function(){
    this.removeChild(this.swarm);
    this.addChild(this.explosion);
}