/**
 * 参加游戏人缩略面板
 * User: ningxiao
 * Date: 13-8-17
 * Time: 下午1:12
 */
car.panel_ui = function(x, y, bitmapData,data){
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.lable =  null;
    this.ioc = null;
    this.numberIoc = null;
    this.init(data);
}
flash.utils.inherits(car.panel_ui, flash.display.DisplayObject);
car.panel_ui.prototype.init = function(data){
    this.lable =  new flash.display.Label(50,30,data.val);
    this.ioc = new flash.display.Sprite(8,3,new flash.display.BitmapData(40,40,0,0,data.ioc));
    this.numberIoc = new flash.display.Sprite(this.width - 50,10,new flash.display.BitmapData(25,25,0,0,data.numberIoc));
    this.addChild(this.lable);
    this.addChild(this.ioc);
    this.addChild(this.numberIoc);
}