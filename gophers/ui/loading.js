gophers.loading =function(x, y, bitmapData,data){
	flash.display.DisplayObject.apply(this, arguments);
	this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.width = 522;
    this.height = 300;
    this.loading_bg = new flash.display.Sprite(26,0,new flash.display.BitmapData(470, 232, 0, 0, gophers.bitmaps["logo"]));
    this.line = new flash.display.Sprite(10,262,new flash.display.BitmapData(512, 19, 0, 0, gophers.bitmaps["line"]));
    this.ltime = new flash.display.Sprite(10,281,new flash.display.BitmapData(10, 19, 0, 0, gophers.bitmaps["time_tou"]));
    this.ltime.rotation = -180;
    this.rtime = new flash.display.Sprite(512,262,new flash.display.BitmapData(10, 19, 0, 0, gophers.bitmaps["time_tou"]));
    this.time_line = new flash.display.Sprite(10,262,new flash.display.BitmapData(1, 19, 0, 0, gophers.bitmaps["time_line"]));
    this.addChild(this.loading_bg);
    this.addChild(this.ltime);
    this.addChild(this.line);
    this.addChild(this.time_line);
    this.rtime.visible = false;
    this.addChild(this.rtime);
}
flash.utils.inherits(gophers.loading, flash.display.DisplayObject);
/**
 * 设捕鱼的价值
 * @param index
 */
gophers.loading.prototype.progress = function(data){
    this.time_line.width = parseInt(data*502);
    if(data>=1){
    	this.rtime.visible = true;
    }
}