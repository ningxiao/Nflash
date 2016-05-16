/**
 * 帮助与引导开始界面
 * User: ningxiao
 * Date: 13-8-17
 * Time: 上午9:56
 */
car.guide_ui=function(x, y, bitmapData){
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.btnW = 407;
    this.btnH = 94;
    this.btnX = (this.width - this.btnW)/2
    this.startButton = new flash.display.Button(this.btnX, 300, new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["btn_01_normal"]));//开始按钮
    this.startButton.setOverSkin(new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["btn_01_hover"]));

    this.helpButton = new flash.display.Button(this.btnX, 400, new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["btn_03_normal"]));//帮助按钮
    this.helpButton.setOverSkin(new flash.display.BitmapData(this.btnW, this.btnH, 0, 0, car.bitmaps["btn_03_hover"]));

    this.helpPanel = new flash.display.Sprite(0, 0, new flash.display.BitmapData(801, 600, 0, 0, car.bitmaps["help_png"]));//点击帮助按钮显示
    this.addChild(this.startButton);
    this.addChild(this.helpButton);
    this.startButton.addEventListener(flash.events.MouseEvent.CLICK, this.startGame);
    this.helpButton.addEventListener(flash.events.MouseEvent.CLICK, this.showHelp);
    this.helpPanel.addEventListener(flash.events.MouseEvent.CLICK, this.hideHelp);
}
flash.utils.inherits(car.guide_ui, flash.display.DisplayObject);
/**
 * 点击开始游戏按钮
 * @param event
 */
car.guide_ui.prototype.startGame=function(event){
    var parent = event.target.parent;
    parent.dispatchEvent(new CarEvent(CarEvent.START));
}
/**
 * 点击出现帮助界面
 * @param event
 */
car.guide_ui.prototype.showHelp = function(event){
    var parent = event.target.parent;
    parent.addChild(parent.helpPanel);
}
/**
 * 点击帮助面板隐藏
 * @param event
 */
car.guide_ui.prototype.hideHelp = function(event){
    var parent = event.target.parent;
    parent.removeChild(parent.helpPanel);
}