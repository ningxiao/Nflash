/**
 * Label 组件
 * User: ningxiao
 * Date: 13-8-17
 * Time: 下午1:19
 */
flash.utils.provide("flash.display.Label");
flash.utils.require("flash.display.DisplayObject");
flash.display.Label = function (x, y,text) {
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = {};
    this.imgData = true;
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.labels = [{"text":text,"x":x,"y":y}];//按钮显示内容
    this.textAlign = "start";
    this.fillStyle = '#F3260C';//字体颜色
    this.fonsize = 12;//字体大小
    this.font = 'italic ' + this.fonsize + 'px sans-serif';//设置字体
}
flash.utils.inherits(flash.display.Label, flash.display.DisplayObject);
/**
 * 继承从新flash.display.DisplayObject 的渲染核心方法
 * @param x
 * @param y
 */
flash.display.Label.prototype.drawImage = function (x, y) {
    Stage.conText.fillStyle = this.fillStyle;
    Stage.conText.font = this.font;
    Stage.conText.textAlign = this.textAlign;
    for(var i=0,len=this.labels.length,label;i<len;i++){
        label = this.labels[i];
        Stage.conText.fillText(label.text, label.x, label.y);
    }
    
}
flash.display.Label.prototype.appendText = function (text,x, y) {
    this.labels.push({"text":text,"x":x||0,"y":y||0})
}
