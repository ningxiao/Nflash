/**
 * 金币组件
 * User: ningxiao
 * Date: 13-7-26
 * Time: 下午10:20
 * To change this template use File | Settings | File Templates.
 */
flash.utils.provide("fish.coin_ui");
flash.utils.require("flash.display.Sprite");
flash.utils.require("flash.display.MovieClip");
flash.utils.require("flash.display.BitmapData");
flash.utils.require("flash.display.DisplayObject");
fish.coin_ui = function(x, y, bitmapData,index){
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.coin_img = fish.config.bitmaps["coinText"];
    this.step = 0;
    this.speed = 2;
    this.is_play = true;
    this.sum_ui = new flash.display.MovieClip(32, 0, new flash.display.BitmapData(36, 49,0, 0, this.coin_img), 3, null);
    for (var k = 1; k < 10; k++) {
        this.sum_ui.addFrame(new flash.display.BitmapData(36, 49, k*36, 0, this.coin_img), null);
    }
    this.sum_ui.gotoAndStop(index+1);
    this.addChild(this.sum_ui);
    this.addChild(new flash.display.Sprite(0,0,new flash.display.BitmapData(36, 49,36*10, 0, this.coin_img)));
}
flash.utils.inherits(fish.coin_ui, flash.display.DisplayObject);
/**
 * 设捕鱼的价值
 * @param index
 */
fish.coin_ui.prototype.set_coin = function(index){
    this.sum_ui.gotoAndStop(index+1);
}
fish.coin_ui.prototype.play_Animation = function(){
    if(this.step<20){
        this.setY(this.y-=this.speed);
        this.step++;
    }else{
        this.is_play = false;
        this.parent.removeChild(this);
    }
}
/**
 *重置猎物价格UI
 */
fish.coin_ui.prototype.reset = function(){
    this.step = 0;
    this.is_play = true;
}