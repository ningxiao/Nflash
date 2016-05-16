gophers.bepanel =function(x, y, bitmapData,data){
	flash.display.DisplayObject.apply(this, arguments);
	this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.back_ui = new flash.display.Sprite(0,0,new flash.display.BitmapData(gophers.StageW, gophers.StageH, 0, 0, gophers.bitmaps["start_bg"]));
    this.img_ui = new flash.display.Sprite(132,290,new flash.display.BitmapData(gophers.ImgW , gophers.ImgH, 0, 0, gophers.bitmaps[data[0]]));
    this.lable =  new flash.display.Label(50,30,data[1]);
    this.lable.fillStyle = '#B3B7BA';//字体颜色
    this.lable.fonsize = 24;//字体大小
    this.lable.font = '24px 微软雅黑';
    this.lable.appendText(data[2],50,80);  
    this.addChild(this.back_ui);
    this.addChild(this.img_ui);
    this.addChild(this.lable);
}
flash.utils.inherits(gophers.bepanel, flash.display.DisplayObject);