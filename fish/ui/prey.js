/**
 * 需要捕获猎物组件
 * User: ningxiao
 * Date: 13-10-12
 * Time: 下午4:45
 */
flash.utils.provide("fish.prey");
flash.utils.require("flash.display.MovieClip");
fish.prey = function(x, y, bitmapData,coin){
    this.coin = coin || 5;//当前鱼被捕获价格
}
flash.utils.inherits(fish.prey, flash.display.MovieClip);