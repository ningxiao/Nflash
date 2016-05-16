/**
 * 道具面板
 * User: ningxiao
 * Date: 13-8-17
 * Time: 下午1:12
 */
car.props_ui = function(x, y, bitmapData){
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.btnW = 50;
    this.btnH = 50;
    this.ioc0 = new flash.display.Sprite(0,0,new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["mine"]));
    this.ioc1 = new flash.display.Sprite(0,60,new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["fangyu"]));
    this.ioc2 = new flash.display.Sprite(0,120,new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["jiasu"]));
    this.ioc3 = new flash.display.Sprite(0,180,new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["zhadan"]));
    this.addChild(this.ioc0);
    this.addChild(this.ioc1);
    this.addChild(this.ioc2);
    this.addChild(this.ioc3);

}
flash.utils.inherits(car.props_ui, flash.display.DisplayObject);